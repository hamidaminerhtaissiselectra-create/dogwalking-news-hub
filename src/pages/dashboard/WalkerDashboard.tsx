import React, { useState, useEffect, lazy, Suspense } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  LayoutDashboard, Calendar, Euro, Clock, MessageCircle, 
  BarChart3, User, Sparkles, ArrowRight, Wallet, Search
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { SEOHead } from "@/components/seo/SEOHead";
import { FloatingContact } from "@/components/ui/floating-contact";
import MobileTabBar from "@/components/dashboard/MobileTabBar";

// Lazy load tab contents
const WalkerOverviewTab = lazy(() => import("@/components/dashboard/walker/OverviewTab"));
const WalkerBookingsTab = lazy(() => import("@/components/dashboard/walker/BookingsTab"));
const WalkerEarningsTab = lazy(() => import("@/components/dashboard/walker/EarningsTab"));
const WalkerAvailabilityTab = lazy(() => import("@/components/dashboard/walker/AvailabilityTab"));
const WalkerMessagesTab = lazy(() => import("@/components/dashboard/walker/MessagesTab"));
const WalkerPerformanceTab = lazy(() => import("@/components/dashboard/walker/PerformanceTab"));
const WalkerProfileTab = lazy(() => import("@/components/dashboard/walker/ProfileTab"));

import heroImage from "@/assets/pages/dashboard-walker-hero.jpg";

const TABS = [
  { id: "apercu", label: "Accueil", icon: Search, description: "Vue d'ensemble" },
  { id: "disponibilites", label: "Planning", icon: Calendar, description: "Planning" },
  { id: "gains", label: "Gains", icon: Wallet, description: "Revenus et retraits" },
  { id: "profil", label: "Profil", icon: User, description: "Paramètres" },
] as const;

type TabId = typeof TABS[number]["id"] | "missions" | "messages" | "performance";

