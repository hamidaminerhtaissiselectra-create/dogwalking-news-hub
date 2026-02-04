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
  variant?: 'default' | 'primary' | 'accent' | 'heart' | 'walker' | 'owner' | 'success' | 'warning' | 'info' | 'violet' | 'money';
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
  const variantStyles = {
    default: {
      bg: 'bg-muted',
      iconBg: 'bg-muted-foreground/10',
      iconColor: 'text-muted-foreground',
      border: 'border-border/50',
    },
    primary: {
      bg: 'bg-gradient-to-br from-primary/10 to-primary/5',
      iconBg: 'bg-primary/20',
      iconColor: 'text-primary',
      border: 'border-primary/20',
    },
    accent: {
      bg: 'bg-gradient-to-br from-accent/10 to-accent/5',
      iconBg: 'bg-accent/20',
      iconColor: 'text-accent',
      border: 'border-accent/20',
    },
    heart: {
      bg: 'bg-gradient-to-br from-heart/10 to-heart/5',
      iconBg: 'bg-heart/20',
      iconColor: 'text-heart',
      border: 'border-heart/20',
    },
    walker: {
      bg: 'bg-gradient-to-br from-walker/15 to-info/10',
      iconBg: 'bg-walker/25',
      iconColor: 'text-walker',
      border: 'border-walker/30',
    },
    owner: {
      bg: 'bg-gradient-to-br from-owner/15 to-heart/10',
      iconBg: 'bg-owner/25',
      iconColor: 'text-owner',
      border: 'border-owner/30',
    },
    success: {
      bg: 'bg-gradient-to-br from-success/15 to-primary/10',
      iconBg: 'bg-success/25',
      iconColor: 'text-success',
      border: 'border-success/30',
    },
    warning: {
      bg: 'bg-gradient-to-br from-warning/15 to-warning/5',
      iconBg: 'bg-warning/25',
      iconColor: 'text-warning',
      border: 'border-warning/30',
    },
    info: {
      bg: 'bg-gradient-to-br from-info/15 to-info/5',
      iconBg: 'bg-info/25',
      iconColor: 'text-info',
      border: 'border-info/30',
    },
    violet: {
      bg: 'bg-gradient-to-br from-violet/15 to-violet/5',
      iconBg: 'bg-violet/25',
      iconColor: 'text-violet',
      border: 'border-violet/30',
    },
    money: {
      bg: 'bg-gradient-to-br from-warning/20 to-success/10',
      iconBg: 'bg-gradient-to-br from-warning/30 to-success/20',
      iconColor: 'text-warning',
      border: 'border-warning/30',
    },
  };

  const styles = variantStyles[variant];

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.03, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "rounded-2xl p-4 border shadow-sm transition-all",
        styles.bg,
        styles.border,
        onClick && "cursor-pointer hover:shadow-lg"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shadow-sm", styles.iconBg)}>
          <Icon className={cn("h-5 w-5", styles.iconColor)} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-full shadow-sm",
            trend.isPositive 
              ? "bg-success/20 text-success" 
              : "bg-destructive/20 text-destructive"
          )}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5 font-medium">{label}</p>
    </motion.div>
  );
};

export default StatCard;
