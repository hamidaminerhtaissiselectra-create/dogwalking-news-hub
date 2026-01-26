import { motion } from "framer-motion";
import { Shield, Camera, Lock, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

// Import images - UNIQUES et distinctes
import verificationBadge from "@/assets/trust/verification-badge.jpg";
import photoProof from "@/assets/homepage/photo-proof.jpg";
import validationPayment from "@/assets/homepage/validation-payment.jpg";
import familleHeureuse from "@/assets/testimonials/famille-heureuse-chien.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const HomeIntroSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Promeneurs 100% Vérifiés",
      description: "Chaque promeneur fournit une pièce d'identité, un casier judiciaire vierge et une assurance RC professionnelle. Notre équipe vérifie manuellement chaque candidature.",
      highlight: "Seuls 35% des candidats acceptés",
      image: verificationBadge,
      color: "from-primary/20 to-primary/10"
    },
    {
      icon: Lock,
      title: "Paiement Escrow Sécurisé",
      description: "Votre argent reste bloqué jusqu'à réception des preuves photo/vidéo de la prestation. Sans validation, vous êtes automatiquement remboursé.",
      highlight: "Innovation unique en France",
      image: validationPayment,
      color: "from-accent/20 to-accent/10"
    },
    {
      icon: Camera,
      title: "Preuves Photo Obligatoires",
      description: "À chaque mission, le promeneur envoie des photos et vidéos de votre chien via notre plateforme sécurisée. Suivez les aventures de votre compagnon.",
      highlight: "Transparence totale",
      image: photoProof,
      color: "from-primary/15 to-accent/15"
    },
    {
      icon: Award,
      title: "Assurance Premium Incluse",
      description: "Chaque promenade est couverte par une assurance jusqu'à 2 millions d'euros. En cas d'incident, notre équipe gère toutes les démarches.",
      highlight: "Protection 100% sans frais",
      image: familleHeureuse,
      color: "from-accent/20 to-primary/10"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            Pourquoi nous choisir
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
            Pourquoi Choisir DogWalking pour Promener Votre Chien ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            DogWalking connecte les propriétaires de chiens avec des <strong className="text-foreground">promeneurs vérifiés</strong> dans 
            toute la France. De <a href="/zones/paris" className="text-primary hover:underline font-medium">Paris</a> à 
            <a href="/zones/lyon" className="text-primary hover:underline font-medium ml-1">Lyon</a>, de 
            <a href="/zones/marseille" className="text-primary hover:underline font-medium ml-1">Marseille</a> à 
            <a href="/zones/bordeaux" className="text-primary hover:underline font-medium ml-1">Bordeaux</a> : 
            trouvez un professionnel de confiance près de chez vous.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-2/5 h-48 lg:h-auto relative overflow-hidden">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-card via-card/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="lg:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div 
                      className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{feature.highlight}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-primary via-primary to-primary/80 rounded-3xl p-8 lg:p-12 text-primary-foreground overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative grid md:grid-cols-3 gap-8 text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">50 000+</div>
              <div className="text-primary-foreground/80">Promenades réalisées</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">4.9/5</div>
              <div className="text-primary-foreground/80">Note moyenne</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2">2 000+</div>
              <div className="text-primary-foreground/80">Promeneurs vérifiés</div>
            </motion.div>
          </div>
          
          <div className="relative text-center">
            <p className="text-lg text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Rejoignez les milliers de propriétaires qui nous font confiance et offrez à votre chien l'attention qu'il mérite.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/find-walkers")}
              className="group"
            >
              Trouver un promeneur
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
