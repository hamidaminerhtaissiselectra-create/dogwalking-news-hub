import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Dog, Briefcase, Check, ArrowRight, Shield, Camera, 
  CreditCard, Clock, Euro, Users, Star, MapPin, Heart
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const UserTypesSection = () => {
  const navigate = useNavigate();

  const ownerBenefits = [
    { text: "Promeneurs avec CNI et casier vérifiés", icon: Shield },
    { text: "Preuves photo/vidéo obligatoires", icon: Camera },
    { text: "Paiement sécurisé en escrow", icon: CreditCard },
    { text: "Assurance RC incluse (2M€)", icon: Shield },
    { text: "Avis certifiés et badges de qualité", icon: Star },
    { text: "Support réactif 7j/7", icon: Users }
  ];

  const walkerBenefits = [
    { text: "Revenus complémentaires attractifs", icon: Euro },
    { text: "Emploi du temps 100% flexible", icon: Clock },
    { text: "Assurance professionnelle fournie", icon: Shield },
    { text: "Paiements rapides et sécurisés", icon: CreditCard },
    { text: "Badges et reconnaissance", icon: Star },
    { text: "Formation aux premiers secours", icon: Heart }
  ];

  const ownerStats = [
    { value: "2 500+", label: "Promeneurs actifs" },
    { value: "4.9/5", label: "Note moyenne" },
    { value: "< 24h", label: "Temps de réponse" }
  ];

  const walkerStats = [
    { value: "500-1500€", label: "Revenus moyens/mois" },
    { value: "87%", label: "Reversé au promeneur" },
    { value: "48h", label: "Validation profil" }
  ];

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Users className="w-3 h-3 mr-1" />
            Rejoignez-nous
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choisissez votre profil
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Que vous soyez propriétaire de chien ou passionné souhaitant devenir promeneur, 
            DogWalking vous offre une expérience unique, sécurisée et transparente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Propriétaires Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-2 hover:border-primary/50 transition-colors shadow-lg overflow-hidden">
              <div className="bg-gradient-primary p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20">
                    <Dog className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Propriétaires</h3>
                    <p className="text-white/80">Trouvez le promeneur idéal pour votre compagnon</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 border-b">
                {ownerStats.map((stat, index) => (
                  <div key={index} className="p-4 text-center border-r last:border-r-0">
                    <p className="text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  Confiez votre chien à des professionnels vérifiés. Notre processus de sélection 
                  rigoureux garantit que seuls les meilleurs promeneurs rejoignent notre réseau. 
                  Recevez des preuves photo à chaque promenade et payez en toute sécurité.
                </p>

                <ul className="space-y-3 mb-6">
                  {ownerBenefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm">{benefit.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 group" 
                    size="lg"
                    onClick={() => navigate('/walkers')}
                  >
                    Trouver un promeneur
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/aide?tab=proprietaires')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Promeneurs Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border-2 hover:border-accent/50 transition-colors shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-accent to-ocean p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20">
                    <Briefcase className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Promeneurs</h3>
                    <p className="text-white/80">Gagnez en faisant ce que vous aimez</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 border-b">
                {walkerStats.map((stat, index) => (
                  <div key={index} className="p-4 text-center border-r last:border-r-0">
                    <p className="text-xl font-bold text-accent">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  Rejoignez notre réseau de promeneurs professionnels. Fixez librement vos tarifs, 
                  choisissez vos horaires et zones d'intervention. Bénéficiez d'une assurance 
                  professionnelle et recevez vos paiements de manière sécurisée sous 48h.
                </p>

                <ul className="space-y-3 mb-6">
                  {walkerBenefits.map((benefit, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span className="text-sm">{benefit.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    className="flex-1 group bg-accent hover:bg-accent/90" 
                    size="lg"
                    onClick={() => navigate('/walker/register')}
                  >
                    Devenir promeneur
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate('/aide?tab=promeneurs')}
                  >
                    En savoir plus
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Des questions ? Notre équipe est là pour vous accompagner.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/aide')}>
              Consulter l'aide
            </Button>
            <Button variant="ghost" onClick={() => navigate('/contact')}>
              Nous contacter
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
