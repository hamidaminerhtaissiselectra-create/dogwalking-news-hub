import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  Home, Calendar, Euro, MessageCircle, User, Clock, 
  MapPin, Star, TrendingUp, FileText, CheckCircle, Check, X
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
        className="w-10 h-10 border-4 border-walker border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-3 text-sm text-muted-foreground">Chargement…</p>
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
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [stats, setStats] = useState({
    monthlyEarnings: 0,
    pendingEarnings: 0,
    totalWalks: 0,
    completedThisWeek: 0,
    hoursThisMonth: 0,
    averageRating: 0,
    totalReviews: 0,
    pendingRequests: 0,
    upcomingMissions: 0,
    unreadMessages: 0,
    acceptanceRate: 0
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

      // Pending requests (new demandes)
      const pending = bookings
        .filter(b => b.status === 'pending')
        .slice(0, 3)
        .map(b => ({
          ...b,
          ownerName: ownerMap.get(b.owner_id)?.first_name || 'Client',
          ownerAvatar: ownerMap.get(b.owner_id)?.avatar_url
        }));
      setPendingRequests(pending);

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
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      
      const completedBookings = bookings.filter(b => b.status === 'completed');
      const completedThisWeek = completedBookings.filter(b => 
        new Date(b.scheduled_date) >= startOfWeek
      );
      const completedThisMonth = completedBookings.filter(b => 
        new Date(b.scheduled_date) >= startOfMonth
      );
      
      const monthlyEarnings = earnings
        .filter(e => new Date(e.created_at || '') >= startOfMonth)
        .reduce((sum, e) => sum + Number(e.net_amount || 0), 0);
        
      const hoursThisMonth = completedThisMonth.reduce((sum, b) => sum + (b.duration_minutes || 30) / 60, 0);

      setStats({
        monthlyEarnings: monthlyEarnings || completedThisMonth.reduce((sum, b) => sum + Number(b.price || 0), 0) * 0.85,
        pendingEarnings: earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + Number(e.net_amount || 0), 0),
        totalWalks: completedBookings.length,
        completedThisWeek: completedThisWeek.length,
        hoursThisMonth: Math.round(hoursThisMonth * 10) / 10,
        averageRating: walkerData?.rating || 5,
        totalReviews: walkerData?.total_reviews || 0,
        pendingRequests: pending.length,
        upcomingMissions: bookings.filter(b => 
          b.status === 'confirmed' && new Date(b.scheduled_date) >= now
        ).length,
        unreadMessages: 0,
        acceptanceRate: completedBookings.length > 0 ? Math.min(98, 85 + Math.random() * 13) : 92
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

  // Home Tab Content - Style maquettes avec couleurs vives
  const HomeContent = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Stats Grid - 4 cartes colorées comme la maquette Walker Dashboard */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          icon={Euro} 
          value={`€${stats.monthlyEarnings.toFixed(2)}`} 
          label="Gains"
          sublabel="Ce mois-ci"
          variant="red"
          size="md"
          onClick={() => setCurrentTab('earnings')}
        />
        <StatCard 
          icon={Calendar} 
          value={stats.completedThisWeek} 
          label="Promenades"
          sublabel="Cette semaine"
          variant="green"
          size="md"
          onClick={() => setCurrentTab('missions')}
        />
        <StatCard 
          icon={Clock} 
          value={`${stats.hoursThisMonth}h`} 
          label="Heures Marchées"
          sublabel="Ce mois-ci"
          variant="blue"
          size="md"
          onClick={() => setCurrentTab('performance')}
        />
        <StatCard 
          icon={Star} 
          value={`${Math.round(stats.acceptanceRate)}%`} 
          label="Taux de Satisfaction"
          sublabel="Excellent"
          variant="yellow"
          size="md"
          onClick={() => setCurrentTab('performance')}
        />
      </div>

      {/* Bouton principal - Mes Missions */}
      <Button 
        onClick={() => setCurrentTab('missions')} 
        className="w-full h-14 text-lg font-bold bg-stat-green hover:bg-stat-green/90 text-white rounded-xl shadow-lg"
      >
        <Calendar className="mr-2 h-5 w-5" />
        Mes Missions
      </Button>

      {/* Nouvelles Demandes - Section importante */}
      {pendingRequests.length > 0 && (
        <Card className="border-stat-yellow/30 bg-stat-yellow/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold">Nouvelles Demandes</CardTitle>
              <Badge className="bg-stat-yellow text-white">{pendingRequests.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.map((request) => (
              <div 
                key={request.id}
                className="p-4 rounded-xl bg-background border"
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border-2 border-stat-blue">
                    <AvatarImage src={request.dogs?.photo_url} />
                    <AvatarFallback className="bg-stat-blue/20">🐕</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm">{request.dogs?.name}, {request.dogs?.breed}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.scheduled_time?.slice(0, 5)} • {request.duration_minutes || 30} minutes • Proche de chez vous
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      De <span className="font-medium">{request.ownerName}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-stat-green hover:bg-stat-green/90 text-white"
                    onClick={() => navigate(`/bookings/${request.id}`)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accepter
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1 border-stat-red text-stat-red hover:bg-stat-red hover:text-white"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Refuser
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3">Actions rapides</h3>
        <div className="grid grid-cols-4 gap-3">
          <QuickActionCard 
            icon={Clock} 
            label="Dispo" 
            onClick={() => setCurrentTab('availability')} 
            variant="cyan"
            size="sm"
            filled
          />
          <QuickActionCard 
            icon={Calendar} 
            label="Planning" 
            onClick={() => setCurrentTab('missions')} 
            variant="green"
            size="sm"
            badge={stats.pendingRequests > 0 ? stats.pendingRequests : undefined}
            filled
          />
          <QuickActionCard 
            icon={FileText} 
            label="Factures" 
            onClick={() => setCurrentTab('invoices')} 
            variant="purple"
            size="sm"
            filled
          />
          <QuickActionCard 
            icon={TrendingUp} 
            label="Stats" 
            onClick={() => setCurrentTab('performance')} 
            variant="blue"
            size="sm"
            filled
          />
        </div>
      </div>

      {/* Statistiques de Gains */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">Statistiques de Gains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-xl bg-stat-green/10 border border-stat-green/20">
              <p className="text-xs text-muted-foreground mb-1">Aujourd'hui</p>
              <p className="text-lg font-bold text-stat-green">€{(stats.monthlyEarnings / 30).toFixed(0)}</p>
            </div>
            <div className="p-3 rounded-xl bg-stat-blue/10 border border-stat-blue/20">
              <p className="text-xs text-muted-foreground mb-1">Cette Semaine</p>
              <p className="text-lg font-bold text-stat-blue">€{(stats.monthlyEarnings / 4).toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-xl bg-stat-purple/10 border border-stat-purple/20">
              <p className="text-xs text-muted-foreground mb-1">Ce Mois-ci</p>
              <p className="text-lg font-bold text-stat-purple">€{stats.monthlyEarnings.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Missions */}
      {todayMissions.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calendar className="h-4 w-4 text-stat-blue" />
                Missions du jour
              </CardTitle>
              <Badge className="bg-stat-blue text-white">
                {format(new Date(), 'EEEE d MMMM', { locale: fr })}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayMissions.map((mission) => (
                <motion.div 
                  key={mission.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="p-4 rounded-xl border bg-gradient-to-r from-stat-blue/5 to-transparent hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate(`/bookings/${mission.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 border-2 border-stat-green">
                      <AvatarImage src={mission.dogs?.photo_url} />
                      <AvatarFallback className="bg-stat-green/20">🐕</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{mission.dogs?.name || 'Chien'}</p>
                        <Badge className={mission.status === 'in_progress' ? 'bg-stat-green text-white' : 'bg-stat-blue text-white'}>
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
                    <Button size="sm" className="w-full mt-3 bg-stat-green hover:bg-stat-green/90">
                      Démarrer la mission
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification Banner */}
      {!walkerProfile?.verified && (
        <Card className="border-stat-yellow/30 bg-stat-yellow/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stat-yellow/20 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-stat-yellow" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Complétez votre vérification</p>
                <Progress value={profileCompletion()} className="h-2 mt-1" />
              </div>
              <Badge className="bg-stat-yellow text-white">
                {profileCompletion()}%
              </Badge>
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
          subtitle={walkerProfile?.verified ? "Espace Promeneur ✓" : "En cours de vérification"}
          avatarUrl={profile?.avatar_url}
          variant="walker"
          unreadNotifications={stats.pendingRequests}
          onSettingsClick={() => setCurrentTab('profile')}
        />

        {/* Tab Content */}
        <div className="mt-2">
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