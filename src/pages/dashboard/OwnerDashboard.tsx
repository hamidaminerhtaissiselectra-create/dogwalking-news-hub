import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Home, Dog, Calendar, Heart, User, Search, MessageCircle, 
  Gift, Plus, MapPin, Clock, Euro, FileText
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";
import DashboardHeader from "@/components/dashboard/shared/DashboardHeader";
import StatCard from "@/components/dashboard/shared/StatCard";
import QuickActionCard from "@/components/dashboard/shared/QuickActionCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Lazy load heavy tab contents
const DogsTab = lazy(() => import("@/components/dashboard/owner/DogsTab"));
const BookingsTab = lazy(() => import("@/components/dashboard/owner/BookingsTab"));
const WalkersTab = lazy(() => import("@/components/dashboard/owner/WalkersTab"));
const MessagesTab = lazy(() => import("@/components/dashboard/owner/MessagesTab"));
const ReferralTab = lazy(() => import("@/components/dashboard/owner/ReferralTab"));
const ProfileTab = lazy(() => import("@/components/dashboard/owner/ProfileTab"));
const InvoicesSection = lazy(() => import("@/components/dashboard/owner/InvoicesSection"));

// Navigation items for bottom nav
const NAV_ITEMS = [
  { id: "home", label: "Accueil", icon: Home },
  { id: "dogs", label: "Chiens", icon: Dog },
  { id: "search", label: "Chercher", icon: Search },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profil", icon: User },
];

type TabId = "home" | "dogs" | "search" | "messages" | "profile" | "bookings" | "favorites" | "invoices" | "referral";

