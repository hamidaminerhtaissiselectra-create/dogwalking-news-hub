import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  variant?: 'primary' | 'accent' | 'heart' | 'muted' | 'walker' | 'owner' | 'success' | 'warning' | 'info' | 'violet' | 'money';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  variant = 'primary',
  trend,
  onClick,
  size = 'md'
}) => {
  // Définition des variantes avec dégradés vifs
  const variants = {
    primary: {
      card: 'bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border-primary/30 hover:border-primary/50',
      iconBg: 'bg-gradient-to-br from-primary to-primary/80',
      iconText: 'text-white',
      value: 'text-primary',
      shadow: 'hover:shadow-primary/25',
    },
    accent: {
      card: 'bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 border-accent/30 hover:border-accent/50',
      iconBg: 'bg-gradient-to-br from-accent to-accent/80',
      iconText: 'text-white',
      value: 'text-accent',
      shadow: 'hover:shadow-accent/25',
    },
    heart: {
      card: 'bg-gradient-to-br from-heart/20 via-heart/10 to-heart/5 border-heart/30 hover:border-heart/50',
      iconBg: 'bg-gradient-to-br from-heart to-heart/80',
      iconText: 'text-white',
      value: 'text-heart',
      shadow: 'hover:shadow-heart/25',
    },
    muted: {
      card: 'bg-muted border-border hover:bg-muted/80',
      iconBg: 'bg-muted-foreground/20',
      iconText: 'text-muted-foreground',
      value: 'text-foreground',
      shadow: '',
    },
    walker: {
      card: 'bg-gradient-to-br from-walker/25 via-walker/15 to-info/10 border-walker/40 hover:border-walker/60',
      iconBg: 'bg-gradient-to-br from-walker to-info',
      iconText: 'text-white',
      value: 'text-walker',
      shadow: 'hover:shadow-walker/30',
    },
    owner: {
      card: 'bg-gradient-to-br from-owner/25 via-owner/15 to-heart/10 border-owner/40 hover:border-owner/60',
      iconBg: 'bg-gradient-to-br from-owner to-heart',
      iconText: 'text-white',
      value: 'text-owner',
      shadow: 'hover:shadow-owner/30',
    },
    success: {
      card: 'bg-gradient-to-br from-success/25 via-success/15 to-primary/10 border-success/40 hover:border-success/60',
      iconBg: 'bg-gradient-to-br from-success to-primary',
      iconText: 'text-white',
      value: 'text-success',
      shadow: 'hover:shadow-success/30',
    },
    warning: {
      card: 'bg-gradient-to-br from-warning/25 via-warning/15 to-warning/5 border-warning/40 hover:border-warning/60',
      iconBg: 'bg-gradient-to-br from-warning to-amber-600',
      iconText: 'text-white',
      value: 'text-warning',
      shadow: 'hover:shadow-warning/30',
    },
    info: {
      card: 'bg-gradient-to-br from-info/25 via-info/15 to-info/5 border-info/40 hover:border-info/60',
      iconBg: 'bg-gradient-to-br from-info to-cyan-400',
      iconText: 'text-white',
      value: 'text-info',
      shadow: 'hover:shadow-info/30',
    },
    violet: {
      card: 'bg-gradient-to-br from-violet/25 via-violet/15 to-violet/5 border-violet/40 hover:border-violet/60',
      iconBg: 'bg-gradient-to-br from-violet to-purple-400',
      iconText: 'text-white',
      value: 'text-violet',
      shadow: 'hover:shadow-violet/30',
    },
    money: {
      card: 'bg-gradient-to-br from-warning/30 via-amber-400/20 to-yellow-300/10 border-warning/50 hover:border-warning/70',
      iconBg: 'bg-gradient-to-br from-amber-500 via-warning to-yellow-500',
      iconText: 'text-white',
      value: 'text-amber-600 dark:text-amber-400',
      shadow: 'hover:shadow-amber-500/35',
    },
  };

  const sizes = {
    sm: {
      card: 'p-3',
      icon: 'w-8 h-8',
      iconSize: 'h-4 w-4',
      value: 'text-lg',
      label: 'text-[10px]',
    },
    md: {
      card: 'p-4',
      icon: 'w-10 h-10',
      iconSize: 'h-5 w-5',
      value: 'text-2xl',
      label: 'text-xs',
    },
    lg: {
      card: 'p-5',
      icon: 'w-12 h-12',
      iconSize: 'h-6 w-6',
      value: 'text-3xl',
      label: 'text-sm',
    },
  };

  const style = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "rounded-2xl border transition-all duration-300 text-left w-full relative overflow-hidden group",
        style.card,
        sizeStyle.card,
        style.shadow,
        "shadow-md hover:shadow-xl"
      )}
    >
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <span className={cn("font-bold leading-tight", sizeStyle.value, style.value)}>
            {value}
          </span>
          <span className={cn("text-muted-foreground font-medium", sizeStyle.label)}>
            {label}
          </span>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="text-[10px] font-semibold">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3",
          style.iconBg,
          sizeStyle.icon
        )}>
          <Icon className={cn(sizeStyle.iconSize, style.iconText, "drop-shadow-sm")} />
        </div>
      </div>
    </motion.button>
  );
};

export default StatCard;
