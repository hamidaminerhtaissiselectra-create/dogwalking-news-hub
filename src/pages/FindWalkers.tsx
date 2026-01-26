import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, PlusCircle, FileText, Shield, Sparkles, Dog } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { FloatingContact } from "@/components/ui/floating-contact";
import { SearchFilters } from "@/components/booking/SearchFilters";
import { WalkerCard } from "@/components/booking/WalkerCard";
import { OwnerSection, ProviderSection, ServiceRequestCard, RequestFilters, ServiceRequest, ServiceRequestForm } from "@/components/hub";
import { useWalkerMatching, MatchingCriteria } from "@/hooks/useWalkerMatching";

// Hero image
import heroImage from "@/assets/pages/trouver-promeneurs-hero.jpg";

interface WalkerWithProfile {
  id: string;
  user_id: string;
  hourly_rate: number | null;
  rating: number | null;
  total_reviews: number | null;
  verified: boolean | null;
  services: string[] | null;
  experience_years: number | null;
  bio?: string;
  first_name?: string;
  avatar_url?: string;
  city?: string;
}

// Mock data for service requests (to be replaced with Supabase data)
const mockServiceRequests: ServiceRequest[] = [
  {
    id: "1",
    owner_name: "Marie L.",
    service_type: "promenade",
    description: "Recherche un promeneur pour mon golden retriever de 3 ans. Besoin de promenades quotidiennes d'1h environ, en semaine de préférence le matin.",
    city: "Paris 15ème",
    postal_code: "75015",
    date_needed: "Dès que possible",
    time_slot: "8h - 11h",
    pet_name: "Max",
    pet_type: "Chien",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    responses_count: 3,
  },
  {
    id: "2",
    owner_name: "Thomas B.",
    service_type: "garde",
    description: "Besoin d'une garde pour mon chat du 15 au 22 janvier. Chat calme et affectueux, habitué aux étrangers.",
    city: "Lyon",
    postal_code: "69003",
    date_needed: "15-22 janvier",
    pet_name: "Minou",
    pet_type: "Chat",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    responses_count: 1,
  },
  {
    id: "3",
    owner_name: "Sophie M.",
    service_type: "visite",
    description: "Cherche quelqu'un pour des visites à domicile 2 fois par jour pour mon lapin pendant mes vacances. Alimentation + nettoyage cage.",
    city: "Marseille",
    postal_code: "13008",
    date_needed: "Février",
    time_slot: "Matin et soir",
    pet_name: "Pompon",
    pet_type: "Lapin",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    responses_count: 0,
  },
];

