import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Dog } from "lucide-react";
import { motion } from "framer-motion";

interface RoleChoiceDialogProps {
  open: boolean;
  onChoice: (role: 'owner' | 'walker') => void;
}

const RoleChoiceDialog: React.FC<RoleChoiceDialogProps> = ({ open, onChoice }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Quel espace souhaitez-vous ouvrir ?</DialogTitle>
          <DialogDescription>
            Vous avez accès aux deux tableaux de bord. Choisissez votre rôle actif.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoice('owner')}
            className="flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:border-heart hover:bg-heart/5 border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-heart/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-heart" />
            </div>
            <div>
              <h3 className="font-semibold">Espace Propriétaire</h3>
              <p className="text-sm text-muted-foreground">Gérer mes chiens et réservations</p>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChoice('walker')}
            className="flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all hover:border-primary hover:bg-primary/5 border-border"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Dog className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Espace Promeneur</h3>
              <p className="text-sm text-muted-foreground">Voir mes missions et mes revenus</p>
            </div>
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleChoiceDialog;
