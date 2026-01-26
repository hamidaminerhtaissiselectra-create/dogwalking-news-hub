import { Header } from "@/components/ui/header";
import { TrustBadges } from "@/components/ui/trust-badges";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/ui/seo-head";
import { SEOFAQ } from "@/components/ui/seo-faq";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FloatingContact } from "@/components/ui/floating-contact";
import { ClientReviews } from "@/components/ui/client-reviews";
import { CaseStudies } from "@/components/ui/case-studies";
import { getReviewsByService, getCaseStudiesByService } from "@/data/clientReviewsData";
import { motion } from "framer-motion";
import { 
  Heart, Clock, Shield, Camera, Star, Users, Home,
  CheckCircle, ArrowRight, Award, Smile, Coffee, MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Images uniques pour Dog Sitting
import dogSittingHero from "@/assets/services/dog-sitting-hero.jpg";
import dogSittingConfort from "@/assets/services/dog-sitting-confort.jpg";
import dogSittingJeu from "@/assets/services/dog-sitting-jeu-jardin.jpg";
import dogSittingConfiance from "@/assets/services/dog-sitting-confiance.jpg";
import gardeCommunication from "@/assets/services/garde-communication-suivi.jpg";

// Données pour reviews et case studies
const reviews = getReviewsByService("dog-sitting");
const caseStudies = getCaseStudiesByService("dog-sitting");

const dogSittingFAQs = [
  {
    question: "Quelle est la différence entre dog sitting et garde classique ?",
    answer: "Le dog sitting met l'accent sur la présence humaine continue et l'interaction avec votre chien. Contrairement à une simple garde, le dog sitter passe du temps de qualité avec votre animal : jeux, câlins, promenades régulières. C'est une véritable compagnie, pas juste une surveillance. Votre chien bénéficie d'une attention personnalisée tout au long de la journée."
  },
  {
    question: "Le dog sitter peut-il rester chez moi pendant mon absence ?",
    answer: "Absolument ! C'est même l'une des options les plus demandées. Le dog sitter s'installe chez vous, maintient les routines de votre chien et surveille votre domicile. Votre compagnon reste dans son environnement familier, avec ses repères, son panier et ses jouets habituels. Cette option minimise le stress de la séparation."
  },
  {
    question: "Comment le dog sitter gère-t-il les chiens anxieux ?",
    answer: "Nos dog sitters sont formés pour accompagner les chiens anxieux ou sensibles. Ils utilisent des techniques de renforcement positif, respectent le rythme de l'animal et créent un environnement apaisant. Lors de la réservation, vous pouvez indiquer les particularités de votre chien. Une rencontre préalable est fortement recommandée pour établir la confiance."
  },
  {
    question: "Quelles activités sont proposées pendant le dog sitting ?",
    answer: "Le dog sitting inclut : promenades quotidiennes adaptées, sessions de jeu (balle, frisbee, tir à la corde), moments de détente et câlins, stimulation mentale avec des jouets interactifs, brossage si souhaité. Le programme est personnalisé selon l'énergie et les préférences de votre chien. Vous recevez des photos et vidéos tout au long de la journée."
  },
  {
    question: "Le dog sitting convient-il aux chiots ?",
    answer: "Parfaitement ! Le dog sitting est idéal pour les chiots qui ont besoin de beaucoup d'attention et de sorties fréquentes. Nos dog sitters expérimentés avec les chiots proposent des sorties hygiéniques régulières, de la socialisation douce et un apprentissage des bases. C'est une excellente option pour ne pas interrompre l'éducation de votre chiot."
  },
  {
    question: "Puis-je réserver un dog sitting pour une seule journée ?",
    answer: "Oui, nous proposons des dog sittings à la journée, à la demi-journée ou sur plusieurs jours. La formule journée est parfaite si vous travaillez de longues heures ou si vous avez un événement ponctuel. Pour les absences prolongées, le dog sitting avec hébergement assure une continuité parfaite dans les soins de votre compagnon."
  },
  {
    question: "Comment sont sélectionnés les dog sitters DogWalking ?",
    answer: "Chaque dog sitter passe par un processus de vérification rigoureux : pièce d'identité, casier judiciaire vierge, attestation d'assurance RC professionnelle, références vérifiées. Nous évaluons également leur expérience avec les chiens, leur passion pour les animaux et leur capacité à gérer différentes situations. Seuls 25% des candidats sont acceptés."
  },
  {
    question: "Que se passe-t-il en cas de problème de santé pendant le dog sitting ?",
    answer: "Le dog sitter dispose des coordonnées de votre vétérinaire et des numéros d'urgence. En cas de problème, il vous contacte immédiatement et peut se rendre chez le vétérinaire si nécessaire. Notre assurance couvre les incidents jusqu'à 2 millions d'euros. Vous êtes informé en temps réel de toute situation inhabituelle."
  }
];

const ServiceDogSitting = () => {
  const navigate = useNavigate();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Dog Sitting Professionnel en France",
    "description": "Service de dog sitting par des professionnels vérifiés. Présence humaine continue, attention personnalisée, jeux et câlins pour votre chien. Preuves photo et assurance incluses.",
    "provider": {
      "@type": "Organization",
      "name": "DogWalking",
      "url": "https://dogwalking.fr"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Options de dog sitting",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Dog sitting demi-journée",
          "price": "25",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Dog sitting journée complète",
          "price": "40",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Dog sitting avec nuit",
          "price": "55",
          "priceCurrency": "EUR"
        }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Dog Sitting Professionnel | Présence Humaine & Attention Personnalisée | DogWalking"
        description="Dog sitting par des professionnels vérifiés partout en France. Présence continue, jeux, câlins et promenades pour votre chien. Preuves photo, assurance incluse. Dès 25€."
        keywords="dog sitting, garde chien présence, dog sitter france, compagnie chien, garde personnalisée chien, baby sitting chien"
        canonicalUrl="https://dogwalking.fr/services/dog-sitting"
        structuredData={serviceJsonLd}
        ogImage={dogSittingHero}
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Heart className="w-3 h-3 mr-1" />
                  Présence humaine continue
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Dog Sitting : Une <span className="text-primary">Vraie Compagnie</span> pour Votre Chien
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Bien plus qu'une simple garde, le dog sitting offre à votre compagnon une présence humaine 
                  attentionnée, des jeux, des câlins et des promenades régulières. Votre chien ne sera jamais seul 
                  grâce à nos dog sitters passionnés et vérifiés.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={() => navigate("/walkers?service=dog_sitting")}>
                    Trouver un dog sitter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => navigate("/tarifs")}>
                    Voir les tarifs
                  </Button>
                </div>
                <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>Attention personnalisée</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-primary" />
                    <span>Photos & vidéos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Assurance 2M€</span>
                  </div>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img 
                  src={dogSittingHero} 
                  alt="Dog sitter professionnel avec deux chiens heureux sur un canapé confortable" 
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                />
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Smile className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">98%</p>
                      <p className="text-sm text-muted-foreground">Chiens heureux</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Qu'est-ce que le Dog Sitting */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Qu'est-ce que le Dog Sitting ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Le dog sitting va bien au-delà de la simple surveillance. C'est un service premium où votre chien 
                bénéficie d'une compagnie humaine dédiée, d'activités stimulantes et d'une attention constante. 
                Contrairement à une pension où votre animal est parmi de nombreux autres, le dog sitting offre 
                une expérience personnalisée et chaleureuse.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.img
                src={dogSittingConfort}
                alt="Dog sitter avec un golden retriever heureux sur un canapé"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Présence humaine continue</h3>
                    <p className="text-muted-foreground">
                      Votre chien n'est jamais laissé seul. Le dog sitter reste à ses côtés, joue avec lui, 
                      le promène et lui offre toute l'attention dont il a besoin pour être épanoui.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Routine préservée</h3>
                    <p className="text-muted-foreground">
                      Repas aux heures habituelles, promenades régulières, moments de repos : le dog sitter 
                      respecte scrupuleusement les habitudes de votre compagnon pour minimiser le stress.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Communication permanente</h3>
                    <p className="text-muted-foreground">
                      Recevez des photos, vidéos et messages tout au long de la journée. Vous restez connecté 
                      avec votre chien et pouvez suivre ses aventures en temps réel.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Différence avec garde classique */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Dog Sitting vs Garde Classique : Quelle Différence ?
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-muted/50 p-6 rounded-2xl border border-border"
              >
                <h3 className="text-xl font-bold mb-4 text-muted-foreground">Garde Classique</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-muted-foreground">Surveillance et nourriture basiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-muted-foreground">Interactions limitées avec l'humain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-muted-foreground">Promenades courtes et fonctionnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-muted-foreground">Peu de stimulation mentale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <span className="text-muted-foreground">Mises à jour occasionnelles</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-primary/5 p-6 rounded-2xl border-2 border-primary"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">Dog Sitting DogWalking ✓</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Présence humaine continue et attentionnée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Jeux, câlins et interactions régulières</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Promenades adaptées et enrichissantes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Stimulation mentale avec jouets interactifs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>Photos et vidéos tout au long de la journée</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pour quels profils */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Le Dog Sitting est Idéal Pour...
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <motion.div variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">🐕</div>
                      <h3 className="font-bold mb-2">Chiens sociables</h3>
                      <p className="text-sm text-muted-foreground">
                        Qui adorent la compagnie humaine et ont besoin d'attention
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">🐶</div>
                      <h3 className="font-bold mb-2">Chiots</h3>
                      <p className="text-sm text-muted-foreground">
                        Qui nécessitent des sorties fréquentes et beaucoup de stimulation
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">😰</div>
                      <h3 className="font-bold mb-2">Chiens anxieux</h3>
                      <p className="text-sm text-muted-foreground">
                        Qui supportent mal la solitude et ont besoin de réassurance
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">🏃</div>
                      <h3 className="font-bold mb-2">Chiens énergiques</h3>
                      <p className="text-sm text-muted-foreground">
                        Qui ont besoin de se dépenser et de jouer régulièrement
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
              <motion.img
                src={dogSittingJeu}
                alt="Dog sitter jouant avec un border collie dans un jardin ensoleillé"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </section>

        {/* Encadrement & Sélection */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Des Dog Sitters Rigoureusement Sélectionnés
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nous ne confions votre compagnon qu'à des professionnels passionnés et vérifiés.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.img
                src={dogSittingConfiance}
                alt="Dog sitter établissant un lien de confiance avec un chien timide"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video order-2 lg:order-1"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4 order-1 lg:order-2"
              >
                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-bold">Vérification complète</h3>
                          <p className="text-sm text-muted-foreground">CNI, casier judiciaire, assurance RC pro</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Award className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-bold">Expérience validée</h3>
                          <p className="text-sm text-muted-foreground">Minimum 2 ans d'expérience avec les chiens</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-bold">Avis vérifiés</h3>
                          <p className="text-sm text-muted-foreground">Note moyenne de 4.8/5 sur nos dog sitters</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Users className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-bold">Sélection rigoureuse</h3>
                          <p className="text-sm text-muted-foreground">Seuls 25% des candidats sont acceptés</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Suivi & Communication */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Restez Connecté avec Votre Chien
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Grâce à notre système de preuves photo obligatoires et à la messagerie intégrée, 
                  vous suivez les aventures de votre compagnon en temps réel. Chaque dog sitting 
                  génère un compte-rendu détaillé avec photos, vidéos et observations.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Photos et vidéos envoyées plusieurs fois par jour</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Messagerie directe avec le dog sitter</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Compte-rendu détaillé en fin de mission</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Notifications en temps réel</span>
                  </li>
                </ul>
              </motion.div>
              <motion.img
                src={gardeCommunication}
                alt="Dog sitter envoyant une photo de chien heureux au propriétaire"
                className="rounded-2xl shadow-lg w-full object-cover aspect-video"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Formules de Dog Sitting
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🌤️</div>
                  <h3 className="font-bold text-xl mb-2">Demi-journée</h3>
                  <p className="text-sm text-muted-foreground mb-2">4-5 heures</p>
                  <p className="text-3xl font-bold text-primary mb-4">dès 25€</p>
                  <Button className="w-full" onClick={() => navigate("/walkers?service=dog_sitting")}>
                    Réserver
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow border-2 border-primary">
                <CardContent className="p-6">
                  <Badge className="mb-2">Populaire</Badge>
                  <div className="text-4xl mb-4">☀️</div>
                  <h3 className="font-bold text-xl mb-2">Journée complète</h3>
                  <p className="text-sm text-muted-foreground mb-2">8-10 heures</p>
                  <p className="text-3xl font-bold text-primary mb-4">dès 40€</p>
                  <Button className="w-full" onClick={() => navigate("/walkers?service=dog_sitting")}>
                    Réserver
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🌙</div>
                  <h3 className="font-bold text-xl mb-2">Journée + Nuit</h3>
                  <p className="text-sm text-muted-foreground mb-2">24 heures</p>
                  <p className="text-3xl font-bold text-primary mb-4">dès 55€</p>
                  <Button className="w-full" onClick={() => navigate("/walkers?service=dog_sitting")}>
                    Réserver
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Offrez à Votre Chien la Compagnie qu'il Mérite
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Réservez un dog sitting dès aujourd'hui et partez l'esprit tranquille.
              </p>
              <Button size="lg" variant="secondary" onClick={() => navigate("/walkers?service=dog_sitting")}>
                Trouver un dog sitter maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>


        {/* Section Preuves de Confiance (E-E-A-T) */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi Faire Confiance a DogWalking pour ce Service ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nos garanties de confiance et de securite sont sans equivalent en France.
              </p>
            </div>
            <TrustBadges />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions Fréquentes sur le Dog Sitting
              </h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <SEOFAQ faqs={dogSittingFAQs} />
            </div>
          </div>
        </section>
      </main>
        {/* Client Reviews Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <ClientReviews reviews={reviews} />
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <CaseStudies studies={caseStudies} />
          </div>
        </section>


      <Footer />
      <FloatingContact />
    </div>
  );
};

export default ServiceDogSitting;
