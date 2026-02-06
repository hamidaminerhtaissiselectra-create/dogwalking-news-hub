import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'accent' | 'heart' | 'muted' | 'walker' | 'owner' | 'success' | 'warning' | 'info' | 'violet' | 'money' | 'red' | 'green' | 'blue' | 'yellow' | 'orange' | 'purple' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  badge?: string | number;
  disabled?: boolean;
  filled?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  badge,
  disabled = false,
  filled = false
}) => {
  // Solid filled variants (button style)
  const filledVariants: Record<string, { bg: string; text: string; hover: string }> = {
    primary: {
      bg: 'bg-primary',
      text: 'text-primary-foreground',
      hover: 'hover:bg-primary/90',
    },
    success: {
      bg: 'bg-stat-green',
      text: 'text-white',
      hover: 'hover:bg-stat-green/90',
    },
    green: {
      bg: 'bg-stat-green',
      text: 'text-white',
      hover: 'hover:bg-stat-green/90',
    },
    walker: {
      bg: 'bg-walker',
      text: 'text-white',
      hover: 'hover:bg-walker/90',
    },
    blue: {
      bg: 'bg-stat-blue',
      text: 'text-white',
      hover: 'hover:bg-stat-blue/90',
    },
    owner: {
      bg: 'bg-owner',
      text: 'text-white',
      hover: 'hover:bg-owner/90',
    },
    orange: {
      bg: 'bg-owner',
      text: 'text-white',
      hover: 'hover:bg-owner/90',
    },
    red: {
      bg: 'bg-stat-red',
      text: 'text-white',
      hover: 'hover:bg-stat-red/90',
    },
    heart: {
      bg: 'bg-heart',
      text: 'text-white',
      hover: 'hover:bg-heart/90',
    },
    violet: {
      bg: 'bg-stat-purple',
      text: 'text-white',
      hover: 'hover:bg-stat-purple/90',
    },
    purple: {
      bg: 'bg-stat-purple',
      text: 'text-white',
      hover: 'hover:bg-stat-purple/90',
    },
    warning: {
      bg: 'bg-stat-yellow',
      text: 'text-white',
      hover: 'hover:bg-stat-yellow/90',
    },
    yellow: {
      bg: 'bg-stat-yellow',
      text: 'text-white',
      hover: 'hover:bg-stat-yellow/90',
    },
    info: {
      bg: 'bg-stat-cyan',
      text: 'text-white',
      hover: 'hover:bg-stat-cyan/90',
    },
    cyan: {
      bg: 'bg-stat-cyan',
      text: 'text-white',
      hover: 'hover:bg-stat-cyan/90',
    },
    muted: {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      hover: 'hover:bg-muted/80',
    },
    accent: {
      bg: 'bg-accent',
      text: 'text-accent-foreground',
      hover: 'hover:bg-accent/90',
    },
    money: {
      bg: 'bg-stat-yellow',
      text: 'text-white',
      hover: 'hover:bg-stat-yellow/90',
    },
  };

  // Outline/subtle variants
  const outlineVariants: Record<string, { base: string; hover: string; icon: string; iconBg: string; text: string }> = {
    primary: {
      base: 'bg-primary/5 border-primary/20',
      hover: 'hover:bg-primary/10 hover:border-primary/40',
      icon: 'text-primary',
      iconBg: 'bg-primary/15',
      text: 'text-primary',
    },
    accent: {
      base: 'bg-accent/5 border-accent/20',
      hover: 'hover:bg-accent/10 hover:border-accent/40',
      icon: 'text-accent',
      iconBg: 'bg-accent/15',
      text: 'text-accent',
    },
    heart: {
      base: 'bg-heart/5 border-heart/20',
      hover: 'hover:bg-heart/10 hover:border-heart/40',
      icon: 'text-heart',
      iconBg: 'bg-heart/15',
      text: 'text-heart',
    },
    muted: {
      base: 'bg-muted border-border',
      hover: 'hover:bg-muted/80 hover:border-muted-foreground/30',
      icon: 'text-muted-foreground',
      iconBg: 'bg-muted-foreground/10',
      text: 'text-muted-foreground',
    },
    walker: {
      base: 'bg-walker/5 border-walker/20',
      hover: 'hover:bg-walker/10 hover:border-walker/40',
      icon: 'text-walker',
      iconBg: 'bg-walker/15',
      text: 'text-walker',
    },
    blue: {
      base: 'bg-stat-blue/5 border-stat-blue/20',
      hover: 'hover:bg-stat-blue/10 hover:border-stat-blue/40',
      icon: 'text-stat-blue',
      iconBg: 'bg-stat-blue/15',
      text: 'text-stat-blue',
    },
    owner: {
      base: 'bg-owner/5 border-owner/20',
      hover: 'hover:bg-owner/10 hover:border-owner/40',
      icon: 'text-owner',
      iconBg: 'bg-owner/15',
      text: 'text-owner',
    },
    orange: {
      base: 'bg-owner/5 border-owner/20',
      hover: 'hover:bg-owner/10 hover:border-owner/40',
      icon: 'text-owner',
      iconBg: 'bg-owner/15',
      text: 'text-owner',
    },
    success: {
      base: 'bg-stat-green/5 border-stat-green/20',
      hover: 'hover:bg-stat-green/10 hover:border-stat-green/40',
      icon: 'text-stat-green',
      iconBg: 'bg-stat-green/15',
      text: 'text-stat-green',
    },
    green: {
      base: 'bg-stat-green/5 border-stat-green/20',
      hover: 'hover:bg-stat-green/10 hover:border-stat-green/40',
      icon: 'text-stat-green',
      iconBg: 'bg-stat-green/15',
      text: 'text-stat-green',
    },
    warning: {
      base: 'bg-stat-yellow/5 border-stat-yellow/20',
      hover: 'hover:bg-stat-yellow/10 hover:border-stat-yellow/40',
      icon: 'text-stat-yellow',
      iconBg: 'bg-stat-yellow/15',
      text: 'text-stat-yellow',
    },
    yellow: {
      base: 'bg-stat-yellow/5 border-stat-yellow/20',
      hover: 'hover:bg-stat-yellow/10 hover:border-stat-yellow/40',
      icon: 'text-stat-yellow',
      iconBg: 'bg-stat-yellow/15',
      text: 'text-stat-yellow',
    },
    info: {
      base: 'bg-stat-cyan/5 border-stat-cyan/20',
      hover: 'hover:bg-stat-cyan/10 hover:border-stat-cyan/40',
      icon: 'text-stat-cyan',
      iconBg: 'bg-stat-cyan/15',
      text: 'text-stat-cyan',
    },
    cyan: {
      base: 'bg-stat-cyan/5 border-stat-cyan/20',
      hover: 'hover:bg-stat-cyan/10 hover:border-stat-cyan/40',
      icon: 'text-stat-cyan',
      iconBg: 'bg-stat-cyan/15',
      text: 'text-stat-cyan',
    },
    violet: {
      base: 'bg-stat-purple/5 border-stat-purple/20',
      hover: 'hover:bg-stat-purple/10 hover:border-stat-purple/40',
      icon: 'text-stat-purple',
      iconBg: 'bg-stat-purple/15',
      text: 'text-stat-purple',
    },
    purple: {
      base: 'bg-stat-purple/5 border-stat-purple/20',
      hover: 'hover:bg-stat-purple/10 hover:border-stat-purple/40',
      icon: 'text-stat-purple',
      iconBg: 'bg-stat-purple/15',
      text: 'text-stat-purple',
    },
    money: {
      base: 'bg-stat-yellow/10 border-stat-yellow/25',
      hover: 'hover:bg-stat-yellow/15 hover:border-stat-yellow/40',
      icon: 'text-stat-yellow',
      iconBg: 'bg-stat-yellow/20',
      text: 'text-stat-yellow',
    },
    red: {
      base: 'bg-stat-red/5 border-stat-red/20',
      hover: 'hover:bg-stat-red/10 hover:border-stat-red/40',
      icon: 'text-stat-red',
      iconBg: 'bg-stat-red/15',
      text: 'text-stat-red',
    },
  };

  const sizes = {
    sm: {
      card: 'p-3 gap-2',
      icon: 'h-5 w-5',
      iconWrapper: 'w-9 h-9',
      text: 'text-[10px]',
    },
    md: {
      card: 'p-4 gap-2.5',
      icon: 'h-6 w-6',
      iconWrapper: 'w-11 h-11',
      text: 'text-xs',
    },
    lg: {
      card: 'p-5 gap-3',
      icon: 'h-7 w-7',
      iconWrapper: 'w-14 h-14',
      text: 'text-sm',
    },
  };

  const sizeStyle = sizes[size];

  if (filled) {
    const style = filledVariants[variant] || filledVariants.primary;
    return (
      <motion.button
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl transition-all duration-300 relative overflow-hidden shadow-md hover:shadow-xl",
          style.bg,
          style.hover,
          sizeStyle.card,
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Badge de notification */}
        {badge && (
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 px-2 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full shadow-lg z-20 animate-pulse"
          >
            {badge}
          </motion.span>
        )}
        
        <Icon className={cn(sizeStyle.icon, style.text, "drop-shadow-sm")} />
        <span className={cn("font-semibold text-center leading-tight", sizeStyle.text, style.text)}>
          {label}
        </span>
      </motion.button>
    );
  }

  // Outline variant
  const style = outlineVariants[variant] || outlineVariants.primary;

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md",
        style.base,
        style.hover,
        sizeStyle.card,
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      
      {/* Badge de notification */}
      {badge && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 px-2 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full shadow-lg z-20 animate-pulse"
        >
          {badge}
        </motion.span>
      )}
      
      {/* Icône avec fond coloré */}
      <div className={cn(
        "rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 group-hover:scale-110",
        style.iconBg,
        sizeStyle.iconWrapper
      )}>
        <Icon className={cn(sizeStyle.icon, style.icon, "drop-shadow-sm")} />
      </div>
      
      {/* Label */}
      <span className={cn(
        "font-semibold text-center leading-tight relative z-10",
        sizeStyle.text,
        style.text
      )}>
        {label}
      </span>
    </motion.button>
  );
};

export default QuickActionCard;