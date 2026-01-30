import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Dog, Calendar, Search, MessageCircle, Gift, User, 
  Sparkles, ArrowRight, Settings, Plus
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { FloatingContact } from "@/components/ui/floating-contact";
import DashboardSearch from "@/components/dashboard/shared/DashboardSearch";
import MobileTabBar from "@/components/dashboard/MobileTabBar";

// Lazy load tab contents for performance
const OverviewTab = lazy(() => import("@/components/dashboard/owner/OverviewTab"));
const DogsTab = lazy(() => import("@/components/dashboard/owner/DogsTab"));
const BookingsTab = lazy(() => import("@/components/dashboard/owner/BookingsTab"));
const WalkersTab = lazy(() => import("@/components/dashboard/owner/WalkersTab"));
const MessagesTab = lazy(() => import("@/components/dashboard/owner/MessagesTab"));
const ReferralTab = lazy(() => import("@/components/dashboard/owner/ReferralTab"));
const ProfileTab = lazy(() => import("@/components/dashboard/owner/ProfileTab"));

import heroImage from "@/assets/pages/dashboard-owner-hero.jpg";

const TABS = [
  { id: "apercu", label: "Accueil", icon: Search, description: "Accueil" },
  { id: "promeneurs", label: "Promeneurs", icon: Dog, description: "Trouver un promeneur" },
  { id: "messages", label: "Messages", icon: MessageCircle, description: "Conversations" },
  { id: "profil", label: "Profil", icon: User, description: "Mon compte" },
] as const;

// Internal mapping for mobile tabs to actual content tabs if needed
// For now, we'll keep it simple and map directly where possible

type TabId = typeof TABS[number]["id"] | "chiens" | "reservations" | "parrainage";

const TabLoader = () => (
  <div className="flex items-center justify-center h-64">
    <motion.div 
      className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
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

  const currentTab = (searchParams.get("tab") as TabId) || "apercu";

  const setCurrentTab = (tab: TabId) => {
    setSearchParams({ tab });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    fetchData(session.user.id);
  };

  const fetchData = async (userId: string) => {
    try {
      const [profileRes, dogsRes, bookingsRes, favoritesRes, notificationsRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('dogs').select('id').eq('owner_id', userId),
        supabase.from('bookings').select('id, status, scheduled_date, price').eq('owner_id', userId),
        supabase.from('favorites').select('id').eq('user_id', userId),
        supabase.from('notifications').select('id, read').eq('user_id', userId)
      ]);

      setProfile(profileRes.data);
      
      const bookings = bookingsRes.data || [];
      setStats({
        totalBookings: bookings.length,
        upcomingBookings: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length,
        completedBookings: bookings.filter(b => b.status === 'completed').length,
        totalDogs: dogsRes.data?.length || 0,
        totalSpent: bookings.filter(b => b.status === 'completed').reduce((acc, b) => acc + (b.price || 0), 0),
        totalFavorites: favoritesRes.data?.length || 0,
        unreadNotifications: notificationsRes.data?.filter(n => !n.read).length || 0,
        unreadMessages: 0 // Will be fetched from messages table
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
    if (profile.first_name || profile.last_name) score += 25;
    if (profile.avatar_url) score += 25;
    if (profile.phone) score += 25;
    if (profile.city || profile.address) score += 25;
    return score;
  };

  const displayName = profile?.first_name || profile?.email?.split('@')[0] || 'Utilisateur';

  if (loading) return <TabLoader />;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEOHead 
        title="Tableau de bord Propriétaire | DogWalking"
        description="Gérez vos chiens, vos réservations et trouvez les meilleurs promeneurs."
      />
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Simple Header - Mobile First */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-md">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bonjour, {displayName}</h1>
              <p className="text-sm text-muted-foreground">Votre chien est entre de bonnes mains</p>
            </div>
          </div>
        </motion.div>

        {/* Profile Completion Alert - Compact */}
        <AnimatePresence>
          {profileCompletion() < 100 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3 flex-1">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">Complétez votre profil</span>
                      <span className="text-sm font-bold text-primary">{profileCompletion()}%</span>
                    </div>
                    <Progress value={profileCompletion()} className="h-1.5 mt-1" />
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setCurrentTab('profil')} className="text-primary">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Tabs Navigation */}
        <div className="hidden md:block">
          <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as TabId)} className="space-y-8">
            <div className="relative">
              <TabsList className="w-full h-auto flex-wrap gap-2 bg-muted/50 p-2 rounded-2xl backdrop-blur-sm border border-border/50">
                <TabsTrigger value="apercu" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <Search className="h-4 w-4" /> Accueil
                </TabsTrigger>
                <TabsTrigger value="chiens" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <Dog className="h-4 w-4" /> Mes Chiens
                </TabsTrigger>
                <TabsTrigger value="reservations" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <MessageCircle className="h-4 w-4" /> Missions
                </TabsTrigger>
                <TabsTrigger value="promeneurs" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <Search className="h-4 w-4" /> Promeneurs
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <MessageCircle className="h-4 w-4" /> Messages
                </TabsTrigger>
                <TabsTrigger value="parrainage" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <Gift className="h-4 w-4" /> Parrainage
                </TabsTrigger>
                <TabsTrigger value="profil" className="flex-1 min-w-[120px] gap-2 py-3 px-4 rounded-xl">
                  <User className="h-4 w-4" /> Profil
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Tab Content (Shared for Mobile/Desktop) */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Suspense fallback={<TabLoader />}>
                {currentTab === "apercu" && <OverviewTab stats={stats} profile={profile} onNavigate={setCurrentTab} />}
                {currentTab === "chiens" && <DogsTab />}
                {currentTab === "reservations" && <BookingsTab />}
                {currentTab === "promeneurs" && <WalkersTab />}
                {currentTab === "messages" && <MessagesTab />}
                {currentTab === "parrainage" && <ReferralTab />}
                {currentTab === "profil" && <ProfileTab profile={profile} />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Tab Bar */}
      <MobileTabBar 
        tabs={[...TABS]} 
        activeTab={currentTab === "chiens" || currentTab === "reservations" || currentTab === "parrainage" ? "apercu" : currentTab} 
        onTabChange={(id) => setCurrentTab(id as TabId)} 
      />

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default OwnerDashboard;
