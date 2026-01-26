import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Euro, Calendar, Star, TrendingUp, Clock, Dog as DogIcon, Bell, 
  CheckCircle, XCircle, MapPin, Phone, Zap, Target, Award
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import AnimatedStatsCard from "@/components/dashboard/shared/AnimatedStatsCard";
import ActivityTimeline, { ActivityItem } from "@/components/dashboard/shared/ActivityTimeline";

interface OverviewTabProps {
  stats: { monthlyEarnings: number; pendingEarnings: number; totalWalks: number; completedThisMonth: number; averageRating: number; totalReviews: number; pendingRequests: number; upcomingMissions: number; };
  walkerProfile: any;
  onNavigate: (tab: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const WalkerOverviewTab = ({ stats, walkerProfile, onNavigate }: OverviewTabProps) => {
  const [pendingBookings, setPendingBookings] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);

  useEffect(() => { 
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    
    const { data } = await supabase.from('bookings').select('*, dogs(name, breed, photo_url)').eq('walker_id', session.user.id).order('scheduled_date', { ascending: true });
    if (data) {
      const ownerIds = [...new Set(data.map(b => b.owner_id))];
      const { data: owners } = await supabase.from('profiles').select('id, first_name, avatar_url, city, phone').in('id', ownerIds);
      const ownerMap = new Map(owners?.map(o => [o.id, o]) || []);
      const enriched = data.map(b => ({ ...b, owner: ownerMap.get(b.owner_id) }));
      
      const now = new Date();
      setPendingBookings(enriched.filter(b => b.status === 'pending').slice(0, 5));
      setUpcomingBookings(enriched.filter(b => new Date(b.scheduled_date) >= now && b.status === 'confirmed').slice(0, 5));
      
      // Build activity timeline from bookings
      const activities: ActivityItem[] = enriched.slice(0, 10).map(b => ({
        id: b.id,
        type: 'booking' as const,
        action: b.status === 'completed' ? 'completed' : b.status === 'pending' ? 'requested' : 'confirmed',
        title: `${getServiceLabel(b.service_type)} - ${b.dogs?.name || 'Chien'}`,
        description: `${b.owner?.first_name || 'Propriétaire'} - ${b.city || 'Lieu non spécifié'}`,
        timestamp: new Date(b.created_at || b.scheduled_date),
        status: b.status === 'completed' ? 'success' : b.status === 'pending' ? 'pending' : 'info',
        metadata: { prix: `${b.price}€`, durée: `${b.duration_minutes || 60}min` }
      }));
      setRecentActivity(activities);
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'confirmed' | 'cancelled') => {
    const { error } = await supabase.from('bookings').update({ status: action }).eq('id', bookingId);
    if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
    toast({ title: action === 'confirmed' ? "✅ Réservation acceptée" : "❌ Réservation refusée" });
    fetchBookings();
  };

  const getServiceLabel = (type: string) => ({ promenade: "Promenade", visite: "Visite", garde: "Garde", veterinaire: "Vétérinaire" }[type] || type);

  // Calculate previous month values for trends (mock for now)
  const previousMonthEarnings = stats.monthlyEarnings * 0.85;
  const previousMonthWalks = Math.floor(stats.completedThisMonth * 0.9);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Quick Tip Banner */}
      {stats.pendingRequests > 0 && (
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/20 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Zap className="h-6 w-6 text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold">Actions requises</p>
            <p className="text-sm text-muted-foreground">
              Vous avez {stats.pendingRequests} demande(s) en attente de réponse
            </p>
          </div>
          <Button onClick={() => onNavigate('missions')} className="gap-2">
            <Bell className="h-4 w-4" />
            Voir les demandes
          </Button>
        </motion.div>
      )}

      {/* Animated Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatedStatsCard
          title="Gains ce mois"
          value={stats.monthlyEarnings}
          previousValue={previousMonthEarnings}
          icon={Euro}
          iconColor="text-green-500"
          format="currency"
          description={`+${stats.pendingEarnings.toFixed(0)}€ en attente`}
          delay={0}
        />
        <AnimatedStatsCard
          title="Promenades totales"
          value={stats.totalWalks}
          previousValue={previousMonthWalks}
          icon={DogIcon}
          description={`${stats.completedThisMonth} ce mois`}
          delay={1}
        />
        <AnimatedStatsCard
          title="Note moyenne"
          value={stats.averageRating || 0}
          icon={Star}
          iconColor="text-amber-500"
          suffix="/5"
          description={`${stats.totalReviews} avis clients`}
          delay={2}
        />
        <AnimatedStatsCard
          title="Taux d'acceptation"
          value={95}
          icon={Target}
          iconColor="text-blue-500"
          format="percent"
          description="Réponse < 1h"
          delay={3}
        />
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Requests - 2 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="shadow-lg border-2 border-primary/20 h-full">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary animate-pulse" />
                    Nouvelles demandes
                  </CardTitle>
                  <CardDescription className="mt-1">{pendingBookings.length} en attente de réponse</CardDescription>
                </div>
                {pendingBookings.length > 0 && (
                  <Badge className="bg-primary/10 text-primary border-0 animate-pulse">
                    Action requise
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {pendingBookings.length === 0 ? (
                <div className="text-center py-16">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 mx-auto mb-4 flex items-center justify-center"
                  >
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </motion.div>
                  <p className="text-lg font-medium">Aucune demande en attente</p>
                  <p className="text-sm text-muted-foreground mt-1">Vous êtes à jour ! 🎉</p>
                </div>
              ) : pendingBookings.map((b, idx) => (
                <motion.div 
                  key={b.id} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="ring-2 ring-primary/20">
                      <AvatarImage src={b.owner?.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {b.owner?.first_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{b.owner?.first_name || 'Propriétaire'}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{b.owner?.city || 'Non spécifié'}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-background">
                      {getServiceLabel(b.service_type)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-3 p-3 bg-muted/50 rounded-xl text-sm">
                    <span className="flex items-center gap-1.5">
                      <DogIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{b.dogs?.name}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {new Date(b.scheduled_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {b.scheduled_time}
                    </span>
                    <span className="flex items-center gap-1.5 font-bold text-green-600">
                      <Euro className="h-3.5 w-3.5" />
                      {b.price}€
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" 
                      onClick={() => handleBookingAction(b.id, 'confirmed')}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Accepter
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive" 
                      onClick={() => handleBookingAction(b.id, 'cancelled')}
                    >
                      <XCircle className="h-4 w-4" />
                      Refuser
                    </Button>
                    {b.owner?.phone && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`tel:${b.owner.phone}`}>
                          <Phone className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Timeline - 1 column */}
        <motion.div variants={itemVariants}>
          <ActivityTimeline
            activities={recentActivity}
            title="Activité récente"
            maxItems={6}
            onViewAll={() => onNavigate('missions')}
          />
        </motion.div>
      </div>

      {/* Upcoming Missions */}
      <motion.div variants={itemVariants}>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Prochaines missions
              </CardTitle>
              <CardDescription className="mt-1">{upcomingBookings.length} mission(s) confirmée(s)</CardDescription>
            </div>
            <Button variant="outline" onClick={() => onNavigate('missions')}>
              Voir tout
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {upcomingBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">Aucune mission à venir</p>
                <p className="text-sm text-muted-foreground/70 mt-1">Les nouvelles missions apparaîtront ici</p>
              </div>
            ) : (
              <div className="divide-y">
                {upcomingBookings.map((b, idx) => (
                  <motion.div 
                    key={b.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors group"
                  >
                    <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                      <AvatarImage src={b.dogs?.photo_url} />
                      <AvatarFallback className="text-lg">🐕</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{b.dogs?.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {getServiceLabel(b.service_type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(b.scheduled_date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {b.scheduled_time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-green-600">{b.price}€</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Envoyer preuve
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Achievements Preview */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-red-500/5 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Débloquez des badges</h3>
                <p className="text-sm text-muted-foreground">
                  Complétez {10 - stats.totalWalks} promenade(s) de plus pour obtenir le badge "Expert"
                </p>
              </div>
              <Button variant="outline" onClick={() => onNavigate('performance')}>
                Voir mes badges
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default WalkerOverviewTab;
