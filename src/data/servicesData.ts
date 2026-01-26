// Images importées pour les services
import promenadeParc from '@/assets/services/promenade-chien-parc.jpg';
import promenadeForet from '@/assets/services/promenade-chien-foret.jpg';
import promenadeLiberte from '@/assets/services/promenade-chien-liberte.jpg';
import gardeDomicile from '@/assets/services/garde-chien-domicile.jpg';
import gardeJardin from '@/assets/services/garde-chien-jardin.jpg';
import gardeRepos from '@/assets/services/garde-chien-repos.jpg';
import visiteRepas from '@/assets/services/visite-chien-repas.jpg';
import visiteAccueil from '@/assets/services/visite-chien-accueil.jpg';
import visiteSoins from '@/assets/services/visite-chien-soins.jpg';
import vetAccompagnement from '@/assets/services/veterinaire-accompagnement.jpg';
import vetTransport from '@/assets/services/veterinaire-transport.jpg';
import vetAttente from '@/assets/services/veterinaire-attente.jpg';
// Nouvelles images hébergement et garderie
import hebergementNuit from '@/assets/services/hebergement-nuit-chambre.jpg';
import hebergementJardin from '@/assets/services/hebergement-jardin-jeu.jpg';
import hebergementRepas from '@/assets/services/hebergement-repas-matin.jpg';
import garderieSalle from '@/assets/services/garderie-salle-jeux.jpg';
import garderieSocial from '@/assets/services/garderie-socialisation.jpg';
import garderieRepos from '@/assets/services/garderie-repos-sieste.jpg';
// Nouvelles images hero pour les pages services
import promenadeHero from '@/assets/services/promenade-hero.jpg';
import visiteHero from '@/assets/services/visite-hero.jpg';
import hebergementHero from '@/assets/services/hebergement-hero.jpg';
import garderieHero from '@/assets/services/garderie-hero.jpg';
import gardeHero from '@/assets/services/garde-hero.jpg';
import visiteSanitaireHero from '@/assets/services/visite-sanitaire-hero.jpg';
import veterinaryHero from '@/assets/services/veterinaire-hero.jpg';

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  localZoneMention: string;
  heroImage: string;
  image: string;
  images: { src: string; alt: string }[];
  minPrice: number;
  duration: string;
  description: {
    intro: string;
    forWhom: string;
    problemsSolved: string;
    benefits: string;
  };
  howItWorks: {
    title: string;
    intro: string;
    steps: { title: string; description: string }[];
    safety: string;
    dogWelfare: string;
  };
  expertiseAdvantages: {
    experience: string;
    insurance: string;
    method: string;
    trust: string;
  };
  advantages: string[];
  localAvailability: {
    mainCity: string;
    surroundingAreas: string;
    coverage: string;
  };
  faq: { question: string; answer: string }[];
}

