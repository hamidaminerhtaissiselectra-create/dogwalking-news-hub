import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin,
  Shield,
  Clock,
  Star,
  ChevronRight,
  CheckCircle,
  Users,
  Camera,
} from "lucide-react";
import {
  zones,
  services,
  generateLocalBusinessSchema,
} from "@/data/localSeoData";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DepartmentZone() {
  const { slug } = useParams<{ slug: string }>();

  // Extraire le code département du slug (ex: "departement-75" -> "75")
  const deptCode = slug?.replace("departement-", "") || "";

  // Récupérer toutes les zones du département
  const departmentZones = zones.filter((z) => z.department === deptCode);
  const departmentName = departmentZones[0]?.department
    ? `Département ${deptCode}`
    : "Département";

  if (departmentZones.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Département non trouvé</h1>
          <Link to="/zones" className="text-primary hover:underline">
            Voir toutes nos zones d'intervention
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Récupérer les villes principales du département (priorité 1-2)
  const mainCities = departmentZones
    .filter((z) => z.priority <= 2)
    .slice(0, 6);

  const metaTitle = `Promenade & Garde de Chien dans le Département ${deptCode} | DogWalking`;
  const metaDescription = `Trouvez un promeneur de chien de confiance dans le département ${deptCode}. Professionnels vérifiés, assurés. Photos pendant la balade, paiement sécurisé. Réservez en ligne !`;

  // Schéma LocalBusiness pour le département
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `DogWalking Département ${deptCode}`,
    "description": metaDescription,
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": `Département ${deptCode}`,
      "addressCountry": "FR",
    },
    "url": `https://dogwalking.fr/zone/departement-${deptCode}`,
    "telephone": "+33 1 XX XX XX XX",
    "priceRange": "€€",
    "openingHours": "Mo-Su 07:00-21:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
    },
    "serviceType": ["Dog Walking", "Pet Sitting", "Dog Boarding"],
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <link rel="canonical" href={`https://dogwalking.fr/zone/departement-${deptCode}`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="container mx-auto px-4">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                <Link to="/" className="hover:text-foreground">
                  Accueil
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/zones" className="hover:text-foreground">
                  Zones
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">Département {deptCode}</span>
              </nav>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Promenade de Chien dans le Département {deptCode}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                Découvrez nos services de promenade et garde de chien dans toutes
                les villes du département {deptCode}. Promeneurs vérifiés, paiement
                sécurisé, preuves photo obligatoires.
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Promeneurs vérifiés</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.8/5 - 127 avis</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                  <Users className="w-4 h-4" />
                  <span>{departmentZones.length} villes couvertes</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Bar */}
          <section className="bg-primary text-primary-foreground py-4">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-center sm:text-left">
                <strong>+50 promeneurs</strong> disponibles dans le département
                cette semaine
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/find-walkers">
                  Trouver un promeneur
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Villes Principales */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Villes Principales du Département {deptCode}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mainCities.map((city) => (
                  <Card
                    key={city.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{city.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-3">
                        {city.description}
                      </p>
                      <Link
                        to={`/zone/${city.slug}`}
                        className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                      >
                        Voir les promeneurs
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Toutes les Villes */}
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Toutes les Villes du Département {deptCode}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="all-cities">
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold text-base">
                      Afficher les {departmentZones.length} villes
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
                      {departmentZones.map((city) => (
                        <Link
                          key={city.id}
                          to={`/zone/${city.slug}`}
                          className="text-primary hover:underline text-sm flex items-center gap-2"
                        >
                          <MapPin className="w-4 h-4" />
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Nos Services */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Nos Services dans le Département {deptCode}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-3">
                        {service.shortDescription}
                      </p>
                      <Link
                        to="/find-walkers"
                        className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                      >
                        En savoir plus
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
