import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Dog, CheckCircle, Star, Heart } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { getSafeSessionStorage } from "@/lib/safeStorage";
import { Separator } from "@/components/ui/separator";
import RoleChoiceDialog from "@/components/dashboard/shared/RoleChoiceDialog";

// Hero image
import heroImage from "@/assets/hero-dog-walking.jpg";

// Icons for social login
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

type UserType = 'owner' | 'walker';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get('type') === 'owner' ? 'register' : 'login';
  const redirectUrl = searchParams.get('redirect');
  
  // User type selection for BOTH login and registration
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  
  // Role choice dialog for user_type=both
  const [showRoleChoice, setShowRoleChoice] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        void handlePostAuthRedirect();
      }
    });
  }, [navigate]);

  const handlePostAuthRedirect = async () => {
    const storage = getSafeSessionStorage();
    // Check for pending booking
    const pendingBooking = storage.getItem('pendingBooking');
    if (pendingBooking) {
      const { returnUrl } = JSON.parse(pendingBooking);
      storage.removeItem('pendingBooking');
      navigate(returnUrl);
      return;
    }
    
    // Check for redirect URL in params
    if (redirectUrl) {
      navigate(decodeURIComponent(redirectUrl));
      return;
    }

    // Default redirect depends on user type
    const { data: { session } } = await supabase.auth.getSession();
    const userType = session?.user?.user_metadata?.user_type as string | undefined;
    
    // If user_type is 'both', show a choice dialog
    if (userType === 'both') {
      setShowRoleChoice(true);
      setLoading(false);
      return;
    }
    
    if (userType === 'walker') {
      navigate('/walker/dashboard');
      return;
    }

    navigate('/dashboard');
  };

  const handleRoleChoice = (role: 'owner' | 'walker') => {
    setShowRoleChoice(false);
    if (role === 'walker') {
      navigate('/walker/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUserType) {
      toast({
        title: "Choisissez votre espace",
        description: "Veuillez sélectionner si vous êtes propriétaire ou promeneur",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message === "Invalid login credentials" 
          ? "Email ou mot de passe incorrect" 
          : error.message,
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur DogWalking !",
      });
      
      // Redirect based on selected user type
      if (selectedUserType === 'walker') {
        navigate('/walker/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedUserType) {
      toast({
        title: "Choisissez votre profil",
        description: "Veuillez sélectionner si vous êtes propriétaire ou promeneur",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;

    if (password.length < 6) {
      toast({
        title: "Mot de passe trop court",
        description: "Le mot de passe doit contenir au moins 6 caractères",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: selectedUserType,
          phone: phone || null,
        }
      }
    });

    if (error) {
      let message = error.message;
      if (error.message.includes("already registered")) {
        message = "Cet email est déjà utilisé. Essayez de vous connecter.";
      }
      toast({
        title: "Erreur d'inscription",
        description: message,
        variant: "destructive",
      });
      setLoading(false);
    } else {
      toast({
        title: "Inscription réussie !",
        description: `Bienvenue sur DogWalking en tant que ${selectedUserType === 'owner' ? 'propriétaire' : 'promeneur'} !`,
      });
      
      // Redirect based on selected user type
      if (selectedUserType === 'walker') {
        navigate('/walker/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    if (!selectedUserType) {
      toast({
        title: "Choisissez votre espace",
        description: "Veuillez d'abord sélectionner si vous êtes propriétaire ou promeneur",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          user_type: selectedUserType
        }
      }
    });

    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const benefits = [
    { icon: Shield, text: "Promeneurs 100% vérifiés" },
    { icon: CheckCircle, text: "Paiement sécurisé escrow" },
    { icon: Star, text: "Preuves photo obligatoires" },
  ];

  // Profile type cards with vivid colors
  const userTypeCards = [
    {
      type: 'owner' as UserType,
      icon: Heart,
      title: "Je suis propriétaire",
      description: "Je cherche quelqu'un pour promener ou garder mon chien",
      bgColor: "bg-gradient-to-br from-heart/10 to-heart/5",
      borderColor: "border-heart/30",
      iconBg: "bg-heart/20",
      iconColor: "text-heart",
      selectedBg: "bg-gradient-to-br from-heart/20 to-heart/10",
      selectedBorder: "border-heart"
    },
    {
      type: 'walker' as UserType,
      icon: Dog,
      title: "Je suis promeneur",
      description: "Je souhaite proposer mes services de promenade ou garde",
      bgColor: "bg-gradient-to-br from-stat-green/10 to-stat-green/5",
      borderColor: "border-stat-green/30",
      iconBg: "bg-stat-green/20",
      iconColor: "text-stat-green",
      selectedBg: "bg-gradient-to-br from-stat-green/20 to-stat-green/10",
      selectedBorder: "border-stat-green"
    }
  ];

  return (
    <>
      <RoleChoiceDialog open={showRoleChoice} onChoice={handleRoleChoice} />
      <div className="min-h-screen flex">
        {/* Left side - Image & Benefits */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <img 
            src={heroImage} 
            alt="Promenade de chien" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Plateforme #1 en France
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Rejoignez la communauté DogWalking
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-md">
                Des milliers de propriétaires font confiance à nos promeneurs vérifiés pour prendre soin de leurs compagnons.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 bg-background overflow-y-auto">
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              variant="ghost" 
              className="mb-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Button>

            {/* Pending booking notice */}
            {getSafeSessionStorage().getItem('pendingBooking') && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-primary/10 rounded-xl border border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <Dog className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Réservation en attente</p>
                    <p className="text-xs text-muted-foreground">Connectez-vous pour finaliser</p>
                  </div>
                </div>
              </motion.div>
            )}

            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-2">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Dog className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Bienvenue sur DogWalking</CardTitle>
                <CardDescription className="text-sm">
                  Connectez-vous ou créez un compte pour continuer
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Social Login Buttons */}
                <div className="space-y-2 mb-4">
                  <Button 
                    variant="outline" 
                    className="w-full h-11 gap-3 text-sm font-medium"
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                  >
                    <GoogleIcon />
                    Continuer avec Google
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-11 gap-3 text-sm font-medium"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={loading}
                  >
                    <AppleIcon />
                    Continuer avec Apple
                  </Button>
                </div>

                <div className="relative mb-4">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                    ou avec email
                  </span>
                </div>

                <Tabs defaultValue={defaultTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="login" className="text-sm">Connexion</TabsTrigger>
                    <TabsTrigger value="register" className="text-sm">Inscription</TabsTrigger>
                  </TabsList>

                  {/* User Type Selection - SHARED for both tabs */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-center mb-3">
                      Choisissez votre type de compte
                    </p>
                    <div className="grid gap-2">
                      {userTypeCards.map((card) => (
                        <motion.button
                          key={card.type}
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedUserType(card.type)}
                          className={`p-3 rounded-xl border-2 text-left transition-all ${
                            selectedUserType === card.type 
                              ? `${card.selectedBg} ${card.selectedBorder}` 
                              : `${card.bgColor} ${card.borderColor} hover:border-opacity-60`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">{card.title}</h3>
                              <p className="text-xs text-muted-foreground">{card.description}</p>
                            </div>
                            {selectedUserType === card.type && (
                              <div className={`ml-auto w-5 h-5 rounded-full flex items-center justify-center ${card.type === 'owner' ? 'bg-heart' : 'bg-stat-green'}`}>
                                <CheckCircle className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <TabsContent value="login" className="mt-0">
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div>
                        <Label htmlFor="login-email" className="text-sm">Email</Label>
                        <Input 
                          id="login-email" 
                          name="email" 
                          type="email" 
                          placeholder="votre@email.com" 
                          required 
                          className="mt-1 h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="login-password" className="text-sm">Mot de passe</Label>
                        <Input 
                          id="login-password" 
                          name="password" 
                          type="password" 
                          required 
                          className="mt-1 h-10"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className={`w-full h-11 text-base font-semibold ${
                          selectedUserType === 'owner' 
                            ? 'bg-heart hover:bg-heart/90' 
                            : selectedUserType === 'walker' 
                              ? 'bg-stat-green hover:bg-stat-green/90' 
                              : 'bg-primary hover:bg-primary/90'
                        }`}
                        disabled={loading || !selectedUserType}
                      >
                        {loading ? 'Connexion...' : 'Se connecter'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="register" className="mt-0">
                    <form onSubmit={handleRegister} className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="firstName" className="text-sm">Prénom</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            placeholder="Jean" 
                            required 
                            className="mt-1 h-10"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-sm">Nom</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            placeholder="Dupont" 
                            required 
                            className="mt-1 h-10"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="register-email" className="text-sm">Email</Label>
                        <Input 
                          id="register-email" 
                          name="email" 
                          type="email" 
                          placeholder="votre@email.com" 
                          required 
                          className="mt-1 h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm">Téléphone (optionnel)</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          placeholder="06 12 34 56 78" 
                          className="mt-1 h-10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-password" className="text-sm">Mot de passe</Label>
                        <Input 
                          id="register-password" 
                          name="password" 
                          type="password" 
                          placeholder="6 caractères minimum"
                          required 
                          className="mt-1 h-10"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className={`w-full h-11 text-base font-semibold ${
                          selectedUserType === 'owner' 
                            ? 'bg-heart hover:bg-heart/90' 
                            : selectedUserType === 'walker' 
                              ? 'bg-stat-green hover:bg-stat-green/90' 
                              : 'bg-primary hover:bg-primary/90'
                        }`}
                        disabled={loading || !selectedUserType}
                      >
                        {loading ? 'Inscription...' : "Créer mon compte"}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground pt-1">
                        En vous inscrivant, vous acceptez nos{' '}
                        <a href="/cgu" className="text-primary underline">CGU</a>
                        {' '}et notre{' '}
                        <a href="/confidentialite" className="text-primary underline">politique de confidentialité</a>
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Auth;
