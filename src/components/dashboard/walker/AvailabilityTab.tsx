import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Save, Loader2, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AvailabilityTabProps { 
  walkerProfile: any; 
}

const DAYS = [
  { id: 'Monday', label: 'Lundi' },
  { id: 'Tuesday', label: 'Mardi' },
  { id: 'Wednesday', label: 'Mercredi' },
  { id: 'Thursday', label: 'Jeudi' },
  { id: 'Friday', label: 'Vendredi' },
  { id: 'Saturday', label: 'Samedi' },
  { id: 'Sunday', label: 'Dimanche' },
];

const WalkerAvailabilityTab = ({ walkerProfile }: AvailabilityTabProps) => {
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [availableDays, setAvailableDays] = useState<string[]>(
    walkerProfile?.available_days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  );
  const [startTime, setStartTime] = useState(
    walkerProfile?.available_hours_start || '08:00'
  );
  const [endTime, setEndTime] = useState(
    walkerProfile?.available_hours_end || '20:00'
  );

  useEffect(() => {
    // Check if there are unsaved changes
    const originalDays = walkerProfile?.available_days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const originalStart = walkerProfile?.available_hours_start || '08:00';
    const originalEnd = walkerProfile?.available_hours_end || '20:00';
    
    const daysChanged = JSON.stringify(availableDays.sort()) !== JSON.stringify([...originalDays].sort());
    const timeChanged = startTime !== originalStart || endTime !== originalEnd;
    
    setHasChanges(daysChanged || timeChanged);
  }, [availableDays, startTime, endTime, walkerProfile]);

  const toggleDay = (dayId: string) => {
    setAvailableDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Erreur", description: "Vous devez être connecté", variant: "destructive" });
        return;
      }

      // Check if walker profile exists
      const { data: existingProfile } = await supabase
        .from('walker_profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (existingProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('walker_profiles')
          .update({
            available_days: availableDays,
            available_hours_start: startTime,
            available_hours_end: endTime,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', session.user.id);

        if (error) throw error;
      } else {
        // Create new walker profile
        const { error } = await supabase
          .from('walker_profiles')
          .insert({
            user_id: session.user.id,
            available_days: availableDays,
            available_hours_start: startTime,
            available_hours_end: endTime
          });

        if (error) throw error;
      }

      toast({ 
        title: "Disponibilités enregistrées", 
        description: "Vos horaires ont été mis à jour avec succès" 
      });
      setHasChanges(false);
    } catch (error: any) {
      console.error('Error saving availability:', error);
      toast({ 
        title: "Erreur", 
        description: error.message || "Impossible de sauvegarder", 
        variant: "destructive" 
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Disponibilités
        </h2>
        <Button 
          onClick={handleSave} 
          disabled={saving || !hasChanges}
          className="gap-2"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : hasChanges ? (
            <Save className="h-4 w-4" />
          ) : (
            <CheckCircle className="h-4 w-4" />
          )}
          {saving ? 'Enregistrement...' : hasChanges ? 'Enregistrer' : 'Sauvegardé'}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Days */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Jours de travail
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            {DAYS.map(day => (
              <div 
                key={day.id} 
                className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                  availableDays.includes(day.id) 
                    ? 'bg-primary/5 border-primary/30 hover:bg-primary/10' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => toggleDay(day.id)}
              >
                <Label htmlFor={day.id} className="font-medium cursor-pointer flex-1">
                  {day.label}
                </Label>
                <Switch 
                  id={day.id} 
                  checked={availableDays.includes(day.id)} 
                  onCheckedChange={() => toggleDay(day.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hours */}
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-muted/50 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Début de journée</Label>
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-4 rounded-xl border bg-background text-lg font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Fin de journée</Label>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-4 rounded-xl border bg-background text-lg font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <p className="font-semibold text-lg mb-3 text-primary">Résumé de vos disponibilités</p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Jours actifs : </span>
                  <strong>{availableDays.length} jour(s)</strong>
                </p>
                <p>
                  <span className="text-muted-foreground">Horaires : </span>
                  <strong>{startTime} - {endTime}</strong>
                </p>
                <p>
                  <span className="text-muted-foreground">Heures/jour : </span>
                  <strong>
                    {(() => {
                      const start = parseInt(startTime.split(':')[0]) + parseInt(startTime.split(':')[1]) / 60;
                      const end = parseInt(endTime.split(':')[0]) + parseInt(endTime.split(':')[1]) / 60;
                      return Math.max(0, end - start).toFixed(1);
                    })()}h
                  </strong>
                </p>
              </div>
              {hasChanges && (
                <p className="text-amber-600 text-sm mt-4 font-medium">
                  ⚠️ Modifications non enregistrées
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default WalkerAvailabilityTab;
