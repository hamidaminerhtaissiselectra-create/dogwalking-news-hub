import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, ChevronDown } from "lucide-react";
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
  const accentColor = variant === 'owner' ? 'border-heart/30' : 'border-primary/30';
  const bgAccent = variant === 'owner' ? 'bg-heart/10' : 'bg-primary/10';
  const textAccent = variant === 'owner' ? 'text-heart' : 'text-primary';

  return (
    <motion.header 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-4"
    >
      <div className="flex items-center gap-3">
        <Avatar className={cn("h-12 w-12 border-2 shadow-lg", accentColor)}>
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback className={cn(bgAccent, textAccent, "font-bold text-lg")}>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-bold text-foreground leading-tight">
            Bonjour, {name} 👋
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-10 w-10 rounded-xl"
          onClick={onNotificationsClick}
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </span>
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-10 w-10 rounded-xl"
          onClick={onSettingsClick}
        >
          <Settings className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;
