import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { Button } from "./button";

export const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-card rounded-xl shadow-2xl border p-4 min-w-[200px]"
          >
            <p className="font-semibold mb-3 text-sm">Contactez-nous</p>
            <div className="space-y-2">
              <a 
                href="tel:0123456789" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span>01 23 45 67 89</span>
              </a>
              <a 
                href="mailto:contact@dogwalking.fr" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>Email</span>
              </a>
              <a 
                href="/messages" 
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <span>Messagerie</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={!isOpen ? { 
          boxShadow: [
            "0 0 0 0 rgba(var(--primary), 0.4)",
            "0 0 0 15px rgba(var(--primary), 0)",
          ]
        } : {}}
        transition={!isOpen ? { 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeOut"
        } : {}}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
