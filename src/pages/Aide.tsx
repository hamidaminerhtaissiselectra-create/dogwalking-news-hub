import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { SEOFAQ } from "@/components/ui/seo-faq";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HelpCircle, Dog, Briefcase, CreditCard, Shield, 
  MessageSquare, MapPin, Clock, Search, ArrowRight,
  CheckCircle, AlertCircle, Phone, Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

// FAQ Data organized by theme
const faqCategories = {
  proprietaires: {
    title: "Propriétaires de chiens",
    icon: Dog,
    description: "Tout savoir sur la réservation et les services",
    faqs: [
      {
        question: "Comment fonctionne DogWalking pour trouver un promeneur ?",
        answer: "C'est simple : entrez votre adresse, choisissez le type de service souhaité (promenade, garde, visite), et découvrez les promeneurs vérifiés disponibles près de chez vous. Consultez leurs profils, avis, tarifs, puis réservez en ligne. Le paiement est sécurisé en escrow jusqu'à réception des preuves photo de la prestation."
      },
      {
        question: "Les promeneurs sont-ils vraiment vérifiés ?",
        answer: "Absolument. Chaque promeneur fournit une pièce d'identité valide, un extrait de casier judiciaire vierge, et une attestation d'assurance responsabilité civile. Notre équipe vérifie manuellement chaque document. Seuls 35% des candidats sont acceptés après ce processus rigoureux."
      },
      {
        question: "Que se passe-t-il si je ne suis pas satisfait de la prestation ?",
        answer: "Grâce à notre système de paiement escrow, votre argent reste bloqué jusqu'à validation de la prestation. Si le promeneur n'envoie pas de preuve photo/vidéo, ou si la prestation ne correspond pas à vos attentes, vous pouvez contester et être remboursé. Notre équipe support intervient sous 24h."
      },
      {
        question: "Puis-je annuler une réservation et être remboursé ?",
        answer: "Oui, vous pouvez annuler gratuitement jusqu'à 24h avant la prestation prévue avec remboursement intégral. Passé ce délai, des frais d'annulation peuvent s'appliquer selon les conditions du promeneur. En cas d'urgence médicale justifiée, contactez notre support."
      },
      {
        question: "Comment ajouter mon chien sur la plateforme ?",
        answer: "Depuis votre tableau de bord, cliquez sur 'Ajouter un chien'. Remplissez les informations essentielles : nom, race, âge, poids, tempérament et besoins spéciaux. Ajoutez une photo pour aider le promeneur à reconnaître votre compagnon."
      },
      {
        question: "Puis-je demander le même promeneur à chaque fois ?",
        answer: "Oui, vous pouvez ajouter un promeneur à vos favoris et le réserver directement depuis votre tableau de bord. Les promeneurs réguliers connaissent mieux votre chien et ses habitudes, ce qui améliore l'expérience."
      }
    ]
  },
  promeneurs: {
    title: "Promeneurs",
    icon: Briefcase,
    description: "Devenir promeneur et gérer son activité",
    faqs: [
      {
        question: "Comment devenir promeneur DogWalking ?",
        answer: "Inscrivez-vous via la page 'Devenir promeneur', complétez votre profil avec vos informations personnelles et votre expérience avec les chiens. Soumettez ensuite vos documents (CNI, casier judiciaire, attestation RC). Notre équipe les vérifie manuellement sous 48h."
      },
      {
        question: "Quels documents sont nécessaires pour s'inscrire ?",
        answer: "Vous devez fournir : une pièce d'identité valide (CNI ou passeport), un extrait de casier judiciaire (bulletin n°3 ou attestation sur l'honneur), une attestation d'assurance responsabilité civile, et une photo de profil professionnelle."
      },
      {
        question: "Comment fixer mes tarifs ?",
        answer: "Vous êtes libre de fixer vos propres tarifs au-dessus des minimums garantis par DogWalking (8€ pour une promenade, 10€ pour une garde). Adaptez vos prix selon votre expérience, votre zone géographique et vos services spécifiques."
      },
      {
        question: "Comment suis-je payé ?",
        answer: "Le paiement est libéré automatiquement après envoi de la preuve de prestation (photo/vidéo obligatoire) et validation par le propriétaire. Vous recevez 87% du montant, les 13% restants couvrent l'assurance, le support et la plateforme."
      },
      {
        question: "L'abonnement PRO est-il obligatoire ?",
        answer: "Non, l'abonnement PRO (6-12€/mois) est totalement optionnel. Il offre des avantages : mise en avant prioritaire, badges premium, statistiques avancées et support prioritaire. Vous pouvez exercer sans abonnement."
      },
      {
        question: "Combien puis-je gagner comme promeneur ?",
        answer: "Les revenus varient selon votre disponibilité et votre zone. En moyenne, un promeneur actif gagne entre 500€ et 1500€/mois. Les promeneurs à temps plein dans les grandes villes peuvent dépasser 2000€/mois."
      }
    ]
  },
  paiement: {
    title: "Paiement & Tarifs",
    icon: CreditCard,
    description: "Comprendre le système de paiement escrow",
    faqs: [
      {
        question: "Comment sont calculés les tarifs sur DogWalking ?",
        answer: "Nous fixons des tarifs minimums garantis pour chaque type de service (à partir de 8€). Chaque promeneur est ensuite libre de fixer ses propres tarifs au-dessus de ces minimums."
      },
      {
        question: "Que comprend la commission de 13% ?",
        answer: "La commission DogWalking de 13% inclut l'assurance responsabilité civile jusqu'à 2M€ pour chaque prestation, le support client disponible 7j/7, la plateforme sécurisée avec messagerie intégrée, et le système de paiement escrow."
      },
      {
        question: "Comment fonctionne le paiement escrow ?",
        answer: "Le paiement est effectué au moment de la réservation mais reste bloqué en compte séquestre sécurisé. Il n'est libéré au promeneur qu'après réception et validation de la preuve de prestation (photo/vidéo obligatoire)."
      },
      {
        question: "Puis-je donner un pourboire au promeneur ?",
        answer: "Oui, vous pouvez donner un pourboire après chaque prestation réussie. Les pourboires sont 100% reversés au promeneur sans aucune commission prélevée par DogWalking."
      },
      {
        question: "Que se passe-t-il si la prestation n'est pas effectuée ?",
        answer: "Si aucune preuve n'est envoyée ou si la prestation n'a pas eu lieu, vous êtes automatiquement remboursé. Notre système escrow protège votre argent jusqu'à validation."
      },
      {
        question: "Quand suis-je débité pour une réservation ?",
        answer: "Le débit intervient au moment de la confirmation de réservation. L'argent reste bloqué en escrow jusqu'à validation de la prestation par le propriétaire."
      }
    ]
  },
  securite: {
    title: "Sécurité & Confiance",
    icon: Shield,
    description: "Nos garanties et processus de vérification",
    faqs: [
      {
        question: "Comment DogWalking vérifie-t-il les promeneurs ?",
        answer: "Chaque candidat passe par un processus rigoureux : vérification d'identité (CNI), contrôle du casier judiciaire, validation de l'assurance responsabilité civile, et entretien de motivation. Seuls 35% des candidats sont acceptés."
      },
      {
        question: "Quelle assurance couvre les prestations ?",
        answer: "Chaque prestation est couverte par une assurance responsabilité civile jusqu'à 2 millions d'euros. Cette assurance couvre les dommages causés par ou au chien pendant la mission."
      },
      {
        question: "Comment signaler un problème ?",
        answer: "Contactez immédiatement notre support via la messagerie intégrée, par email à contact@dogwalking.fr, ou par téléphone au 01 23 45 67 89. Une ligne prioritaire est activée pendant les missions en cours."
      },
      {
        question: "Les preuves photo sont-elles obligatoires ?",
        answer: "Oui, chaque promeneur doit envoyer au minimum une preuve photo ou vidéo pendant la prestation. Sans preuve, le paiement n'est pas libéré et le propriétaire peut demander un remboursement."
      },
      {
        question: "Comment DogWalking protège-t-il mes données ?",
        answer: "Vos données sont stockées de manière sécurisée conformément au RGPD. Nous ne partageons jamais vos informations personnelles avec des tiers sans votre consentement."
      },
      {
        question: "Que faire en cas de litige ?",
        answer: "Contactez notre service médiation via le formulaire de contact. Nous intervenons sous 24h pour trouver une solution équitable. En cas de non-résolution, un remboursement peut être effectué."
      }
    ]
  },
  zones: {
    title: "Zones & Disponibilité",
    icon: MapPin,
    description: "Couverture géographique et disponibilité",
    faqs: [
      {
        question: "DogWalking est-il disponible dans ma ville ?",
        answer: "DogWalking couvre l'ensemble du territoire français avec une présence renforcée en Île-de-France et dans les grandes métropoles (Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille). Entrez votre adresse pour découvrir les promeneurs disponibles."
      },
      {
        question: "Comment trouver un promeneur dans ma zone ?",
        answer: "Utilisez le formulaire de recherche sur la page d'accueil ou la page 'Trouver un promeneur'. Entrez votre adresse et découvrez les promeneurs vérifiés disponibles dans un rayon de 5 à 15 km selon leur zone d'intervention."
      },
      {
        question: "Les promeneurs se déplacent-ils chez moi ?",
        answer: "Oui, pour les services de promenade et visite à domicile, le promeneur vient chercher votre chien chez vous. Pour l'hébergement ou la garderie, vous déposez votre chien chez le promeneur."
      },
      {
        question: "DogWalking s'étend-il aux zones rurales ?",
        answer: "Notre réseau s'étend chaque jour. Si aucun promeneur n'est disponible dans votre zone, vous pouvez créer une alerte pour être notifié dès qu'un promeneur s'inscrit près de chez vous."
      },
      {
        question: "Puis-je changer de zone de recherche ?",
        answer: "Oui, vous pouvez rechercher des promeneurs dans n'importe quelle zone en France. Utile si vous voyagez avec votre chien ou si vous déménagez."
      }
    ]
  }
};

