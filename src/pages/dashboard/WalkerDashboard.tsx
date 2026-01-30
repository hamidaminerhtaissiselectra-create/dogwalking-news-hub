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
  { id: "apercu", label: "Accueil", icon: LayoutDashboard, description: "Vue d'ensemble" },
  { id: "missions", label: "Missions", icon: Calendar, description: "Mes réservations" },
  { id: "messages", label: "Messages", icon: MessageCircle, description: "Conversations" },
  { id: "gains", label: "Revenus", icon: Euro, description: "Mes gains" },
  { id: "profil", label: "Profil", icon: User, description: "Mon compte" },
] as const;

type TabId = typeof TABS[number]["id"] | "disponibilites" | "performance";

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
      
      <main className="container mx-auto px-4 py-6">
        {/* Simple Header - Mobile First */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        </motion.div>

        {/* Verification Alert - Compact */}
        <AnimatePresence>
          {!walkerProfile?.verified && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3 flex-1">
                  <Sparkles className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">Complétez votre vérification</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setCurrentTab('profil')} className="text-accent">
                  <ArrowRight className="h-4 w-4" />
                </Button>
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

        {/* Tab Content */}
        <div className="mt-4 md:mt-8">
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
      
      {/* Mobile Tab Bar - Show first 4 tabs on mobile */}
      <MobileTabBar 
        tabs={TABS.slice(0, 4).map(t => ({ ...t }))} 
        activeTab={currentTab === "disponibilites" || currentTab === "performance" ? "apercu" : currentTab} 
        onTabChange={(id) => setCurrentTab(id as TabId)} 
      />

      <Footer />
      <FloatingContact />
    </div>
  );
};

export default WalkerDashboardPage;
