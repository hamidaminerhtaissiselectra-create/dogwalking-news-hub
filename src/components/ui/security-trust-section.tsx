import { Shield, UserCheck, FileCheck, Star, Camera, Lock } from "lucide-react";

export const SecurityTrustSection = () => {
  const trustItems = [
    {
      icon: UserCheck,
      title: "Profils vérifiés",
      description: "CNI, casier judiciaire et attestation d'assurance vérifiés pour chaque promeneur"
    },
    {
      icon: Shield,
      title: "Assurance incluse",
      description: "Responsabilité civile professionnelle couvrant toutes les prestations"
    },
    {
      icon: Camera,
      title: "Preuves obligatoires",
      description: "Photo ou vidéo envoyée pendant chaque prestation pour votre tranquillité"
    },
    {
      icon: Lock,
      title: "Paiement escrow",
      description: "Votre argent est sécurisé et débloqué uniquement après validation"
    },
    {
      icon: Star,
      title: "Avis certifiés",
      description: "Seuls les clients ayant réservé peuvent laisser un avis vérifié"
    },
    {
      icon: FileCheck,
      title: "Garantie satisfaction",
      description: "En cas de problème, notre équipe intervient pour vous accompagner"
    }
  ];

  return (
    <section id="confiance" className="py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-3">
            Confiance & Sécurité
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Votre tranquillité, notre priorité
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Des garanties concrètes pour confier votre animal en toute sérénité
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {trustItems.map((item, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-5 md:p-6 shadow-soft border border-border hover:shadow-card transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
