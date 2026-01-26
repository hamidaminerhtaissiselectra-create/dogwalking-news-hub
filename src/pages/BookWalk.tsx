import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MapPin, Star, Shield, Camera, Lock, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { SEOHead } from "@/components/seo/SEOHead";
import type { Database } from "@/integrations/supabase/types";

type ServiceType = Database['public']['Enums']['service_type'];

interface BookingData {
  service: ServiceType;
  dogId: string;
  date: string;
  time: string;
  duration: number;
  notes: string;
  address?: string;
}

const BookWalk = () => {
  const { walkerId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dogs, setDogs] = useState<any[]>([]);
  const [walker, setWalker] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    if (walkerId) {
      fetchWalker();
    }
  }, [walkerId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    if (session) {
      setUserId(session.user.id);
      fetchDogs(session.user.id);
    }
    setLoading(false);
  };

  const fetchDogs = async (ownerId: string) => {
    const { data, error } = await supabase
      .from('dogs')
      .select('*')
      .eq('owner_id', ownerId);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setDogs(data || []);
    }
  };

  const fetchWalker = async () => {
    // Try by user_id first
    const { data: walkerData, error: walkerError } = await supabase
      .from('walker_profiles')
      .select('*')
      .eq('user_id', walkerId)
      .single();

    if (walkerError) {
      // Fallback: try by id
      const { data: walkerById } = await supabase
        .from('walker_profiles')
        .select('*')
        .eq('id', walkerId)
        .single();
      
      if (walkerById) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('first_name, avatar_url, city')
          .eq('id', walkerById.user_id)
          .single();
        
        setWalker({ ...walkerById, ...profileData });
      }
      return;
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('first_name, avatar_url, city')
      .eq('id', walkerData.user_id)
      .single();

    setWalker({ ...walkerData, ...profileData });
  };

  const handleRequireAuth = () => {
    toast({
      title: "Dernière étape !",
      description: "Créez votre compte pour finaliser votre réservation.",
    });
    navigate('/auth?redirect=' + encodeURIComponent(`/book/${walkerId}`));
  };

  const handleSubmit = async (data: BookingData) => {
    if (!userId || !walkerId) {
      toast({ title: "Erreur", description: "Données manquantes", variant: "destructive" });
      return;
    }

    if (!data.dogId) {
      toast({
        title: "Sélectionnez un chien",
        description: "Veuillez sélectionner le chien pour cette prestation",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from('bookings').insert({
        owner_id: userId,
        walker_id: walkerId,
        dog_id: data.dogId,
        scheduled_date: data.date,
        scheduled_time: data.time,
        duration_minutes: data.duration,
        price: calculatePrice(data),
        notes: data.notes || null,
        address: data.address || null,
        service_type: data.service,
      });

      if (error) throw error;

      toast({
        title: "Réservation effectuée !",
        description: "Votre demande a été envoyée. Le promeneur va confirmer.",
      });
      navigate('/bookings');
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const calculatePrice = (data: BookingData) => {
    const baseRate = walker?.hourly_rate || 15;
    if (data.service === 'promenade') {
      return Math.round(baseRate * data.duration / 30);
    }
    return baseRate;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <Header />
        <main className="container mx-auto px-4 py-24 max-w-5xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <SEOHead
        title="Réserver une Promenade | DogWalking"
        description="Réservez une promenade ou un service pour votre chien avec un promeneur vérifié. Paiement sécurisé escrow."
      />
      <Header />
      <main className="container mx-auto px-4 py-24 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main booking form */}
            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold mb-2">Réserver une prestation</h1>
              <p className="text-muted-foreground mb-8">Choisissez votre service et finalisez en quelques clics</p>

              <BookingSteps
                walker={walker}
                dogs={dogs}
                isAuthenticated={isAuthenticated}
                onSubmit={handleSubmit}
                onRequireAuth={handleRequireAuth}
              />
            </div>

            {/* Walker sidebar */}
            <div className="md:col-span-1">
              {walker && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="sticky top-24 shadow-lg border-0 overflow-hidden">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center">
                      {walker.avatar_url ? (
                        <img 
                          src={walker.avatar_url} 
                          alt={walker.first_name} 
                          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-background shadow-lg" 
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full mx-auto bg-muted flex items-center justify-center text-3xl border-4 border-background shadow-lg">
                          👤
                        </div>
                      )}
                      <h3 className="text-xl font-bold mt-4">{walker.first_name}</h3>
                      {walker.city && (
                        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {walker.city}
                        </p>
                      )}

                      <div className="flex items-center justify-center gap-2 mt-3">
                        <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                        <span className="font-bold text-lg">{walker.rating?.toFixed(1) || '0.0'}</span>
                        {walker.total_reviews > 0 && (
                          <span className="text-sm text-muted-foreground">({walker.total_reviews} avis)</span>
                        )}
                      </div>

                      {walker.verified && (
                        <Badge className="mt-3 gap-1">
                          <Shield className="h-3 w-3" />
                          Promeneur vérifié
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <p className="text-sm font-medium mb-3">Garanties DogWalking :</p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Assurance RC incluse
                        </li>
                        <li className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-primary" />
                          Preuves photo obligatoires
                        </li>
                        <li className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          Paiement escrow sécurisé
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Réponse rapide garantie
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default BookWalk;