const TabLoader = () => (
  <div className="flex items-center justify-center h-64">
    <motion.div 
      className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const WalkerDashboardPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [walkerProfile, setWalkerProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    monthlyEarnings: 0,
    pendingEarnings: 0,
    totalWalks: 0,
    completedThisMonth: 0,
    averageRating: 0,
    totalReviews: 0,
    pendingRequests: 0,
    upcomingMissions: 0
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

    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (profileData?.user_type !== 'walker' && profileData?.user_type !== 'both') {
      toast({
        title: "Accès refusé",
        description: "Cette page est réservée aux promeneurs",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }

    setProfile(profileData);
    fetchWalkerData(session.user.id);
  };

  const fetchWalkerData = async (userId: string) => {
    try {
      // Fetch walker profile using user_id, not id
      const { data: walkerData } = await supabase
        .from('walker_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      setWalkerProfile(walkerData);

      // Fetch real stats from database
      const [bookingsRes, earningsRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('id, status, price, scheduled_date')
          .eq('walker_id', userId),
        supabase
          .from('walker_earnings')
          .select('amount, net_amount, status, created_at')
          .eq('walker_id', userId)
      ]);

      const bookings = bookingsRes.data || [];
      const earnings = earningsRes.data || [];
      
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      
      const completedBookings = bookings.filter(b => b.status === 'completed');
      const completedThisMonth = completedBookings.filter(b => 
        new Date(b.scheduled_date) >= startOfMonth
      );
      
      const monthlyEarnings = earnings
        .filter(e => new Date(e.created_at || '') >= startOfMonth)
        .reduce((sum, e) => sum + Number(e.net_amount || 0), 0);
        
      const pendingEarnings = earnings
        .filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + Number(e.net_amount || 0), 0);

      setStats({
        monthlyEarnings: monthlyEarnings || completedThisMonth.reduce((sum, b) => sum + Number(b.price || 0), 0) * 0.85,
        pendingEarnings,
        totalWalks: completedBookings.length,
        completedThisMonth: completedThisMonth.length,
        averageRating: walkerData?.rating || 0,
        totalReviews: walkerData?.total_reviews || 0,
        pendingRequests: bookings.filter(b => b.status === 'pending').length,
        upcomingMissions: bookings.filter(b => 
          b.status === 'confirmed' && new Date(b.scheduled_date) >= now
        ).length
      });
    } catch (error) {
      console.error("Error fetching walker data:", error);
    } finally {
      setLoading(false);
    }
  };

  const verificationProgress = () => {
    if (!walkerProfile) return 0;
    let score = 0;
    if (walkerProfile.bio) score += 20;
    if (walkerProfile.experience_years) score += 20;
    if (walkerProfile.identity_verified) score += 30;
    if (walkerProfile.address_verified) score += 30;
    return score;
  };

  if (loading) return <TabLoader />;

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEOHead 
        title="Tableau de bord Promeneur | DogWalking"
        description="Gérez vos missions, vos revenus et votre planning de promeneur."
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Identification claire de l'espace */}
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm">
            <User className="h-4 w-4" />
            Espace Promeneur
          </span>
        </div>

        {/* Hero Section - Fond clair */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-10 rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-accent/10 via-accent/5 to-background border border-border min-h-[200px] flex items-center"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src={heroImage} 
              alt="Walker Dashboard Hero" 
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-background shadow-xl">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-2xl bg-accent/10 text-accent">{profile?.first_name?.charAt(0) || 'P'}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-primary h-6 w-6 rounded-full border-4 border-background" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Bonjour, {profile?.first_name || 'Promeneur'} 👋</h1>
                <p className="text-muted-foreground mt-1 text-lg">Espace Promeneur • Prêt pour de nouvelles aventures ?</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={() => setCurrentTab('missions')} className="gap-2 shadow-lg bg-primary hover:bg-primary/90">
                <Calendar className="h-4 w-4" />
                {stats.pendingRequests > 0 ? `${stats.pendingRequests} demande(s)` : 'Mes missions'}
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Verification Alert */}
        <AnimatePresence>
          {!walkerProfile?.verified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-accent/20 bg-accent/5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Sparkles className="h-7 w-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">Compte en cours de vérification</p>
                    <p className="text-sm text-muted-foreground">Soumettez vos documents pour recevoir plus de demandes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Progress value={verificationProgress()} className="w-28 h-3" />
                    <span className="text-sm font-bold text-accent">{verificationProgress()}%</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentTab('profil')} className="gap-2 border-accent/20 hover:bg-accent/10">
                    Compléter <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Tabs Navigation */}
        <div className="hidden md:block">
          <Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as TabId)} className="space-y-8">
            <div className="relative overflow-x-auto">
              <TabsList className="w-full h-auto flex-nowrap md:flex-wrap gap-2 bg-muted/50 p-2 rounded-2xl backdrop-blur-sm border border-border/50">
                <TabsTrigger value="apercu" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
                  <LayoutDashboard className="h-4 w-4" /> Tableau de bord
                </TabsTrigger>
                <TabsTrigger value="missions" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
                  <Calendar className="h-4 w-4" /> Réservations
                </TabsTrigger>
                <TabsTrigger value="gains" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
                  <Euro className="h-4 w-4" /> Gains
                </TabsTrigger>
                <TabsTrigger value="disponibilites" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
                  <Clock className="h-4 w-4" /> Disponibilités
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
                  <MessageCircle className="h-4 w-4" /> Messages
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
                  <BarChart3 className="h-4 w-4" /> Performance
                </TabsTrigger>
                <TabsTrigger value="profil" className="flex-shrink-0 gap-2 py-3 px-4 rounded-xl">
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
                {currentTab === "apercu" && <WalkerOverviewTab stats={stats} walkerProfile={walkerProfile} onNavigate={setCurrentTab} />}
                {currentTab === "missions" && <WalkerBookingsTab />}
                {currentTab === "gains" && <WalkerEarningsTab />}
                {currentTab === "disponibilites" && <WalkerAvailabilityTab walkerProfile={walkerProfile} />}
                {currentTab === "messages" && <WalkerMessagesTab />}
                {currentTab === "performance" && <WalkerPerformanceTab stats={stats} />}
                {currentTab === "profil" && <WalkerProfileTab profile={profile} walkerProfile={walkerProfile} />}
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Tab Bar */}
      <MobileTabBar 
        tabs={[...TABS]} 
        activeTab={currentTab === "missions" || currentTab === "messages" || currentTab === "performance" ? "apercu" : currentTab} 
        onTabChange={(id) => setCurrentTab(id as TabId)} 
      />

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default WalkerDashboardPage;
