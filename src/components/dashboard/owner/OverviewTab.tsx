import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, Dog as DogIcon, Euro, Clock, Star, Heart, 
  MessageCircle, Plus, Search, ChevronRight, Bell, Gift, Shield,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

interface OverviewTabProps {
  stats: {
    totalBookings: number;
    upcomingBookings: number;
    completedBookings: number;
    totalDogs: number;
    totalSpent: number;
    totalFavorites: number;
    unreadNotifications: number;
    unreadMessages: number;
  };
  profile: any;
  onNavigate: (tab: string) => void;
}

const OverviewTab = ({ stats, profile, onNavigate }: OverviewTabProps) => {
  const [dogs, setDogs] = useState<any[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const [dogsRes, bookingsRes, favoritesRes, notificationsRes] = await Promise.all([
      supabase.from('dogs').select('*').eq('owner_id', session.user.id).limit(5),
      supabase.from('bookings')
        .select('*, dogs(name, breed, photo_url)')
        .eq('owner_id', session.user.id)
        .gte('scheduled_date', new Date().toISOString().split('T')[0])
        .neq('status', 'cancelled')
        .order('scheduled_date', { ascending: true })
        .limit(5),
      supabase.from('favorites').select('*, walker_profiles(*)').eq('user_id', session.user.id).limit(3),
      supabase.from('notifications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    // Enrich bookings with walker info
    if (bookingsRes.data && bookingsRes.data.length > 0) {
      const walkerIds = [...new Set(bookingsRes.data.map(b => b.walker_id).filter(Boolean))];
      if (walkerIds.length > 0) {
        const { data: walkersData } = await supabase
          .from('profiles')
          .select('id, first_name, avatar_url')
          .in('id', walkerIds);
        
        const walkerMap = new Map(walkersData?.map(w => [w.id, w]) || []);
        setUpcomingBookings(bookingsRes.data.map(b => ({
          ...b,
          walker: walkerMap.get(b.walker_id)
        })));
      } else {
        setUpcomingBookings(bookingsRes.data);
      }
    }

    setDogs(dogsRes.data || []);
    setFavorites(favoritesRes.data || []);
    setNotifications(notificationsRes.data || []);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string; icon: any }> = {
      pending: { label: 'En attente', className: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
      confirmed: { label: 'Confirmée', className: 'bg-primary/10 text-primary border-primary/20', icon: CheckCircle },
      completed: { label: 'Terminée', className: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      cancelled: { label: 'Annulée', className: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
    };
    const { label, className, icon: Icon } = statusMap[status] || statusMap.pending;
    return (
      <Badge className={`flex items-center gap-1 ${className}`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getServiceLabel = (serviceType: string) => {
    const services: Record<string, string> = {
      promenade: "Promenade",
      visite: "Visite à domicile",
      garde: "Garde",
      veterinaire: "Accompagnement vétérinaire"
    };
    return services[serviceType] || serviceType;
  };

  const quickActions = [
    { icon: Plus, label: 'Ajouter un chien', onClick: () => onNavigate('chiens'), color: 'text-primary' },
    { icon: Search, label: 'Trouver promeneur', onClick: () => onNavigate('promeneurs'), color: 'text-primary' },
    { icon: Calendar, label: 'Mes réservations', onClick: () => onNavigate('reservations'), color: 'text-primary' },
    { icon: MessageCircle, label: 'Messages', onClick: () => onNavigate('messages'), color: 'text-primary' },
    { icon: Gift, label: 'Parrainage', onClick: () => onNavigate('parrainage'), color: 'text-primary' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-primary/15 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Réservations</CardTitle>
            <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{stats.totalBookings}</div>
            <p className="text-sm text-muted-foreground mt-1">
              <span className="text-primary font-semibold">{stats.upcomingBookings}</span> à venir
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mes chiens</CardTitle>
            <div className="w-11 h-11 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <DogIcon className="h-5 w-5 text-secondary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalDogs}</div>
            <p className="text-sm text-muted-foreground mt-1">enregistrés</p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total dépensé</CardTitle>
            <div className="w-11 h-11 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Euro className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalSpent.toFixed(0)}€</div>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.completedBookings} promenades
            </p>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Favoris</CardTitle>
            <div className="w-11 h-11 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="h-5 w-5 text-primary fill-primary/20" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalFavorites}</div>
            <p className="text-sm text-muted-foreground mt-1">promeneurs</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {quickActions.map((action, i) => (
          <Button 
            key={i}
            onClick={action.onClick} 
            variant="outline" 
            className="h-auto py-5 flex flex-col gap-3 hover:border-primary hover:bg-primary/5 transition-all duration-300 group rounded-2xl"
          >
            <action.icon className={`h-7 w-7 ${action.color} group-hover:scale-110 transition-transform`} />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Bookings & Dogs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Bookings */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-muted/50 to-transparent">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Prochaines réservations
                  </CardTitle>
                  <CardDescription>{stats.upcomingBookings} réservation(s) à venir</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onNavigate('reservations')} className="gap-1">
                  Voir tout <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-10 w-10 text-muted-foreground/50" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Aucune réservation à venir</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Trouvez un promeneur de confiance pour votre compagnon
                    </p>
                    <Button onClick={() => onNavigate('promeneurs')} className="gap-2">
                      <Search className="h-4 w-4" />
                      Réserver une promenade
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {upcomingBookings.map(booking => (
                      <div key={booking.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                        <Avatar className="h-14 w-14 ring-2 ring-background shadow">
                          <AvatarImage src={booking.walker?.avatar_url} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {booking.walker?.first_name?.charAt(0) || '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold truncate">{booking.dogs?.name}</span>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {getServiceLabel(booking.service_type)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(booking.scheduled_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {booking.scheduled_time}
                            </span>
                            <span>avec {booking.walker?.first_name || 'promeneur'}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          {getStatusBadge(booking.status)}
                          <p className="font-bold text-lg mt-1">{Number(booking.price || 0).toFixed(2)}€</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* My Dogs */}
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-muted/50 to-transparent">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DogIcon className="h-5 w-5 text-primary" />
                    Mes chiens
                  </CardTitle>
                  <CardDescription>{dogs.length} chien(s) enregistré(s)</CardDescription>
                </div>
                <Button onClick={() => onNavigate('chiens')} size="sm" className="gap-1">
                  <Plus className="h-4 w-4" /> Ajouter
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {dogs.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center text-4xl">
                      🐕
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Aucun chien enregistré</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Ajoutez votre premier compagnon pour réserver des promenades
                    </p>
                    <Button onClick={() => onNavigate('chiens')} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Ajouter mon chien
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y">
                    {dogs.map(dog => (
                      <div key={dog.id} className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                        {dog.photo_url ? (
                          <img src={dog.photo_url} alt={dog.name} className="w-16 h-16 rounded-2xl object-cover shadow" />
                        ) : (
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-3xl shadow">
                            🐕
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-lg">{dog.name}</p>
                          <p className="text-sm text-muted-foreground">{dog.breed || 'Race non spécifiée'}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            {dog.age && <span>{dog.age} an(s)</span>}
                            {dog.weight && <span>• {dog.weight}kg</span>}
                            {dog.size && <span>• {dog.size}</span>}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Modifier
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Notifications */}
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </CardTitle>
              {stats.unreadNotifications > 0 && (
                <Badge variant="destructive" className="rounded-full">{stats.unreadNotifications}</Badge>
              )}
            </CardHeader>
            <CardContent>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-10 w-10 mx-auto mb-2 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground">Aucune notification</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {notifications.slice(0, 4).map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-3 rounded-xl text-sm cursor-pointer transition-all ${
                        !notif.read 
                          ? 'bg-primary/5 hover:bg-primary/10 border border-primary/20' 
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <p className="font-medium line-clamp-1">{notif.title}</p>
                      <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{notif.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Favorites */}
          <Card className="shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary fill-primary/20" />
                Promeneurs favoris
              </CardTitle>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-10 w-10 mx-auto mb-2 text-muted-foreground/30" />
                  <p className="text-sm text-muted-foreground mb-2">Aucun favori</p>
                  <Button variant="link" size="sm" onClick={() => onNavigate('promeneurs')} className="p-0">
                    Découvrir les promeneurs →
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {favorites.map(fav => (
                    <div key={fav.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          ?
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">Promeneur</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          {fav.walker_profiles?.rating || '0'}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0">
                        Réserver
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Referral CTA */}
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 overflow-hidden relative shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <CardContent className="p-6 text-center relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/70 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <Gift className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-lg mb-2">Parrainez vos amis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Gagnez 15€ pour chaque ami qui s'inscrit
              </p>
              <Button onClick={() => onNavigate('parrainage')} className="w-full gap-2">
                <Gift className="h-4 w-4" />
                Inviter des amis
              </Button>
            </CardContent>
          </Card>

          {/* Security Trust */}
          <Card className="bg-muted/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Paiements sécurisés</p>
                  <p className="text-xs text-muted-foreground">Vos transactions sont protégées</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
