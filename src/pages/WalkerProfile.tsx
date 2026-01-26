import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection, StaggeredChildren } from "@/components/ui/animated-section";
import { AvailabilityCalendar } from "@/components/booking/AvailabilityCalendar";
import { 
  Star, MapPin, Clock, Shield, Heart, MessageCircle, Calendar,
  CheckCircle, Award, Dog, Euro, Phone, Mail, Camera, Verified,
  ThumbsUp, Users, Route
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface WalkerProfile {
  id: string;
  user_id: string;
  hourly_rate: number | null;
  rating: number | null;
  total_reviews: number | null;
  total_walks: number | null;
  verified: boolean | null;
  services: string[] | null;
  experience_years: number | null;
  available_days: string[] | null;
  available_hours_start: string | null;
  available_hours_end: string | null;
  max_dogs: number | null;
  service_radius_km: number | null;
  bio?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  city?: string;
  phone?: string;
  email?: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer_name?: string;
}

interface Badge {
  id: string;
  badge_name: string;
  badge_type: string;
  badge_description: string | null;
  earned_at: string | null;
}

const WalkerProfilePage = () => {
  const { walkerId } = useParams();
  const navigate = useNavigate();
  const [walker, setWalker] = useState<WalkerProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const services = {
    promenade: { label: 'Promenade', icon: Route },
    visite: { label: 'Visite à domicile', icon: Dog },
    garde: { label: 'Garde', icon: Calendar },
    veterinaire: { label: 'Accompagnement vétérinaire', icon: Shield },
  };

  const days = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
  };

  useEffect(() => {
    checkAuth();
    fetchWalkerProfile();
  }, [walkerId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setCurrentUserId(session.user.id);
      checkFavorite(session.user.id);
    }
  };

  const checkFavorite = async (userId: string) => {
    if (!walkerId) return;
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('walker_id', walkerId)
      .single();
    setIsFavorite(!!data);
  };

  const fetchWalkerProfile = async () => {
    if (!walkerId) return;

    try {
      // Fetch walker profile
      const { data: walkerData, error: walkerError } = await supabase
        .from('walker_profiles')
        .select('*')
        .eq('user_id', walkerId)
        .single();

      if (walkerError) throw walkerError;

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name, avatar_url, city, bio, phone, email')
        .eq('id', walkerId)
        .single();

      if (profileError) throw profileError;

      setWalker({ ...walkerData, ...profileData });

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('reviewed_id', walkerId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (reviewsData) {
        // Fetch reviewer names
        const reviewerIds = reviewsData.map(r => r.reviewer_id);
        const { data: reviewerProfiles } = await supabase
          .from('profiles')
          .select('id, first_name')
          .in('id', reviewerIds);

        const reviewerMap = new Map(reviewerProfiles?.map(p => [p.id, p.first_name]) || []);
        
        setReviews(reviewsData.map(r => ({
          ...r,
          reviewer_name: reviewerMap.get(r.reviewer_id) || 'Utilisateur'
        })));
      }

      // Fetch badges
      const { data: badgesData } = await supabase
        .from('walker_badges')
        .select('*')
        .eq('walker_id', walkerId);

      if (badgesData) {
        setBadges(badgesData);
      }

    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!currentUserId) {
      navigate('/auth');
      return;
    }

    try {
      if (isFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', currentUserId)
          .eq('walker_id', walkerId);
        setIsFavorite(false);
        toast({ title: "Retiré des favoris" });
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: currentUserId, walker_id: walkerId });
        setIsFavorite(true);
        toast({ title: "Ajouté aux favoris" });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const startConversation = async () => {
    if (!currentUserId) {
      navigate('/auth');
      return;
    }
    navigate('/messages', { state: { selectedWalkerId: walkerId } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!walker) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold mb-8">Promeneur introuvable</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const responseRate = 95; // This would come from actual data
  const acceptanceRate = 88;

  // Generate LocalBusiness schema for SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${walker.first_name} - Promeneur de chiens`,
    "description": walker.bio || "Promeneur de chiens professionnel vérifié",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": walker.city || "France"
    },
    "priceRange": `${walker.hourly_rate || 15}€`,
    "aggregateRating": walker.rating ? {
      "@type": "AggregateRating",
      "ratingValue": walker.rating,
      "reviewCount": walker.total_reviews || 0
    } : undefined
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{walker.first_name} - Promeneur de Chien à {walker.city || 'France'} | DogWalking</title>
        <meta name="description" content={`${walker.first_name}, promeneur de chiens vérifié à ${walker.city || 'France'}. Note: ${walker.rating?.toFixed(1) || '5.0'}/5. Tarif: ${walker.hourly_rate || 15}€/30min.`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <AnimatedSection animation="fade-up">
          <Card className="overflow-hidden mb-8">
            <div className="relative h-48 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
            </div>
            <CardContent className="relative -mt-20 pb-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-40 w-40 border-4 border-background shadow-xl">
                    <AvatarImage src={walker.avatar_url || ''} />
                    <AvatarFallback className="text-4xl bg-primary/10">
                      {walker.first_name?.[0] || 'P'}
                    </AvatarFallback>
                  </Avatar>
                  {walker.verified && (
                    <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                      <Verified className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold flex items-center gap-2">
                        {walker.first_name} {walker.last_name?.[0]}.
                        {walker.verified && (
                          <Badge className="bg-primary/10 text-primary">
                            <Shield className="h-3 w-3 mr-1" />
                            Vérifié
                          </Badge>
                        )}
                      </h1>
                      {walker.city && (
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {walker.city}
                          {walker.service_radius_km && ` • ${walker.service_radius_km}km autour`}
                        </p>
                      )}
                      
                      {/* Stats row */}
                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full">
                          <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                          <span className="font-bold text-amber-700 dark:text-amber-400">
                            {walker.rating?.toFixed(1) || '5.0'}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({walker.total_reviews || 0} avis)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Route className="h-4 w-4" />
                          <span>{walker.total_walks || 0} promenades</span>
                        </div>
                        {walker.experience_years && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{walker.experience_years} ans d'exp.</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <span className="text-4xl font-bold text-primary">
                          {walker.hourly_rate || 15}€
                        </span>
                        <span className="text-muted-foreground">/30min</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={toggleFavorite}
                          className={isFavorite ? 'text-primary border-primary' : ''}
                        >
                          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="outline" onClick={startConversation}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button onClick={() => navigate(`/book/${walker.user_id}`)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Réserver
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <AnimatedSection animation="fade-up" delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>À propos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {walker.bio || "Passionné par les animaux, je prends soin de vos compagnons comme s'ils étaient les miens. Chaque promenade est une aventure où votre chien peut s'épanouir en toute sécurité."}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Services */}
            <AnimatedSection animation="fade-up" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Services proposés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {walker.services?.map((service) => {
                      const serviceInfo = services[service as keyof typeof services];
                      if (!serviceInfo) return null;
                      const Icon = serviceInfo.icon;
                      return (
                        <motion.div
                          key={service}
                          className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="font-medium">{serviceInfo.label}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Reviews */}
            <AnimatedSection animation="fade-up" delay={0.3}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Avis clients</CardTitle>
                  <Badge variant="secondary">
                    {walker.total_reviews || 0} avis
                  </Badge>
                </CardHeader>
                <CardContent>
                  {reviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Aucun avis pour le moment</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviews.map((review, index) => (
                        <motion.div
                          key={review.id}
                          className="border-b last:border-0 pb-6 last:pb-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold">{review.reviewer_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'fill-amber-500 text-amber-500'
                                      : 'text-muted'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-muted-foreground">{review.comment}</p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            {badges.length > 0 && (
              <AnimatedSection animation="fade-left" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Badges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {badges.map((badge) => (
                        <motion.div
                          key={badge.id}
                          className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Award className="h-8 w-8 text-amber-600 mb-2" />
                          <span className="text-xs font-medium">{badge.badge_name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}

            {/* Response Stats */}
            <AnimatedSection animation="fade-left" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Taux de réponse</span>
                      <span className="font-semibold">{responseRate}%</span>
                    </div>
                    <Progress value={responseRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Taux d'acceptation</span>
                      <span className="font-semibold">{acceptanceRate}%</span>
                    </div>
                    <Progress value={acceptanceRate} className="h-2" />
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Répond en moyenne en</span>
                      <span className="font-semibold">1h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Availability - Visual Calendar */}
            <AnimatedSection animation="fade-left" delay={0.3}>
              <AvailabilityCalendar
                availableDays={walker.available_days}
                availableHoursStart={walker.available_hours_start}
                availableHoursEnd={walker.available_hours_end}
              />
              {walker.max_dogs && (
                <Card className="mt-4">
                  <CardContent className="py-3">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Dog className="h-4 w-4" />
                      Maximum {walker.max_dogs} chien{walker.max_dogs > 1 ? 's' : ''} simultanément
                    </p>
                  </CardContent>
                </Card>
              )}
            </AnimatedSection>

            {/* CTA Card */}
            <AnimatedSection animation="scale" delay={0.4}>
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Prêt à réserver ?</h3>
                  <p className="text-muted-foreground mb-4">
                    Réservez une promenade avec {walker.first_name} dès maintenant
                  </p>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => navigate(`/book/${walker.user_id}`)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Réserver maintenant
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalkerProfilePage;
