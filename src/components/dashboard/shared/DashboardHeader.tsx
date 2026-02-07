import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, Dog } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  name: string;
  subtitle?: string;
  avatarUrl?: string;
  variant?: 'owner' | 'walker';
  unreadNotifications?: number;
  onSettingsClick?: () => void;
  onNotificationsClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  name,
  subtitle,
  avatarUrl,
  variant = 'owner',
  unreadNotifications = 0,
  onSettingsClick,
  onNotificationsClick
}) => {
  const isOwner = variant === 'owner';
  
  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl p-4 mb-4 relative overflow-hidden shadow-lg",
        isOwner 
          ? "bg-gradient-to-r from-owner via-owner-coral to-[#FF9A5A]" 
          : "bg-gradient-to-r from-walker-navy via-walker to-walker-violet"
      )}
    >
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="absolute right-16 bottom-0 w-20 h-20 bg-white/10 rounded-full blur-lg" />
      </div>
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-14 w-14 border-3 border-white/40 shadow-xl ring-2 ring-white/20 ring-offset-2 ring-offset-transparent">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className={cn(
                "font-bold text-lg",
                isOwner ? "bg-white/20 text-white" : "bg-white/20 text-white"
              )}>
                {name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-stat-green rounded-full border-2 border-white shadow-md" />
          </div>
          <div className="text-white">
            <div className="flex items-center gap-2">
              <Dog className="h-5 w-5 text-white/80" />
              <span className="text-sm font-medium text-white/80">
                {isOwner ? 'Dog Walker' : 'Walker Dashboard'}
              </span>
            </div>
            <h1 className="text-xl font-bold leading-tight drop-shadow-sm">
              Bienvenue, {name}!
            </h1>
            {subtitle && (
              <p className="text-sm text-white/75 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-10 w-10 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-stat-red text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse"
              >
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </motion.span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
            onClick={onSettingsClick}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;