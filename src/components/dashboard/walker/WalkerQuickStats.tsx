import { Card, CardContent } from "@/components/ui/card";
import { Star, Euro, Dog, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: React.ReactNode;
  variant: 'primary' | 'accent' | 'success' | 'warning';
}

const variantStyles = {
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-emerald-500 text-white',
  warning: 'bg-destructive text-destructive-foreground'
};

const StatCard = ({ label, value, sublabel, icon, variant }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="h-full"
  >
    <Card className={`h-full ${variantStyles[variant]} border-0 shadow-lg`}>
      <CardContent className="p-4 text-center">
        <p className="text-sm opacity-90 mb-1">{label}</p>
        <div className="flex items-center justify-center gap-1 mb-1">
          {icon}
          <span className="text-3xl font-bold">{value}</span>
        </div>
        {sublabel && (
          <p className="text-xs opacity-80">{sublabel}</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

interface WalkerQuickStatsProps {
  monthlyEarnings: number;
  totalWalks: number;
  averageRating: number;
  totalReviews: number;
  pendingRequests: number;
}

const WalkerQuickStats = ({ 
  monthlyEarnings, 
  totalWalks, 
  averageRating, 
  totalReviews,
  pendingRequests 
}: WalkerQuickStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <StatCard
        label="Gains Mensuels"
        value={`€${monthlyEarnings.toLocaleString()}`}
        sublabel="Ce mois-ci"
        variant="primary"
      />
      <StatCard
        label="Promenades Terminées"
        value={totalWalks}
        sublabel="Total effectuées"
        variant="accent"
      />
      <StatCard
        label="Note Moyenne"
        value={averageRating.toFixed(1)}
        sublabel={`Basé sur ${totalReviews} avis`}
        icon={
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(averageRating) ? 'fill-current' : 'opacity-40'}`} 
              />
            ))}
          </div>
        }
        variant="success"
      />
      <StatCard
        label="Requêtes en Attente"
        value={pendingRequests}
        sublabel="Nouvelles demandes"
        variant={pendingRequests > 0 ? 'warning' : 'accent'}
      />
    </div>
  );
};

export default WalkerQuickStats;