export const servicesData: Record<string, ServiceData> = {
  "promenade-chien": {
    id: "promenade",
    slug: "promenade-chien",
    title: "Promenade de chien",
    metaTitle: "Promenade de chien | Service fiable partout en France | DogWalking",
    metaDescription: "Trouvez un promeneur de chien de confiance près de chez vous. Réservation simple et rapide. Promeneurs vérifiés, preuves photo obligatoires et paiement sécurisé.",
    h1: "Promenade de chien – Un service fiable près de chez vous",
    heroDescription: "Offrez à votre chien l'exercice et la stimulation dont il a besoin avec nos promeneurs professionnels vérifiés, disponibles partout en France.",
    localZoneMention: "Service disponible dans votre ville et ses environs",
    heroImage: promenadeHero,
    image: promenadeParc,
    images: [
      { src: promenadeParc, alt: "Promeneur professionnel avec un golden retriever dans un parc urbain ensoleillé" },
      { src: promenadeForet, alt: "Promenade de deux chiens sur un sentier forestier en automne" },
      { src: promenadeLiberte, alt: "Labrador heureux courant librement dans un champ verdoyant" }
    ],
    minPrice: 8,
    duration: "30 min - 2h",
    description: {
      intro: "La promenade régulière est un pilier fondamental du bien-être physique et mental de votre chien. Nos promeneurs professionnels comprennent l'importance capitale de cette activité quotidienne pour l'équilibre de votre compagnon. Chaque sortie est conçue pour répondre aux besoins spécifiques de votre animal, qu'il s'agisse d'un chiot débordant d'énergie, d'un adulte ayant besoin d'exercice soutenu, ou d'un senior nécessitant des promenades adaptées à son rythme. Notre réseau de promeneurs expérimentés et passionnés s'engage à traiter votre chien avec le même soin et la même attention que s'il s'agissait du leur, garantissant ainsi une expérience positive à chaque sortie.",
      forWhom: "Notre service de promenade de chien s'adresse à tous les propriétaires soucieux du bien-être de leur animal. Les professionnels aux horaires chargés trouvent en nous une solution fiable pour que leur compagnon ne reste jamais trop longtemps seul. Les personnes à mobilité réduite ou les seniors peuvent confier leurs sorties quotidiennes à nos promeneurs de confiance. Les propriétaires de chiens énergiques comme les Bergers Australiens, Border Collies ou Jack Russells apprécient notre capacité à dépenser efficacement leur animal. Les nouveaux propriétaires de chiots bénéficient de notre expertise pour socialiser leur jeune compagnon dans un environnement contrôlé et sécurisé.",
      problemsSolved: "Le manque d'exercice est l'une des principales causes de troubles comportementaux chez le chien : aboiements excessifs, destructions, anxiété, surpoids. Notre service répond directement à ces problématiques en offrant des sorties régulières et adaptées. Les chiens qui restent seuls pendant les heures de travail peuvent développer une anxiété de séparation que nos promenades aident à atténuer. L'ennui, source de comportements destructeurs, est combattu par la stimulation que procure chaque sortie. Les problèmes de socialisation sont également adressés grâce à nos promenades collectives où votre chien apprend à interagir positivement avec ses congénères.",
      benefits: "Chaque promenade apporte de nombreux bénéfices à votre chien. L'exercice physique adapté maintient son poids de forme et renforce sa musculature. La stimulation mentale par la découverte de nouveaux environnements, odeurs et rencontres enrichit sa vie quotidienne. La socialisation avec d'autres chiens développe ses compétences sociales et réduit les comportements réactifs. Le renforcement du lien de confiance avec les humains améliore son équilibre émotionnel. Un chien bien promené est un chien plus calme à la maison, plus facile à vivre, et globalement plus heureux."
    },
    howItWorks: {
      title: "Comment fonctionne notre service de promenade de chien",
      intro: "Notre processus a été conçu pour garantir une expérience fluide, sécurisée et transparente pour vous comme pour votre animal. De la réservation jusqu'au retour de votre chien, chaque étape est pensée pour votre tranquillité d'esprit.",
      steps: [
        { title: "Choisissez votre promeneur", description: "Parcourez les profils détaillés de nos promeneurs vérifiés. Consultez leurs avis, leurs spécialisations (chiens réactifs, chiots, grands chiens...), leurs disponibilités et leur proximité géographique. Chaque profil affiche les certifications, l'expérience et les photos des précédentes promenades." },
        { title: "Réservez en quelques clics", description: "Sélectionnez la durée souhaitée (30 minutes, 1 heure ou 2 heures), l'heure de prise en charge et indiquez les besoins spécifiques de votre chien : niveau d'énergie, allergies, comportements particuliers, commandes connues." },
        { title: "Rencontre préalable", description: "Nous recommandons une première rencontre entre votre chien et le promeneur pour établir la confiance et vérifier la compatibilité. C'est l'occasion de remettre les clés et de partager les dernières consignes." },
        { title: "Suivez la promenade en temps réel", description: "Pendant la sortie, recevez des photos et mises à jour. Notre système de suivi GPS vous permet de voir le parcours emprunté. À la fin de chaque promenade, un compte-rendu détaillé vous est envoyé." },
        { title: "Validez et laissez un avis", description: "Une fois la promenade terminée, validez le service. Le paiement sécurisé n'est débloqué qu'après votre confirmation. Partagez votre expérience pour aider la communauté." }
      ],
      safety: "La sécurité de votre chien est notre priorité absolue. Tous nos promeneurs sont formés aux gestes d'urgence canine et disposent d'une trousse de premiers secours. Les promenades sont adaptées aux conditions météorologiques et à l'état de fatigue de l'animal. En cas de problème, notre équipe support est disponible 7j/7 pour intervenir rapidement.",
      dogWelfare: "Le bien-être animal guide chaque décision. Nous limitons le nombre de chiens par promenade collective pour garantir une attention suffisante à chacun. Les chiens sont toujours tenus en laisse dans les espaces non sécurisés. Nous respectons le rythme de chaque animal et prévoyons des pauses régulières pour l'hydratation, surtout en période de chaleur."
    },
    expertiseAdvantages: {
      experience: "Nos promeneurs cumulent en moyenne plus de 3 ans d'expérience avec les chiens. Beaucoup sont d'anciens éducateurs canins, vétérinaires, ou professionnels du monde animal. Cette expertise leur permet de gérer toutes les situations : chiens craintifs, réactifs, fugueurs ou simplement débordants d'énergie.",
      insurance: "Chaque promeneur dispose d'une assurance responsabilité civile professionnelle couvrant tous les incidents potentiels. En cas d'accident, de blessure ou de dommage, vous êtes protégé. Notre système de paiement escrow garantit également que vous ne payez qu'une fois entièrement satisfait du service.",
      method: "Notre méthode repose sur le renforcement positif et le respect du rythme de chaque animal. Pas de colliers étrangleurs, pas de méthodes coercitives. Chaque chien est traité avec douceur et encouragements. Nous croyons fermement que la confiance se construit par la bienveillance.",
      trust: "La confiance est le fondement de notre service. Vérification d'identité par CNI, extrait de casier judiciaire, références professionnelles : chaque promeneur passe par un processus de validation rigoureux. Les avis vérifiés des autres propriétaires vous permettent de faire un choix éclairé."
    },
    advantages: [
      "Exercice physique adapté au rythme et à l'âge de votre chien",
      "Dépense d'énergie optimale pour un chien plus calme et équilibré à la maison",
      "Socialisation encadrée avec d'autres chiens lors des promenades collectives",
      "Stimulation mentale enrichissante grâce à la découverte de nouveaux parcours et environnements",
      "Preuves photo et compte-rendu détaillé envoyés après chaque sortie",
      "Promeneurs rigoureusement vérifiés : CNI, casier judiciaire, assurance professionnelle",
      "Suivi GPS en temps réel pour suivre le parcours de votre chien",
      "Paiement sécurisé avec système escrow : vous ne payez qu'après validation"
    ],
    localAvailability: {
      mainCity: "Notre réseau de promeneurs couvre l'ensemble du territoire français, des grandes métropoles aux villes moyennes.",
      surroundingAreas: "Que vous habitiez en centre-ville ou en périphérie, nos promeneurs se déplacent jusqu'à chez vous. Les zones rurales et semi-rurales sont également desservies par notre réseau en constante expansion.",
      coverage: "Actuellement présents dans plus de 500 communes, nous élargissons continuellement notre couverture géographique pour répondre à la demande croissante des propriétaires de chiens partout en France."
    },
    faq: [
      { question: "Qui sont les promeneurs DogWalking ?", answer: "Nos promeneurs sont des passionnés d'animaux rigoureusement sélectionnés. Chaque candidat passe par une vérification d'identité complète (CNI), un contrôle de casier judiciaire, et doit fournir une attestation d'assurance responsabilité civile professionnelle. Nous vérifions également leurs références et leur expérience avec les chiens. Seuls 20% des candidats sont acceptés après notre processus de sélection." },
      { question: "Puis-je choisir la durée de la promenade ?", answer: "Absolument ! Nous proposons trois durées de promenade pour s'adapter aux besoins de votre chien. La promenade de 30 minutes convient aux chiens calmes ou pour une sortie hygiénique. La promenade d'1 heure est notre format le plus populaire, offrant un bon équilibre entre exercice et stimulation. La promenade de 2 heures est idéale pour les chiens très énergiques nécessitant une dépense importante." },
      { question: "Que se passe-t-il en cas d'annulation ?", answer: "Nous comprenons que les imprévus arrivent. Vous pouvez annuler gratuitement jusqu'à 24 heures avant la promenade prévue. Les annulations entre 24h et 2h avant entraînent des frais de 50% du montant. Les annulations de dernière minute (moins de 2h) ou les absences sont facturées à 100%. En cas d'urgence médicale justifiée, contactez notre support pour un traitement au cas par cas." },
      { question: "Mon chien est-il assuré pendant la promenade ?", answer: "Oui, votre chien est couvert pendant toute la durée de la prestation. Tous nos promeneurs disposent d'une assurance responsabilité civile professionnelle qui couvre les dommages potentiels, les blessures accidentelles et les incidents impliquant des tiers. De plus, notre système de paiement escrow vous protège financièrement : vous ne payez qu'une fois satisfait du service rendu." },
      { question: "Comment se passe la remise des clés ?", answer: "Plusieurs options s'offrent à vous pour la remise des clés. La solution la plus courante est une remise en main propre lors de la première rencontre avec le promeneur. Vous pouvez également utiliser une boîte à clés sécurisée à code ou un système de digicode si votre immeuble le permet. Nous recommandons fortement un premier rendez-vous de présentation pour que votre chien et le promeneur fassent connaissance." },
      { question: "Les promenades collectives sont-elles sécurisées ?", answer: "Nos promenades collectives sont limitées à un maximum de 4 chiens par promeneur pour garantir une attention suffisante à chaque animal. Avant d'intégrer une promenade collective, nous vérifions que votre chien est sociable et compatible avec le groupe existant. Les chiens réactifs ou nécessitant une attention particulière sont orientés vers des promenades individuelles." },
      { question: "Que faire si mon chien a des besoins médicaux ?", answer: "Nos promeneurs sont formés pour administrer des médicaments simples si vous fournissez des instructions claires et les médicaments. Pour les chiens sous traitement régulier, nous notons toutes les particularités dans le profil de votre animal. En cas de problème de santé pendant la promenade, le promeneur contacte immédiatement notre équipe et peut se rendre chez un vétérinaire si nécessaire." },
      { question: "Comment puis-je suivre mon chien pendant la promenade ?", answer: "Notre application vous permet de suivre le parcours de votre chien en temps réel grâce au GPS. Vous recevez également des photos pendant la promenade et un compte-rendu complet à la fin. Ce compte-rendu inclut le parcours effectué, les observations du promeneur, et toute information pertinente sur le comportement de votre chien." }
    ]
  },
  "visite-domicile": {
    id: "visite_domicile",
    slug: "visite-domicile",
    title: "Visite à domicile",
    metaTitle: "Visite à domicile pour animaux | Service de confiance en France | DogWalking",
    metaDescription: "Réservez une visite à domicile pour votre chien ou chat. Nourriture, eau, câlins et soins dans le confort de votre maison. Preuves photo incluses.",
    h1: "Visite à domicile – Votre animal choyé dans son environnement",
    heroDescription: "Pendant votre absence, un professionnel de confiance vient nourrir, hydrater et câliner votre animal dans son environnement familier.",
    localZoneMention: "Visiteurs disponibles dans votre quartier",
    heroImage: visiteHero,
    image: visiteRepas,
    images: [
      { src: visiteRepas, alt: "Visiteur professionnel nourrissant un chien heureux dans une cuisine" },
      { src: visiteAccueil, alt: "Chien accueillant joyeusement son visiteur à la porte d'entrée" },
      { src: visiteSoins, alt: "Soins et attention donnés à un chien sur une terrasse avec plantes" }
    ],
    minPrice: 8,
    duration: "30 min",
    description: {
      intro: "La visite à domicile est la solution idéale pour les animaux qui préfèrent rester dans leur environnement habituel. Contrairement aux pensions où l'animal doit s'adapter à un nouvel espace, la visite à domicile préserve tous ses repères : son panier, ses jouets, ses odeurs familières. Nos visiteurs expérimentés viennent directement chez vous pour assurer les soins quotidiens de votre compagnon, qu'il s'agisse d'un chat indépendant, d'un chien calme, ou de tout autre animal domestique. Cette approche minimise le stress et garantit une continuité dans la routine de votre animal.",
      forWhom: "Ce service répond parfaitement aux besoins des propriétaires de chats, ces félins territoriaux qui vivent mal les changements d'environnement. Il convient également aux chiens calmes qui n'ont pas besoin de sorties prolongées mais simplement d'une présence et de soins réguliers. Les personnes travaillant de longues heures apprécient de pouvoir faire vérifier le bien-être de leur animal en milieu de journée. Les voyageurs fréquents trouvent une solution fiable pour leurs absences courtes. Les propriétaires d'animaux multiples bénéficient d'un service global pour tous leurs compagnons.",
      problemsSolved: "La solitude prolongée peut engendrer stress et anxiété chez votre animal. Les chats peuvent développer des troubles du comportement, les chiens peuvent détruire ou aboyer excessivement. La visite à domicile rompt cette solitude et apporte un moment de réconfort. Le problème des gamelles vides ou de l'eau non renouvelée disparaît : votre animal est nourri et hydraté comme prévu. Les litières sont nettoyées, évitant que votre chat ne refuse de les utiliser. Votre domicile est également surveillé, vous alertant de tout problème potentiel.",
      benefits: "Votre animal conserve l'intégralité de ses repères habituels, ce qui maintient son équilibre émotionnel. Sa routine quotidienne est préservée : mêmes horaires de repas, mêmes habitudes. Le stress lié au transport et à l'adaptation à un nouvel environnement est totalement évité. Vous recevez des preuves photo et un compte-rendu après chaque visite, vous rassurant sur le bien-être de votre compagnon. Votre domicile bénéficie également d'une présence humaine régulière, ajoutant une dimension sécuritaire."
    },
    howItWorks: {
      title: "Comment fonctionne la visite à domicile",
      intro: "Notre service de visite à domicile est conçu pour s'intégrer parfaitement à votre emploi du temps et aux besoins spécifiques de votre animal.",
      steps: [
        { title: "Réservez votre visite", description: "Choisissez le créneau horaire souhaité, la fréquence (une fois, quotidienne, plusieurs fois par jour) et décrivez les besoins spécifiques de votre animal : alimentation, traitements, jeux préférés." },
        { title: "Rencontrez votre visiteur", description: "Une première rencontre permet de présenter votre animal, de faire visiter votre domicile et de transmettre toutes les consignes importantes. C'est aussi l'occasion de remettre les clés." },
        { title: "Votre animal est choyé", description: "Le visiteur assure les soins prévus : nourriture fraîche, eau renouvelée, nettoyage de litière, jeux, câlins et tout ce que vous avez demandé. Il reste attentif à l'état général de votre animal." },
        { title: "Recevez un compte-rendu détaillé", description: "Après chaque visite, vous recevez des photos de votre animal et un message détaillant son état, son appétit, et tout événement notable. Vous gardez un lien constant avec votre compagnon." }
      ],
      safety: "La sécurité de votre domicile et de votre animal est primordiale. Nos visiteurs sont formés pour verrouiller correctement les portes, ne jamais laisser de fenêtres ouvertes, et éviter toute situation à risque. Ils vérifient l'environnement à chaque visite et vous signalent tout problème détecté.",
      dogWelfare: "Nous adaptons chaque visite aux besoins spécifiques de votre animal. Les chats timides reçoivent une approche douce et non intrusive. Les chiens sociables profitent de moments de jeu et d'attention. Les animaux sous traitement reçoivent leurs médicaments à l'heure. Chaque détail compte pour le bien-être de votre compagnon."
    },
    expertiseAdvantages: {
      experience: "Nos visiteurs sont sélectionnés pour leur expérience avec différentes espèces animales. Ils savent lire le langage corporel des chats et des chiens, détecter les signes de mal-être et adapter leur comportement à chaque personnalité animale.",
      insurance: "Tous nos visiteurs disposent d'une assurance responsabilité civile professionnelle. En cas d'incident à votre domicile ou concernant votre animal, vous êtes couvert. Le paiement escrow vous protège également financièrement.",
      method: "Notre approche privilégie la douceur et le respect du rythme de l'animal. Pas de manipulation brusque, pas de stress inutile. Nous suivons vos instructions à la lettre tout en apportant notre expertise et notre bienveillance.",
      trust: "La confiance est essentielle quand on ouvre son domicile à un tiers. C'est pourquoi chaque visiteur passe par une vérification d'identité, un contrôle de casier judiciaire et doit fournir des références vérifiables. Les avis des autres propriétaires complètent cette transparence."
    },
    advantages: [
      "Votre animal reste dans son environnement familier et rassurant",
      "Routine quotidienne parfaitement préservée pour son équilibre",
      "Stress de transport et d'adaptation totalement évité",
      "Service adapté à tous les animaux : chiens, chats, lapins, oiseaux, poissons",
      "Soins personnalisés selon vos instructions précises",
      "Surveillance de votre domicile incluse à chaque passage",
      "Photos et compte-rendu envoyés après chaque visite",
      "Visiteurs vérifiés et assurés pour votre tranquillité"
    ],
    localAvailability: {
      mainCity: "Notre réseau de visiteurs couvre les principales agglomérations françaises et leurs périphéries.",
      surroundingAreas: "Des visiteurs sont disponibles en centre-ville comme en banlieue. Notre maillage territorial s'étend continuellement pour répondre aux demandes dans les zones moins desservies.",
      coverage: "Nous sommes présents dans la plupart des communes de France. Entrez votre adresse dans notre moteur de recherche pour découvrir les visiteurs disponibles près de chez vous."
    },
    faq: [
      { question: "Quels animaux peuvent bénéficier d'une visite à domicile ?", answer: "Notre service est conçu pour tous les animaux domestiques : chiens, chats, lapins, cochons d'Inde, hamsters, furets, oiseaux, poissons, reptiles... Nos visiteurs s'adaptent aux besoins spécifiques de chaque espèce. Lors de la réservation, précisez le type d'animal et ses particularités pour être mis en relation avec un visiteur compétent." },
      { question: "Combien de temps dure une visite standard ?", answer: "Une visite standard dure 30 minutes, ce qui laisse le temps de nourrir votre animal, renouveler son eau, nettoyer sa litière si nécessaire, et lui offrir un moment de jeu et de câlins. Des visites plus longues (45 min ou 1h) sont disponibles pour les animaux nécessitant plus d'attention ou pour combiner avec une courte promenade pour les chiens." },
      { question: "Le visiteur peut-il administrer des médicaments ?", answer: "Oui, nos visiteurs peuvent administrer des médicaments oraux simples (comprimés, liquides) si vous fournissez des instructions claires et détaillées. Pour les injections ou traitements médicaux complexes, nous recommandons notre service de visite sanitaire ou une consultation avec votre vétérinaire." },
      { question: "Puis-je réserver plusieurs visites par jour ?", answer: "Absolument ! Selon les besoins de votre animal, vous pouvez planifier une, deux ou trois visites quotidiennes. C'est particulièrement recommandé pour les chiots en cours d'éducation à la propreté, les animaux diabétiques, ou simplement pour maximiser l'attention portée à votre compagnon." },
      { question: "Comment le visiteur accède-t-il à mon domicile ?", answer: "Vous convenez du mode d'accès avec votre visiteur : remise de clés en main propre, boîte à clés sécurisée, digicode... Nous recommandons une rencontre préalable pour établir la confiance et montrer les particularités de votre logement. Après chaque visite, le visiteur vérifie le verrouillage de votre domicile." },
      { question: "Que se passe-t-il si mon animal semble malade ?", answer: "Nos visiteurs sont formés pour détecter les signes de mal-être : léthargie, perte d'appétit, symptômes inhabituels. En cas de doute, ils vous contactent immédiatement et peuvent, avec votre accord, emmener votre animal chez un vétérinaire. L'état de santé observé est systématiquement noté dans le compte-rendu de visite." },
      { question: "La visite inclut-elle le nettoyage de la litière ?", answer: "Oui, le nettoyage de la litière fait partie des soins standard lors d'une visite pour chat. Le visiteur retire les souillures et ajoute de la litière propre si nécessaire. Un changement complet de litière peut être effectué sur demande lors de visites prolongées." },
      { question: "Puis-je recevoir des photos de mon animal ?", answer: "Bien sûr ! Nos visiteurs envoient systématiquement des photos de votre animal après chaque visite. Vous pouvez voir votre compagnon en train de manger, jouer ou se reposer. Ces photos sont accompagnées d'un compte-rendu écrit décrivant le déroulement de la visite et l'état général de votre animal." }
    ]
  },
  "garde-domicile": {
    id: "garde_domicile",
    slug: "garde-domicile",
    title: "Garde à domicile",
    metaTitle: "Garde à domicile pour chien | Pet-sitting de nuit chez vous | DogWalking",
    metaDescription: "Faites garder votre chien chez vous la nuit. Le gardien dort à votre domicile pour une présence rassurante 24h/24. Service vérifié et sécurisé.",
    h1: "Garde à domicile – Votre chien gardé dans son cocon",
    heroDescription: "Le gardien passe la nuit chez vous pour que votre chien reste dans son environnement habituel avec une présence rassurante et bienveillante.",
    localZoneMention: "Gardiens de nuit disponibles dans votre secteur",
    heroImage: gardeHero,
    image: gardeDomicile,
    images: [
      { src: gardeDomicile, alt: "Pet-sitter professionnelle s'occupant d'un chien dans son panier douillet" },
      { src: gardeJardin, alt: "Moment de jeu entre une gardienne et un chien dans le jardin ensoleillé" },
      { src: gardeRepos, alt: "Chien dormant paisiblement sur le canapé avec sa gardienne lisant à côté" }
    ],
    minPrice: 12,
    duration: "Nuit chez vous",
    description: {
      intro: "La garde à domicile représente la solution de confort ultime pour les propriétaires qui souhaitent s'absenter tout en préservant le bien-être de leur chien. Contrairement à une pension où l'animal doit s'adapter à un environnement inconnu, la garde à domicile maintient votre chien dans son cadre familier : son panier, ses jouets, son jardin, ses odeurs rassurantes. Un gardien de confiance s'installe chez vous pour la nuit et s'occupe de votre compagnon avec la même attention et le même amour que vous lui portez. Cette formule est particulièrement adaptée aux chiens sensibles, anxieux ou âgés.",
      forWhom: "Ce service s'adresse aux propriétaires devant s'absenter pour des voyages professionnels ou personnels. Les chiens âgés ou souffrant de pathologies chroniques trouvent dans cette formule un maintien de leurs repères essentiels à leur équilibre. Les chiens anxieux ou craintifs évitent le stress d'un changement d'environnement qui pourrait aggraver leurs troubles. Les propriétaires de plusieurs animaux apprécient de pouvoir les faire garder ensemble, dans leur maison. Les personnes attachées à leur domicile bénéficient également d'une présence humaine rassurante pendant leur absence.",
      problemsSolved: "L'anxiété de séparation est un problème majeur chez de nombreux chiens. Le changement d'environnement, comme lors d'un séjour en pension, peut amplifier cette détresse. La garde à domicile élimine ce facteur de stress en maintenant l'animal dans son cadre habituel. Les chiens sous traitement médical peuvent suivre leur protocole sans perturbation. Les animaux ayant des besoins alimentaires spécifiques conservent leur régime. Le décalage de routine, source de troubles digestifs ou comportementaux, est totalement évité.",
      benefits: "Votre chien bénéficie d'une attention exclusive dans son environnement préféré. Sa routine quotidienne est parfaitement maintenue : mêmes heures de repas, mêmes promenades, mêmes habitudes de couchage. Le gardien assure une présence continue, rassurant les chiens qui supportent mal la solitude nocturne. Votre domicile profite également de cette présence : arrosage des plantes, relevé du courrier, surveillance générale. Vous partez l'esprit tranquille, sachant que tout est pris en charge."
    },
    howItWorks: {
      title: "Comment fonctionne la garde à domicile",
      intro: "Notre service de garde à domicile est organisé pour garantir une transition en douceur et un séjour serein pour votre chien.",
      steps: [
        { title: "Rencontrez votre gardien", description: "Avant votre départ, organisez une rencontre chez vous avec le gardien. Présentez votre chien, faites visiter votre domicile et transmettez toutes les consignes : routines, alimentation, promenades, particularités du logement." },
        { title: "Préparez les consignes", description: "Partagez en détail les habitudes de votre chien : horaires de repas, quantités, friandises autorisées, jouets préférés, commandes connues, comportements à surveiller. Plus les instructions sont précises, meilleure sera la garde." },
        { title: "Partez l'esprit tranquille", description: "Le gardien s'installe chez vous à l'heure convenue. Il suit scrupuleusement votre routine et s'occupe de votre animal comme vous le feriez vous-même. Les promenades, repas et câlins sont assurés quotidiennement." },
        { title: "Restez informé à distance", description: "Recevez des nouvelles régulières : photos, vidéos, messages. Le gardien vous tient au courant de l'humeur de votre chien, de son appétit, de ses activités. Vous gardez un lien constant malgré la distance." }
      ],
      safety: "Nos gardiens sont formés pour gérer les situations d'urgence : numéros de vétérinaire, comportement en cas de problème de santé, gestion des fugues potentielles. Ils respectent scrupuleusement les consignes de sécurité de votre domicile et sont joignables à tout moment.",
      dogWelfare: "Le bien-être de votre chien est au cœur de notre service. Les gardiens respectent son rythme naturel, ses préférences et ses petites manies. Un chien habitué à dormir sur le canapé continue à le faire. Un chien qui aime les longues promenades les obtient. Chaque garde est personnalisée."
    },
    expertiseAdvantages: {
      experience: "Nos gardiens sont des passionnés d'animaux avec une expérience significative du pet-sitting. Ils connaissent les différentes races, leurs besoins spécifiques et leurs comportements typiques. Cette expertise leur permet de s'adapter rapidement à chaque chien.",
      insurance: "Chaque gardien dispose d'une assurance responsabilité civile professionnelle couvrant son intervention. Votre domicile et votre animal sont protégés pendant toute la durée de la garde. Le paiement sécurisé vous offre une garantie supplémentaire.",
      method: "Notre méthode repose sur le respect, la bienveillance et l'adaptation. Le gardien s'intègre à votre foyer en suivant vos règles. Pas de changement brutal pour votre chien, mais une continuité rassurante avec une présence humaine attentive.",
      trust: "Ouvrir son domicile demande une confiance absolue. C'est pourquoi nos gardiens passent par une vérification d'identité complète, un contrôle de casier judiciaire et doivent fournir des références. Leurs avis vérifiés témoignent de leur fiabilité."
    },
    advantages: [
      "Chien maintenu dans son environnement habituel et rassurant",
      "Routine de promenades et de repas parfaitement conservée",
      "Présence rassurante et continue tout au long de la nuit",
      "Aucun stress de transport ou d'adaptation à un lieu inconnu",
      "Surveillance attentive de votre domicile pendant votre absence",
      "Solution idéale pour les chiens anxieux, âgés ou sous traitement",
      "Plusieurs animaux gardés ensemble dans leur foyer",
      "Nouvelles régulières avec photos et vidéos de votre compagnon"
    ],
    localAvailability: {
      mainCity: "Nos gardiens de domicile sont présents dans les grandes agglomérations et leurs périphéries.",
      surroundingAreas: "Que vous habitiez en appartement en ville ou en maison à la campagne, nous avons des gardiens prêts à s'installer chez vous. Certains gardiens sont mobiles et peuvent se déplacer dans un large rayon.",
      coverage: "Notre réseau de gardiens s'étend continuellement. Indiquez votre localisation pour découvrir les gardiens disponibles dans votre zone géographique."
    },
    faq: [
      { question: "Le gardien dort vraiment chez moi ?", answer: "Oui, le gardien passe la nuit complète à votre domicile. Il s'installe à l'heure convenue (généralement en fin de journée) et reste jusqu'au matin suivant. Pendant la nuit, il est présent pour rassurer votre chien et répondre à ses besoins. Vous définissez ensemble où le gardien dormira : chambre d'amis, canapé..." },
      { question: "Quels soins sont inclus dans la garde ?", answer: "La garde inclut tous les soins quotidiens : repas aux horaires habituels, eau fraîche, promenades matin et soir, jeux et câlins, surveillance générale de l'état de santé. Des soins spécifiques peuvent être ajoutés : administration de médicaments, brossage, soins des yeux/oreilles. Précisez vos besoins lors de la réservation." },
      { question: "Puis-je réserver plusieurs nuits consécutives ?", answer: "Absolument ! C'est même le cas le plus courant. Vous pouvez réserver autant de nuits que nécessaire avec le même gardien, garantissant ainsi une continuité dans les soins et une relation de confiance établie avec votre chien. Les tarifs sont souvent dégressifs pour les gardes longues." },
      { question: "Comment se passe l'accès à mon domicile ?", answer: "Vous convenez avec le gardien du mode de remise des clés avant votre départ : en main propre, boîte à clés sécurisée, ou remise par un tiers de confiance. Le gardien s'engage à sécuriser votre domicile et à vous restituer les clés selon les modalités convenues à votre retour." },
      { question: "Le gardien peut-il s'occuper de mes autres animaux ?", answer: "Oui, un des grands avantages de la garde à domicile est de pouvoir faire garder tous vos animaux ensemble. Chats, lapins, oiseaux peuvent être inclus dans la prestation. Précisez le nombre et les espèces lors de la réservation pour un devis adapté." },
      { question: "Que se passe-t-il en cas de problème de santé de mon chien ?", answer: "Nos gardiens sont formés pour détecter les signes de mal-être et réagir rapidement. En cas de problème, ils vous contactent immédiatement et peuvent, avec votre accord, emmener votre chien chez le vétérinaire que vous aurez indiqué. Les coordonnées vétérinaires font partie des informations à transmettre obligatoirement avant la garde." },
      { question: "Le gardien peut-il effectuer des tâches ménagères ?", answer: "La garde à domicile se concentre sur les soins de votre animal. Toutefois, certains gardiens acceptent de relever le courrier, arroser les plantes ou effectuer de petites tâches complémentaires. Discutez-en lors de la rencontre préalable et précisez-le dans votre réservation." },
      { question: "Comment sont sélectionnés les gardiens ?", answer: "Chaque gardien passe par un processus de vérification rigoureux : vérification d'identité, contrôle de casier judiciaire, attestation d'assurance, et références vérifiées. Nous les rencontrons et évaluons leur expérience avec les animaux avant de les intégrer à notre réseau." }
    ]
  },
  "accompagnement-veterinaire": {
    id: "veterinaire",
    slug: "accompagnement-veterinaire",
    title: "Accompagnement vétérinaire",
    metaTitle: "Accompagnement vétérinaire pour chien | Transport vet sécurisé | DogWalking",
    metaDescription: "Faites accompagner votre chien chez le vétérinaire par un professionnel de confiance. Transport sécurisé et présence rassurante pendant la consultation.",
    h1: "Accompagnement vétérinaire – Transport et présence rassurante",
    heroDescription: "Un professionnel de confiance transporte votre chien chez le vétérinaire et l'accompagne pendant la consultation, vous tenant informé en temps réel.",
    localZoneMention: "Accompagnateurs disponibles dans votre région",
    heroImage: veterinaryHero,
    image: vetAccompagnement,
    images: [
      { src: vetAccompagnement, alt: "Accompagnateur professionnel avec un chien devant l'entrée d'une clinique vétérinaire" },
      { src: vetTransport, alt: "Chien transporté en sécurité dans une cage de transport en voiture" },
      { src: vetAttente, alt: "Personne réconfortant un chien dans la salle d'attente d'une clinique vétérinaire" }
    ],
    minPrice: 15,
    duration: "Variable selon RDV",
    description: {
      intro: "L'accompagnement vétérinaire est un service essentiel pour les propriétaires qui ne peuvent pas emmener eux-mêmes leur animal chez le vétérinaire. Que ce soit pour des raisons professionnelles, de mobilité, ou simplement d'indisponibilité ponctuelle, notre service garantit que votre chien reçoive les soins nécessaires sans délai. Nos accompagnateurs expérimentés assurent un transport sécurisé et confortable, et restent présents pendant toute la consultation pour rassurer votre animal et vous transmettre les informations du vétérinaire. C'est la garantie d'un suivi médical optimal même en votre absence.",
      forWhom: "Ce service s'adresse aux propriétaires professionnellement très sollicités qui peinent à libérer du temps pour les rendez-vous vétérinaires. Les personnes âgées ou à mobilité réduite qui ne peuvent plus conduire trouvent une solution adaptée. Les propriétaires sans véhicule bénéficient d'un transport sécurisé. Les personnes anxieuses face aux consultations vétérinaires peuvent déléguer cette tâche stressante. Les multi-propriétaires d'animaux apprécient de pouvoir faire suivre tous leurs compagnons sans multiplier les déplacements personnels.",
      problemsSolved: "Reporter les visites vétérinaires faute de temps peut avoir des conséquences graves sur la santé de votre animal. Notre service élimine ce risque en prenant en charge l'intégralité du déplacement. Le stress du transport, particulièrement pour les chiens qui supportent mal la voiture, est géré par nos accompagnateurs expérimentés. L'incompréhension des consignes vétérinaires est évitée grâce à notre transmission fidèle des informations. Les urgences vétérinaires en votre absence sont prises en charge rapidement.",
      benefits: "Votre chien reçoit ses soins vétérinaires sans retard, préservant sa santé. Le transport est assuré dans des conditions sécurisées et adaptées à sa taille et son tempérament. La présence d'un accompagnateur pendant la consultation rassure votre animal et vous. Vous recevez un compte-rendu détaillé de la visite, incluant les observations du vétérinaire et les traitements prescrits. Les ordonnances et médicaments vous sont remis. Votre chien bénéficie d'un suivi médical optimal malgré vos contraintes."
    },
    howItWorks: {
      title: "Comment fonctionne l'accompagnement vétérinaire",
      intro: "Notre service d'accompagnement vétérinaire est organisé pour être fluide, fiable et transparent, de la prise en charge jusqu'au retour de votre animal.",
      steps: [
        { title: "Réservez votre accompagnement", description: "Indiquez la date et l'heure du rendez-vous vétérinaire, le nom de la clinique, et la nature de la consultation. Partagez le carnet de santé de votre chien et les symptômes éventuels à signaler au vétérinaire." },
        { title: "L'accompagnateur récupère votre chien", description: "À l'heure convenue, l'accompagnateur vient chercher votre chien à votre domicile. Il s'assure que l'animal est calme et prêt pour le transport. Les chiens anxieux bénéficient d'une approche adaptée pour minimiser leur stress." },
        { title: "Transport sécurisé", description: "Le trajet vers la clinique est effectué dans un véhicule adapté. Les petits chiens peuvent être en cage de transport, les grands chiens sont attachés confortablement. L'accompagnateur veille à la sécurité et au bien-être de votre animal pendant tout le trajet." },
        { title: "Présence pendant la consultation", description: "L'accompagnateur reste aux côtés de votre chien pendant toute la consultation. Il transmet au vétérinaire les informations que vous avez partagées, pose les questions convenues et note soigneusement les recommandations et prescriptions." },
        { title: "Retour et compte-rendu", description: "Après la consultation, votre chien est ramené chez vous. L'accompagnateur vous remet le carnet de santé mis à jour, les ordonnances, les médicaments prescrits et un compte-rendu détaillé de la visite." }
      ],
      safety: "Le transport s'effectue dans un véhicule équipé pour les animaux : cages de transport, harnais de sécurité, climatisation. Nos accompagnateurs sont formés aux gestes d'urgence et savent réagir face à un animal stressé ou malade. Ils connaissent les cliniques vétérinaires de votre secteur et leurs protocoles.",
      dogWelfare: "Le bien-être de votre chien est prioritaire. Nous adaptons notre approche à son tempérament : chiens anxieux, craintifs ou agités bénéficient d'une attention particulière. Pendant l'attente en clinique, l'accompagnateur rassure votre animal par sa présence et ses caresses."
    },
    expertiseAdvantages: {
      experience: "Nos accompagnateurs ont l'habitude des environnements vétérinaires. Ils savent comment se comporter en salle d'attente, comment aider le vétérinaire pendant la consultation, et comment rassurer un animal stressé par les odeurs et sons de la clinique.",
      insurance: "Chaque accompagnateur dispose d'une assurance responsabilité civile professionnelle. Votre animal est couvert pendant tout le trajet et la consultation. En cas d'incident, vous êtes protégé financièrement.",
      method: "Notre méthode repose sur la communication et la transparence. Avant la visite, nous recueillons toutes vos questions pour le vétérinaire. Après la visite, nous vous transmettons fidèlement les réponses et recommandations. Aucune information n'est perdue.",
      trust: "Confier son animal malade ou en besoin de soins demande une confiance totale. C'est pourquoi nos accompagnateurs passent par une vérification complète et sont formés spécifiquement pour ce service. Leurs avis attestent de leur professionnalisme."
    },
    advantages: [
      "Rendez-vous vétérinaires respectés malgré vos contraintes d'emploi du temps",
      "Transport sécurisé dans un véhicule adapté aux animaux",
      "Présence rassurante aux côtés de votre chien pendant toute la consultation",
      "Transmission fidèle et détaillée des informations du vétérinaire",
      "Récupération des ordonnances et médicaments prescrits",
      "Service adapté aux urgences vétérinaires imprévues",
      "Solution idéale pour les personnes âgées ou à mobilité réduite",
      "Compte-rendu complet envoyé après chaque visite"
    ],
    localAvailability: {
      mainCity: "Nos accompagnateurs connaissent les cliniques vétérinaires des principales agglomérations et savent s'y rendre rapidement.",
      surroundingAreas: "Les zones périurbaines et rurales sont également couvertes. Nos accompagnateurs sont mobiles et peuvent se déplacer sur un large rayon pour récupérer votre animal et l'emmener à la clinique de votre choix.",
      coverage: "Nous élargissons continuellement notre réseau d'accompagnateurs pour couvrir l'ensemble du territoire. Indiquez votre localisation et celle de votre vétérinaire pour vérifier la disponibilité."
    },
    faq: [
      { question: "L'accompagnateur peut-il poser des questions au vétérinaire ?", answer: "Absolument ! Avant le rendez-vous, nous vous demandons de nous transmettre toutes vos questions et préoccupations. L'accompagnateur les posera au vétérinaire et notera soigneusement les réponses. Il peut également appeler en direct pendant la consultation si vous le souhaitez, pour que vous parliez directement au vétérinaire." },
      { question: "Comment se passe le transport pour un chien qui a le mal des transports ?", answer: "Nous adaptons le transport aux besoins de votre chien. Pour les animaux sujets au mal des transports, nous recommandons un jeûne de quelques heures avant le trajet, des pauses fréquentes pour les longs trajets, et une conduite douce. Des housses de protection sont utilisées pour prévenir les accidents." },
      { question: "Puis-je être contacté pendant la consultation ?", answer: "Oui, si vous le souhaitez, l'accompagnateur peut vous appeler pendant la consultation pour que vous parliez directement au vétérinaire. Vous pouvez également lui envoyer des messages pendant le rendez-vous. Après la consultation, un compte-rendu complet vous est transmis avec toutes les informations importantes." },
      { question: "L'accompagnateur peut-il récupérer des médicaments ?", answer: "Oui, l'accompagnateur récupère les ordonnances et peut acheter les médicaments prescrits directement à la clinique ou en pharmacie si nécessaire. Les médicaments vous sont remis avec le carnet de santé mis à jour lors du retour de votre animal à votre domicile." },
      { question: "Ce service fonctionne-t-il pour les urgences vétérinaires ?", answer: "Oui, nous pouvons intervenir en urgence selon la disponibilité des accompagnateurs. Si votre chien présente des symptômes inquiétants et que vous ne pouvez pas vous déplacer, contactez-nous immédiatement. Nous ferons notre maximum pour envoyer un accompagnateur dans les plus brefs délais vers une clinique de garde." },
      { question: "Mon chien sera-t-il stressé par un inconnu chez le vétérinaire ?", answer: "Nos accompagnateurs sont formés pour rassurer les animaux. Ils utilisent une approche douce, des friandises si autorisées, et restent calmes pour transmettre cette sérénité à votre chien. Pour les chiens très anxieux, une rencontre préalable peut être organisée pour établir la confiance avant le jour J." },
      { question: "Quels types de consultations sont couverts ?", answer: "Nous accompagnons pour tous types de consultations : visites de routine, vaccinations, consultations spécialisées, examens (radiographies, échographies), soins dentaires, et suivis post-opératoires. Pour les interventions chirurgicales, nous pouvons déposer votre animal le matin et le récupérer après l'opération." },
      { question: "Comment réserver en urgence ?", answer: "Pour les urgences, contactez-nous directement par téléphone. Nous consultons immédiatement la disponibilité des accompagnateurs dans votre zone et organisons la prise en charge le plus rapidement possible. Notre équipe de support est réactive pour répondre aux situations critiques." }
    ]
  },
  "hebergement-chien": {
    id: "hebergement",
    slug: "hebergement-chien",
    title: "Hébergement de chien",
    metaTitle: "Hébergement de chien | Pension familiale de confiance | DogWalking",
    metaDescription: "Faites héberger votre chien chez un family sitter vérifié. Votre compagnon profite d'un cadre familial chaleureux avec promenades incluses. Réservez en ligne.",
    h1: "Hébergement de chien – Une pension familiale pour votre compagnon",
    heroDescription: "Pendant vos vacances ou déplacements, votre chien est accueilli dans une famille d'accueil aimante et vérifiée, avec promenades quotidiennes et soins personnalisés.",
    localZoneMention: "Familles d'accueil disponibles près de chez vous",
    heroImage: hebergementHero,
    image: hebergementNuit,
    images: [
      { src: hebergementNuit, alt: "Golden retriever dormant paisiblement dans un salon chaleureux avec pet-sitter lisant à côté" },
      { src: hebergementJardin, alt: "Labrador jouant joyeusement avec des jouets dans un jardin clôturé et sécurisé" },
      { src: hebergementRepas, alt: "Pet-sitter préparant le repas pour plusieurs chiens dans une cuisine moderne et lumineuse" }
    ],
    minPrice: 25,
    duration: "Par nuit",
    description: {
      intro: "L'hébergement de chien chez un family sitter représente l'alternative idéale aux pensions traditionnelles. Votre compagnon est accueilli dans un véritable foyer, entouré d'une famille aimante qui lui offre attention, confort et stimulation pendant toute la durée de votre absence. Contrairement aux chenils où les chiens sont souvent en box individuel avec des interactions limitées, l'hébergement familial garantit une vie quotidienne riche : promenades régulières, jeux, câlins et compagnie constante. Nos family sitters sont rigoureusement sélectionnés pour leur amour des animaux, leur expérience et leur environnement adapté à l'accueil de chiens.",
      forWhom: "Ce service s'adresse à tous les propriétaires devant s'absenter pour des vacances, des voyages professionnels ou des événements familiaux. Les chiens sociables qui apprécient la compagnie humaine et animale s'épanouissent particulièrement dans ce cadre familial. Les propriétaires de chiens anxieux ou âgés trouvent dans l'hébergement familial une solution plus douce que les pensions classiques. Les maîtres souhaitant offrir à leur compagnon des vacances aussi agréables que les leurs font confiance à nos familles d'accueil. Les chiens ayant des besoins spécifiques (régime alimentaire, médicaments) bénéficient d'une prise en charge personnalisée impossible en structure collective.",
      problemsSolved: "La culpabilité de laisser son chien pendant les vacances est un frein majeur pour de nombreux propriétaires. L'hébergement familial résout ce dilemme en offrant à votre animal des vacances tout aussi enrichissantes. Le stress des pensions collectives, avec leurs aboiements constants et leur environnement impersonnel, est totalement évité. Les chiens qui dépriment en chenil retrouvent joie de vivre et stimulation chez nos family sitters. Les propriétaires qui devaient renoncer à voyager peuvent enfin partir l'esprit tranquille, sachant leur compagnon entre de bonnes mains.",
      benefits: "Votre chien bénéficie d'un cadre de vie familial avec tout le confort d'une maison : canapé, jardin, compagnie humaine constante. Les promenades quotidiennes sont incluses, garantissant exercice et stimulation mentale. L'attention individuelle permet de respecter les habitudes et les besoins spécifiques de votre animal. Vous recevez des photos et nouvelles régulières pour rester connecté à votre compagnon. Le family sitter apprend à connaître votre chien et adapte son approche à sa personnalité unique. Votre animal revient détendu et épanoui, ayant vécu une véritable expérience de vacances."
    },
    howItWorks: {
      title: "Comment fonctionne l'hébergement familial",
      intro: "Notre service d'hébergement est conçu pour une transition en douceur et un séjour parfait pour votre chien.",
      steps: [
        { title: "Trouvez votre family sitter idéal", description: "Parcourez les profils détaillés de nos familles d'accueil : photos de leur maison et jardin, présentation de leur famille et éventuels animaux, avis des autres propriétaires. Filtrez par localisation, disponibilités et caractéristiques (maison avec jardin, sans autres animaux, etc.)." },
        { title: "Organisez une rencontre préalable", description: "Avant le séjour, rencontrez le family sitter avec votre chien. Cette étape cruciale permet de vérifier la compatibilité, de visiter les lieux et de transmettre toutes les consignes importantes. Votre chien découvre son futur environnement en votre présence rassurante." },
        { title: "Déposez votre chien sereinement", description: "Le jour J, amenez votre chien avec ses affaires (panier, jouets, nourriture). Le family sitter prend le relais avec bienveillance. Une transition douce est assurée, avec éventuellement une courte promenade ensemble pour faciliter la passation." },
        { title: "Restez connecté pendant le séjour", description: "Recevez des photos et nouvelles quotidiennes de votre compagnon. Le family sitter partage les moments forts : promenades, jeux, siestes. Vous pouvez échanger par messages à tout moment pour garder le lien." },
        { title: "Retrouvez un chien épanoui", description: "À votre retour, récupérez votre compagnon. Le family sitter vous fait un compte-rendu complet du séjour : appétit, comportement, moments mémorables. Votre chien a passé de vraies vacances !" }
      ],
      safety: "La sécurité de votre chien est notre priorité absolue. Toutes les familles d'accueil sont vérifiées : identité, casier judiciaire, assurance habitation. Leur domicile est inspecté pour garantir un environnement sécurisé (jardin clôturé, absence de dangers). En cas de problème de santé, le family sitter contacte immédiatement votre vétérinaire ou une clinique de garde.",
      dogWelfare: "Le bien-être de votre animal guide chaque aspect du séjour. Le family sitter respecte ses habitudes : heures de repas, promenades préférées, rituel du coucher. Les chiens anxieux bénéficient d'une approche douce et progressive. L'environnement familial, sans stress de chenil, favorise un séjour serein et épanouissant."
    },
    expertiseAdvantages: {
      experience: "Nos family sitters sont des passionnés d'animaux avec une solide expérience. Beaucoup possèdent ou ont possédé des chiens, comprenant intimement leurs besoins. Certains sont d'anciens professionnels du monde animal : éducateurs, toiletteurs, auxiliaires vétérinaires. Cette expertise garantit des soins de qualité.",
      insurance: "Chaque family sitter dispose d'une assurance responsabilité civile couvrant les incidents potentiels. Votre chien est protégé pendant tout son séjour. Le paiement sécurisé via notre plateforme vous garantit également une protection en cas de problème avec la prestation.",
      method: "Notre approche privilégie l'intégration familiale plutôt que la simple garde. Votre chien devient temporairement un membre de la famille d'accueil, participant à la vie quotidienne : repas en famille, balades, moments de détente sur le canapé. Cette immersion crée une expérience positive et enrichissante.",
      trust: "La confiance est fondamentale pour confier son compagnon à des inconnus. C'est pourquoi nous vérifions rigoureusement chaque family sitter : identité, casier judiciaire, références vérifiables. Les avis authentiques des autres propriétaires vous aident à choisir en toute sérénité."
    },
    advantages: [
      "Accueil chaleureux dans un véritable foyer familial",
      "Promenades quotidiennes incluses pour le bien-être de votre chien",
      "Attention individuelle et soins personnalisés",
      "Environnement sécurisé avec jardin clôturé",
      "Photos et nouvelles quotidiennes pendant le séjour",
      "Family sitters rigoureusement vérifiés et assurés",
      "Respect total des habitudes et du régime alimentaire",
      "Alternative chaleureuse aux pensions collectives stressantes"
    ],
    localAvailability: {
      mainCity: "Notre réseau de familles d'accueil couvre l'ensemble du territoire français, des grandes métropoles aux zones rurales.",
      surroundingAreas: "Que vous cherchiez un hébergement près de chez vous pour faciliter le dépôt, ou dans une région spécifique pour combiner avec un voyage, nous avons des options partout. Les campagnes offrent des hébergements avec grands espaces, les villes proposent des solutions pratiques.",
      coverage: "Avec des centaines de familles d'accueil actives, vous trouverez forcément l'hébergement idéal pour votre compagnon. Entrez votre localisation pour découvrir les options disponibles."
    },
    faq: [
      { question: "Comment sont sélectionnés les family sitters ?", answer: "Chaque family sitter passe par un processus de vérification rigoureux : contrôle d'identité, extrait de casier judiciaire, visite du domicile pour vérifier la sécurité (jardin clôturé, environnement adapté). Nous vérifions également leurs références et leur expérience avec les chiens. Seuls les candidats répondant à tous nos critères sont acceptés." },
      { question: "Mon chien peut-il garder ses habitudes alimentaires ?", answer: "Absolument ! Vous fournissez la nourriture habituelle de votre chien et toutes les instructions concernant son régime : quantités, horaires, friandises autorisées, aliments interdits. Le family sitter suit scrupuleusement vos consignes pour maintenir la routine alimentaire de votre compagnon." },
      { question: "Que se passe-t-il si mon chien a un problème de santé ?", answer: "Nos family sitters sont formés pour détecter les signes de mal-être. En cas de problème, ils vous contactent immédiatement et peuvent, avec votre accord, emmener votre chien chez le vétérinaire que vous aurez indiqué ou dans une clinique de garde. Les coordonnées vétérinaires font partie des informations obligatoires avant le séjour." },
      { question: "La famille d'accueil a-t-elle d'autres animaux ?", answer: "Chaque profil indique clairement si le foyer compte d'autres animaux et leurs caractéristiques. Vous pouvez filtrer les recherches selon vos préférences : famille sans autres animaux, avec chien(s), avec chat(s). La rencontre préalable permet de vérifier la compatibilité avec les éventuels résidents." },
      { question: "Puis-je rendre visite à mon chien pendant le séjour ?", answer: "Pour le bien-être de votre chien et éviter de perturber son adaptation, nous recommandons de limiter les visites. Toutefois, en cas de séjour prolongé, des visites peuvent être envisagées en accord avec le family sitter. Les photos et nouvelles quotidiennes vous permettent de rester connecté." },
      { question: "Combien de promenades mon chien aura-t-il par jour ?", answer: "Au minimum deux promenades quotidiennes sont assurées : une le matin et une en fin de journée. Selon les besoins de votre chien et les possibilités du family sitter, des sorties supplémentaires peuvent être organisées. Si le foyer dispose d'un jardin, votre chien profite également d'accès libres à l'extérieur." },
      { question: "Comment puis-je réserver un hébergement ?", answer: "Recherchez les familles d'accueil disponibles pour vos dates en indiquant votre localisation et les besoins de votre chien. Consultez les profils, lisez les avis, puis envoyez une demande de réservation. Après acceptation, organisez la rencontre préalable puis confirmez la réservation avec le paiement sécurisé." },
      { question: "Que dois-je apporter pour le séjour de mon chien ?", answer: "Nous recommandons d'apporter : sa nourriture habituelle en quantité suffisante, son panier ou couverture préférée (odeur rassurante), quelques jouets, sa laisse et son collier, son carnet de santé à jour, et ses éventuels médicaments. Les affaires familières aident votre chien à se sentir à l'aise." }
    ]
  },
  "garderie-chien": {
    id: "garderie",
    slug: "garderie-chien",
    title: "Garderie de jour pour chien",
    metaTitle: "Garderie de jour pour chien | Daycare canin professionnel | DogWalking",
    metaDescription: "Garderie de jour pour chien avec socialisation et activités encadrées. Votre chien passe une journée épanouissante pendant vos heures de travail. Réservez en ligne.",
    h1: "Garderie de jour – Des journées stimulantes pour votre chien",
    heroDescription: "Pendant vos heures de travail, votre chien profite d'une journée riche en jeux, socialisation et activités encadrées par des professionnels passionnés.",
    localZoneMention: "Garderies canines près de votre lieu de travail ou domicile",
    heroImage: garderieHero,
    image: garderieSalle,
    images: [
      { src: garderieSalle, alt: "Chiens de différentes races jouant ensemble dans une salle de jeux colorée et spacieuse" },
      { src: garderieSocial, alt: "Groupe de chiens socialisant sous la supervision d'une professionnelle dans un parc clôturé" },
      { src: garderieRepos, alt: "Chiens se reposant confortablement sur des coussins moelleux pendant la sieste de l'après-midi" }
    ],
    minPrice: 20,
    duration: "Journée",
    description: {
      intro: "La garderie de jour pour chien, également appelée daycare canin, offre une solution idéale pour les propriétaires travaillant toute la journée. Plutôt que de laisser votre compagnon seul à la maison pendant 8 à 10 heures, confiez-le à nos garderies partenaires où il passera une journée riche en activités, jeux et interactions sociales. Les chiens sont des animaux sociaux qui souffrent de la solitude prolongée. La garderie répond à leur besoin fondamental de compagnie et de stimulation, tout en vous permettant de travailler l'esprit tranquille.",
      forWhom: "Ce service est parfait pour les professionnels aux longues journées de travail qui ne peuvent pas rentrer en milieu de journée. Les propriétaires de jeunes chiens débordants d'énergie y trouvent une solution pour canaliser cette vitalité. Les chiens sociables qui adorent jouer avec leurs congénères s'épanouissent particulièrement en garderie. Les personnes souhaitant socialiser leur chien de manière encadrée et progressive apprécient l'environnement contrôlé. Les télétravailleurs ayant besoin de se concentrer sans sollicitations canines constantes bénéficient aussi de ce service.",
      problemsSolved: "La solitude prolongée engendre de nombreux problèmes chez le chien : anxiété de séparation, aboiements excessifs dérangeant les voisins, destructions, dépression. La garderie élimine tous ces soucis en offrant compagnie et stimulation. L'ennui, source de comportements indésirables, est combattu par les activités variées proposées. Le manque d'exercice, fréquent chez les chiens de propriétaires très occupés, est compensé par les heures de jeu et de mouvement. Les problèmes de socialisation sont également adressés grâce aux interactions encadrées avec d'autres chiens.",
      benefits: "Votre chien bénéficie d'une journée complète d'activités adaptées à son âge, sa taille et son tempérament. La socialisation régulière développe ses compétences sociales et réduit les comportements réactifs. L'exercice physique intense le fatigue sainement : le soir, vous retrouvez un compagnon calme et satisfait. La stimulation mentale des jeux et interactions enrichit sa vie quotidienne. Vous travaillez sans culpabilité ni inquiétude, sachant votre chien heureux. Le lien entre vous se renforce, chaque retrouvaille étant un moment de joie partagée."
    },
    howItWorks: {
      title: "Comment fonctionne la garderie de jour",
      intro: "Nos garderies partenaires offrent une expérience professionnelle et sécurisée pour votre compagnon.",
      steps: [
        { title: "Évaluation initiale", description: "Avant la première journée, une évaluation comportementale permet de vérifier que votre chien est compatible avec la garderie collective : sociabilité, réactivité, comportement en groupe. Cette étape garantit la sécurité et le bien-être de tous les pensionnaires." },
        { title: "Intégration progressive", description: "Les premières séances sont souvent des demi-journées pour permettre à votre chien de s'habituer en douceur à ce nouvel environnement. Les professionnels observent son comportement et adaptent l'accompagnement à ses besoins." },
        { title: "Journée type en garderie", description: "La journée alterne entre temps de jeu libre (sous surveillance), activités encadrées, promenades et temps de repos. Les chiens sont regroupés par taille et tempérament pour des interactions harmonieuses. L'hydratation et les pauses sont régulières." },
        { title: "Suivi personnalisé", description: "Vous recevez un compte-rendu de la journée : activités réalisées, comportement, interactions avec les autres chiens. Les professionnels vous informent de tout élément notable et peuvent suggérer des pistes d'amélioration comportementale." }
      ],
      safety: "La sécurité est primordiale dans nos garderies partenaires. Les locaux sont sécurisés et adaptés aux chiens : sols antidérapants, espaces clos, absence de dangers. Un ratio encadrants/chiens strict garantit une surveillance constante. Les chiens non castrés peuvent être séparés selon les règles de l'établissement. Les vaccinations sont vérifiées avant admission.",
      dogWelfare: "Le bien-être animal guide toutes les pratiques. Les chiens sont regroupés par affinités et tempéraments pour éviter les tensions. Des espaces calmes sont disponibles pour les repos et les chiens ayant besoin de solitude temporaire. L'alimentation et les éventuels médicaments de votre chien sont administrés selon vos consignes."
    },
    expertiseAdvantages: {
      experience: "Nos garderies partenaires sont gérées par des professionnels du monde canin : éducateurs comportementalistes, anciens éleveurs, passionnés formés. Cette expertise permet de gérer les dynamiques de groupe, de prévenir les conflits et d'offrir des activités enrichissantes adaptées.",
      insurance: "Toutes les garderies partenaires disposent des assurances nécessaires pour couvrir leur activité. Votre chien est protégé pendant toute la durée de sa présence. Les locaux sont conformes aux réglementations en vigueur pour l'accueil d'animaux.",
      method: "L'approche pédagogique repose sur le renforcement positif et le respect du rythme de chaque chien. Pas de méthodes coercitives, pas de stress inutile. Les professionnels savent lire le langage canin et interviennent avant que les tensions ne dégénèrent. L'objectif est que chaque chien passe une bonne journée.",
      trust: "Nous sélectionnons soigneusement nos garderies partenaires. Visites des locaux, vérification des qualifications, lecture des avis clients : chaque établissement répond à nos critères de qualité. Les avis des propriétaires vous aident à choisir la garderie idéale."
    },
    advantages: [
      "Journées riches en jeux, activités et socialisation",
      "Alternative saine à la solitude prolongée",
      "Exercice physique intense pour un chien calme le soir",
      "Développement des compétences sociales canines",
      "Encadrement professionnel par des passionnés qualifiés",
      "Espaces sécurisés et adaptés aux besoins des chiens",
      "Compte-rendu quotidien du comportement de votre chien",
      "Formules flexibles : journée complète ou demi-journée"
    ],
    localAvailability: {
      mainCity: "Nos garderies partenaires sont situées dans les principales agglomérations françaises, souvent à proximité des zones d'activité professionnelle.",
      surroundingAreas: "Les zones périurbaines sont également couvertes, permettant un dépôt pratique sur le trajet du travail. Certaines garderies proposent même un service de ramassage à domicile.",
      coverage: "Notre réseau de garderies partenaires s'étend continuellement. Recherchez par localisation pour trouver les options près de chez vous ou de votre lieu de travail."
    },
    faq: [
      { question: "Mon chien doit-il être sociable pour aller en garderie ?", answer: "La garderie collective convient aux chiens sociables et à l'aise avec leurs congénères. Une évaluation initiale permet de vérifier la compatibilité de votre chien. Les chiens réactifs, peureux ou agressifs ne sont généralement pas acceptés en groupe, mais des solutions individuelles peuvent être proposées." },
      { question: "Mon chien sera-t-il surveillé en permanence ?", answer: "Oui, les professionnels de la garderie assurent une surveillance constante des groupes de chiens. Le ratio encadrants/chiens est maintenu à un niveau permettant une intervention rapide si nécessaire. Les caméras de surveillance permettent également un contrôle permanent." },
      { question: "Que se passe-t-il si mon chien ne s'entend pas avec un autre ?", answer: "Les professionnels sont formés pour détecter les tensions avant qu'elles ne dégénèrent. Les chiens incompatibles sont séparés dans des groupes ou espaces différents. Si votre chien montre des difficultés récurrentes d'intégration, des solutions alternatives (garderie individuelle, créneaux calmes) peuvent être proposées." },
      { question: "La garderie convient-elle aux chiots ?", answer: "La plupart des garderies acceptent les chiots à partir de 4 mois, une fois le protocole vaccinal de base terminé. Les chiots sont souvent placés dans des groupes adaptés à leur âge et leur énergie. La garderie est excellente pour la socialisation précoce, cruciale à cet âge." },
      { question: "Puis-je déposer mon chien à n'importe quelle heure ?", answer: "Les garderies ont généralement des créneaux d'accueil le matin (7h-9h) et de départ le soir (17h-19h). Certains établissements offrent plus de flexibilité. Vérifiez les horaires spécifiques de la garderie choisie lors de la réservation." },
      { question: "Mon chien sera-t-il nourri ?", answer: "La plupart des garderies ne fournissent pas les repas pour respecter le régime alimentaire de chaque chien. Vous pouvez apporter la ration de votre chien qui sera servie aux heures indiquées. L'eau fraîche est bien sûr disponible en permanence." },
      { question: "Quelles vaccinations sont requises ?", answer: "Les vaccinations obligatoires incluent généralement : rage, maladie de Carré, hépatite, parvovirose et leptospirose. Le vaccin contre la toux du chenil (Bordetella) est souvent exigé pour les chiens en collectivité. Votre carnet de santé à jour sera demandé lors de l'inscription." },
      { question: "Y a-t-il des activités spécifiques proposées ?", answer: "Selon les garderies, des activités variées peuvent être proposées : parcours d'agilité, jeux d'intelligence, piscine (en saison), promenades extérieures. Certains établissements offrent même des séances d'éducation ou de toilettage en supplément. Renseignez-vous sur les prestations disponibles." }
    ]
  }
};

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData[slug];
};

export const getAllServices = (): ServiceData[] => {
  return Object.values(servicesData);
};
