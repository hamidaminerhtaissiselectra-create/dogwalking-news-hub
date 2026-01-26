import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";

const CGU = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Conditions Générales d'Utilisation | DogWalking"
        description="CGU de DogWalking : règles et obligations pour les propriétaires de chiens et promeneurs professionnels sur notre plateforme."
        canonical="https://dogwalking.fr/cgu"
        noindex
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Conditions Générales d'Utilisation</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {/* Préambule */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Préambule</h2>
            <p className="text-muted-foreground">
              Les présentes Conditions Générales d'Utilisation (ci-après "CGU") régissent l'utilisation 
              de la plateforme DogWalking accessible à l'adresse www.dogwalking.fr (ci-après "la Plateforme").
            </p>
            <p className="text-muted-foreground mt-4">
              En accédant à la Plateforme et en utilisant ses services, vous acceptez sans réserve 
              les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser 
              la Plateforme.
            </p>
          </section>

          {/* Article 1 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 1 - Définitions</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>"Plateforme"</strong> : désigne le site internet DogWalking et l'ensemble de ses fonctionnalités</li>
              <li><strong>"Utilisateur"</strong> : désigne toute personne physique ou morale utilisant la Plateforme</li>
              <li><strong>"Propriétaire"</strong> : désigne l'utilisateur inscrit en qualité de propriétaire de chien</li>
              <li><strong>"Promeneur"</strong> : désigne l'utilisateur inscrit en qualité de prestataire de services</li>
              <li><strong>"Prestation"</strong> : désigne tout service réservé via la Plateforme (promenade, garde, etc.)</li>
              <li><strong>"Compte"</strong> : désigne l'espace personnel de l'Utilisateur sur la Plateforme</li>
            </ul>
          </section>

          {/* Article 2 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 2 - Objet de la Plateforme</h2>
            <p className="text-muted-foreground">
              DogWalking est une plateforme de mise en relation entre Propriétaires de chiens et 
              Promeneurs professionnels. La Plateforme permet :
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>La recherche et consultation de profils de Promeneurs</li>
              <li>La réservation et paiement de Prestations</li>
              <li>La communication entre Propriétaires et Promeneurs</li>
              <li>Le suivi des Prestations avec preuves photo/vidéo</li>
              <li>L'évaluation des Promeneurs après chaque Prestation</li>
            </ul>
          </section>

          {/* Article 3 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 3 - Inscription et Compte</h2>
            <h3 className="text-xl font-medium mb-2">3.1 Conditions d'inscription</h3>
            <p className="text-muted-foreground">
              L'inscription est ouverte à toute personne physique majeure (18 ans minimum) ou 
              à toute personne morale légalement constituée. L'inscription est gratuite.
            </p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">3.2 Processus d'inscription</h3>
            <p className="text-muted-foreground">
              L'Utilisateur doit fournir des informations exactes et à jour. Tout Compte créé 
              avec des informations fausses ou frauduleuses pourra être supprimé sans préavis.
            </p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">3.3 Vérification des Promeneurs</h3>
            <p className="text-muted-foreground">
              Les Promeneurs doivent fournir des documents justificatifs (pièce d'identité, 
              extrait de casier judiciaire, attestation d'assurance) qui seront vérifiés par 
              nos équipes avant activation complète de leur profil.
            </p>
          </section>

          {/* Article 4 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 4 - Services proposés</h2>
            <h3 className="text-xl font-medium mb-2">4.1 Types de prestations</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Promenade</strong> : balade du chien en extérieur</li>
              <li><strong>Visite à domicile</strong> : passage au domicile du Propriétaire</li>
              <li><strong>Hébergement de nuit</strong> : garde du chien la nuit chez le Promeneur</li>
              <li><strong>Garderie de jour</strong> : garde du chien la journée chez le Promeneur</li>
              <li><strong>Garde à domicile</strong> : le Promeneur reste au domicile du Propriétaire</li>
              <li><strong>Visite sanitaire</strong> : soins et hygiène du chien</li>
              <li><strong>Accompagnement vétérinaire</strong> : transport et assistance aux rendez-vous</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2 mt-4">4.2 Preuves de prestation</h3>
            <p className="text-muted-foreground">
              Le Promeneur s'engage à fournir des preuves photo et/ou vidéo de chaque Prestation. 
              Ces preuves sont obligatoires pour le déblocage du paiement.
            </p>
          </section>

          {/* Article 5 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 5 - Tarifs et Paiement</h2>
            <h3 className="text-xl font-medium mb-2">5.1 Tarification</h3>
            <p className="text-muted-foreground">
              Les tarifs sont librement fixés par les Promeneurs dans le respect des tarifs 
              minimums indiqués sur la Plateforme. DogWalking prélève une commission de 13% 
              sur chaque Prestation réalisée.
            </p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">5.2 Paiement sécurisé (Escrow)</h3>
            <p className="text-muted-foreground">
              Le paiement est bloqué lors de la réservation et n'est débloqué au Promeneur 
              qu'après validation de la Prestation par le Propriétaire ou automatiquement 
              48h après réception des preuves en l'absence de contestation.
            </p>
            
            <h3 className="text-xl font-medium mb-2 mt-4">5.3 Annulation</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Annulation plus de 48h avant : remboursement intégral</li>
              <li>Annulation entre 24h et 48h : remboursement de 50%</li>
              <li>Annulation moins de 24h : aucun remboursement</li>
            </ul>
          </section>

          {/* Article 6 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 6 - Obligations des Utilisateurs</h2>
            <h3 className="text-xl font-medium mb-2">6.1 Obligations du Propriétaire</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Fournir des informations exactes sur son chien (santé, comportement, besoins)</li>
              <li>S'assurer que le chien est à jour de ses vaccinations</li>
              <li>Informer le Promeneur de tout problème de santé ou comportemental</li>
              <li>Respecter les horaires convenus</li>
              <li>Payer les Prestations réservées</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-2 mt-4">6.2 Obligations du Promeneur</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Disposer des qualifications et de l'expérience nécessaires</li>
              <li>Être titulaire d'une assurance responsabilité civile professionnelle</li>
              <li>Fournir les preuves de chaque Prestation</li>
              <li>Traiter les animaux avec bienveillance et professionnalisme</li>
              <li>Informer le Propriétaire de tout incident</li>
              <li>Respecter les consignes données par le Propriétaire</li>
            </ul>
          </section>

          {/* Article 7 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 7 - Assurance</h2>
            <p className="text-muted-foreground">
              DogWalking inclut une assurance responsabilité civile pour les Prestations réalisées 
              via la Plateforme. Cette assurance couvre les dommages causés aux tiers pendant 
              l'exécution de la Prestation, dans les limites et conditions définies dans le 
              contrat d'assurance.
            </p>
            <p className="text-muted-foreground mt-4">
              Les Promeneurs doivent également disposer de leur propre assurance responsabilité 
              civile professionnelle.
            </p>
          </section>

          {/* Article 8 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 8 - Responsabilité</h2>
            <p className="text-muted-foreground">
              DogWalking agit en qualité d'intermédiaire technique et n'est pas partie au 
              contrat conclu entre le Propriétaire et le Promeneur. À ce titre, DogWalking 
              ne saurait être tenue responsable :
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-4 space-y-2">
              <li>De l'exécution ou de la non-exécution des Prestations</li>
              <li>Des dommages causés par ou au chien pendant la Prestation</li>
              <li>Des informations inexactes fournies par les Utilisateurs</li>
              <li>Des litiges entre Propriétaires et Promeneurs</li>
            </ul>
          </section>

          {/* Article 9 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 9 - Propriété intellectuelle</h2>
            <p className="text-muted-foreground">
              Tous les éléments de la Plateforme (textes, images, logos, etc.) sont protégés 
              par le droit de la propriété intellectuelle. Toute reproduction ou utilisation 
              non autorisée est interdite.
            </p>
          </section>

          {/* Article 10 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 10 - Protection des données</h2>
            <p className="text-muted-foreground">
              Le traitement des données personnelles est régi par notre{" "}
              <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          {/* Article 11 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 11 - Résiliation</h2>
            <p className="text-muted-foreground">
              L'Utilisateur peut résilier son Compte à tout moment depuis son espace personnel. 
              DogWalking se réserve le droit de suspendre ou supprimer un Compte en cas de 
              violation des présentes CGU, sans préavis ni indemnité.
            </p>
          </section>

          {/* Article 12 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 12 - Modification des CGU</h2>
            <p className="text-muted-foreground">
              DogWalking se réserve le droit de modifier les présentes CGU à tout moment. 
              Les modifications entrent en vigueur dès leur publication sur la Plateforme. 
              L'Utilisateur sera informé de toute modification significative par email.
            </p>
          </section>

          {/* Article 13 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 13 - Droit applicable et litiges</h2>
            <p className="text-muted-foreground">
              Les présentes CGU sont soumises au droit français. En cas de litige, les parties 
              s'engagent à rechercher une solution amiable avant toute action judiciaire. 
              À défaut, les tribunaux de Paris seront seuls compétents.
            </p>
            <p className="text-muted-foreground mt-4">
              Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, tout 
              consommateur peut recourir gratuitement à un médiateur de la consommation.
            </p>
          </section>

          {/* Article 14 */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Article 14 - Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>Par email : contact@dogwalking.fr</li>
              <li>Par courrier : DogWalking SAS, 123 Avenue des Champs-Élysées, 75008 Paris</li>
            </ul>
          </section>

          {/* Date de mise à jour */}
          <p className="text-sm text-muted-foreground mt-12 pt-8 border-t">
            Dernière mise à jour : Décembre 2024
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CGU;
