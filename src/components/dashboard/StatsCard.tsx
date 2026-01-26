import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  onClick?: () => void;
}

const variantStyles = {
  default: {
    card: '',
    icon: 'bg-muted text-muted-foreground',
    value: 'text-foreground'
  },
  primary: {
    card: 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20',
    icon: 'bg-primary/10 text-primary',
    value: 'text-primary'
  },
  success: {
    card: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-900',
    icon: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    value: 'text-green-600'
  },
  warning: {
    card: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-900',
    icon: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
    value: 'text-amber-600'
  },
  danger: {
    card: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-200 dark:border-red-900',
    icon: 'bg-red-100 dark:bg-red-900/30 text-red-600',
    value: 'text-red-600'
  }
};

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  onClick
}: StatsCardProps) => {
  const styles = variantStyles[variant];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className={`hover:shadow-lg transition-all duration-300 cursor-pointer ${styles.card}`}
        onClick={onClick}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${styles.value}`}>{value}</div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className={`text-xs mt-1 flex items-center gap-1 ${
              trend.value >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
