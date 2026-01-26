import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/seo/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Users, Database, Settings } from "lucide-react";

const Confidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Politique de Confidentialité | DogWalking"
        description="Politique RGPD de DogWalking : collecte, utilisation et protection des données personnelles. Vos droits et notre engagement."
        canonical="https://dogwalking.fr/confidentialite"
        noindex
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Politique de Confidentialité</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Chez DogWalking, la protection de vos données personnelles est notre priorité.
        </p>

        {/* Key points cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Shield className="h-10 w-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Conforme RGPD</h3>
              <p className="text-sm text-muted-foreground">Respect du règlement européen</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Lock className="h-10 w-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Données sécurisées</h3>
              <p className="text-sm text-muted-foreground">Chiffrement SSL/TLS</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Eye className="h-10 w-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Transparence</h3>
              <p className="text-sm text-muted-foreground">Vous gardez le contrôle</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              1. Responsable du traitement
            </h2>
            <div className="bg-muted/50 p-6 rounded-lg">
              <p className="mb-2"><strong>DogWalking SAS</strong></p>
              <p className="mb-2">123 Avenue des Champs-Élysées, 75008 Paris</p>
              <p className="mb-2">Email : dpo@dogwalking.fr</p>
              <p>SIRET : XXX XXX XXX XXXXX</p>
            </div>
          </section>

          {/* Données collectées */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              2. Données collectées
            </h2>
            
            <h3 className="text-xl font-medium mb-2">2.1 Données d'identification</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Nom, prénom, adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse postale</li>
              <li>Photo de profil (optionnelle)</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">2.2 Données relatives aux animaux</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Nom, race, âge du chien</li>
              <li>Poids et caractéristiques physiques</li>
              <li>Tempérament et comportement</li>
              <li>Informations médicales (allergies, traitements)</li>
              <li>Photos du chien</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">2.3 Données des promeneurs</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Pièce d'identité</li>
              <li>Extrait de casier judiciaire (bulletin n°3)</li>
              <li>Attestation d'assurance RC professionnelle</li>
              <li>Coordonnées bancaires (pour les paiements)</li>
              <li>Qualifications et expériences</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">2.4 Données de navigation</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Adresse IP</li>
              <li>Type de navigateur et système d'exploitation</li>
              <li>Pages visitées et durée des visites</li>
              <li>Cookies (voir section dédiée)</li>
            </ul>
          </section>

          {/* Finalités */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              3. Finalités du traitement
            </h2>
            <p className="text-muted-foreground mb-4">Vos données sont collectées pour :</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Gestion de votre compte</strong> : création, authentification, modification</li>
              <li><strong>Mise en relation</strong> : entre propriétaires et promeneurs</li>
              <li><strong>Réservation et paiement</strong> : traitement des transactions</li>
              <li><strong>Communication</strong> : notifications, messages, assistance</li>
              <li><strong>Sécurité</strong> : vérification des promeneurs, prévention de la fraude</li>
              <li><strong>Amélioration des services</strong> : statistiques anonymisées</li>
              <li><strong>Obligations légales</strong> : fiscalité, contentieux</li>
            </ul>
          </section>

          {/* Base légale */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Base légale des traitements</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 bg-muted">Traitement</th>
                    <th className="text-left p-3 bg-muted">Base légale</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-3">Gestion du compte</td>
                    <td className="p-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Vérification des promeneurs</td>
                    <td className="p-3">Intérêt légitime (sécurité)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Paiements</td>
                    <td className="p-3">Exécution du contrat</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Marketing direct</td>
                    <td className="p-3">Consentement</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Cookies analytiques</td>
                    <td className="p-3">Consentement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Durée de conservation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Durée de conservation</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Données du compte</strong> : durée de la relation + 3 ans</li>
              <li><strong>Données de transaction</strong> : 10 ans (obligation légale)</li>
              <li><strong>Documents de vérification</strong> : durée de l'activité + 5 ans</li>
              <li><strong>Données de navigation</strong> : 13 mois maximum</li>
              <li><strong>Logs de connexion</strong> : 1 an</li>
            </ul>
          </section>

          {/* Destinataires */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Destinataires des données</h2>
            <p className="text-muted-foreground mb-4">Vos données peuvent être partagées avec :</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Autres utilisateurs</strong> : informations de profil pour la mise en relation</li>
              <li><strong>Prestataires de paiement</strong> : Stripe pour les transactions</li>
              <li><strong>Hébergeur</strong> : Supabase (données stockées en UE)</li>
              <li><strong>Assureur</strong> : en cas de sinistre</li>
              <li><strong>Autorités</strong> : sur réquisition judiciaire</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Nous ne vendons jamais vos données à des tiers à des fins commerciales.
            </p>
          </section>

          {/* Vos droits */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
            <p className="text-muted-foreground mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Droit d'accès</h4>
                <p className="text-sm text-muted-foreground">Obtenir une copie de vos données</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Droit de rectification</h4>
                <p className="text-sm text-muted-foreground">Modifier vos données inexactes</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Droit à l'effacement</h4>
                <p className="text-sm text-muted-foreground">Supprimer vos données</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Droit à la portabilité</h4>
                <p className="text-sm text-muted-foreground">Récupérer vos données</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Droit d'opposition</h4>
                <p className="text-sm text-muted-foreground">Vous opposer au traitement</p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Droit à la limitation</h4>
                <p className="text-sm text-muted-foreground">Limiter le traitement</p>
              </div>
            </div>
            <p className="text-muted-foreground mt-6">
              Pour exercer vos droits, contactez-nous à <strong>dpo@dogwalking.fr</strong> 
              ou depuis les paramètres de votre compte. Nous répondons sous 30 jours.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies</h2>
            <h3 className="text-xl font-medium mb-2">8.1 Qu'est-ce qu'un cookie ?</h3>
            <p className="text-muted-foreground">
              Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite 
              d'un site web. Il permet de mémoriser vos préférences et d'améliorer votre expérience.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-4">8.2 Cookies utilisés</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 bg-muted">Type</th>
                    <th className="text-left p-3 bg-muted">Finalité</th>
                    <th className="text-left p-3 bg-muted">Durée</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b">
                    <td className="p-3">Essentiels</td>
                    <td className="p-3">Authentification, sécurité</td>
                    <td className="p-3">Session</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Fonctionnels</td>
                    <td className="p-3">Préférences utilisateur</td>
                    <td className="p-3">1 an</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Analytiques</td>
                    <td className="p-3">Statistiques de visite</td>
                    <td className="p-3">13 mois</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-medium mb-2 mt-4">8.3 Gestion des cookies</h3>
            <p className="text-muted-foreground">
              Vous pouvez accepter ou refuser les cookies non essentiels via la bannière 
              qui s'affiche lors de votre première visite, ou depuis les paramètres de 
              votre navigateur.
            </p>
          </section>

          {/* Sécurité */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Sécurité des données</h2>
            <p className="text-muted-foreground mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles pour 
              protéger vos données :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Chiffrement SSL/TLS des échanges</li>
              <li>Chiffrement des données sensibles en base</li>
              <li>Authentification à deux facteurs disponible</li>
              <li>Accès restreint aux données (principe du moindre privilège)</li>
              <li>Sauvegardes régulières et sécurisées</li>
              <li>Audits de sécurité périodiques</li>
            </ul>
          </section>

          {/* Transferts internationaux */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Transferts hors UE</h2>
            <p className="text-muted-foreground">
              Vos données sont principalement stockées dans l'Union Européenne. En cas 
              de transfert vers un pays tiers, nous nous assurons que des garanties 
              appropriées sont en place (clauses contractuelles types, décision d'adéquation).
            </p>
          </section>

          {/* Réclamation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Réclamation</h2>
            <p className="text-muted-foreground">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer 
              une réclamation auprès de la CNIL :
            </p>
            <div className="bg-muted/50 p-6 rounded-lg mt-4">
              <p className="mb-2"><strong>CNIL - Commission Nationale de l'Informatique et des Libertés</strong></p>
              <p className="mb-2">3 Place de Fontenoy, TSA 80715</p>
              <p className="mb-2">75334 Paris Cedex 07</p>
              <p>Site : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a></p>
            </div>
          </section>

          {/* Modifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Modifications</h2>
            <p className="text-muted-foreground">
              Cette politique peut être mise à jour. En cas de modification substantielle, 
              nous vous en informerons par email ou via une notification sur la Plateforme.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
            <p className="text-muted-foreground">
              Pour toute question relative à cette politique ou à vos données :
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2">
              <li>Email DPO : dpo@dogwalking.fr</li>
              <li>Email général : contact@dogwalking.fr</li>
              <li>Courrier : DogWalking SAS, 123 Avenue des Champs-Élysées, 75008 Paris</li>
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

export default Confidentialite;
