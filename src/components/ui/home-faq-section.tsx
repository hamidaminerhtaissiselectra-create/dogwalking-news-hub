import { SEOFAQ } from "./seo-faq";
import { motion } from "framer-motion";

const homeFAQs = [
  {
    question: "Comment fonctionne DogWalking pour trouver un promeneur ?",
    answer: "C'est simple : entrez votre adresse, choisissez le type de service souhaité (promenade, garde, visite), et découvrez les promeneurs vérifiés disponibles près de chez vous. Consultez leurs profils, avis, tarifs, puis réservez en ligne. Le paiement est sécurisé en escrow jusqu'à réception des preuves photo de la prestation."
  },
  {
    question: "Les promeneurs sont-ils vraiment vérifiés ?",
    answer: "Absolument. Chaque promeneur fournit une pièce d'identité valide, un extrait de casier judiciaire vierge, et une attestation d'assurance responsabilité civile. Notre équipe vérifie manuellement chaque document. Seuls 35% des candidats sont acceptés après ce processus rigoureux. Vous pouvez confier votre compagnon en toute sérénité."
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait de la prestation ?",
    answer: "Grâce à notre système de paiement escrow, votre argent reste bloqué jusqu'à validation de la prestation. Si le promeneur n'envoie pas de preuve photo/vidéo, ou si la prestation ne correspond pas à vos attentes, vous pouvez contester et être remboursé. Notre équipe support intervient sous 24h pour tout litige."
  },
  {
    question: "Quels types de services propose DogWalking ?",
    answer: "Nous proposons une gamme complète : promenade quotidienne (30 min à 2h), visite à domicile, garde de jour (garderie), hébergement de nuit chez le promeneur, garde à domicile (le promeneur vient chez vous), visite sanitaire (toilettage léger), et accompagnement vétérinaire. Chaque service est adapté aux besoins spécifiques de votre animal."
  },
  {
    question: "DogWalking est-il disponible dans ma ville ?",
    answer: "DogWalking couvre l'ensemble du territoire français avec une présence renforcée en Île-de-France et dans les grandes métropoles (Lyon, Marseille, Bordeaux, Toulouse, Nantes, Lille). Entrez votre adresse sur notre plateforme pour découvrir les promeneurs disponibles autour de vous. Notre réseau s'étend chaque jour."
  }
];

export const HomeFAQSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur DogWalking, la plateforme n°1 
            de promenade de chiens en France.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          <SEOFAQ faqs={homeFAQs} />
        </div>
      </div>
    </section>
  );
};
