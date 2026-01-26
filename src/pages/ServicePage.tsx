import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/seo/SEOHead";
import { getServiceBySlug } from "@/data/servicesData";
import { ArrowRight, Check, Clock, MapPin, Search, Dog, Cat, Shield, Award, Heart, Users, Star, CheckCircle2, Sparkles, Eye, ThumbsUp, Zap, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedIcon } from "@/components/ui/animated-icon";
import { AnimatedCard, AnimatedGrid, AnimatedGridItem } from "@/components/ui/animated-card";
import { SectionHeader } from "@/components/ui/section-header";
import { FloatingContact } from "@/components/ui/floating-contact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import NotFound from "./NotFound";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [animalType, setAnimalType] = useState<"chien" | "chat">("chien");

  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <NotFound />;
  }

  const handleSearch = () => {
    navigate(`/walkers?service=${service.id}&address=${encodeURIComponent(address)}`);
  };

  // Schema.org structured data
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": "DogWalking",
      "url": "https://dogwalking.fr"
    },
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "offers": {
      "@type": "Offer",
      "price": service.minPrice,
      "priceCurrency": "EUR"
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://dogwalking.fr" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://dogwalking.fr/#services" },
      { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://dogwalking.fr/services/${service.slug}` }
    ]
  };

  return (
    <>
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonical={`https://dogwalking.fr/services/${service.slug}`}
        type="service"
      />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>

      <div className="min-h-screen bg-background">
        <Header />

        {/* 1️⃣ HERO SECTION - Animée avec image de fond */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Image de fond animée */}
          <motion.div 
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <img 
              src={service.heroImage} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="max-w-2xl"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Breadcrumb */}
              <motion.nav 
                className="text-sm text-muted-foreground mb-6"
                variants={fadeInUp}
              >
                <a href="/" className="hover:text-primary transition-colors">Accueil</a>
                <span className="mx-2">/</span>
                <a href="/#services" className="hover:text-primary transition-colors">Services</a>
                <span className="mx-2">/</span>
                <span className="text-foreground font-medium">{service.title}</span>
              </motion.nav>

              {/* Badge */}
              <motion.div variants={scaleIn} className="mb-4">
                <Badge className="bg-primary/15 text-primary border-0 text-sm py-1.5 px-4">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Service vérifié & assuré
                </Badge>
              </motion.div>

              {/* H1 animé */}
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                variants={fadeInUp}
              >
                {service.h1}
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-4 leading-relaxed"
                variants={fadeInUp}
              >
                {service.heroDescription}
              </motion.p>
              
              {/* Zone mention */}
              <motion.div 
                className="flex items-center gap-2 text-primary font-medium mb-8"
                variants={fadeInUp}
              >
                <MapPin className="h-5 w-5" />
                <span>{service.localZoneMention}</span>
              </motion.div>

              {/* Badges info */}
              <motion.div 
                className="flex flex-wrap gap-4 mb-10"
                variants={fadeInUp}
              >
                <Badge className="bg-primary/15 text-primary border-0 text-base py-2 px-4 backdrop-blur-sm">
                  <Clock className="h-4 w-4 mr-2" />{service.duration}
                </Badge>
                <Badge className="bg-accent/15 text-accent border-0 text-base py-2 px-4 backdrop-blur-sm">
                  <Star className="h-4 w-4 mr-2" />Dès {service.minPrice}€
                </Badge>
                <Badge className="bg-emerald-500/15 text-emerald-600 border-0 text-base py-2 px-4 backdrop-blur-sm">
                  <Shield className="h-4 w-4 mr-2" />Assurance 2M€
                </Badge>
              </motion.div>

              {/* Formulaire de recherche animé */}
              <motion.div 
                className="bg-card/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-border/50"
                variants={fadeInUp}
                whileHover={{ boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.25)" }}
              >
                <div className="flex gap-3 mb-5">
                  <motion.button 
                    onClick={() => setAnimalType("chien")} 
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                      animalType === "chien" 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted/80 text-muted-foreground hover:bg-muted"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Dog className="h-4 w-4" />Chien
                  </motion.button>
                  <motion.button 
                    onClick={() => setAnimalType("chat")} 
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                      animalType === "chat" 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted/80 text-muted-foreground hover:bg-muted"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Cat className="h-4 w-4" />Chat
                  </motion.button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Votre adresse ou ville..." 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      className="pl-12 h-14 text-base rounded-xl border-border/50 bg-background/50"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 rounded-xl text-base font-semibold" onClick={handleSearch}>
                    <Search className="h-5 w-5 mr-2" />Rechercher
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2️⃣ GALERIE D'IMAGES avec présentation enrichie */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Images en grille créative animée */}
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <div className="space-y-4">
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    className="overflow-hidden rounded-2xl shadow-lg"
                  >
                    <img 
                      src={service.images[0]?.src} 
                      alt={service.images[0]?.alt}
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  </motion.div>
                  {service.images[2] && (
                    <motion.div
                      variants={scaleIn}
                      whileHover={{ scale: 1.03, rotate: -1 }}
                      className="overflow-hidden rounded-2xl shadow-lg"
                    >
                      <img 
                        src={service.images[2].src} 
                        alt={service.images[2].alt}
                        className="w-full h-32 md:h-40 object-cover"
                      />
                    </motion.div>
                  )}
                </div>
                <div className="pt-8">
                  {service.images[1] && (
                    <motion.div
                      variants={scaleIn}
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      className="overflow-hidden rounded-2xl shadow-lg"
                    >
                      <img 
                        src={service.images[1].src} 
                        alt={service.images[1].alt}
                        className="w-full h-56 md:h-72 object-cover"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Contenu texte enrichi */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="bg-accent/10 text-accent mb-4">
                  <Eye className="h-3 w-3 mr-1" />
                  Présentation détaillée
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Tout savoir sur notre service de {service.title.toLowerCase()}
                </h2>
                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                  <p>{service.description.intro}</p>
                  <p className="text-foreground font-medium">
                    Avec DogWalking, vous bénéficiez d'un réseau de professionnels passionnés, 
                    formés aux meilleures pratiques de l'accompagnement animalier. Chaque prestation 
                    est personnalisée selon les besoins uniques de votre compagnon, garantissant 
                    ainsi une expérience optimale pour lui comme pour vous.
                  </p>
                </div>
                
                <AnimatedGrid className="grid-cols-2 gap-4 mt-8" staggerDelay={0.1}>
                  <AnimatedGridItem>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                      <AnimatedIcon icon={CheckCircle2} size="sm" variant="primary" />
                      <span className="font-medium">100% vérifiés & assurés</span>
                    </div>
                  </AnimatedGridItem>
                  <AnimatedGridItem>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
                      <AnimatedIcon icon={Star} size="sm" variant="accent" />
                      <span className="font-medium">Avis vérifiés</span>
                    </div>
                  </AnimatedGridItem>
                  <AnimatedGridItem>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                      <AnimatedIcon icon={ThumbsUp} size="sm" variant="success" />
                      <span className="font-medium">Satisfaction garantie</span>
                    </div>
                  </AnimatedGridItem>
                  <AnimatedGridItem>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
                      <AnimatedIcon icon={Zap} size="sm" variant="warning" />
                      <span className="font-medium">Réponse rapide</span>
                    </div>
                  </AnimatedGridItem>
                </AnimatedGrid>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3️⃣ À QUI S'ADRESSE CE SERVICE - Section enrichie */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <SectionHeader
              title="À qui s'adresse ce service ?"
              subtitle="Découvrez si notre service répond à vos besoins et à ceux de votre compagnon"
              icon={Users}
              iconVariant="accent"
              badge="Pour vous"
            />
            
            <AnimatedGrid className="md:grid-cols-2 gap-8" staggerDelay={0.15}>
              <AnimatedGridItem>
                <AnimatedCard className="p-8" glow>
                  <AnimatedIcon icon={Users} size="lg" variant="primary" className="mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Profils idéaux</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{service.description.forWhom}</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Professionnels aux horaires chargés</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Personnes à mobilité réduite</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Propriétaires de chiens énergiques</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Nouveaux propriétaires de chiots</span>
                    </li>
                  </ul>
                </AnimatedCard>
              </AnimatedGridItem>
              
              <AnimatedGridItem>
                <AnimatedCard className="p-8" glow>
                  <AnimatedIcon icon={Zap} size="lg" variant="warning" className="mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Problèmes résolus</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{service.description.problemsSolved}</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>Manque d'exercice et surpoids</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>Anxiété de séparation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>Comportements destructeurs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-amber-500 flex-shrink-0" />
                      <span>Problèmes de socialisation</span>
                    </li>
                  </ul>
                </AnimatedCard>
              </AnimatedGridItem>
            </AnimatedGrid>
            
            {/* Bénéfices */}
            <motion.div 
              className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                <AnimatedIcon icon={Heart} size="xl" variant="primary" float />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Les bénéfices pour votre animal</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">{service.description.benefits}</p>
                  <p className="text-foreground font-medium">
                    Un animal bien stimulé physiquement et mentalement est un compagnon plus équilibré, 
                    plus heureux et plus facile à vivre au quotidien. Investir dans son bien-être, 
                    c'est investir dans votre relation avec lui.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4️⃣ DÉROULEMENT DU SERVICE - Timeline animée */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <SectionHeader
              title={service.howItWorks.title}
              subtitle={service.howItWorks.intro}
              icon={Sparkles}
              iconVariant="accent"
              badge="Comment ça marche"
            />
            
            {/* Étapes avec timeline animée */}
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />
              
              <div className="space-y-8">
                {service.howItWorks.steps.map((step, index) => (
                  <motion.div 
                    key={index}
                    className={`flex flex-col md:flex-row gap-6 items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <AnimatedCard className="p-6 max-w-lg inline-block text-left" delay={index * 0.1}>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </AnimatedCard>
                    </div>
                    
                    <motion.div 
                      className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-xl shadow-lg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {index + 1}
                    </motion.div>
                    
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sécurité et bien-être - Cards animées */}
            <AnimatedGrid className="md:grid-cols-2 gap-6 mt-16" staggerDelay={0.15}>
              <AnimatedGridItem>
                <AnimatedCard className="p-8" glow>
                  <AnimatedIcon icon={Shield} size="lg" variant="primary" className="mb-5" />
                  <h3 className="text-xl font-bold mb-3">Sécurité garantie</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.howItWorks.safety}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-primary border-primary/30">GPS temps réel</Badge>
                    <Badge variant="outline" className="text-primary border-primary/30">Assurance 2M€</Badge>
                    <Badge variant="outline" className="text-primary border-primary/30">Support 7j/7</Badge>
                  </div>
                </AnimatedCard>
              </AnimatedGridItem>
              <AnimatedGridItem>
                <AnimatedCard className="p-8" glow>
                  <AnimatedIcon icon={Heart} size="lg" variant="accent" className="mb-5" />
                  <h3 className="text-xl font-bold mb-3">Bien-être animal</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.howItWorks.dogWelfare}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-accent border-accent/30">Renforcement positif</Badge>
                    <Badge variant="outline" className="text-accent border-accent/30">Respect du rythme</Badge>
                    <Badge variant="outline" className="text-accent border-accent/30">Hydratation</Badge>
                  </div>
                </AnimatedCard>
              </AnimatedGridItem>
            </AnimatedGrid>
          </div>
        </section>

        {/* 5️⃣ EXPERTISE & AVANTAGES - Section enrichie */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <SectionHeader
              title="Notre expertise et vos avantages"
              subtitle="Une équipe de professionnels passionnés pour un service d'excellence"
              icon={Award}
              iconVariant="primary"
              badge="Nos engagements"
            />
            
            {/* 4 piliers d'expertise - Grille animée */}
            <AnimatedGrid className="sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.1}>
              <AnimatedGridItem>
                <AnimatedCard className="text-center p-6" hover glow>
                  <AnimatedIcon icon={Award} size="lg" variant="primary" className="mx-auto mb-4" pulse />
                  <h3 className="font-bold text-lg mb-2">Expérience</h3>
                  <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.experience}</p>
                </AnimatedCard>
              </AnimatedGridItem>
              <AnimatedGridItem>
                <AnimatedCard className="text-center p-6" hover glow>
                  <AnimatedIcon icon={Shield} size="lg" variant="accent" className="mx-auto mb-4" pulse />
                  <h3 className="font-bold text-lg mb-2">Assurance</h3>
                  <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.insurance}</p>
                </AnimatedCard>
              </AnimatedGridItem>
              <AnimatedGridItem>
                <AnimatedCard className="text-center p-6" hover glow>
                  <AnimatedIcon icon={Heart} size="lg" variant="success" className="mx-auto mb-4" pulse />
                  <h3 className="font-bold text-lg mb-2">Méthode</h3>
                  <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.method}</p>
                </AnimatedCard>
              </AnimatedGridItem>
              <AnimatedGridItem>
                <AnimatedCard className="text-center p-6" hover glow>
                  <AnimatedIcon icon={Users} size="lg" variant="warning" className="mx-auto mb-4" pulse />
                  <h3 className="font-bold text-lg mb-2">Confiance</h3>
                  <p className="text-sm text-muted-foreground">{service.expertiseAdvantages.trust}</p>
                </AnimatedCard>
              </AnimatedGridItem>
            </AnimatedGrid>

            {/* Liste des avantages - Grille animée */}
            <motion.div 
              className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-3xl p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                Tous les avantages de notre service
              </h3>
              <AnimatedGrid className="sm:grid-cols-2 gap-4" staggerDelay={0.05}>
                {service.advantages.map((advantage, index) => (
                  <AnimatedGridItem key={index}>
                    <motion.div 
                      className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-sm border border-border hover:border-primary/30 transition-colors"
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <motion.div 
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Check className="h-5 w-5 text-primary" />
                      </motion.div>
                      <span className="text-foreground">{advantage}</span>
                    </motion.div>
                  </AnimatedGridItem>
                ))}
              </AnimatedGrid>
            </motion.div>
          </div>
        </section>

        {/* 6️⃣ ZONES D'INTERVENTION - Section animée */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <AnimatedIcon icon={MapPin} size="xl" variant="primary" className="mx-auto mb-6" float />
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Zones d'intervention
            </motion.h2>
            
            <motion.div 
              className="space-y-4 text-muted-foreground text-lg max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>{service.localAvailability.mainCity}</p>
              <p>{service.localAvailability.surroundingAreas}</p>
              <p className="font-medium text-foreground">{service.localAvailability.coverage}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8" 
                onClick={() => navigate('/zones')}
              >
                Voir toutes les zones couvertes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* 7️⃣ FAQ - Section animée */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <SectionHeader
              title="Questions fréquentes"
              subtitle="Toutes les réponses à vos questions sur notre service"
              icon={MessageCircle}
              iconVariant="accent"
              badge="FAQ"
            />
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {service.faq.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                  >
                    <AccordionItem 
                      value={`item-${index}`}
                      className="bg-card rounded-2xl border border-border px-6 shadow-sm hover:border-primary/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-lg py-5 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* 8️⃣ CTA FINAL - Section animée */}
        <section className="py-20 px-4 bg-gradient-to-r from-primary via-primary to-accent relative overflow-hidden">
          <motion.div 
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 0.5, 0.8] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Trouvez un professionnel près de chez vous
            </motion.h2>
            <motion.p 
              className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Des professionnels vérifiés vous attendent pour prendre soin de votre animal. 
              Réservez en quelques clics et profitez d'un service d'exception.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-shadow"
                onClick={() => navigate(`/walkers?service=${service.id}`)}
              >
                Rechercher un professionnel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-10 py-6 text-lg font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => navigate('/contact')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Nous contacter
              </Button>
            </motion.div>
          </div>
        </section>

        <Footer />
        <FloatingContact />
      </div>
    </>
  );
};

export default ServicePage;
