import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickStat {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

interface QuickStatsProps {
  stats: QuickStat[];
  columns?: 2 | 3 | 4;
}

const variantStyles = {
  default: {
    bg: 'bg-muted/50',
    iconBg: 'bg-secondary/50',
    iconColor: 'text-secondary-foreground',
    valueColor: 'text-foreground'
  },
  primary: {
    bg: 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    valueColor: 'text-primary'
  },
  success: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400',
    valueColor: 'text-green-700 dark:text-green-400'
  },
  warning: {
    bg: 'bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10',
    iconBg: 'bg-amber-100 dark:bg-amber-900/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    valueColor: 'text-amber-700 dark:text-amber-400'
  },
  danger: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10',
    iconBg: 'bg-red-100 dark:bg-red-900/30',
    iconColor: 'text-red-600 dark:text-red-400',
    valueColor: 'text-red-700 dark:text-red-400'
  }
};

export const QuickStats = ({ stats, columns = 4 }: QuickStatsProps) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns])}>
      {stats.map((stat, index) => {
        const variant = stat.variant || 'default';
        const styles = variantStyles[variant];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={cn(
              "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
              styles.bg
            )}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  styles.iconBg
                )}>
                  <stat.icon className={cn("h-5 w-5", styles.iconColor)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl md:text-3xl font-bold", styles.valueColor)}>
                  {stat.value}
                </div>
                {stat.subtitle && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.trend && (
                      <span className={cn(
                        "font-semibold mr-1",
                        stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                      )}>
                        {stat.trend.isPositive ? '+' : ''}{stat.trend.value}%
                      </span>
                    )}
                    {stat.subtitle}
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuickStats;
