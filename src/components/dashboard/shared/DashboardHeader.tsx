import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Settings } from "lucide-react";
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
        "rounded-2xl p-4 mb-4",
        isOwner 
          ? "bg-gradient-to-r from-owner to-owner-coral" 
          : "walker-header-gradient"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-14 w-14 border-2 border-white/30 shadow-lg">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-white">
            <h1 className="text-xl font-bold leading-tight drop-shadow-sm">
              Bonjour, {name} 👋
            </h1>
            {subtitle && (
              <p className="text-sm text-white/80">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-stat-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifications > 9 ? '9+' : unreadNotifications}
              </span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white"
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