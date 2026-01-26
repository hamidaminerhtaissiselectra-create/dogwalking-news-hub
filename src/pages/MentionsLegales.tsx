import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Mentions Légales | DogWalking"
        description="Mentions légales de DogWalking SAS, plateforme de mise en relation entre propriétaires de chiens et promeneurs professionnels en France."
        canonical="https://dogwalking.fr/mentions-legales"
        noindex
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Mentions légales</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {/* Éditeur */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-2"><strong>Raison sociale :</strong> DogWalking SAS</p>
              <p className="mb-2"><strong>Forme juridique :</strong> Société par Actions Simplifiée</p>
              <p className="mb-2"><strong>Capital social :</strong> 10 000 €</p>
              <p className="mb-2"><strong>Siège social :</strong> 123 Avenue des Champs-Élysées, 75008 Paris</p>
              <p className="mb-2"><strong>SIRET :</strong> XXX XXX XXX XXXXX</p>
              <p className="mb-2"><strong>RCS :</strong> Paris B XXX XXX XXX</p>
              <p className="mb-2"><strong>TVA Intracommunautaire :</strong> FR XX XXX XXX XXX</p>
              <p className="mb-2"><strong>Directeur de la publication :</strong> [Nom du dirigeant]</p>
              <p className="mb-2"><strong>Email :</strong> contact@dogwalking.fr</p>
              <p><strong>Téléphone :</strong> 01 XX XX XX XX</p>
            </div>
          </section>

          {/* Hébergeur */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-2"><strong>Hébergeur :</strong> Supabase Inc.</p>
              <p className="mb-2"><strong>Adresse :</strong> 970 Toa Payoh North #07-04, Singapore 318992</p>
              <p><strong>Site web :</strong> https://supabase.com</p>
            </div>
          </section>

          {/* Activité */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Activité</h2>
            <p className="text-muted-foreground">
              DogWalking est une plateforme de mise en relation entre propriétaires de chiens 
              et promeneurs professionnels. Notre service permet de réserver des prestations 
              de promenade, garde, et autres services animaliers en toute confiance.
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>Code APE :</strong> 9609Z - Autres services personnels n.c.a.
            </p>
          </section>

          {/* Propriété intellectuelle */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
            <p className="text-muted-foreground">
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, 
              logiciels, etc.) est la propriété exclusive de DogWalking SAS ou de ses partenaires, 
              et est protégé par les lois françaises et internationales relatives à la propriété 
              intellectuelle.
            </p>
            <p className="text-muted-foreground mt-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout 
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, 
              est interdite, sauf autorisation écrite préalable de DogWalking SAS.
            </p>
          </section>

          {/* Données personnelles */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Protection des données personnelles</h2>
            <p className="text-muted-foreground">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la 
              loi Informatique et Libertés du 6 janvier 1978, vous disposez d'un droit d'accès, 
              de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="text-muted-foreground mt-4">
              Pour plus d'informations sur la gestion de vos données personnelles, veuillez 
              consulter notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.
            </p>
            <div className="bg-muted/50 p-6 rounded-lg mt-4">
              <p><strong>Délégué à la Protection des Données (DPO) :</strong></p>
              <p>Email : dpo@dogwalking.fr</p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="text-muted-foreground">
              Ce site utilise des cookies pour améliorer l'expérience utilisateur, analyser 
              le trafic et personnaliser le contenu. Pour plus d'informations sur l'utilisation 
              des cookies, veuillez consulter notre <a href="/confidentialite" className="text-primary hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          {/* Responsabilité */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation de responsabilité</h2>
            <p className="text-muted-foreground">
              DogWalking SAS met tout en œuvre pour offrir aux utilisateurs des informations 
              et/ou des outils disponibles et vérifiés. Cependant, elle ne saurait être tenue 
              pour responsable des erreurs, d'une absence de disponibilité des fonctionnalités 
              et/ou de la présence de virus sur son site.
            </p>
            <p className="text-muted-foreground mt-4">
              En qualité de plateforme de mise en relation, DogWalking n'est pas partie aux 
              contrats conclus entre les utilisateurs (propriétaires et promeneurs) et n'assume 
              aucune responsabilité quant à l'exécution des prestations.
            </p>
          </section>

          {/* Droit applicable */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Droit applicable et juridiction compétente</h2>
            <p className="text-muted-foreground">
              Les présentes mentions légales sont régies par le droit français. En cas de 
              litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux 
              français conformément aux règles de compétence en vigueur.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
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

export default MentionsLegales;
