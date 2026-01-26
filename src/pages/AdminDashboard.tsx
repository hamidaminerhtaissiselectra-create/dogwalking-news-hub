import { useEffect, useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, Dog, Calendar, Euro, Shield, Scale, AlertTriangle,
  BarChart3, Activity, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalWalkers: 0,
    activeWalkers: 0,
    pendingWalkers: 0,
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    revenue: 0,
    commission: 0,
    averageBookingValue: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [disputes, setDisputes] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      toast({
        title: "Accès refusé",
        description: "Cette page est réservée aux administrateurs",
        variant: "destructive"
      });
      navigate('/dashboard');
      return;
    }

    fetchAdminStats();
  };

  const fetchAdminStats = async () => {
    try {
      // Count users by type
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_type');

      const owners = profilesData?.filter(p => p.user_type === 'owner').length || 0;
      const walkers = profilesData?.filter(p => p.user_type === 'walker').length || 0;

      // Count walker verification status
      const { data: walkerProfiles } = await supabase
        .from('walker_profiles')
        .select('verified');

      const activeWalkers = walkerProfiles?.filter(w => w.verified).length || 0;
      const pendingWalkers = walkerProfiles?.filter(w => !w.verified).length || 0;

      // Bookings stats
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('status, price, created_at');

      const completed = bookingsData?.filter(b => b.status === 'completed') || [];
      const pending = bookingsData?.filter(b => b.status === 'pending') || [];
      const cancelled = bookingsData?.filter(b => b.status === 'cancelled') || [];
      
      const revenue = completed.reduce((sum, b) => sum + Number(b.price || 0), 0);
      const commission = revenue * 0.13;

      // Recent bookings
      const { data: recentBookingsData } = await supabase
        .from('bookings')
        .select('*, dogs(name)')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentBookings(recentBookingsData || []);

      // Recent users
      const { data: recentUsersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentUsers(recentUsersData || []);

      // Fetch disputes
      const { data: disputesData } = await (supabase as any)
        .from('disputes')
        .select('*')
        .order('created_at', { ascending: false });
      setDisputes(disputesData || []);

      // Fetch incidents
      const { data: incidentsData } = await (supabase as any)
        .from('incident_reports')
        .select('*')
        .order('reported_at', { ascending: false });
      setIncidents(incidentsData || []);

      setStats({
        totalUsers: profilesData?.length || 0,
        totalOwners: owners,
        totalWalkers: walkers,
        activeWalkers,
        pendingWalkers,
        totalBookings: bookingsData?.length || 0,
        completedBookings: completed.length,
        pendingBookings: pending.length,
        cancelledBookings: cancelled.length,
        revenue,
        commission,
        averageBookingValue: completed.length > 0 ? revenue / completed.length : 0
      });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleResolveDispute = async (disputeId: string, status: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await (supabase as any)
        .from('disputes')
        .update({
          status,
          resolved_by: session.user.id,
          resolved_at: new Date().toISOString()
        })
        .eq('id', disputeId);

      if (error) throw error;

      toast({
        title: status === 'resolved' ? "Litige résolu" : "Litige rejeté",
        description: "Le statut du litige a été mis à jour"
      });

      fetchAdminStats();
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const handleResolveIncident = async (incidentId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('incident_reports')
        .update({
          status: 'resolved',
          resolved_at: new Date().toISOString()
        })
        .eq('id', incidentId);

      if (error) throw error;

      toast({
        title: "Incident traité",
        description: "L'incident a été marqué comme résolu"
      });

      fetchAdminStats();
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: any }> = {
      pending: { label: 'En attente', variant: 'secondary' },
      confirmed: { label: 'Confirmée', variant: 'default' },
      completed: { label: 'Terminée', variant: 'outline' },
      cancelled: { label: 'Annulée', variant: 'destructive' },
    };
    const { label, variant } = statusMap[status] || statusMap.pending;
    return <Badge variant={variant}>{label}</Badge>;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Administration</h1>
            <p className="text-muted-foreground">Tableau de bord administrateur DogWalking</p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Admin
          </Badge>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenus Total</CardTitle>
              <Euro className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.revenue.toFixed(2)}€</div>
              <p className="text-xs text-muted-foreground">
                Commission: {stats.commission.toFixed(2)}€ (13%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalOwners} propriétaires • {stats.totalWalkers} promeneurs
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Réservations</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedBookings} terminées • {stats.pendingBookings} en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Promeneurs</CardTitle>
              <Dog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeWalkers}</div>
              <p className="text-xs text-muted-foreground">
                vérifiés • {stats.pendingWalkers} en attente
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Réservations</TabsTrigger>
            <TabsTrigger value="disputes" className="gap-1">
              Litiges
              {disputes.filter(d => d.status === 'open').length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 px-1.5 text-xs">
                  {disputes.filter(d => d.status === 'open').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Dernières réservations</CardTitle>
              </CardHeader>
              <CardContent>
                {recentBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Aucune réservation pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentBookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{booking.dogs?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.scheduled_date).toLocaleDateString('fr-FR')} à {booking.scheduled_time}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          {getStatusBadge(booking.status)}
                          <span className="font-bold">{Number(booking.price || 0).toFixed(2)}€</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Derniers utilisateurs inscrits</CardTitle>
              </CardHeader>
              <CardContent>
                {recentUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Aucun utilisateur pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentUsers.map(user => (
                      <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>
                              {user.first_name?.charAt(0)}{user.last_name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{user.first_name} {user.last_name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={user.user_type === 'walker' ? 'default' : 'secondary'}>
                            {user.user_type === 'walker' ? 'Promeneur' : 'Propriétaire'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Litiges et Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {disputes.length === 0 && incidents.length === 0 ? (
                  <div className="text-center py-12">
                    <Scale className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Aucun litige ou incident signalé</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Open Disputes */}
                    {disputes.filter(d => d.status === 'open').length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Litiges ouverts ({disputes.filter(d => d.status === 'open').length})
                        </h4>
                        <div className="space-y-3">
                          {disputes.filter(d => d.status === 'open').map(dispute => (
                            <div key={dispute.id} className="p-4 border rounded-lg bg-destructive/5 border-destructive/20">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="destructive">{dispute.type}</Badge>
                                    <Badge variant="outline">{dispute.reason}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {dispute.description}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    Signalé le {new Date(dispute.created_at).toLocaleDateString('fr-FR')}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleResolveDispute(dispute.id, 'resolved')}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Résoudre
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => handleResolveDispute(dispute.id, 'rejected')}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pending Incidents */}
                    {incidents.filter(i => i.status === 'pending').length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-amber-500" />
                          Incidents en attente ({incidents.filter(i => i.status === 'pending').length})
                        </h4>
                        <div className="space-y-3">
                          {incidents.filter(i => i.status === 'pending').map(incident => (
                            <div key={incident.id} className="p-4 border rounded-lg">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <Badge variant="secondary" className="mb-2">{incident.type}</Badge>
                                  {incident.description && (
                                    <p className="text-sm text-muted-foreground">
                                      {incident.description}
                                    </p>
                                  )}
                                  <p className="text-xs text-muted-foreground mt-2">
                                    Signalé le {new Date(incident.reported_at).toLocaleDateString('fr-FR')}
                                  </p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleResolveIncident(incident.id)}
                                >
                                  Traiter
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resolved items summary */}
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        {disputes.filter(d => d.status !== 'open').length} litiges résolus • 
                        {incidents.filter(i => i.status !== 'pending').length} incidents traités
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Statistiques financières
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Revenus totaux</span>
                    <span className="text-xl font-bold">{stats.revenue.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Commission DogWalking (13%)</span>
                    <span className="text-xl font-bold text-primary">{stats.commission.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Panier moyen</span>
                    <span className="text-xl font-bold">{stats.averageBookingValue.toFixed(2)}€</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Statistiques activité
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Réservations terminées</span>
                    <span className="text-xl font-bold text-green-600">{stats.completedBookings}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Réservations en attente</span>
                    <span className="text-xl font-bold text-amber-600">{stats.pendingBookings}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span>Réservations annulées</span>
                    <span className="text-xl font-bold text-red-600">{stats.cancelledBookings}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;