import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Mission {
  id: string;
  startTime: string;
  endTime: string;
  dogName: string;
  serviceType: string;
  ownerName: string;
  ownerPhoto?: string;
  address: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed';
}

interface TodayMissionsProps {
  missions: Mission[];
  onStartMission: (missionId: string) => void;
  selectedDate: Date;
}

const serviceLabels: Record<string, string> = {
  promenade: "Balade",
  visite: "Visite",
  garde: "Garde",
  veterinaire: "Vétérinaire"
};

const TodayMissions = ({ missions, onStartMission, selectedDate }: TodayMissionsProps) => {
  const dateLabel = selectedDate.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 capitalize">
        Missions du {dateLabel}
      </h2>
      
      {missions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-3">📅</div>
            <p className="font-medium text-muted-foreground">Aucune mission prévue</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Profitez de votre journée libre !</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden transition-all ${
                mission.status === 'in_progress' 
                  ? 'ring-2 ring-primary border-primary' 
                  : 'hover:shadow-md'
              }`}>
                <CardContent className="p-0">
                  <div className="p-4">
                    {/* Horaire */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium text-foreground">
                        {mission.startTime} - {mission.endTime}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        {/* Titre mission */}
                        <h3 className="font-bold text-lg mb-1">
                          {serviceLabels[mission.serviceType] || mission.serviceType} avec {mission.dogName}
                        </h3>
                        
                        {/* Propriétaire */}
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={mission.ownerPhoto} />
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {mission.ownerName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{mission.ownerName}</span>
                        </div>
                        
                        {/* Adresse */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>Adresse: {mission.address}</span>
                        </div>
                      </div>
                      
                      {/* Action */}
                      {mission.status === 'confirmed' && (
                        <Button 
                          onClick={() => onStartMission(mission.id)}
                          className="ml-4 bg-primary hover:bg-primary/90"
                        >
                          Démarrer
                        </Button>
                      )}
                      {mission.status === 'in_progress' && (
                        <Button 
                          variant="outline"
                          className="ml-4 border-primary text-primary"
                        >
                          En cours
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayMissions;
