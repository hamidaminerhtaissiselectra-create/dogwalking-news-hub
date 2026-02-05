import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'accent' | 'heart' | 'muted' | 'walker' | 'owner' | 'success' | 'warning' | 'info' | 'violet' | 'money';
  size?: 'sm' | 'md' | 'lg';
  badge?: string | number;
  disabled?: boolean;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  badge,
  disabled = false
}) => {
  // Définition des variantes avec couleurs vives et dégradés
  const variants = {
    primary: {
      base: 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/30',
      hover: 'hover:from-primary/30 hover:via-primary/20 hover:to-primary/10 hover:border-primary/50',
      icon: 'text-primary group-hover:text-primary',
      iconBg: 'bg-primary/15 group-hover:bg-primary/25',
      text: 'text-primary',
      shadow: 'hover:shadow-primary/20',
    },
    accent: {
      base: 'bg-gradient-to-br from-accent/20 via-accent/10 to-transparent border-accent/30',
      hover: 'hover:from-accent/30 hover:via-accent/20 hover:to-accent/10 hover:border-accent/50',
      icon: 'text-accent group-hover:text-accent',
      iconBg: 'bg-accent/15 group-hover:bg-accent/25',
      text: 'text-accent',
      shadow: 'hover:shadow-accent/20',
    },
    heart: {
      base: 'bg-gradient-to-br from-heart/20 via-heart/10 to-transparent border-heart/30',
      hover: 'hover:from-heart/30 hover:via-heart/20 hover:to-heart/10 hover:border-heart/50',
      icon: 'text-heart group-hover:text-heart',
      iconBg: 'bg-heart/15 group-hover:bg-heart/25',
      text: 'text-heart',
      shadow: 'hover:shadow-heart/20',
    },
    muted: {
      base: 'bg-muted border-border',
      hover: 'hover:bg-muted/80 hover:border-muted-foreground/30',
      icon: 'text-muted-foreground group-hover:text-foreground',
      iconBg: 'bg-muted-foreground/10',
      text: 'text-muted-foreground',
      shadow: '',
    },
    walker: {
      base: 'bg-gradient-to-br from-walker/25 via-info/15 to-transparent border-walker/40',
      hover: 'hover:from-walker/35 hover:via-info/25 hover:to-info/15 hover:border-walker/60',
      icon: 'text-walker group-hover:text-walker',
      iconBg: 'bg-gradient-to-br from-walker/20 to-info/15 group-hover:from-walker/30 group-hover:to-info/25',
      text: 'text-walker',
      shadow: 'hover:shadow-walker/25',
    },
    owner: {
      base: 'bg-gradient-to-br from-owner/25 via-heart/15 to-transparent border-owner/40',
      hover: 'hover:from-owner/35 hover:via-heart/25 hover:to-heart/15 hover:border-owner/60',
      icon: 'text-owner group-hover:text-owner',
      iconBg: 'bg-gradient-to-br from-owner/20 to-heart/15 group-hover:from-owner/30 group-hover:to-heart/25',
      text: 'text-owner',
      shadow: 'hover:shadow-owner/25',
    },
    success: {
      base: 'bg-gradient-to-br from-success/25 via-success/15 to-transparent border-success/40',
      hover: 'hover:from-success/35 hover:via-success/25 hover:to-success/15 hover:border-success/60',
      icon: 'text-success group-hover:text-success',
      iconBg: 'bg-gradient-to-br from-success/20 to-primary/15 group-hover:from-success/30 group-hover:to-primary/25',
      text: 'text-success',
      shadow: 'hover:shadow-success/25',
    },
    warning: {
      base: 'bg-gradient-to-br from-warning/25 via-warning/15 to-transparent border-warning/40',
      hover: 'hover:from-warning/35 hover:via-warning/25 hover:to-warning/15 hover:border-warning/60',
      icon: 'text-warning group-hover:text-warning',
      iconBg: 'bg-gradient-to-br from-warning/20 to-amber-400/15 group-hover:from-warning/30 group-hover:to-amber-400/25',
      text: 'text-warning',
      shadow: 'hover:shadow-warning/25',
    },
    info: {
      base: 'bg-gradient-to-br from-info/25 via-info/15 to-transparent border-info/40',
      hover: 'hover:from-info/35 hover:via-info/25 hover:to-info/15 hover:border-info/60',
      icon: 'text-info group-hover:text-info',
      iconBg: 'bg-gradient-to-br from-info/20 to-cyan-400/15 group-hover:from-info/30 group-hover:to-cyan-400/25',
      text: 'text-info',
      shadow: 'hover:shadow-info/25',
    },
    violet: {
      base: 'bg-gradient-to-br from-violet/25 via-violet/15 to-transparent border-violet/40',
      hover: 'hover:from-violet/35 hover:via-violet/25 hover:to-violet/15 hover:border-violet/60',
      icon: 'text-violet group-hover:text-violet',
      iconBg: 'bg-gradient-to-br from-violet/20 to-purple-400/15 group-hover:from-violet/30 group-hover:to-purple-400/25',
      text: 'text-violet',
      shadow: 'hover:shadow-violet/25',
    },
    money: {
      base: 'bg-gradient-to-br from-warning/30 via-amber-400/20 to-yellow-300/10 border-warning/50',
      hover: 'hover:from-warning/40 hover:via-amber-400/30 hover:to-yellow-300/20 hover:border-warning/70',
      icon: 'text-amber-600 dark:text-amber-400 group-hover:text-amber-500',
      iconBg: 'bg-gradient-to-br from-warning/25 to-yellow-400/20 group-hover:from-warning/35 group-hover:to-yellow-400/30',
      text: 'text-amber-600 dark:text-amber-400',
      shadow: 'hover:shadow-amber-500/30',
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

  const style = variants[variant];
  const sizeStyle = sizes[size];

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 relative overflow-hidden group",
        style.base,
        style.hover,
        style.shadow,
        sizeStyle.card,
        "shadow-sm hover:shadow-lg",
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
        "rounded-xl flex items-center justify-center transition-all duration-300 relative z-10",
        style.iconBg,
        sizeStyle.iconWrapper
      )}>
        <Icon className={cn(
          sizeStyle.icon, 
          style.icon, 
          "drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
        )} />
      </div>
      
      {/* Label */}
      <span className={cn(
        "font-semibold text-center leading-tight relative z-10 transition-colors",
        sizeStyle.text,
        style.text
      )}>
        {label}
      </span>
    </motion.button>
  );
};

export default QuickActionCard;
