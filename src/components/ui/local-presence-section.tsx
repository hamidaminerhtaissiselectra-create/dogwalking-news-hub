import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { zones } from '@/data/localSeoData';
import { Card } from './card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// City images mapping with high-quality photos
const cityImages: Record<string, string> = {
  'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
  'lyon': 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop',
  'marseille': 'https://images.unsplash.com/photo-1589810264340-0ce27bfbf751?w=400&h=300&fit=crop',
  'bordeaux': 'https://images.unsplash.com/photo-1565618754154-c8011e5df2a6?w=400&h=300&fit=crop',
  'toulouse': 'https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?w=400&h=300&fit=crop',
  'nice': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop',
  'nantes': 'https://images.unsplash.com/photo-1595971294624-80bcf9d3c7e5?w=400&h=300&fit=crop',
  'lille': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=300&fit=crop',
  'strasbourg': 'https://images.unsplash.com/photo-1541343672885-9be56236c4fb?w=400&h=300&fit=crop',
  'rennes': 'https://images.unsplash.com/photo-1595435193556-fdc5e8631b5b?w=400&h=300&fit=crop',
  'montpellier': 'https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=400&h=300&fit=crop',
  'creteil': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
  'vitry-sur-seine': 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=300&fit=crop',
  'champigny-sur-marne': 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=400&h=300&fit=crop',
  'saint-maur-des-fosses': 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
};

const getCityImage = (slug: string) => {
  return cityImages[slug] || 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=300&fit=crop';
};

// 6 featured cities to display prominently
const featuredCities = ['paris', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'nice'];

export function LocalPresenceSection() {
  // Get 6 featured cities
  const featuredZones = zones.filter(z => featuredCities.includes(z.slug) && z.type === 'city');
  
  // Other major cities (not in featured, priority 1 or 2)
  const otherMajorCities = zones.filter(z => 
    (z.priority === 1 || z.priority === 2) && 
    z.type === 'city' && 
    !featuredCities.includes(z.slug)
  );
  
  // Paris arrondissements
  const parisArrondissements = zones.filter(z => z.type === 'arrondissement' && z.parent === 'paris');
  
  // Quartiers populaires
  const quartiersPopulaires = zones.filter(z => z.type === 'quartier');

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Couverture nationale
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Promeneurs de Chien Disponibles dans Votre Ville
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Plus de 2 000 promeneurs et gardiens de chien vérifiés dans toute la France. 
            Paris, Lyon, Marseille, Bordeaux... Trouvez un professionnel de confiance près de chez vous.
          </p>
        </div>

        {/* 6 Featured Cities - Always visible */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Nos principales villes
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredZones.map((zone) => (
              <Link key={zone.id} to={`/zone/${zone.slug}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full border-0">
                  <div className="relative h-32 md:h-40 overflow-hidden">
                    <img
                      src={getCityImage(zone.slug)}
                      alt={`Dog walker à ${zone.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-base md:text-lg truncate drop-shadow-lg">{zone.name}</p>
                      <p className="text-white/80 text-xs">Promeneurs disponibles</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Accordions for other zones */}
        <Accordion type="multiple" className="space-y-3">
          {/* Other major cities */}
          <AccordionItem value="autres-villes" className="border rounded-xl overflow-hidden bg-background">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-left">
                <span className="w-2 h-2 bg-secondary rounded-full"></span>
                <span className="text-base font-semibold">Autres grandes villes</span>
                <span className="text-sm text-muted-foreground ml-2">({otherMajorCities.length} villes)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
                {otherMajorCities.map((zone) => (
                  <Link key={zone.id} to={`/zone/${zone.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 h-full border-0">
                      <div className="relative h-20 md:h-24 overflow-hidden">
                        <img
                          src={getCityImage(zone.slug)}
                          alt={`Dog walker à ${zone.name}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white font-medium text-sm truncate drop-shadow-lg">{zone.name}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Paris Arrondissements */}
          <AccordionItem value="paris-arrondissements" className="border rounded-xl overflow-hidden bg-background">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-left">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-base font-semibold">Arrondissements de Paris</span>
                <span className="text-sm text-muted-foreground ml-2">({parisArrondissements.length} arrondissements)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="flex flex-wrap gap-2 pt-2">
                {parisArrondissements.map((arr) => (
                  <Link 
                    key={arr.id} 
                    to={`/zone/${arr.slug}`}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors bg-muted/50 px-3 py-1.5 rounded-full border border-border hover:border-primary hover:bg-background"
                  >
                    {arr.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Quartiers populaires */}
          <AccordionItem value="quartiers" className="border rounded-xl overflow-hidden bg-background">
            <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
              <div className="flex items-center gap-2 text-left">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                <span className="text-base font-semibold">Quartiers populaires</span>
                <span className="text-sm text-muted-foreground ml-2">({quartiersPopulaires.length} quartiers)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="flex flex-wrap gap-2 pt-2">
                {quartiersPopulaires.map((zone) => (
                  <Link 
                    key={zone.id} 
                    to={`/zone/${zone.slug}`}
                    className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors bg-muted/50 px-3 py-1.5 rounded-full border border-border hover:border-primary hover:bg-background"
                  >
                    {zone.name}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CTA */}
        <div className="text-center pt-6 mt-6 border-t border-border">
          <Link 
            to="/zones" 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Voir toutes nos zones d'intervention
            <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-muted-foreground mt-3">
            + de 200 villes couvertes dans toute la France
          </p>
        </div>
      </div>
    </section>
  );
}
