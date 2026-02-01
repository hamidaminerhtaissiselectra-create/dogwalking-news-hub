import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Dog, CheckCircle, Star, User, Heart } from 'lucide-react';
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
  
  // User type selection for registration
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(true);
  
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
      await handlePostAuthRedirect();
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
      await handlePostAuthRedirect();
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
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

  const userTypeCards = [
    {
      type: 'owner' as UserType,
      icon: Heart,
      title: "Je suis propriétaire",
      description: "Je cherche quelqu'un pour promener ou garder mon chien",
      color: "heart"
    },
    {
      type: 'walker' as UserType,
      icon: Dog,
      title: "Je suis promeneur",
      description: "Je souhaite proposer mes services de promenade ou garde",
      color: "primary"
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            className="mb-6"
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
              className="mb-6 p-4 bg-primary/10 rounded-xl border border-primary/20"
            >
              <div className="flex items-center gap-3">
                <Dog className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Réservation en attente</p>
                  <p className="text-xs text-muted-foreground">Connectez-vous pour finaliser votre réservation</p>
                </div>
              </div>
            </motion.div>
          )}

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Dog className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Bienvenue sur DogWalking</CardTitle>
              <CardDescription>
                Connectez-vous ou créez un compte pour continuer
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <Button 
                  variant="outline" 
                  className="w-full h-12 gap-3 text-base font-medium"
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading}
                >
                  <GoogleIcon />
                  Continuer avec Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-12 gap-3 text-base font-medium"
                  onClick={() => handleSocialLogin('apple')}
                  disabled={loading}
                >
                  <AppleIcon />
                  Continuer avec Apple
                </Button>
              </div>

              <div className="relative mb-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                  ou avec email
                </span>
              </div>

              <Tabs defaultValue={defaultTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Connexion</TabsTrigger>
                  <TabsTrigger value="register">Inscription</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="votre@email.com" 
                        required 
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input 
                        id="password" 
                        name="password" 
                        type="password" 
                        required 
                        className="mt-1"
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                      {loading ? 'Connexion...' : 'Se connecter'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  {/* User Type Selection */}
                  <AnimatePresence mode="wait">
                    {showUserTypeSelection && !selectedUserType ? (
                      <motion.div
                        key="user-type-selection"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                      >
                        <p className="text-sm text-center text-muted-foreground mb-4">
                          Choisissez votre type de compte
                        </p>
                        <div className="grid gap-3">
                          {userTypeCards.map((card) => (
                            <motion.button
                              key={card.type}
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                setSelectedUserType(card.type);
                                setShowUserTypeSelection(false);
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                card.type === 'owner' 
                                  ? 'hover:border-heart hover:bg-heart/5'
                                  : 'hover:border-primary hover:bg-primary/5'
                              } ${
                                selectedUserType === card.type 
                                  ? card.type === 'owner' 
                                    ? 'border-heart bg-heart/5' 
                                    : 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                  card.type === 'owner' ? 'bg-heart/10' : 'bg-primary/10'
                                }`}>
                                  <card.icon className={`h-6 w-6 ${
                                    card.type === 'owner' ? 'text-heart' : 'text-primary'
                                  }`} />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{card.title}</h3>
                                  <p className="text-sm text-muted-foreground">{card.description}</p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="registration-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {/* Selected user type badge */}
                        <div className="flex items-center justify-between mb-4">
                          <Badge 
                            variant="outline" 
                            className={`${
                              selectedUserType === 'owner' 
                                ? 'border-heart text-heart bg-heart/5' 
                                : 'border-primary text-primary bg-primary/5'
                            }`}
                          >
                            {selectedUserType === 'owner' ? (
                              <>
                                <Heart className="h-3 w-3 mr-1 fill-heart" />
                                Propriétaire
                              </>
                            ) : (
                              <>
                                <Dog className="h-3 w-3 mr-1" />
                                Promeneur
                              </>
                            )}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedUserType(null);
                              setShowUserTypeSelection(true);
                            }}
                          >
                            Changer
                          </Button>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="firstName">Prénom</Label>
                              <Input id="firstName" name="firstName" required className="mt-1" />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Nom</Label>
                              <Input id="lastName" name="lastName" required className="mt-1" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email-register">Email</Label>
                            <Input 
                              id="email-register" 
                              name="email" 
                              type="email" 
                              placeholder="votre@email.com" 
                              required 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Téléphone (optionnel)</Label>
                            <Input 
                              id="phone" 
                              name="phone" 
                              type="tel" 
                              placeholder="06 12 34 56 78" 
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="password-register">Mot de passe</Label>
                            <Input 
                              id="password-register" 
                              name="password" 
                              type="password" 
                              required 
                              minLength={6} 
                              className="mt-1"
                              placeholder="6 caractères minimum"
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className={`w-full h-12 text-base ${
                              selectedUserType === 'owner' ? 'bg-heart hover:bg-heart/90' : ''
                            }`} 
                            disabled={loading}
                          >
                            {loading ? 'Inscription...' : 'Créer mon compte'}
                          </Button>
                          <p className="text-xs text-center text-muted-foreground">
                            En vous inscrivant, vous acceptez nos{" "}
                            <a href="/cgu" className="text-primary hover:underline">CGU</a>
                            {" "}et notre{" "}
                            <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>
                          </p>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
