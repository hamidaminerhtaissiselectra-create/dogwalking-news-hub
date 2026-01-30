import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import QuickSearchBar from "./QuickSearchBar";
import RecommendedWalkers from "./RecommendedWalkers";
import ReferralBanner from "./ReferralBanner";
import MyPets from "./MyPets";
import ActiveWalk from "./ActiveWalk";

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
  const [walkers, setWalkers] = useState<any[]>([]);
  const [activeBooking, setActiveBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const [dogsRes, walkersRes, bookingsRes] = await Promise.all([
      supabase.from('dogs').select('*').eq('owner_id', session.user.id).limit(5),
      supabase.from('walker_profiles')
        .select('*, profiles!inner(first_name, avatar_url, city)')
        .eq('verified', true)
        .order('rating', { ascending: false })
        .limit(4),
      supabase.from('bookings')
        .select('*, dogs(name, photo_url)')
        .eq('owner_id', session.user.id)
        .eq('status', 'in_progress')
        .limit(1)
    ]);

    setDogs(dogsRes.data?.map(d => ({
      id: d.id,
      name: d.name,
      photoUrl: d.photo_url
    })) || []);

    setWalkers(walkersRes.data?.map(w => ({
      id: w.user_id,
      name: w.profiles?.first_name || 'Promeneur',
      photoUrl: w.profiles?.avatar_url,
      rating: w.rating || 5.0,
      verified: w.verified,
      city: w.profiles?.city
    })) || []);

    if (bookingsRes.data?.[0]) {
      setActiveBooking(bookingsRes.data[0]);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div 
          className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      {/* Barre de recherche rapide */}
      <QuickSearchBar />

      {/* Balade en cours (si active) */}
      {activeBooking && (
        <ActiveWalk
          dogName={activeBooking.dogs?.name || 'Votre chien'}
          dogPhoto={activeBooking.dogs?.photo_url}
          walkerName="Marie"
          duration={18}
          distance={1.2}
          speed={3.8}
        />
      )}

      {/* Promeneurs recommandés */}
      <RecommendedWalkers walkers={walkers} />

      {/* Mes animaux */}
      <MyPets 
        pets={dogs}
        onAddPet={() => onNavigate('chiens')}
        onViewAll={() => onNavigate('chiens')}
      />

      {/* Bannière parrainage */}
      <ReferralBanner onNavigate={() => onNavigate('parrainage')} />
    </motion.div>
  );
};

export default OverviewTab;
