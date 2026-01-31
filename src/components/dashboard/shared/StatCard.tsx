import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent' | 'heart';
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  trend,
  variant = 'default',
  onClick
}) => {
  const iconBg = {
    default: 'bg-muted',
    primary: 'bg-primary/10',
    accent: 'bg-accent/10',
    heart: 'bg-heart/10'
  };

  const iconColor = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    accent: 'text-accent',
    heart: 'text-heart'
  };

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl p-4 border border-border/50 shadow-sm",
        onClick && "cursor-pointer hover:shadow-md transition-shadow"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", iconBg[variant])}>
          <Icon className={cn("h-5 w-5", iconColor[variant])} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            trend.isPositive 
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" 
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </motion.div>
  );
};

export default StatCard;
