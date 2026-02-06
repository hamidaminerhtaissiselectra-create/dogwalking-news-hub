import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface MobileBottomNavProps {
  items: NavItem[];
  activeItem: string;
  onItemChange: (id: string) => void;
  variant?: 'owner' | 'walker';
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  items, 
  activeItem, 
  onItemChange,
  variant = 'owner'
}) => {
  const isOwner = variant === 'owner';
  const activeColor = isOwner ? 'text-owner' : 'text-walker';
  const activeBg = isOwner ? 'bg-owner/10' : 'bg-walker/10';
  const indicatorColor = isOwner ? 'bg-owner' : 'bg-walker';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border/50 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onItemChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 py-2 px-4 rounded-2xl transition-all duration-200 relative min-w-[64px]",
                isActive ? activeBg : "hover:bg-muted/50"
              )}
            >
              <div className="relative">
                <item.icon 
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isActive ? activeColor : "text-muted-foreground"
                  )} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-4 px-1 bg-stat-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? activeColor : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className={cn(
                    "absolute -bottom-0.5 w-10 h-1 rounded-full",
                    indicatorColor
                  )}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;