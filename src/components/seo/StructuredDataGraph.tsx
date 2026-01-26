import { Helmet } from "react-helmet-async";

/**
 * Balisage structuré imbriqué avec @graph
 * Conforme aux directives SEO 2026 pour la Clarté d'Entité (GEO)
 * 
 * Structure :
 * - Organization (racine) : Entité nationale DogWalking
 * - Service : Services proposés (Promenade, Garde, etc.)
 * - LocalBusiness : Agences locales par ville/région
 */

export interface ServiceData {
  name: string;
  description: string;
  slug: string;
  offers?: Array<{ name: string; price: string }>;
}

export interface ZoneData {
  name: string;
  slug: string;
  description: string;
  image?: string;
  population?: string;
}

export interface StructuredDataGraphProps {
  type: "homepage" | "service" | "local-business";
  data?: ServiceData | ZoneData;
}

/**
 * Génère le balisage @graph complet pour l'imbrication des entités
 */
export const generateOrganizationGraph = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://dogwalking.fr/#organization",
        "name": "DogWalking",
        "url": "https://dogwalking.fr",
        "logo": {
          "@type": "ImageObject",
          "url": "https://dogwalking.fr/logo.png",
          "width": 250,
          "height": 60,
        },
        "description":
          "Plateforme n°1 de promenade et garde de chiens en France. Promeneurs 100% vérifiés, paiement escrow sécurisé, preuves photo obligatoires, assurance incluse jusqu'à 2M€.",
        "foundingDate": "2023",
        "areaServed": {
          "@type": "Country",
          "name": "France",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "availableLanguage": "French",
          "telephone": "+33 1 XX XX XX XX",
          "email": "contact@dogwalking.fr",
        },
        "sameAs": [
          "https://facebook.com/dogwalkingfr",
          "https://instagram.com/dogwalkingfr",
          "https://twitter.com/dogwalkingfr",
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "2847",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://dogwalking.fr/#website",
        "url": "https://dogwalking.fr",
        "name": "DogWalking",
        "isPartOf": {
          "@id": "https://dogwalking.fr/#organization",
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://dogwalking.fr/walkers?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
};

/**
 * Génère le balisage Service imbriqué
 */
export const generateServiceGraph = (serviceData: ServiceData) => {
  return {
    "@type": "Service",
    "@id": `https://dogwalking.fr/services/${serviceData.slug}#service`,
    "name": serviceData.name,
    "description": serviceData.description,
    "provider": {
      "@id": "https://dogwalking.fr/#organization",
    },
    "areaServed": {
      "@type": "Country",
      "name": "France",
    },
    ...(serviceData.offers && {
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": `Options de ${serviceData.name.toLowerCase()}`,
        "itemListElement": serviceData.offers.map((offer) => ({
          "@type": "Offer",
          "name": offer.name,
          "price": offer.price,
          "priceCurrency": "EUR",
        })),
      },
    }),
  };
};

/**
 * Génère le balisage LocalBusiness imbriqué
 */
export const generateLocalBusinessGraph = (zoneData: ZoneData) => {
  return {
    "@type": "LocalBusiness",
    "@id": `https://dogwalking.fr/zone/${zoneData.slug}#local-business`,
    "name": `DogWalking ${zoneData.name}`,
    "description": zoneData.description,
    "image": zoneData.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": zoneData.name,
      "addressCountry": "FR",
    },
    "url": `https://dogwalking.fr/zone/${zoneData.slug}`,
    "telephone": "+33 1 XX XX XX XX",
    "priceRange": "€€",
    "openingHours": "Mo-Su 07:00-21:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
    },
    "areaServed": {
      "@type": "City",
      "name": zoneData.name,
    },
    "serviceType": ["Dog Walking", "Pet Sitting", "Dog Boarding"],
    "parentOrganization": {
      "@id": "https://dogwalking.fr/#organization",
    },
  };
};

/**
 * Composant pour injecter le balisage @graph dans le head
 */
export const StructuredDataGraph = ({
  type,
  data,
}: StructuredDataGraphProps) => {
  let schema: any;

  switch (type) {
    case "homepage":
      schema = generateOrganizationGraph();
      break;
    case "service":
      if (!data) throw new Error("Service data required");
      schema = {
        "@context": "https://schema.org",
        "@graph": [
          generateOrganizationGraph()["@graph"][0],
          generateServiceGraph(data as ServiceData),
        ],
      };
      break;
    case "local-business":
      if (!data) throw new Error("Local business data required");
      schema = {
        "@context": "https://schema.org",
        "@graph": [
          generateOrganizationGraph()["@graph"][0],
          generateLocalBusinessGraph(data as ZoneData),
        ],
      };
      break;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredDataGraph;
