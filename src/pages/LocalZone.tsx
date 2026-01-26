import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Shield, Clock, Star, ChevronRight, CheckCircle, Users, Camera } from 'lucide-react';
import { zones, services, generateLocalFAQ, generateLocalBusinessSchema } from '@/data/localSeoData';
import { getReviewsByLocation, getCaseStudiesByLocation } from '@/data/clientReviewsData';
import { ClientReviews } from '@/components/ui/client-reviews';
import { CaseStudies } from '@/components/ui/case-studies';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LocalZone() {
  const { slug } = useParams<{ slug: string }>();
  const zone = zones.find(z => z.slug === slug);
  const parentZone = zone?.parent ? zones.find(z => z.id === zone.parent) : null;

  if (!zone) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Zone non trouvée</h1>
          <Link to="/zones" className="text-primary hover:underline">
            Voir toutes nos zones d'intervention
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const mainService = services[0]; // Promenade par défaut
  const faqs = generateLocalFAQ(zone, mainService);
  const jsonLd = generateLocalBusinessSchema(zone);
  
  const metaTitle = `Promenade & Garde de Chien à ${zone.name} | Dog Walkers Vérifiés`;
  const metaDescription = `Trouvez un promeneur de chien de confiance à ${zone.name}. Professionnels vérifiés, assurés. Photos pendant la balade, paiement sécurisé. Réservez en ligne !`;

  // Zones liées (même parent ou même priorité)
  const relatedZones = zones.filter(z => 
    z.id !== zone.id && 
    (z.parent === zone.id || z.parent === zone.parent || z.priority === zone.priority)
  ).slice(0, 6);

  // Maillage géographique : Villes voisines du même département (Silotage)
  const sameDepartmentZones = zones.filter(z => 
    z.id !== zone.id && 
    z.department === zone.department
  ).sort((a, b) => a.priority - b.priority).slice(0, 8);;

  // Avis clients et études de cas pour cette zone
  const reviews = getReviewsByLocation(zone.name);
  const caseStudies = getCaseStudiesByLocation(zone.name);

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={zone.image} />
        <link rel="canonical" href={`https://dogwalking-connect.fr/zone/${zone.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <img
              src={zone.image}
              alt={zone.altText}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-8 md:pb-12">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-white/70 text-sm mb-4">
                  <Link to="/" className="hover:text-white">Accueil</Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link to="/zones" className="hover:text-white">Zones</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to={`/zone/departement-${zone.department}`} className="hover:text-foreground">
                  Département {zone.department}
                </Link>
                  {parentZone && (
                    <>
                      <ChevronRight className="w-4 h-4" />
                      <Link to={`/zone/${parentZone.slug}`} className="hover:text-white">{parentZone.name}</Link>
                    </>
                  )}
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white">{zone.name}</span>
                </nav>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Promenade de Chien à {zone.name}
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                  {zone.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-6">
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Promeneurs vérifiés</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.8/5 - 127 avis</span>
                  </div>
                  {zone.population && (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                      <Users className="w-4 h-4" />
                      <span>{zone.population} habitants</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Bar */}
          <section className="bg-primary text-primary-foreground py-4">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-center sm:text-left">
                <strong>+50 promeneurs</strong> disponibles à {zone.name} cette semaine
              </p>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/find-walkers">
                  Trouver un promeneur
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <article className="prose prose-lg max-w-none">
                    <h2>Pourquoi choisir DogWalking Connect à {zone.name} ?</h2>
                    
                    <h3>Des professionnels de confiance près de chez vous</h3>
                    <p>
                      Vous recherchez un service de promenade de chien à {zone.name} ? 
                      DogWalking Connect vous met en relation avec des promeneurs et gardiens 
                      de chien vérifiés et passionnés dans votre quartier.
                    </p>
                    
                    <p>
                      Tous nos dog walkers à {zone.name} passent par un processus de vérification rigoureux :
                    </p>
                    
                    <ul>
                      <li><strong>Vérification d'identité</strong> complète</li>
                      <li><strong>Casier judiciaire</strong> vierge exigé</li>
                      <li><strong>Assurance responsabilité civile</strong> professionnelle</li>
                      <li><strong>Entretien</strong> avec notre équipe</li>
                    </ul>

                    <h3>Les meilleurs spots de {zone.name} pour votre chien</h3>
                    <p>
                      Nos promeneurs connaissent parfaitement {zone.name} et ses environs. 
                      Ils emmèneront votre compagnon dans les plus beaux endroits :
                    </p>
                    <ul>
                      {zone.highlights.map((spot, i) => (
                        <li key={i}>{spot}</li>
                      ))}
                    </ul>

                    {zone.population && (
                      <p>
                        Avec <strong>{zone.population} habitants</strong>, {zone.name} compte 
                        de nombreux propriétaires de chiens qui nous font confiance au quotidien.
                      </p>
                    )}

                    <h3>Comment ça marche ?</h3>
                    <ol>
                      <li><strong>Trouvez</strong> un promeneur disponible à {zone.name}</li>
                      <li><strong>Réservez</strong> en ligne en quelques clics</li>
                      <li><strong>Suivez</strong> la promenade en temps réel avec photos</li>
                      <li><strong>Payez</strong> en toute sécurité (paiement libéré après validation)</li>
                    </ol>
                  </article>

                  {/* Services Cards */}
                  <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">Nos services à {zone.name}</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground text-sm mb-3">{service.shortDescription}</p>
                            <Link 
                              to={`/zone/${zone.slug}/${service.slug}`}
                              className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                            >
                              En savoir plus <ChevronRight className="w-4 h-4" />
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Section - Semantic HTML5 <details> pour IA-Ready */}
                  <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6">Questions frequentes - {zone.name}</h2>
                    <div className="space-y-2">
                      {faqs.map((faq, index) => (
                        <details
                          key={index}
                          className="group border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-base hover:bg-muted/50 transition-colors">
                            <span>{faq.question}</span>
                            <span className="text-muted-foreground group-open:rotate-180 transition-transform duration-300">
                              ▼
                            </span>
                          </summary>
                          <div className="px-4 pb-4 pt-0 text-muted-foreground border-t border-border">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-4 space-y-6">
                    {/* Booking Card */}
                    <Card className="border-primary">
                      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
                        <CardTitle className="text-center">Réservez maintenant</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Disponibilité 7j/7</p>
                              <p className="text-sm text-muted-foreground">De 7h à 21h</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Camera className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Photos en direct</p>
                              <p className="text-sm text-muted-foreground">Pendant la promenade</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">100% sécurisé</p>
                              <p className="text-sm text-muted-foreground">Paiement après validation</p>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full mt-6" size="lg" asChild>
                          <Link to="/find-walkers">
                            Voir les promeneurs disponibles
                          </Link>
                        </Button>
                        <p className="text-center text-sm text-muted-foreground mt-3">
                          À partir de <strong>15€</strong> la promenade
                        </p>
                      </CardContent>
                    </Card>

                    {/* Trust Badges */}
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Garanties DogWalking</h3>
                        <div className="space-y-3">
                          {[
                            'Promeneurs vérifiés et assurés',
                            'Photos et compte-rendu après chaque promenade',
                            'Paiement sécurisé par escrow',
                            'Service client réactif 7j/7',
                            'Annulation gratuite 24h avant'
                          ].map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Maillage Geographique : Villes du meme departement (Silotage) */}
          {sameDepartmentZones.length > 0 && (
            <section className="py-12 bg-primary/5 border-t border-b">
              <div className="container mx-auto px-4">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Autres villes du departement {zone.department}
                  </h2>
                  <p className="text-muted-foreground">
                    Decouvrez nos services de promenade et garde de chien dans les autres villes de votre departement. 
                    Meme qualite, memes garanties, promeneurs verifies partout.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {sameDepartmentZones.map((z) => (
                    <Link key={z.id} to={`/zone/${z.slug}`} className="group">
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full hover:border-primary">
                        <div className="relative h-20 overflow-hidden">
                          <img
                            src={z.image}
                            alt={z.altText}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-1 left-2 right-2">
                            <p className="text-white font-medium text-xs truncate">{z.name}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Related Zones */}
          {relatedZones.length > 0 && (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Autres zones a proximite</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {relatedZones.map((z) => (
                    <Link key={z.id} to={`/zone/${z.slug}`}>
                      <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 h-full">
                        <div className="relative h-24 overflow-hidden">
                          <img
                            src={z.image}
                            alt={z.altText}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-white font-medium text-sm truncate">{z.name}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

                {/* Client Reviews Section */}
        {reviews.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <ClientReviews reviews={reviews} />
            </div>
          </section>
        )}

        {/* Case Studies Section */}
        {caseStudies.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <CaseStudies studies={caseStudies} />
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