const TabLoader = () => (
  <div className="flex items-center justify-center h-48">
    <div className="flex flex-col items-center">
      <motion.div 
        className="w-10 h-10 border-4 border-heart border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-3 text-sm text-muted-foreground">Chargement du dashboard…</p>
    </div>
  </div>
);

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [dogs, setDogs] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [favoriteWalkers, setFavoriteWalkers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalDogs: 0,
    totalSpent: 0,
    totalFavorites: 0,
    unreadNotifications: 0,
    unreadMessages: 0
  });

  const currentTab = (searchParams.get("tab") as TabId) || "home";
  const setCurrentTab = (tab: TabId) => {
    setSearchParams({ tab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    await fetchAllData(session.user.id);
  };

  const fetchAllData = async (userId: string) => {
    try {
      const [profileRes, dogsRes, bookingsRes, favoritesRes, notificationsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('dogs').select('*').eq('owner_id', userId),
        supabase.from('bookings').select('*, dogs(name, photo_url)').eq('owner_id', userId).order('scheduled_date', { ascending: true }),
        supabase.from('favorites').select('walker_id').eq('user_id', userId),
        supabase.from('notifications').select('id, read').eq('user_id', userId)
      ]);

      setProfile(profileRes.data);
      setDogs(dogsRes.data || []);

      const bookings = bookingsRes.data || [];
      const upcoming = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').slice(0, 3);
      setUpcomingBookings(upcoming);

      // Fetch favorite walkers profiles
      if (favoritesRes.data && favoritesRes.data.length > 0) {
        const walkerIds = favoritesRes.data.map(f => f.walker_id);
        const { data: walkersData } = await supabase
          .from('walker_profiles')
          .select('user_id, rating, verified')
          .in('user_id', walkerIds);
        
        if (walkersData) {
          const { data: walkerProfiles } = await supabase
            .from('profiles')
            .select('id, first_name, avatar_url, city')
            .in('id', walkerIds);
          
          const profileMap = new Map(walkerProfiles?.map(p => [p.id, p]) || []);
          const walkerMap = new Map(walkersData.map(w => [w.user_id, w]));
          
          setFavoriteWalkers(walkerIds.slice(0, 4).map(id => ({
            id,
            name: profileMap.get(id)?.first_name || 'Promeneur',
            avatarUrl: profileMap.get(id)?.avatar_url,
            city: profileMap.get(id)?.city,
            rating: walkerMap.get(id)?.rating || 5,
            verified: walkerMap.get(id)?.verified
          })));
        }
      }

      setStats({
        totalBookings: bookings.length,
        upcomingBookings: upcoming.length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        totalDogs: dogsRes.data?.length || 0,
        totalSpent: bookings.filter(b => b.status === 'completed').reduce((acc, b) => acc + (b.price || 0), 0),
        totalFavorites: favoritesRes.data?.length || 0,
        unreadNotifications: notificationsRes.data?.filter(n => !n.read).length || 0,
        unreadMessages: 0
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos données.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const profileCompletion = () => {
    if (!profile) return 0;
    let score = 0;
    if (profile.first_name) score += 25;
    if (profile.avatar_url) score += 25;
    if (profile.phone) score += 25;
    if (profile.city) score += 25;
    return score;
  };

  const displayName = profile?.first_name || profile?.email?.split('@')[0] || 'Utilisateur';

  if (loading) return <TabLoader />;

  // Home Tab Content
  const HomeContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Profile Completion Banner */}
      {profileCompletion() < 100 && (
        <Card className="border-heart/20 bg-heart/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">Complétez votre profil</p>
                <Progress value={profileCompletion()} className="h-2" />
              </div>
              <span className="text-lg font-bold text-heart">{profileCompletion()}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          icon={Calendar} 
          value={stats.upcomingBookings} 
          label="Réservations à venir"
          variant="heart"
          onClick={() => setCurrentTab('bookings')}
        />
        <StatCard 
          icon={Dog} 
          value={stats.totalDogs} 
          label="Mes chiens"
          variant="primary"
          onClick={() => setCurrentTab('dogs')}
        />
        <StatCard 
          icon={Heart} 
          value={stats.totalFavorites} 
          label="Promeneurs favoris"
          variant="heart"
          onClick={() => setCurrentTab('favorites')}
        />
        <StatCard 
          icon={Euro} 
          value={`${stats.totalSpent.toFixed(0)}€`} 
          label="Total dépensé"
          variant="accent"
          onClick={() => setCurrentTab('invoices')}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">ACTIONS RAPIDES</h3>
        <div className="grid grid-cols-4 gap-2">
          <QuickActionCard icon={Plus} label="Ajouter chien" onClick={() => setCurrentTab('dogs')} variant="primary" size="sm" />
          <QuickActionCard icon={Search} label="Promeneur" onClick={() => setCurrentTab('search')} variant="accent" size="sm" />
          <QuickActionCard icon={Calendar} label="Réserver" onClick={() => navigate('/find-walkers')} variant="heart" size="sm" />
          <QuickActionCard icon={Gift} label="Parrainage" onClick={() => setCurrentTab('referral')} variant="muted" size="sm" />
        </div>
      </div>

      {/* My Dogs */}
      {dogs.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Mes chiens</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentTab('dogs')}>
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dogs.slice(0, 4).map((dog) => (
                <div key={dog.id} className="flex flex-col items-center min-w-[70px]">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarImage src={dog.photo_url} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {dog.name?.charAt(0) || '🐕'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-medium mt-1 text-center truncate w-full">{dog.name}</span>
                </div>
              ))}
              <button 
                onClick={() => setCurrentTab('dogs')}
                className="flex flex-col items-center justify-center min-w-[70px] h-14 border-2 border-dashed border-muted-foreground/30 rounded-full hover:border-primary/50 transition-colors"
              >
                <Plus className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4 text-heart" />
                Prochaines réservations
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentTab('bookings')}>
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div 
                key={booking.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                onClick={() => navigate(`/bookings/${booking.id}`)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={booking.dogs?.photo_url} />
                  <AvatarFallback className="bg-primary/10">🐕</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{booking.dogs?.name || 'Chien'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.scheduled_date).toLocaleDateString('fr-FR', { 
                      weekday: 'short', 
                      day: 'numeric', 
                      month: 'short' 
                    })} • {booking.scheduled_time?.slice(0, 5)}
                  </p>
                </div>
                <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                  {booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Favorite Walkers */}
      {favoriteWalkers.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-heart fill-heart" />
                Promeneurs favoris
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentTab('favorites')}>
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {favoriteWalkers.map((walker) => (
                <div 
                  key={walker.id}
                  className="flex items-center gap-2 p-3 rounded-xl border hover:border-heart/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/walker/${walker.id}`)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={walker.avatarUrl} />
                    <AvatarFallback className="bg-heart/10 text-heart">
                      {walker.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-medium text-sm truncate">{walker.name}</p>
                      {walker.verified && <Badge variant="secondary" className="text-[10px] px-1">✓</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">⭐ {walker.rating?.toFixed(1)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty state for no dogs */}
      {dogs.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Dog className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <h3 className="font-semibold mb-1">Aucun chien enregistré</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ajoutez votre premier compagnon pour commencer
            </p>
            <Button onClick={() => setCurrentTab('dogs')} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un chien
            </Button>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEOHead 
        title="Tableau de bord | DogWalking"
        description="Gérez vos chiens, vos réservations et trouvez les meilleurs promeneurs."
      />
      
      <main className="container mx-auto px-4 pt-4 max-w-lg">
        <DashboardHeader
          name={displayName}
          subtitle="Que souhaitez-vous faire aujourd'hui ?"
          avatarUrl={profile?.avatar_url}
          variant="owner"
          unreadNotifications={stats.unreadNotifications}
          onSettingsClick={() => setCurrentTab('profile')}
        />

        {/* Tab Content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <Suspense fallback={<TabLoader />}>
              {currentTab === "home" && <HomeContent />}
              {currentTab === "dogs" && <DogsTab />}
              {currentTab === "search" && <WalkersTab />}
              {currentTab === "messages" && <MessagesTab />}
              {currentTab === "profile" && <ProfileTab profile={profile} />}
              {currentTab === "bookings" && <BookingsTab />}
              {currentTab === "favorites" && <WalkersTab />}
              {currentTab === "invoices" && <InvoicesSection />}
              {currentTab === "referral" && <ReferralTab />}
            </Suspense>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        items={NAV_ITEMS.map(item => ({
          ...item,
          badge: item.id === 'messages' ? stats.unreadMessages : undefined
        }))}
        activeItem={['bookings', 'favorites', 'invoices', 'referral'].includes(currentTab) ? 'home' : currentTab}
        onItemChange={(id) => setCurrentTab(id as TabId)}
        variant="owner"
      />
    </div>
  );
};

export default OwnerDashboard;
