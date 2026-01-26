import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Dog, CheckCircle, Star } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Hero image
import heroImage from "@/assets/hero-dog-walking.jpg";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultTab = searchParams.get('type') === 'owner' ? 'register' : 'login';
  const redirectUrl = searchParams.get('redirect');

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handlePostAuthRedirect();
      }
    });
  }, [navigate]);

  const handlePostAuthRedirect = () => {
    // Check for pending booking
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    if (pendingBooking) {
      const { returnUrl } = JSON.parse(pendingBooking);
      sessionStorage.removeItem('pendingBooking');
      navigate(returnUrl);
      return;
    }
    
    // Check for redirect URL in params
    if (redirectUrl) {
      navigate(decodeURIComponent(redirectUrl));
      return;
    }
    
    navigate('/dashboard');
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
      handlePostAuthRedirect();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
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
          user_type: 'owner',
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
        description: "Bienvenue sur DogWalking ! Vous pouvez maintenant utiliser la plateforme.",
      });
      handlePostAuthRedirect();
    }
  };

  const benefits = [
    { icon: Shield, text: "Promeneurs 100% vérifiés" },
    { icon: CheckCircle, text: "Paiement sécurisé escrow" },
    { icon: Star, text: "Preuves photo obligatoires" },
  ];

  return (
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
          {sessionStorage.getItem('pendingBooking') && (
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
                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                      {loading ? 'Inscription...' : 'Créer mon compte'}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      En vous inscrivant, vous acceptez nos{" "}
                      <a href="/cgu" className="text-primary hover:underline">CGU</a>
                      {" "}et notre{" "}
                      <a href="/confidentialite" className="text-primary hover:underline">politique de confidentialité</a>
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
