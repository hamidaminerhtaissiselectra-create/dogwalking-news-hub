import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'accent' | 'heart' | 'muted' | 'walker' | 'owner' | 'success' | 'warning' | 'info' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  badge?: string | number;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  badge
}) => {
  const variants = {
    primary: 'bg-gradient-to-br from-primary/15 to-primary/5 text-primary border-primary/25 hover:from-primary/25 hover:to-primary/15 hover:shadow-primary/20',
    accent: 'bg-gradient-to-br from-accent/15 to-accent/5 text-accent border-accent/25 hover:from-accent/25 hover:to-accent/15 hover:shadow-accent/20',
    heart: 'bg-gradient-to-br from-heart/15 to-heart/5 text-heart border-heart/25 hover:from-heart/25 hover:to-heart/15 hover:shadow-heart/20',
    muted: 'bg-muted text-muted-foreground border-border hover:bg-muted/80',
    walker: 'bg-gradient-to-br from-walker/20 to-info/10 text-walker border-walker/30 hover:from-walker/30 hover:to-info/20 hover:shadow-walker/20',
    owner: 'bg-gradient-to-br from-owner/20 to-heart/10 text-owner border-owner/30 hover:from-owner/30 hover:to-heart/20 hover:shadow-owner/20',
    success: 'bg-gradient-to-br from-success/20 to-primary/10 text-success border-success/30 hover:from-success/30 hover:to-primary/20 hover:shadow-success/20',
    warning: 'bg-gradient-to-br from-warning/20 to-warning/5 text-warning border-warning/30 hover:from-warning/30 hover:to-warning/15 hover:shadow-warning/20',
    info: 'bg-gradient-to-br from-info/20 to-info/5 text-info border-info/30 hover:from-info/30 hover:to-info/15 hover:shadow-info/20',
    violet: 'bg-gradient-to-br from-violet/20 to-violet/5 text-violet border-violet/30 hover:from-violet/30 hover:to-violet/15 hover:shadow-violet/20',
  };

  const sizes = {
    sm: 'p-3 gap-1.5',
    md: 'p-4 gap-2',
    lg: 'p-5 gap-3'
  };

  const iconSizes = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border transition-all shadow-sm relative",
        variants[variant],
        sizes[size],
        "hover:shadow-lg"
      )}
    >
      {badge && (
        <span className="absolute -top-1.5 -right-1.5 px-2 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full shadow-md animate-pulse">
          {badge}
        </span>
      )}
      <Icon className={cn(iconSizes[size], "drop-shadow-sm")} />
      <span className={cn("font-semibold text-center leading-tight", textSizes[size])}>
        {label}
      </span>
    </motion.button>
  );
};

export default QuickActionCard;
