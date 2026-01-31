import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Home, Calendar, Euro, MessageCircle, User, Clock, 
  MapPin, Star, TrendingUp, FileText, CheckCircle
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
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
const WalkerBookingsTab = lazy(() => import("@/components/dashboard/walker/BookingsTab"));
const WalkerEarningsTab = lazy(() => import("@/components/dashboard/walker/EarningsTab"));
const WalkerAvailabilityTab = lazy(() => import("@/components/dashboard/walker/AvailabilityTab"));
const WalkerMessagesTab = lazy(() => import("@/components/dashboard/walker/MessagesTab"));
const WalkerPerformanceTab = lazy(() => import("@/components/dashboard/walker/PerformanceTab"));
const WalkerProfileTab = lazy(() => import("@/components/dashboard/walker/ProfileTab"));
const WalkerInvoicesTab = lazy(() => import("@/components/dashboard/walker/InvoicesTab"));

// Navigation items for bottom nav
const NAV_ITEMS = [
  { id: "home", label: "Accueil", icon: Home },
  { id: "missions", label: "Missions", icon: Calendar },
  { id: "earnings", label: "Revenus", icon: Euro },
  { id: "messages", label: "Messages", icon: MessageCircle },
  { id: "profile", label: "Profil", icon: User },
];

type TabId = "home" | "missions" | "earnings" | "messages" | "profile" | "availability" | "performance" | "invoices";

const TabLoader = () => (
  <div className="flex items-center justify-center h-48">
    <div className="flex flex-col items-center">
      <motion.div 
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-3 text-sm text-muted-foreground">Chargement du dashboard…</p>
    </div>
  </div>
);

const WalkerDashboardPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [walkerProfile, setWalkerProfile] = useState<any>(null);
  const [todayMissions, setTodayMissions] = useState<any[]>([]);
  const [upcomingMissions, setUpcomingMissions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    monthlyEarnings: 0,
    pendingEarnings: 0,
    totalWalks: 0,
    completedThisMonth: 0,
    averageRating: 0,
    totalReviews: 0,
    pendingRequests: 0,
    upcomingMissions: 0,
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
    await fetchWalkerData(session.user.id);
  };

  const fetchWalkerData = async (userId: string) => {
    try {
      const { data: walkerData } = await supabase
        .from('walker_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      setWalkerProfile(walkerData);

      const today = format(new Date(), 'yyyy-MM-dd');
      
      const [bookingsRes, earningsRes] = await Promise.all([
        supabase
          .from('bookings')
          .select('*, dogs(name, photo_url, breed)')
          .eq('walker_id', userId)
          .order('scheduled_date', { ascending: true }),
        supabase
          .from('walker_earnings')
          .select('amount, net_amount, status, created_at')
          .eq('walker_id', userId)
      ]);

      const bookings = bookingsRes.data || [];
      const earnings = earningsRes.data || [];

      // Get owner profiles for bookings
      const ownerIds = [...new Set(bookings.map(b => b.owner_id))];
      const { data: owners } = await supabase
        .from('profiles')
        .select('id, first_name, avatar_url, phone')
        .in('id', ownerIds);
      
      const ownerMap = new Map(owners?.map(o => [o.id, o]) || []);

      // Today's missions
      const todayBookings = bookings
        .filter(b => b.scheduled_date === today && ['confirmed', 'in_progress'].includes(b.status))
        .map(b => ({
          ...b,
          ownerName: ownerMap.get(b.owner_id)?.first_name || 'Client',
          ownerPhone: ownerMap.get(b.owner_id)?.phone,
          ownerAvatar: ownerMap.get(b.owner_id)?.avatar_url
        }));
      setTodayMissions(todayBookings);

      // Upcoming missions (next 7 days, not including today)
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const upcoming = bookings
        .filter(b => {
          const date = new Date(b.scheduled_date);
          return date > new Date() && date <= nextWeek && ['confirmed', 'pending'].includes(b.status);
        })
        .slice(0, 5)
        .map(b => ({
          ...b,
          ownerName: ownerMap.get(b.owner_id)?.first_name || 'Client',
          ownerAvatar: ownerMap.get(b.owner_id)?.avatar_url
        }));
      setUpcomingMissions(upcoming);

      // Calculate stats
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
        averageRating: walkerData?.rating || 5,
        totalReviews: walkerData?.total_reviews || 0,
        pendingRequests: bookings.filter(b => b.status === 'pending').length,
        upcomingMissions: bookings.filter(b => 
          b.status === 'confirmed' && new Date(b.scheduled_date) >= now
        ).length,
        unreadMessages: 0
      });
    } catch (error) {
      console.error("Error fetching walker data:", error);
    } finally {
      setLoading(false);
    }
  };

  const profileCompletion = () => {
    if (!walkerProfile) return 0;
    let score = 0;
    if (profile?.first_name) score += 15;
    if (profile?.avatar_url) score += 15;
    if (profile?.phone) score += 10;
    if (walkerProfile.services?.length > 0) score += 15;
    if (walkerProfile.hourly_rate) score += 15;
    if (walkerProfile.experience_years) score += 10;
    if (walkerProfile.verified) score += 20;
    return score;
  };

  const displayName = profile?.first_name || profile?.email?.split('@')[0] || 'Promeneur';

  if (loading) return <TabLoader />;

  // Home Tab Content
  const HomeContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Verification Banner */}
      {!walkerProfile?.verified && (
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Complétez votre vérification</p>
                <Progress value={profileCompletion()} className="h-2 mt-1" />
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-500/30">
                {profileCompletion()}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          icon={Euro} 
          value={`${stats.monthlyEarnings.toFixed(0)}€`} 
          label="Gains ce mois"
          variant="primary"
          trend={stats.completedThisMonth > 0 ? { value: 12, isPositive: true } : undefined}
          onClick={() => setCurrentTab('earnings')}
        />
        <StatCard 
          icon={Calendar} 
          value={stats.upcomingMissions} 
          label="Missions à venir"
          variant="accent"
          onClick={() => setCurrentTab('missions')}
        />
        <StatCard 
          icon={Star} 
          value={stats.averageRating.toFixed(1)} 
          label={`${stats.totalReviews} avis`}
          variant="heart"
          onClick={() => setCurrentTab('performance')}
        />
        <StatCard 
          icon={TrendingUp} 
          value={stats.totalWalks} 
          label="Balades totales"
          variant="default"
          onClick={() => setCurrentTab('performance')}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">ACTIONS RAPIDES</h3>
        <div className="grid grid-cols-4 gap-2">
          <QuickActionCard 
            icon={Clock} 
            label="Dispo" 
            onClick={() => setCurrentTab('availability')} 
            variant="primary" 
            size="sm" 
          />
          <QuickActionCard 
            icon={Calendar} 
            label="Planning" 
            onClick={() => setCurrentTab('missions')} 
            variant="accent" 
            size="sm"
            badge={stats.pendingRequests > 0 ? stats.pendingRequests : undefined}
          />
          <QuickActionCard 
            icon={FileText} 
            label="Factures" 
            onClick={() => setCurrentTab('invoices')} 
            variant="muted" 
            size="sm" 
          />
          <QuickActionCard 
            icon={TrendingUp} 
            label="Stats" 
            onClick={() => setCurrentTab('performance')} 
            variant="muted" 
            size="sm" 
          />
        </div>
      </div>

      {/* Today's Missions */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Missions du jour
            </CardTitle>
            <Badge variant="outline" className="text-primary border-primary/30">
              {format(new Date(), 'EEEE d MMMM', { locale: fr })}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {todayMissions.length > 0 ? (
            <div className="space-y-3">
              {todayMissions.map((mission) => (
                <div 
                  key={mission.id}
                  className="p-4 rounded-xl border bg-gradient-to-r from-primary/5 to-transparent hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate(`/bookings/${mission.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={mission.dogs?.photo_url} />
                      <AvatarFallback className="bg-primary/10">🐕</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{mission.dogs?.name || 'Chien'}</p>
                        <Badge variant={mission.status === 'in_progress' ? 'default' : 'secondary'}>
                          {mission.status === 'in_progress' ? 'En cours' : mission.scheduled_time?.slice(0, 5)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{mission.dogs?.breed}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{mission.address || 'Adresse non spécifiée'}</span>
                      </div>
                    </div>
                  </div>
                  {mission.status === 'confirmed' && (
                    <Button size="sm" className="w-full mt-3">
                      Démarrer la mission
                    </Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-10 w-10 mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Aucune mission prévue aujourd'hui</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Missions */}
      {upcomingMissions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Prochaines missions</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentTab('missions')}>
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {upcomingMissions.map((mission) => (
              <div 
                key={mission.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                onClick={() => navigate(`/bookings/${mission.id}`)}
              >
                <div className="w-12 text-center">
                  <p className="text-lg font-bold text-primary">
                    {new Date(mission.scheduled_date).getDate()}
                  </p>
                  <p className="text-[10px] uppercase text-muted-foreground">
                    {format(new Date(mission.scheduled_date), 'MMM', { locale: fr })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{mission.dogs?.name} • {mission.ownerName}</p>
                  <p className="text-xs text-muted-foreground">{mission.scheduled_time?.slice(0, 5)}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {mission.price}€
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Pending Requests Alert */}
      {stats.pendingRequests > 0 && (
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{stats.pendingRequests} demande{stats.pendingRequests > 1 ? 's' : ''} en attente</p>
                <p className="text-sm text-muted-foreground">Répondez rapidement pour augmenter votre taux d'acceptation</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => setCurrentTab('missions')}>
                Voir
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEOHead 
        title="Tableau de bord Promeneur | DogWalking"
        description="Gérez vos missions, vos revenus et votre planning de promeneur."
      />
      
      <main className="container mx-auto px-4 pt-4 max-w-lg">
        <DashboardHeader
          name={displayName}
          subtitle={walkerProfile?.verified ? "Promeneur vérifié ✓" : "En cours de vérification"}
          avatarUrl={profile?.avatar_url}
          variant="walker"
          unreadNotifications={stats.pendingRequests}
          onSettingsClick={() => setCurrentTab('profile')}
        />

        {/* Tab Content */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <Suspense fallback={<TabLoader />}>
              {currentTab === "home" && <HomeContent />}
              {currentTab === "missions" && <WalkerBookingsTab />}
              {currentTab === "earnings" && <WalkerEarningsTab />}
              {currentTab === "messages" && <WalkerMessagesTab />}
              {currentTab === "profile" && <WalkerProfileTab profile={profile} walkerProfile={walkerProfile} />}
              {currentTab === "availability" && <WalkerAvailabilityTab walkerProfile={walkerProfile} />}
              {currentTab === "performance" && <WalkerPerformanceTab stats={stats} />}
              {currentTab === "invoices" && <WalkerInvoicesTab />}
            </Suspense>
          </AnimatePresence>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        items={NAV_ITEMS.map(item => ({
          ...item,
          badge: item.id === 'missions' ? stats.pendingRequests : 
                 item.id === 'messages' ? stats.unreadMessages : undefined
        }))}
        activeItem={['availability', 'performance', 'invoices'].includes(currentTab) ? 'home' : currentTab}
        onItemChange={(id) => setCurrentTab(id as TabId)}
        variant="walker"
      />
    </div>
  );
};

export default WalkerDashboardPage;
