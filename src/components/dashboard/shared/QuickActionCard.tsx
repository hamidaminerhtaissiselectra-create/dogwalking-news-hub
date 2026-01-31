import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'accent' | 'heart' | 'muted';
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
    primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20 hover:bg-accent/20',
    heart: 'bg-heart/10 text-heart border-heart/20 hover:bg-heart/20',
    muted: 'bg-muted text-muted-foreground border-border hover:bg-muted/80'
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
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border transition-all shadow-sm relative",
        variants[variant],
        sizes[size]
      )}
    >
      {badge && (
        <span className="absolute -top-1 -right-1 px-2 py-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full">
          {badge}
        </span>
      )}
      <Icon className={iconSizes[size]} />
      <span className={cn("font-medium text-center leading-tight", textSizes[size])}>
        {label}
      </span>
    </motion.button>
  );
};

export default QuickActionCard;