const FindWalkers = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'annonces');
  
  // Walkers state
  const [walkers, setWalkers] = useState<WalkerWithProfile[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [searchCity, setSearchCity] = useState(searchParams.get('location') || '');
  const [selectedService, setSelectedService] = useState(searchParams.get('service') || 'all');
  const [sortBy, setSortBy] = useState('rating');
  
  // Requests state
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(mockServiceRequests);
  const [requestSearchCity, setRequestSearchCity] = useState('');
  const [requestSelectedService, setRequestSelectedService] = useState('all');
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  // Smart matching
  const matchingCriteria: MatchingCriteria = {
    serviceType: selectedService !== 'all' ? selectedService : undefined,
    maxBudget: 30,
    preferVerified: true,
    minRating: 4.0
  };
  
  const { matchedWalkers, isLoading: matchingLoading } = useWalkerMatching(matchingCriteria);

  useEffect(() => {
    fetchWalkers();
    fetchFavorites();
  }, [selectedService, sortBy]);

  const fetchFavorites = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const { data } = await supabase
      .from('favorites')
      .select('walker_id')
      .eq('user_id', session.user.id);
    
    if (data) {
      setFavorites(new Set(data.map(f => f.walker_id)));
    }
  };

  const fetchWalkers = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('walker_profiles')
        .select('*');

      if (sortBy === 'rating') {
        query = query.order('rating', { ascending: false, nullsFirst: false });
      } else if (sortBy === 'price') {
        query = query.order('hourly_rate', { ascending: true, nullsFirst: false });
      } else if (sortBy === 'reviews') {
        query = query.order('total_reviews', { ascending: false, nullsFirst: false });
      }

      const { data: walkerProfiles, error } = await query;

      if (error) throw error;

      if (!walkerProfiles || walkerProfiles.length === 0) {
        setWalkers([]);
        return;
      }

      const userIds = walkerProfiles.map(w => w.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, first_name, avatar_url, city, bio')
        .in('id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);

      let merged: WalkerWithProfile[] = walkerProfiles.map(wp => ({
        ...wp,
        ...profileMap.get(wp.user_id)
      }));
      
      if (selectedService !== 'all') {
        merged = merged.filter(w => w.services?.includes(selectedService));
      }

      if (searchCity) {
        merged = merged.filter(w => 
          w.city?.toLowerCase().includes(searchCity.toLowerCase())
        );
      }

      setWalkers(merged);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchWalkers();
  };

  const handleSearchRequests = () => {
    // Filter mock requests (will be replaced with API call)
    let filtered = mockServiceRequests;
    if (requestSelectedService !== 'all') {
      filtered = filtered.filter(r => r.service_type === requestSelectedService);
    }
    if (requestSearchCity) {
      filtered = filtered.filter(r => 
        r.city.toLowerCase().includes(requestSearchCity.toLowerCase())
      );
    }
    setServiceRequests(filtered);
  };

  const handleBookWalker = async (walkerId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      sessionStorage.setItem('pendingBooking', JSON.stringify({ walkerId, returnUrl: `/book/${walkerId}` }));
      toast({
        title: "Créez votre compte",
        description: "Inscrivez-vous pour réserver ce prestataire.",
      });
      navigate('/auth?redirect=' + encodeURIComponent(`/book/${walkerId}`));
      return;
    }
    navigate(`/book/${walkerId}`);
  };

  const handleToggleFavorite = async (walkerId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour ajouter aux favoris.",
      });
      return;
    }

    const isFavorite = favorites.has(walkerId);
    
    if (isFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session.user.id)
        .eq('walker_id', walkerId);
      
      setFavorites(prev => {
        const newSet = new Set(prev);
        newSet.delete(walkerId);
        return newSet;
      });
      toast({ title: "Retiré des favoris" });
    } else {
      await supabase
        .from('favorites')
        .insert({ user_id: session.user.id, walker_id: walkerId });
      
      setFavorites(prev => new Set(prev).add(walkerId));
      toast({ title: "Ajouté aux favoris ❤️" });
    }
  };

  const handlePostRequest = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour déposer une demande.",
      });
      navigate('/auth?redirect=/find-walkers?tab=deposer');
      return;
    }
    // Open the request form modal
    setIsRequestFormOpen(true);
  };

  const handleRespondToRequest = async (requestId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour répondre à cette demande.",
      });
      navigate('/auth?redirect=/find-walkers?tab=annonces');
      return;
    }
    // TODO: Open response modal/form
    toast({
      title: "Fonctionnalité à venir",
      description: "Le formulaire de réponse sera bientôt disponible.",
    });
  };

  const scrollToRequests = () => {
    setActiveTab('annonces');
    document.getElementById('requests-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Trouver des Services pour Votre Animal | Annonces Propriétaires | DogWalking"
        description="Trouvez facilement un service adapté à votre animal ou publiez une demande en quelques clics. Promenade, garde, visites : les propriétaires déposent des annonces, les prestataires répondent."
        canonical="https://dogwalking.fr/find-walkers"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img 
            src={heroImage} 
            alt="Services pour animaux de compagnie" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Users className="h-3 w-3 mr-1" />
              Place de marché animaux
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Trouver des services pour votre animal<br />
              <span className="text-primary">et consulter les annonces de propriétaires</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Trouvez facilement un service adapté à votre animal ou publiez une demande en quelques clics.
              Promenade, garde, visites : les propriétaires déposent des annonces, les prestataires répondent.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        {/* Owner & Provider Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <OwnerSection onPostRequest={handlePostRequest} />
          <ProviderSection 
            onViewRequests={scrollToRequests} 
            requestCount={serviceRequests.length}
          />
        </div>

        {/* Tabs for Requests vs Providers */}
        <div id="requests-section" className="scroll-mt-24">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
              <TabsTrigger value="annonces" className="gap-2">
                <FileText className="h-4 w-4" />
                Demandes ({serviceRequests.length})
              </TabsTrigger>
              <TabsTrigger value="prestataires" className="gap-2">
                <Users className="h-4 w-4" />
                Prestataires ({walkers.length})
              </TabsTrigger>
            </TabsList>

            {/* Requests Tab */}
            <TabsContent value="annonces">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Dernières demandes de services publiées
                </h2>
                
                <RequestFilters
                  searchCity={requestSearchCity}
                  setSearchCity={setRequestSearchCity}
                  selectedService={requestSelectedService}
                  setSelectedService={setRequestSelectedService}
                  onSearch={handleSearchRequests}
                />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {serviceRequests.length > 0 ? (
                    serviceRequests.map((request, index) => (
                      <ServiceRequestCard
                        key={request.id}
                        request={request}
                        index={index}
                        onRespond={handleRespondToRequest}
                      />
                    ))
                  ) : (
                    <Card className="col-span-full border-dashed">
                      <CardContent className="py-16 text-center">
                        <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                          <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Aucune demande trouvée</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Aucune demande ne correspond à vos critères. Essayez d'élargir votre recherche.
                        </p>
                        <Button variant="outline" onClick={() => {
                          setRequestSearchCity('');
                          setRequestSelectedService('all');
                          setServiceRequests(mockServiceRequests);
                        }}>
                          Réinitialiser les filtres
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            {/* Providers Tab */}
            <TabsContent value="prestataires">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-2xl font-bold mb-6">
                  Prestataires disponibles près de chez vous
                </h2>

                <SearchFilters
                  searchCity={searchCity}
                  setSearchCity={setSearchCity}
                  selectedService={selectedService}
                  setSelectedService={setSelectedService}
                  onSearch={handleSearch}
                />

                <motion.div 
                  className="flex flex-col md:flex-row md:items-center md:justify-between my-6 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-muted-foreground">
                    <span className="text-foreground text-2xl font-bold">{walkers.length}</span>{' '}
                    prestataire{walkers.length !== 1 ? 's' : ''} trouvé{walkers.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
                      <Shield className="h-3.5 w-3.5 text-primary" />
                      100% vérifiés
                    </Badge>
                    <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Assurance incluse
                    </Badge>
                  </div>
                </motion.div>

                {loading ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 rounded-full bg-muted" />
                            <div className="flex-1 space-y-3">
                              <div className="h-5 bg-muted rounded w-1/2" />
                              <div className="h-4 bg-muted rounded w-1/3" />
                              <div className="h-4 bg-muted rounded w-full" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : walkers.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                        <Dog className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Aucun prestataire trouvé</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Essayez d'élargir vos critères de recherche ou changez de ville
                      </p>
                      <Button variant="outline" onClick={() => {
                        setSearchCity('');
                        setSelectedService('all');
                        fetchWalkers();
                      }}>
                        Réinitialiser les filtres
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {walkers.map((walker, index) => (
                      <WalkerCard
                        key={walker.id}
                        walker={walker}
                        index={index}
                        onBook={handleBookWalker}
                        onFavorite={handleToggleFavorite}
                        isFavorite={favorites.has(walker.user_id)}
                        isStarSitter={walker.verified && (walker.rating || 0) >= 4.8}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <FloatingContact />
      
      {/* Service Request Form Modal */}
      <ServiceRequestForm
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
        onSubmit={(data) => {
          // Add to local state for demo (will be Supabase later)
          const newRequest: ServiceRequest = {
            id: Date.now().toString(),
            owner_name: "Vous",
            service_type: data.service_type,
            description: data.description,
            city: data.city,
            postal_code: data.postal_code,
            date_needed: data.date_needed,
            time_slot: data.time_slot,
            pet_name: data.pet_name,
            pet_type: data.pet_type,
            created_at: new Date().toISOString(),
            responses_count: 0,
          };
          setServiceRequests([newRequest, ...serviceRequests]);
          setActiveTab('annonces');
        }}
      />
    </div>
  );
};

export default FindWalkers;
