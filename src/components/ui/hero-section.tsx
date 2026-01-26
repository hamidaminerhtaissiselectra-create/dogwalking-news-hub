import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-dog-walking.jpg";
import { Shield, Star, Clock, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const trustIndicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          y,
          scale,
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"
          style={{ opacity }}
        />
      </motion.div>

      {/* Static decorative elements - removed animations for performance */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-2xl" />
      <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-accent/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-16 md:pt-0">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Plateforme #1 en France - 100% sécurisée</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight"
          >
            Promenade de Chien{" "}
            <span className="text-gradient inline-block">
              Partout en France
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Trouvez un promeneur de chien vérifié près de chez vous. 
            Paiement escrow sécurisé, preuves photo obligatoires, assurance incluse.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto w-full sm:w-auto shadow-button" 
                onClick={() => window.location.href = '/find-walkers'}
              >
                Trouver un promeneur
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto backdrop-blur-sm" 
                onClick={() => window.location.href = '/walker/register'}
              >
                Devenir promeneur
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <div className="mt-8 md:mt-12 grid grid-cols-2 md:flex md:justify-center items-center gap-4 md:gap-8 text-xs md:text-sm">
            {[
              { icon: Shield, text: "CNI & casier vérifiés", color: "text-primary" },
              { icon: Star, text: "4.9/5 (2000+ avis)", color: "text-primary" },
              { icon: Clock, text: "Réponse < 1h", color: "text-accent" },
              { icon: MapPin, text: "+50 villes", color: "text-accent" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={trustIndicatorVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 justify-center bg-white/5 backdrop-blur-sm rounded-full px-3 py-1.5"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - simplified */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};