const quickLinks = [
  { title: "Trouver un promeneur", href: "/walkers", icon: Search, variant: "default" as const },
  { title: "Devenir promeneur", href: "/walker/register", icon: Briefcase, variant: "secondary" as const },
  { title: "Nos tarifs", href: "/tarifs", icon: CreditCard, variant: "outline" as const },
  { title: "Nous contacter", href: "/contact", icon: MessageSquare, variant: "outline" as const }
];

const Aide = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("proprietaires");
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial tab from URL params
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && Object.keys(faqCategories).includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Filter FAQs based on search query
  const getFilteredFaqs = () => {
    if (!searchQuery.trim()) return null;
    
    const results: { category: string; question: string; answer: string }[] = [];
    
    Object.entries(faqCategories).forEach(([key, category]) => {
      category.faqs.forEach(faq => {
        if (
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          results.push({ category: category.title, ...faq });
        }
      });
    });
    
    return results;
  };

  const filteredFaqs = getFilteredFaqs();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Centre d'Aide | FAQ DogWalking | Questions Fréquentes"
        description="Trouvez toutes les réponses à vos questions sur DogWalking : réservation, paiement, sécurité, devenir promeneur. Centre d'aide complet avec FAQ structurée."
        canonical="https://dogwalking.fr/aide"
      />
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <HelpCircle className="w-3 h-3 mr-1" />
                Centre d'aide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Comment pouvons-nous vous aider ?
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Trouvez rapidement des réponses à toutes vos questions sur DogWalking, 
                la plateforme n°1 de promenade de chiens en France.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher dans l'aide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 -mt-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={link.variant}
                    className="w-full h-auto py-4 flex-col gap-2"
                    onClick={() => navigate(link.href)}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="text-sm">{link.title}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Search Results */}
        {filteredFaqs && filteredFaqs.length > 0 && (
          <section className="py-8">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {filteredFaqs.length} résultat{filteredFaqs.length > 1 ? "s" : ""} trouvé{filteredFaqs.length > 1 ? "s" : ""}
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                  Effacer la recherche
                </Button>
              </div>
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <Badge variant="outline" className="mb-2">{faq.category}</Badge>
                      <h3 className="font-semibold mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {filteredFaqs && filteredFaqs.length === 0 && (
          <section className="py-8">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Aucun résultat trouvé</h2>
              <p className="text-muted-foreground mb-4">
                Essayez avec d'autres mots-clés ou parcourez les catégories ci-dessous.
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Effacer la recherche
              </Button>
            </div>
          </section>
        )}

        {/* FAQ Categories Tabs */}
        {!filteredFaqs && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-transparent p-0 mb-8">
                  {Object.entries(faqCategories).map(([key, category]) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="flex flex-col items-center gap-2 py-4 px-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl border data-[state=active]:border-primary"
                    >
                      <category.icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{category.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(faqCategories).map(([key, category]) => (
                  <TabsContent key={key} value={key}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">{category.title}</h2>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                      <SEOFAQ faqs={category.faqs} />
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                <CardContent className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Vous n'avez pas trouvé votre réponse ?
                      </h2>
                      <p className="opacity-90 mb-6">
                        Notre équipe support est disponible 7j/7 pour répondre à toutes vos questions.
                        Temps de réponse moyen : moins de 2 heures.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="secondary" onClick={() => navigate("/contact")}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Nous contacter
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                        <Mail className="h-5 w-5" />
                        <div>
                          <p className="font-semibold">Email</p>
                          <p className="text-sm opacity-90">contact@dogwalking.fr</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                        <Phone className="h-5 w-5" />
                        <div>
                          <p className="font-semibold">Téléphone</p>
                          <p className="text-sm opacity-90">01 23 45 67 89</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4">
                        <Clock className="h-5 w-5" />
                        <div>
                          <p className="font-semibold">Disponibilité</p>
                          <p className="text-sm opacity-90">7j/7 - 9h à 20h</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Aide;
