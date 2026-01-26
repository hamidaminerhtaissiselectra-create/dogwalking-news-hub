import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { SearchForm } from "@/components/ui/search-form";
import { WhySection } from "@/components/ui/why-section";
import { HowItWorksSection } from "@/components/ui/how-it-works-section";
import { ServicesSection } from "@/components/ui/services-section";
import { FeaturesSection } from "@/components/ui/features-section";
import { DogWalkingProtect } from "@/components/ui/dogwalking-protect";
import { SecurityTrustSection } from "@/components/ui/security-trust-section";
import { TrustSection } from "@/components/ui/trust-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { UserTypesSection } from "@/components/ui/user-types-section";
import { LocalPresenceSection } from "@/components/ui/local-presence-section";
import { HomeIntroSection } from "@/components/ui/home-intro-section";
import { HomeFAQSection } from "@/components/ui/home-faq-section";
import { Footer } from "@/components/ui/footer";
import { FloatingContact } from "@/components/ui/floating-contact";
import { SEOHead } from "@/components/seo/SEOHead";
import { TrustBadges } from "@/components/ui/trust-badges";
import { ExpertBio } from "@/components/ui/expert-bio";
import { getRandomExpert } from "@/data/expertsData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Promenade de Chien Partout en France | Promeneurs Vérifiés | DogWalking"
        description="Trouvez un promeneur de chien vérifié près de chez vous. Paiement escrow sécurisé, preuves photo obligatoires, assurance incluse jusqu'à 2M€. Service de promenade et garde dans toute la France."
        canonical="https://dogwalking.fr"
      />
      <Header />
      <main>
        <HeroSection />
        <section className="py-8 md:py-12 px-4 -mt-16 md:-mt-24 relative z-10">
          <div className="container mx-auto">
            <SearchForm />
          </div>
        </section>
        <HomeIntroSection />
        <WhySection />
        <HowItWorksSection />
        <ServicesSection />
        <FeaturesSection />
        <DogWalkingProtect />
        <SecurityTrustSection />
        <TrustSection />
        <TestimonialsSection />
        <UserTypesSection />
        <LocalPresenceSection />
        <HomeFAQSection />
        
        {/* Section Preuves de Confiance (E-E-A-T) */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi Faire Confiance a DogWalking ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nos garanties de confiance et de securite sont sans equivalent en France.
              </p>
            </div>
            <TrustBadges />
          </div>
        </section>
        
        {/* Section Expert (E-E-A-T) */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Experts au Service de Votre Chien
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                DogWalking est dirigee par une equipe d'experts reconnus en comportement canin, veterinaire et bien-etre animal.
              </p>
            </div>
            <ExpertBio expert={getRandomExpert()} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;