import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  sublabel?: string;
  variant?: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'cyan' | 'orange' | 'primary' | 'accent' | 'heart' | 'muted' | 'walker' | 'owner' | 'success' | 'warning' | 'info' | 'violet' | 'money';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  filled?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  sublabel,
  variant = 'primary',
  trend,
  onClick,
  size = 'md',
  filled = true
}) => {
  // Solid colored stat cards (like maquettes) with white text
  const filledVariants: Record<string, { bg: string; text: string; icon: string }> = {
    red: {
      bg: 'stat-card-red',
      text: 'text-white',
      icon: 'text-white/90',
    },
    green: {
      bg: 'stat-card-green',
      text: 'text-white',
      icon: 'text-white/90',
    },
    blue: {
      bg: 'stat-card-blue',
      text: 'text-white',
      icon: 'text-white/90',
    },
    yellow: {
      bg: 'stat-card-yellow',
      text: 'text-white',
      icon: 'text-white/90',
    },
    purple: {
      bg: 'stat-card-purple',
      text: 'text-white',
      icon: 'text-white/90',
    },
    cyan: {
      bg: 'stat-card-cyan',
      text: 'text-white',
      icon: 'text-white/90',
    },
    orange: {
      bg: 'stat-card-orange',
      text: 'text-white',
      icon: 'text-white/90',
    },
  };

  // Subtle/outline variants for less emphasis
  const outlineVariants: Record<string, { card: string; iconBg: string; iconText: string; value: string }> = {
    primary: {
      card: 'bg-primary/5 border-primary/20 hover:border-primary/40',
      iconBg: 'bg-primary/15',
      iconText: 'text-primary',
      value: 'text-primary',
    },
    accent: {
      card: 'bg-accent/5 border-accent/20 hover:border-accent/40',
      iconBg: 'bg-accent/15',
      iconText: 'text-accent',
      value: 'text-accent',
    },
    heart: {
      card: 'bg-heart/5 border-heart/20 hover:border-heart/40',
      iconBg: 'bg-heart/15',
      iconText: 'text-heart',
      value: 'text-heart',
    },
    muted: {
      card: 'bg-muted border-border hover:bg-muted/80',
      iconBg: 'bg-muted-foreground/20',
      iconText: 'text-muted-foreground',
      value: 'text-foreground',
    },
    walker: {
      card: 'bg-walker/5 border-walker/25 hover:border-walker/50',
      iconBg: 'bg-walker/15',
      iconText: 'text-walker',
      value: 'text-walker',
    },
    owner: {
      card: 'bg-owner/5 border-owner/25 hover:border-owner/50',
      iconBg: 'bg-owner/15',
      iconText: 'text-owner',
      value: 'text-owner',
    },
    success: {
      card: 'bg-stat-green/5 border-stat-green/25 hover:border-stat-green/50',
      iconBg: 'bg-stat-green/15',
      iconText: 'text-stat-green',
      value: 'text-stat-green',
    },
    warning: {
      card: 'bg-stat-yellow/5 border-stat-yellow/25 hover:border-stat-yellow/50',
      iconBg: 'bg-stat-yellow/15',
      iconText: 'text-stat-yellow',
      value: 'text-stat-yellow',
    },
    info: {
      card: 'bg-stat-cyan/5 border-stat-cyan/25 hover:border-stat-cyan/50',
      iconBg: 'bg-stat-cyan/15',
      iconText: 'text-stat-cyan',
      value: 'text-stat-cyan',
    },
    violet: {
      card: 'bg-stat-purple/5 border-stat-purple/25 hover:border-stat-purple/50',
      iconBg: 'bg-stat-purple/15',
      iconText: 'text-stat-purple',
      value: 'text-stat-purple',
    },
    money: {
      card: 'bg-stat-yellow/10 border-stat-yellow/30 hover:border-stat-yellow/50',
      iconBg: 'bg-stat-yellow/20',
      iconText: 'text-stat-yellow',
      value: 'text-stat-yellow',
    },
    // Map solid colors to outline equivalents for non-filled mode
    red: {
      card: 'bg-stat-red/5 border-stat-red/25 hover:border-stat-red/50',
      iconBg: 'bg-stat-red/15',
      iconText: 'text-stat-red',
      value: 'text-stat-red',
    },
    green: {
      card: 'bg-stat-green/5 border-stat-green/25 hover:border-stat-green/50',
      iconBg: 'bg-stat-green/15',
      iconText: 'text-stat-green',
      value: 'text-stat-green',
    },
    blue: {
      card: 'bg-stat-blue/5 border-stat-blue/25 hover:border-stat-blue/50',
      iconBg: 'bg-stat-blue/15',
      iconText: 'text-stat-blue',
      value: 'text-stat-blue',
    },
    yellow: {
      card: 'bg-stat-yellow/5 border-stat-yellow/25 hover:border-stat-yellow/50',
      iconBg: 'bg-stat-yellow/15',
      iconText: 'text-stat-yellow',
      value: 'text-stat-yellow',
    },
    orange: {
      card: 'bg-owner/5 border-owner/25 hover:border-owner/50',
      iconBg: 'bg-owner/15',
      iconText: 'text-owner',
      value: 'text-owner',
    },
  };

  const sizes = {
    sm: {
      card: 'p-3',
      icon: 'h-4 w-4',
      value: 'text-lg',
      label: 'text-[10px]',
    },
    md: {
      card: 'p-4',
      icon: 'h-5 w-5',
      value: 'text-2xl',
      label: 'text-xs',
    },
    lg: {
      card: 'p-5',
      icon: 'h-6 w-6',
      value: 'text-3xl',
      label: 'text-sm',
    },
  };

  const sizeStyle = sizes[size];
  const isFilled = filled && Object.keys(filledVariants).includes(variant);

  if (isFilled) {
    const style = filledVariants[variant as keyof typeof filledVariants];
    return (
      <motion.button
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={cn(
          "rounded-2xl transition-all duration-300 text-left w-full relative overflow-hidden group shadow-lg hover:shadow-xl",
          style.bg,
          sizeStyle.card
        )}
      >
        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <div className="flex items-start justify-between relative z-10">
          <div className="flex flex-col gap-0.5">
            <Icon className={cn(sizeStyle.icon, style.icon, "mb-1")} />
            <span className={cn("font-bold leading-tight", sizeStyle.value, style.text)}>
              {value}
            </span>
            <span className={cn("font-medium opacity-90", sizeStyle.label, style.text)}>
              {label}
            </span>
            {sublabel && (
              <span className={cn("text-[10px] opacity-75", style.text)}>
                {sublabel}
              </span>
            )}
          </div>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
              trend.isPositive ? "bg-white/20" : "bg-black/20"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span className="text-white">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
            </div>
          )}
        </div>
      </motion.button>
    );
  }

  // Outline/subtle variant
  const style = outlineVariants[variant] || outlineVariants.primary;
  
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "rounded-2xl border transition-all duration-300 text-left w-full relative overflow-hidden group shadow-sm hover:shadow-lg",
        style.card,
        sizeStyle.card
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
          {sublabel && (
            <span className="text-[10px] text-muted-foreground/70">
              {sublabel}
            </span>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 mt-1",
              trend.isPositive ? "text-stat-green" : "text-destructive"
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
          "rounded-xl flex items-center justify-center w-10 h-10 transition-transform group-hover:scale-110",
          style.iconBg
        )}>
          <Icon className={cn(sizeStyle.icon, style.iconText)} />
        </div>
      </div>
    </motion.button>
  );
};

export default StatCard;