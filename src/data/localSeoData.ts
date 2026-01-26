// Données SEO locales pour toutes les zones géographiques de France

export interface LocalZone {
  id: string;
  name: string;
  slug: string;
  type: 'city' | 'arrondissement' | 'quartier' | 'region';
  parent?: string;
  priority: 1 | 2 | 3 | 4;
  image: string;
  altText: string;
  description: string;
  population?: string;
  highlights: string[];
  department?: string;
}

export interface LocalService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
}

export const services: LocalService[] = [
  {
    id: 'promenade',
    name: 'Promenade de chien',
    slug: 'promenade-chien',
    shortDescription: 'Promenades quotidiennes adaptées aux besoins de votre chien'
  },
  {
    id: 'garde',
    name: 'Garde de chien',
    slug: 'garde-chien',
    shortDescription: 'Garde à domicile ou chez le pet-sitter de confiance'
  },
  {
    id: 'visite',
    name: 'Visite à domicile',
    slug: 'visite-domicile',
    shortDescription: 'Visites régulières pour nourrir et câliner votre compagnon'
  },
  {
    id: 'veterinaire',
    name: 'Accompagnement vétérinaire',
    slug: 'accompagnement-veterinaire',
    shortDescription: 'Transport et accompagnement chez le vétérinaire'
  }
];

export const zones: LocalZone[] = [
  // ========================================
  // PRIORITÉ 1 : Paris et Île-de-France
  // ========================================
  
  // Paris
  {
    id: 'paris',
    name: 'Paris',
    slug: 'paris',
    type: 'city',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien professionnel à Paris devant la Tour Eiffel',
    description: 'Service de promenade et garde de chien dans tout Paris',
    population: '2,1 millions',
    highlights: ['Bois de Boulogne', 'Bois de Vincennes', 'Jardins du Luxembourg']
  },
  // Arrondissements de Paris
  {
    id: 'paris-1',
    name: 'Paris 1er',
    slug: 'paris-1er',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Dog walker professionnel dans le 1er arrondissement de Paris près du Louvre',
    description: 'Promeneurs de chien disponibles dans le 1er arrondissement',
    highlights: ['Jardin des Tuileries', 'Palais Royal', 'Les Halles']
  },
  {
    id: 'paris-2',
    name: 'Paris 2ème',
    slug: 'paris-2eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promenade de chien dans le 2ème arrondissement de Paris Grands Boulevards',
    description: 'Services de promenade canine dans le 2ème arrondissement',
    highlights: ['Passage des Panoramas', 'Rue Montorgueil', 'Square Louvois']
  },
  {
    id: 'paris-3',
    name: 'Paris 3ème',
    slug: 'paris-3eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Pet sitter dans le 3ème arrondissement de Paris Haut Marais',
    description: 'Dog walkers de confiance dans le Haut Marais',
    highlights: ['Square du Temple', 'Musée Picasso', 'Archives Nationales']
  },
  {
    id: 'paris-4',
    name: 'Paris 4ème',
    slug: 'paris-4eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien dans le Marais Paris 4ème',
    description: 'Promeneurs disponibles dans le 4ème arrondissement et le Marais',
    highlights: ['Place des Vosges', 'Île Saint-Louis', 'Hôtel de Ville']
  },
  {
    id: 'paris-5',
    name: 'Paris 5ème',
    slug: 'paris-5eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Dog walker Quartier Latin Paris 5ème arrondissement',
    description: 'Services canins dans le Quartier Latin',
    highlights: ['Jardin des Plantes', 'Jardin du Luxembourg', 'Panthéon']
  },
  {
    id: 'paris-6',
    name: 'Paris 6ème',
    slug: 'paris-6eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Germain-des-Prés Paris 6ème',
    description: 'Promeneurs de chien à Saint-Germain-des-Prés',
    highlights: ['Jardin du Luxembourg', 'Saint-Germain-des-Prés', 'Odéon']
  },
  {
    id: 'paris-7',
    name: 'Paris 7ème',
    slug: 'paris-7eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Pet sitter Tour Eiffel Paris 7ème arrondissement',
    description: 'Services de garde et promenade près de la Tour Eiffel',
    highlights: ['Champ de Mars', 'Esplanade des Invalides', 'Musée Rodin']
  },
  {
    id: 'paris-8',
    name: 'Paris 8ème',
    slug: 'paris-8eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien Champs-Élysées Paris 8ème',
    description: 'Dog walkers premium sur les Champs-Élysées',
    highlights: ['Parc Monceau', 'Champs-Élysées', 'Grand Palais']
  },
  {
    id: 'paris-9',
    name: 'Paris 9ème',
    slug: 'paris-9eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=400&h=300&fit=crop',
    altText: 'Garde de chien Opéra Paris 9ème arrondissement',
    description: 'Promeneurs disponibles près de l\'Opéra',
    highlights: ['Square Montholon', 'Opéra Garnier', 'Grands Magasins']
  },
  {
    id: 'paris-10',
    name: 'Paris 10ème',
    slug: 'paris-10eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Dog walker Canal Saint-Martin Paris 10ème',
    description: 'Services canins le long du Canal Saint-Martin',
    highlights: ['Canal Saint-Martin', 'Square Villemin', 'Gare du Nord']
  },
  {
    id: 'paris-11',
    name: 'Paris 11ème',
    slug: 'paris-11eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Promenade de chien Bastille Paris 11ème',
    description: 'Promeneurs de chien disponibles à Bastille et Oberkampf',
    highlights: ['Square Maurice Gardette', 'Place de la République', 'Rue Oberkampf']
  },
  {
    id: 'paris-12',
    name: 'Paris 12ème',
    slug: 'paris-12eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Pet sitter Bois de Vincennes Paris 12ème',
    description: 'Promeneurs près du Bois de Vincennes',
    highlights: ['Bois de Vincennes', 'Promenade Plantée', 'Bercy Village']
  },
  {
    id: 'paris-13',
    name: 'Paris 13ème',
    slug: 'paris-13eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien Butte aux Cailles Paris 13ème',
    description: 'Services de promenade à la Butte aux Cailles',
    highlights: ['Parc de Choisy', 'Butte aux Cailles', 'Bibliothèque François Mitterrand']
  },
  {
    id: 'paris-14',
    name: 'Paris 14ème',
    slug: 'paris-14eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Dog walker Montparnasse Paris 14ème',
    description: 'Promeneurs disponibles à Montparnasse et Alésia',
    highlights: ['Parc Montsouris', 'Cité Universitaire', 'Rue Daguerre']
  },
  {
    id: 'paris-15',
    name: 'Paris 15ème',
    slug: 'paris-15eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
    altText: 'Garde de chien Paris 15ème arrondissement Convention',
    description: 'Le plus grand arrondissement de Paris pour vos chiens',
    highlights: ['Parc Georges Brassens', 'Parc André Citroën', 'Beaugrenelle']
  },
  {
    id: 'paris-16',
    name: 'Paris 16ème',
    slug: 'paris-16eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop',
    altText: 'Promenade de chien au Bois de Boulogne Paris 16ème',
    description: 'Services canins premium dans le 16ème arrondissement',
    highlights: ['Bois de Boulogne', 'Jardins du Trocadéro', 'Auteuil']
  },
  {
    id: 'paris-17',
    name: 'Paris 17ème',
    slug: 'paris-17eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=400&h=300&fit=crop',
    altText: 'Pet sitter dans le 17ème arrondissement de Paris Batignolles',
    description: 'Dog sitters de confiance dans les Batignolles',
    highlights: ['Parc Martin Luther King', 'Square des Batignolles', 'Parc Monceau']
  },
  {
    id: 'paris-18',
    name: 'Paris 18ème',
    slug: 'paris-18eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien Montmartre Paris 18ème',
    description: 'Promeneurs sur la butte Montmartre',
    highlights: ['Square Louise Michel', 'Jardins du Sacré-Cœur', 'Square Léon']
  },
  {
    id: 'paris-19',
    name: 'Paris 19ème',
    slug: 'paris-19eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker Parc des Buttes-Chaumont Paris 19ème',
    description: 'Services canins aux Buttes-Chaumont',
    highlights: ['Parc des Buttes-Chaumont', 'Parc de la Villette', 'Canal de l\'Ourcq']
  },
  {
    id: 'paris-20',
    name: 'Paris 20ème',
    slug: 'paris-20eme',
    type: 'arrondissement',
    parent: 'paris',
    priority: 1,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Promenade de chien Belleville Ménilmontant Paris 20ème',
    description: 'Promeneurs à Belleville et Ménilmontant',
    highlights: ['Parc de Belleville', 'Père Lachaise', 'Rue de Ménilmontant']
  },

  // Val-de-Marne (94)
  {
    id: 'vincennes',
    name: 'Vincennes',
    slug: 'vincennes-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien dans le Bois de Vincennes 94',
    description: 'Services de promenade près du Bois de Vincennes',
    population: '49 000',
    highlights: ['Bois de Vincennes', 'Parc Floral', 'Lac Daumesnil']
  },
  {
    id: 'saint-mande',
    name: 'Saint-Mandé',
    slug: 'saint-mande-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Mandé près du Bois de Vincennes',
    description: 'Promeneurs disponibles à Saint-Mandé et environs',
    population: '22 000',
    highlights: ['Proximité Bois de Vincennes', 'Parc de la Légion d\'Honneur']
  },
  {
    id: 'charenton',
    name: 'Charenton-le-Pont',
    slug: 'charenton-le-pont-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Service de garde de chien à Charenton-le-Pont Val-de-Marne',
    description: 'Garde et promenade de chien à Charenton',
    population: '31 000',
    highlights: ['Bords de Marne', 'Île de Bercy']
  },
  {
    id: 'nogent',
    name: 'Nogent-sur-Marne',
    slug: 'nogent-sur-marne-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien à Nogent-sur-Marne bords de Marne',
    description: 'Services canins à Nogent-sur-Marne',
    population: '33 000',
    highlights: ['Bords de Marne', 'Parc de Nogent', 'Bois de Vincennes']
  },
  {
    id: 'fontenay',
    name: 'Fontenay-sous-Bois',
    slug: 'fontenay-sous-bois-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter Fontenay-sous-Bois Val-de-Marne',
    description: 'Promeneurs de chien à Fontenay-sous-Bois',
    population: '53 000',
    highlights: ['Bois de Vincennes', 'Parc de l\'Hôtel de Ville']
  },
  {
    id: 'maisons-alfort',
    name: 'Maisons-Alfort',
    slug: 'maisons-alfort-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    altText: 'Garde de chien à Maisons-Alfort école vétérinaire',
    description: 'Services canins à Maisons-Alfort',
    population: '56 000',
    highlights: ['Bords de Marne', 'École Vétérinaire', 'Île de Charentonneau']
  },
  {
    id: 'creteil',
    name: 'Créteil',
    slug: 'creteil-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien à Créteil préfecture du Val-de-Marne',
    description: 'Dog walkers disponibles à Créteil',
    population: '92 000',
    highlights: ['Lac de Créteil', 'Île de loisirs', 'Parc Dupeyroux']
  },
  {
    id: 'saint-maur',
    name: 'Saint-Maur-des-Fossés',
    slug: 'saint-maur-des-fosses-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Maur-des-Fossés',
    description: 'Services canins à Saint-Maur-des-Fossés',
    population: '77 000',
    highlights: ['Bords de Marne', 'Parc de Saint-Maur', 'Île Fanac']
  },
  {
    id: 'ivry',
    name: 'Ivry-sur-Seine',
    slug: 'ivry-sur-seine-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Ivry-sur-Seine',
    description: 'Promeneurs de chien à Ivry-sur-Seine',
    population: '65 000',
    highlights: ['Bords de Seine', 'Parc des Cormailles']
  },
  {
    id: 'vitry',
    name: 'Vitry-sur-Seine',
    slug: 'vitry-sur-seine-94',
    type: 'city',
    priority: 1,
    department: '94',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Vitry-sur-Seine',
    description: 'Services de garde et promenade à Vitry',
    population: '95 000',
    highlights: ['Parc du Coteau', 'Bords de Seine']
  },

  // Hauts-de-Seine (92)
  {
    id: 'boulogne',
    name: 'Boulogne-Billancourt',
    slug: 'boulogne-billancourt-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Boulogne-Billancourt',
    description: 'Dog walkers à Boulogne-Billancourt',
    population: '121 000',
    highlights: ['Bois de Boulogne', 'Parc de Billancourt', 'Île Seguin']
  },
  {
    id: 'neuilly',
    name: 'Neuilly-sur-Seine',
    slug: 'neuilly-sur-seine-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Neuilly-sur-Seine',
    description: 'Services canins premium à Neuilly',
    population: '60 000',
    highlights: ['Bois de Boulogne', 'Jardin d\'Acclimatation', 'Île de la Jatte']
  },
  {
    id: 'levallois',
    name: 'Levallois-Perret',
    slug: 'levallois-perret-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Levallois-Perret',
    description: 'Promeneurs de chien à Levallois-Perret',
    population: '65 000',
    highlights: ['Île de la Jatte', 'Parc de la Planchette']
  },
  {
    id: 'issy',
    name: 'Issy-les-Moulineaux',
    slug: 'issy-les-moulineaux-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Issy-les-Moulineaux',
    description: 'Services canins à Issy-les-Moulineaux',
    population: '70 000',
    highlights: ['Île Saint-Germain', 'Parc Henri Barbusse']
  },
  {
    id: 'nanterre',
    name: 'Nanterre',
    slug: 'nanterre-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Nanterre',
    description: 'Promeneurs disponibles à Nanterre',
    population: '96 000',
    highlights: ['Parc du Chemin de l\'Île', 'Lac de Nanterre']
  },
  {
    id: 'courbevoie',
    name: 'Courbevoie',
    slug: 'courbevoie-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Courbevoie La Défense',
    description: 'Services de garde à Courbevoie',
    population: '83 000',
    highlights: ['Parc de Bécon', 'La Défense']
  },
  {
    id: 'rueil',
    name: 'Rueil-Malmaison',
    slug: 'rueil-malmaison-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Rueil-Malmaison',
    description: 'Dog walkers à Rueil-Malmaison',
    population: '81 000',
    highlights: ['Parc de la Malmaison', 'Forêt de Saint-Cucufa']
  },
  {
    id: 'clamart',
    name: 'Clamart',
    slug: 'clamart-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Clamart',
    description: 'Promeneurs de chien à Clamart',
    population: '53 000',
    highlights: ['Forêt de Meudon', 'Parc de Clamart']
  },
  {
    id: 'meudon',
    name: 'Meudon',
    slug: 'meudon-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Meudon forêt',
    description: 'Services canins à Meudon',
    population: '46 000',
    highlights: ['Forêt de Meudon', 'Observatoire', 'Terrasse']
  },
  {
    id: 'suresnes',
    name: 'Suresnes',
    slug: 'suresnes-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Suresnes',
    description: 'Promeneurs disponibles à Suresnes',
    population: '49 000',
    highlights: ['Mont Valérien', 'Bois de Boulogne']
  },
  {
    id: 'saint-cloud',
    name: 'Saint-Cloud',
    slug: 'saint-cloud-92',
    type: 'city',
    priority: 1,
    department: '92',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Cloud parc',
    description: 'Services canins à Saint-Cloud',
    population: '30 000',
    highlights: ['Parc de Saint-Cloud', 'Domaine National']
  },

  // Seine-Saint-Denis (93)
  {
    id: 'montreuil',
    name: 'Montreuil',
    slug: 'montreuil-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Montreuil',
    description: 'Dog walkers à Montreuil',
    population: '111 000',
    highlights: ['Parc des Guilands', 'Murs à Pêches']
  },
  {
    id: 'saint-denis',
    name: 'Saint-Denis',
    slug: 'saint-denis-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Denis',
    description: 'Promeneurs de chien à Saint-Denis',
    population: '113 000',
    highlights: ['Canal Saint-Denis', 'Parc de la Légion d\'Honneur']
  },
  {
    id: 'pantin',
    name: 'Pantin',
    slug: 'pantin-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Pantin Canal de l\'Ourcq',
    description: 'Services canins à Pantin',
    population: '56 000',
    highlights: ['Canal de l\'Ourcq', 'Parc de la Villette']
  },
  {
    id: 'bagnolet',
    name: 'Bagnolet',
    slug: 'bagnolet-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Bagnolet',
    description: 'Promeneurs disponibles à Bagnolet',
    population: '37 000',
    highlights: ['Parc Jean Moulin', 'Puces de Montreuil']
  },
  {
    id: 'les-lilas',
    name: 'Les Lilas',
    slug: 'les-lilas-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker aux Lilas',
    description: 'Services de promenade aux Lilas',
    population: '23 000',
    highlights: ['Parc des Lilas', 'Place du Maquis du Vercors']
  },
  {
    id: 'aubervilliers',
    name: 'Aubervilliers',
    slug: 'aubervilliers-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Aubervilliers',
    description: 'Dog walkers à Aubervilliers',
    population: '87 000',
    highlights: ['Canal Saint-Denis', 'Parc de la Villette']
  },
  {
    id: 'bobigny',
    name: 'Bobigny',
    slug: 'bobigny-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Bobigny',
    description: 'Promeneurs de chien à Bobigny',
    population: '53 000',
    highlights: ['Parc départemental', 'Canal de l\'Ourcq']
  },
  {
    id: 'drancy',
    name: 'Drancy',
    slug: 'drancy-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Drancy',
    description: 'Services canins à Drancy',
    population: '72 000',
    highlights: ['Parc de Ladoucette', 'Parc du Sausset']
  },
  {
    id: 'noisy-le-grand',
    name: 'Noisy-le-Grand',
    slug: 'noisy-le-grand-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Noisy-le-Grand',
    description: 'Dog walkers à Noisy-le-Grand',
    population: '68 000',
    highlights: ['Bords de Marne', 'Parc de la Butte Verte']
  },
  {
    id: 'aulnay',
    name: 'Aulnay-sous-Bois',
    slug: 'aulnay-sous-bois-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Aulnay-sous-Bois',
    description: 'Promeneurs de chien à Aulnay',
    population: '86 000',
    highlights: ['Parc Robert Ballanger', 'Parc du Sausset']
  },
  {
    id: 'le-raincy',
    name: 'Le Raincy',
    slug: 'le-raincy-93',
    type: 'city',
    priority: 1,
    department: '93',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien au Raincy',
    description: 'Services canins au Raincy',
    population: '14 000',
    highlights: ['Allée du Château', 'Forêt de Bondy']
  },

  // Val-d'Oise (95)
  {
    id: 'cergy',
    name: 'Cergy',
    slug: 'cergy-95',
    type: 'city',
    priority: 1,
    department: '95',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Cergy-Pontoise',
    description: 'Promeneurs de chien à Cergy',
    population: '67 000',
    highlights: ['Base de loisirs', 'Parc de la Préfecture']
  },
  {
    id: 'argenteuil',
    name: 'Argenteuil',
    slug: 'argenteuil-95',
    type: 'city',
    priority: 1,
    department: '95',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Argenteuil',
    description: 'Services canins à Argenteuil',
    population: '111 000',
    highlights: ['Bords de Seine', 'Buttes d\'Orgemont']
  },
  {
    id: 'sarcelles',
    name: 'Sarcelles',
    slug: 'sarcelles-95',
    type: 'city',
    priority: 1,
    department: '95',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Sarcelles',
    description: 'Dog walkers à Sarcelles',
    population: '58 000',
    highlights: ['Parc Kennedy', 'Parc des Prés-sous-la-Ville']
  },
  {
    id: 'enghien',
    name: 'Enghien-les-Bains',
    slug: 'enghien-les-bains-95',
    type: 'city',
    priority: 1,
    department: '95',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Enghien-les-Bains',
    description: 'Services premium à Enghien',
    population: '12 000',
    highlights: ['Lac d\'Enghien', 'Parc thermal']
  },

  // Essonne (91)
  {
    id: 'evry',
    name: 'Évry-Courcouronnes',
    slug: 'evry-courcouronnes-91',
    type: 'city',
    priority: 1,
    department: '91',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Évry',
    description: 'Promeneurs de chien à Évry',
    population: '70 000',
    highlights: ['Base de loisirs', 'Parc des Coquibus']
  },
  {
    id: 'massy',
    name: 'Massy',
    slug: 'massy-91',
    type: 'city',
    priority: 1,
    department: '91',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Massy',
    description: 'Services canins à Massy',
    population: '51 000',
    highlights: ['Parc de la Bièvre', 'Parc Georges Brassens']
  },
  {
    id: 'palaiseau',
    name: 'Palaiseau',
    slug: 'palaiseau-91',
    type: 'city',
    priority: 1,
    department: '91',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Palaiseau',
    description: 'Dog walkers à Palaiseau',
    population: '36 000',
    highlights: ['Polytechnique', 'Vallée de Chevreuse']
  },

  // Seine-et-Marne (77)
  {
    id: 'meaux',
    name: 'Meaux',
    slug: 'meaux-77',
    type: 'city',
    priority: 1,
    department: '77',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Meaux',
    description: 'Services canins à Meaux',
    population: '56 000',
    highlights: ['Bords de Marne', 'Parc du Pâtis']
  },
  {
    id: 'chelles',
    name: 'Chelles',
    slug: 'chelles-77',
    type: 'city',
    priority: 1,
    department: '77',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Chelles',
    description: 'Promeneurs de chien à Chelles',
    population: '54 000',
    highlights: ['Bords de Marne', 'Parc du Souvenir']
  },
  {
    id: 'melun',
    name: 'Melun',
    slug: 'melun-77',
    type: 'city',
    priority: 1,
    department: '77',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Melun',
    description: 'Dog walkers à Melun',
    population: '41 000',
    highlights: ['Île Saint-Étienne', 'Forêt de Fontainebleau']
  },
  {
    id: 'fontainebleau',
    name: 'Fontainebleau',
    slug: 'fontainebleau-77',
    type: 'city',
    priority: 1,
    department: '77',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Fontainebleau forêt',
    description: 'Promeneurs en forêt de Fontainebleau',
    population: '15 000',
    highlights: ['Forêt de Fontainebleau', 'Château']
  },

  // Yvelines (78)
  {
    id: 'versailles',
    name: 'Versailles',
    slug: 'versailles-78',
    type: 'city',
    priority: 1,
    department: '78',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Versailles',
    description: 'Services canins à Versailles',
    population: '85 000',
    highlights: ['Parc du Château', 'Forêt de Fausses-Reposes']
  },
  {
    id: 'saint-germain-en-laye',
    name: 'Saint-Germain-en-Laye',
    slug: 'saint-germain-en-laye-78',
    type: 'city',
    priority: 1,
    department: '78',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Germain-en-Laye',
    description: 'Dog walkers à Saint-Germain',
    population: '46 000',
    highlights: ['Forêt de Saint-Germain', 'Terrasse du Château']
  },
  {
    id: 'le-vesinet',
    name: 'Le Vésinet',
    slug: 'le-vesinet-78',
    type: 'city',
    priority: 1,
    department: '78',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien au Vésinet',
    description: 'Services premium au Vésinet',
    population: '16 000',
    highlights: ['Lacs du Vésinet', 'Parc des Ibis']
  },
  {
    id: 'maisons-laffitte',
    name: 'Maisons-Laffitte',
    slug: 'maisons-laffitte-78',
    type: 'city',
    priority: 1,
    department: '78',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Maisons-Laffitte',
    description: 'Promeneurs à Maisons-Laffitte',
    population: '24 000',
    highlights: ['Parc du Château', 'Bords de Seine']
  },

  // ========================================
  // PRIORITÉ 2 : Grandes métropoles françaises
  // ========================================
  
  // Lyon et agglomération
  {
    id: 'lyon',
    name: 'Lyon',
    slug: 'lyon',
    type: 'city',
    priority: 2,
    department: '69',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Lyon Parc de la Tête d\'Or',
    description: 'Promeneurs et gardiens de chien dans la métropole lyonnaise',
    population: '522 000',
    highlights: ['Parc de la Tête d\'Or', 'Vieux Lyon', 'Presqu\'île']
  },
  {
    id: 'villeurbanne',
    name: 'Villeurbanne',
    slug: 'villeurbanne-69',
    type: 'city',
    priority: 2,
    department: '69',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Villeurbanne',
    description: 'Services canins à Villeurbanne',
    population: '155 000',
    highlights: ['Parc de la Tête d\'Or', 'Parc de la Feyssine']
  },
  {
    id: 'vaulx-en-velin',
    name: 'Vaulx-en-Velin',
    slug: 'vaulx-en-velin-69',
    type: 'city',
    priority: 2,
    department: '69',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Vaulx-en-Velin',
    description: 'Promeneurs à Vaulx-en-Velin',
    population: '52 000',
    highlights: ['Grand Large', 'Parc de Miribel-Jonage']
  },
  {
    id: 'venissieux',
    name: 'Vénissieux',
    slug: 'venissieux-69',
    type: 'city',
    priority: 2,
    department: '69',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Vénissieux',
    description: 'Dog walkers à Vénissieux',
    population: '66 000',
    highlights: ['Parc Louis Dupic', 'Plateau des Minguettes']
  },
  {
    id: 'saint-etienne',
    name: 'Saint-Étienne',
    slug: 'saint-etienne-42',
    type: 'city',
    priority: 2,
    department: '42',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Étienne',
    description: 'Services canins à Saint-Étienne',
    population: '175 000',
    highlights: ['Parc de l\'Europe', 'Pilat']
  },

  // Marseille et agglomération
  {
    id: 'marseille',
    name: 'Marseille',
    slug: 'marseille',
    type: 'city',
    priority: 2,
    department: '13',
    image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=300&fit=crop',
    altText: 'Dog sitter à Marseille près du Vieux Port',
    description: 'Services de garde et promenade de chien à Marseille',
    population: '870 000',
    highlights: ['Parc Borély', 'Calanques', 'Plages du Prado']
  },
  {
    id: 'aix-en-provence',
    name: 'Aix-en-Provence',
    slug: 'aix-en-provence-13',
    type: 'city',
    priority: 2,
    department: '13',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Aix-en-Provence',
    description: 'Dog walkers à Aix-en-Provence',
    population: '147 000',
    highlights: ['Cours Mirabeau', 'Sainte-Victoire', 'Parc Jourdan']
  },
  {
    id: 'aubagne',
    name: 'Aubagne',
    slug: 'aubagne-13',
    type: 'city',
    priority: 2,
    department: '13',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Dog walker à Aubagne',
    description: 'Services canins à Aubagne',
    population: '47 000',
    highlights: ['Massif du Garlaban', 'Parc Jean Moulin']
  },

  // Nice et Côte d'Azur
  {
    id: 'nice',
    name: 'Nice',
    slug: 'nice',
    type: 'city',
    priority: 2,
    department: '06',
    image: 'https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Nice Promenade des Anglais',
    description: 'Services de promenade sur la Côte d\'Azur',
    population: '342 000',
    highlights: ['Promenade des Anglais', 'Colline du Château', 'Parc Phoenix']
  },
  {
    id: 'cannes',
    name: 'Cannes',
    slug: 'cannes-06',
    type: 'city',
    priority: 2,
    department: '06',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Cannes',
    description: 'Services premium à Cannes',
    population: '75 000',
    highlights: ['Croisette', 'Îles de Lérins', 'Suquet']
  },
  {
    id: 'antibes',
    name: 'Antibes',
    slug: 'antibes-06',
    type: 'city',
    priority: 2,
    department: '06',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Antibes Juan-les-Pins',
    description: 'Dog walkers à Antibes',
    population: '74 000',
    highlights: ['Cap d\'Antibes', 'Juan-les-Pins', 'Port Vauban']
  },
  {
    id: 'grasse',
    name: 'Grasse',
    slug: 'grasse-06',
    type: 'city',
    priority: 2,
    department: '06',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Grasse',
    description: 'Promeneurs de chien à Grasse',
    population: '51 000',
    highlights: ['Vieille ville', 'Jardins du MIP']
  },
  {
    id: 'menton',
    name: 'Menton',
    slug: 'menton-06',
    type: 'city',
    priority: 2,
    department: '06',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Menton',
    description: 'Services canins à Menton',
    population: '29 000',
    highlights: ['Jardins Biovès', 'Vieille ville', 'Plages']
  },

  // Toulouse et agglomération
  {
    id: 'toulouse',
    name: 'Toulouse',
    slug: 'toulouse',
    type: 'city',
    priority: 2,
    department: '31',
    image: 'https://images.unsplash.com/photo-1575986767340-5d17ae767ab0?w=400&h=300&fit=crop',
    altText: 'Garde de chien à Toulouse ville rose',
    description: 'Services canins dans la ville rose',
    population: '493 000',
    highlights: ['Prairie des Filtres', 'Jardin des Plantes', 'Canal du Midi']
  },
  {
    id: 'blagnac',
    name: 'Blagnac',
    slug: 'blagnac-31',
    type: 'city',
    priority: 2,
    department: '31',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Blagnac',
    description: 'Promeneurs de chien à Blagnac',
    population: '24 000',
    highlights: ['Bords de Garonne', 'Odyssud']
  },
  {
    id: 'colomiers',
    name: 'Colomiers',
    slug: 'colomiers-31',
    type: 'city',
    priority: 2,
    department: '31',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Colomiers',
    description: 'Services canins à Colomiers',
    population: '40 000',
    highlights: ['Lac de Sesquières', 'Parc du Cabirol']
  },

  // Bordeaux et agglomération
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    slug: 'bordeaux',
    type: 'city',
    priority: 2,
    department: '33',
    image: 'https://images.unsplash.com/photo-1565791380713-1756b9a05343?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien professionnel à Bordeaux',
    description: 'Pet sitters et dog walkers à Bordeaux et alentours',
    population: '260 000',
    highlights: ['Jardin Public', 'Parc Bordelais', 'Quais de Garonne']
  },
  {
    id: 'merignac',
    name: 'Mérignac',
    slug: 'merignac-33',
    type: 'city',
    priority: 2,
    department: '33',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Mérignac',
    description: 'Dog walkers à Mérignac',
    population: '74 000',
    highlights: ['Parc de Bourran', 'Pinède']
  },
  {
    id: 'pessac',
    name: 'Pessac',
    slug: 'pessac-33',
    type: 'city',
    priority: 2,
    department: '33',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Pessac',
    description: 'Promeneurs à Pessac',
    population: '66 000',
    highlights: ['Forêt de Pessac', 'Parc de Camponac']
  },
  {
    id: 'talence',
    name: 'Talence',
    slug: 'talence-33',
    type: 'city',
    priority: 2,
    department: '33',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Talence',
    description: 'Services canins à Talence',
    population: '43 000',
    highlights: ['Parc Peixotto', 'Campus universitaire']
  },
  {
    id: 'arcachon',
    name: 'Arcachon',
    slug: 'arcachon-33',
    type: 'city',
    priority: 2,
    department: '33',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Arcachon',
    description: 'Dog walkers au Bassin d\'Arcachon',
    population: '11 000',
    highlights: ['Dune du Pilat', 'Plages', 'Ville d\'Hiver']
  },

  // Nantes et agglomération
  {
    id: 'nantes',
    name: 'Nantes',
    slug: 'nantes',
    type: 'city',
    priority: 2,
    department: '44',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop',
    altText: 'Dog walker à Nantes île de Nantes',
    description: 'Promeneurs de chien disponibles à Nantes',
    population: '320 000',
    highlights: ['Jardin des Plantes', 'Île de Nantes', 'Erdre']
  },
  {
    id: 'saint-nazaire',
    name: 'Saint-Nazaire',
    slug: 'saint-nazaire-44',
    type: 'city',
    priority: 2,
    department: '44',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Nazaire',
    description: 'Services canins à Saint-Nazaire',
    population: '72 000',
    highlights: ['Front de mer', 'Base sous-marine']
  },
  {
    id: 'la-baule',
    name: 'La Baule-Escoublac',
    slug: 'la-baule-44',
    type: 'city',
    priority: 2,
    department: '44',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à La Baule',
    description: 'Dog walkers à La Baule',
    population: '16 000',
    highlights: ['Plage', 'Forêt d\'Escoublac']
  },

  // Lille et métropole
  {
    id: 'lille',
    name: 'Lille',
    slug: 'lille',
    type: 'city',
    priority: 2,
    department: '59',
    image: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=400&h=300&fit=crop',
    altText: 'Pet sitter professionnel à Lille métropole',
    description: 'Garde et promenade de chien dans la métropole lilloise',
    population: '236 000',
    highlights: ['Citadelle de Lille', 'Parc de la Citadelle', 'Vieux Lille']
  },
  {
    id: 'roubaix',
    name: 'Roubaix',
    slug: 'roubaix-59',
    type: 'city',
    priority: 2,
    department: '59',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Roubaix',
    description: 'Promeneurs à Roubaix',
    population: '98 000',
    highlights: ['Parc Barbieux', 'Canal de Roubaix']
  },
  {
    id: 'tourcoing',
    name: 'Tourcoing',
    slug: 'tourcoing-59',
    type: 'city',
    priority: 2,
    department: '59',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Tourcoing',
    description: 'Services canins à Tourcoing',
    population: '98 000',
    highlights: ['Parc Clemenceau', 'Centre-ville']
  },
  {
    id: 'villeneuve-d-ascq',
    name: 'Villeneuve-d\'Ascq',
    slug: 'villeneuve-d-ascq-59',
    type: 'city',
    priority: 2,
    department: '59',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Villeneuve-d\'Ascq',
    description: 'Dog walkers à Villeneuve-d\'Ascq',
    population: '62 000',
    highlights: ['Parc du Héron', 'Lac du Héron']
  },
  {
    id: 'dunkerque',
    name: 'Dunkerque',
    slug: 'dunkerque-59',
    type: 'city',
    priority: 2,
    department: '59',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Dunkerque',
    description: 'Promeneurs de chien à Dunkerque',
    population: '86 000',
    highlights: ['Plage de Malo', 'Dunes de Flandre']
  },

  // Strasbourg et agglomération
  {
    id: 'strasbourg',
    name: 'Strasbourg',
    slug: 'strasbourg',
    type: 'city',
    priority: 2,
    department: '67',
    image: 'https://images.unsplash.com/photo-1608029437238-69c8a4dd9c1b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Strasbourg Petite France',
    description: 'Promeneurs canins à Strasbourg et environs',
    population: '287 000',
    highlights: ['Parc de l\'Orangerie', 'Petite France', 'Forêt de la Robertsau']
  },
  {
    id: 'illkirch',
    name: 'Illkirch-Graffenstaden',
    slug: 'illkirch-graffenstaden-67',
    type: 'city',
    priority: 2,
    department: '67',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Illkirch',
    description: 'Services canins à Illkirch',
    population: '27 000',
    highlights: ['Forêt du Neuhof', 'Campus universitaire']
  },
  {
    id: 'schiltigheim',
    name: 'Schiltigheim',
    slug: 'schiltigheim-67',
    type: 'city',
    priority: 2,
    department: '67',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Schiltigheim',
    description: 'Promeneurs à Schiltigheim',
    population: '34 000',
    highlights: ['Parc Haldenbourg', 'Centre-ville']
  },
  {
    id: 'mulhouse',
    name: 'Mulhouse',
    slug: 'mulhouse-68',
    type: 'city',
    priority: 2,
    department: '68',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Mulhouse',
    description: 'Dog walkers à Mulhouse',
    population: '108 000',
    highlights: ['Parc Salvator', 'Zoo de Mulhouse']
  },
  {
    id: 'colmar',
    name: 'Colmar',
    slug: 'colmar-68',
    type: 'city',
    priority: 2,
    department: '68',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Colmar',
    description: 'Promeneurs de chien à Colmar',
    population: '69 000',
    highlights: ['Petite Venise', 'Parc du Champ de Mars']
  },

  // Rennes et Bretagne
  {
    id: 'rennes',
    name: 'Rennes',
    slug: 'rennes',
    type: 'city',
    priority: 2,
    department: '35',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    altText: 'Garde de chien à Rennes Bretagne',
    description: 'Services de garde et promenade à Rennes',
    population: '222 000',
    highlights: ['Parc du Thabor', 'Vilaine']
  },
  {
    id: 'saint-malo',
    name: 'Saint-Malo',
    slug: 'saint-malo-35',
    type: 'city',
    priority: 2,
    department: '35',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Malo',
    description: 'Promeneurs à Saint-Malo',
    population: '46 000',
    highlights: ['Plages', 'Intra-muros', 'Sillon']
  },
  {
    id: 'brest',
    name: 'Brest',
    slug: 'brest-29',
    type: 'city',
    priority: 2,
    department: '29',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Brest',
    description: 'Dog walkers à Brest',
    population: '139 000',
    highlights: ['Rade de Brest', 'Jardin des Explorateurs']
  },
  {
    id: 'quimper',
    name: 'Quimper',
    slug: 'quimper-29',
    type: 'city',
    priority: 2,
    department: '29',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Quimper',
    description: 'Services canins à Quimper',
    population: '63 000',
    highlights: ['Mont Frugy', 'Vieille ville']
  },
  {
    id: 'lorient',
    name: 'Lorient',
    slug: 'lorient-56',
    type: 'city',
    priority: 2,
    department: '56',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Lorient',
    description: 'Promeneurs de chien à Lorient',
    population: '57 000',
    highlights: ['Base de sous-marins', 'Îles']
  },
  {
    id: 'vannes',
    name: 'Vannes',
    slug: 'vannes-56',
    type: 'city',
    priority: 2,
    department: '56',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Vannes',
    description: 'Dog walkers à Vannes',
    population: '53 000',
    highlights: ['Golfe du Morbihan', 'Remparts']
  },

  // Montpellier et Languedoc
  {
    id: 'montpellier',
    name: 'Montpellier',
    slug: 'montpellier',
    type: 'city',
    priority: 2,
    department: '34',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&h=300&fit=crop',
    altText: 'Promeneur de chien à Montpellier Hérault',
    description: 'Dog sitters disponibles à Montpellier',
    population: '295 000',
    highlights: ['Esplanade Charles de Gaulle', 'Parc Montcalm', 'Place de la Comédie']
  },
  {
    id: 'beziers',
    name: 'Béziers',
    slug: 'beziers-34',
    type: 'city',
    priority: 2,
    department: '34',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Béziers',
    description: 'Promeneurs de chien à Béziers',
    population: '79 000',
    highlights: ['Canal du Midi', 'Plateau des Poètes']
  },
  {
    id: 'sete',
    name: 'Sète',
    slug: 'sete-34',
    type: 'city',
    priority: 2,
    department: '34',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Sète',
    description: 'Services canins à Sète',
    population: '44 000',
    highlights: ['Mont Saint-Clair', 'Plages']
  },
  {
    id: 'perpignan',
    name: 'Perpignan',
    slug: 'perpignan-66',
    type: 'city',
    priority: 2,
    department: '66',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Perpignan',
    description: 'Dog walkers à Perpignan',
    population: '121 000',
    highlights: ['Castillet', 'Platanes']
  },
  {
    id: 'nimes',
    name: 'Nîmes',
    slug: 'nimes-30',
    type: 'city',
    priority: 2,
    department: '30',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Nîmes',
    description: 'Promeneurs de chien à Nîmes',
    population: '151 000',
    highlights: ['Jardins de la Fontaine', 'Arènes']
  },

  // Grenoble et Alpes
  {
    id: 'grenoble',
    name: 'Grenoble',
    slug: 'grenoble',
    type: 'city',
    priority: 2,
    department: '38',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Grenoble Alpes',
    description: 'Services canins au pied des Alpes',
    population: '160 000',
    highlights: ['Parc Paul Mistral', 'Bastille', 'Berges de l\'Isère']
  },
  {
    id: 'annecy',
    name: 'Annecy',
    slug: 'annecy-74',
    type: 'city',
    priority: 2,
    department: '74',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Annecy',
    description: 'Promeneurs au bord du lac d\'Annecy',
    population: '130 000',
    highlights: ['Lac d\'Annecy', 'Vieille ville', 'Pâquier']
  },
  {
    id: 'chambery',
    name: 'Chambéry',
    slug: 'chambery-73',
    type: 'city',
    priority: 2,
    department: '73',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Chambéry',
    description: 'Dog walkers à Chambéry',
    population: '59 000',
    highlights: ['Lac du Bourget', 'Massif des Bauges']
  },

  // ========================================
  // PRIORITÉ 3 : Villes moyennes et quartiers
  // ========================================
  
  // Quartiers parisiens
  {
    id: 'marais',
    name: 'Le Marais',
    slug: 'le-marais-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    department: '75',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop',
    altText: 'Promenade de chien dans le quartier du Marais Paris',
    description: 'Dog walkers disponibles dans le Marais',
    highlights: ['Place des Vosges', 'Rue des Francs-Bourgeois']
  },
  {
    id: 'montmartre',
    name: 'Montmartre',
    slug: 'montmartre-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    department: '75',
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Pet sitter à Montmartre près du Sacré-Coeur',
    description: 'Services canins sur la butte Montmartre',
    highlights: ['Square Louise Michel', 'Vignes de Montmartre']
  },
  {
    id: 'belleville',
    name: 'Belleville',
    slug: 'belleville-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    department: '75',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    altText: 'Dog walker à Belleville Paris 20ème',
    description: 'Promeneurs de chien à Belleville et Ménilmontant',
    highlights: ['Parc de Belleville', 'Rue de Belleville']
  },
  {
    id: 'batignolles',
    name: 'Les Batignolles',
    slug: 'batignolles-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    department: '75',
    image: 'https://images.unsplash.com/photo-1508050919630-b135583b29ab?w=400&h=300&fit=crop',
    altText: 'Dog walker aux Batignolles Paris 17ème',
    description: 'Services canins aux Batignolles',
    highlights: ['Square des Batignolles', 'Parc Martin Luther King']
  },
  {
    id: 'saint-germain',
    name: 'Saint-Germain-des-Prés',
    slug: 'saint-germain-des-pres-paris',
    type: 'quartier',
    parent: 'paris',
    priority: 3,
    department: '75',
    image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Germain-des-Prés',
    description: 'Promeneurs premium à Saint-Germain',
    highlights: ['Jardin du Luxembourg', 'Café de Flore']
  },

  // Autres villes moyennes
  {
    id: 'tours',
    name: 'Tours',
    slug: 'tours-37',
    type: 'city',
    priority: 3,
    department: '37',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Tours',
    description: 'Dog walkers à Tours',
    population: '136 000',
    highlights: ['Jardin des Prébendes', 'Vieux Tours', 'Loire']
  },
  {
    id: 'orleans',
    name: 'Orléans',
    slug: 'orleans-45',
    type: 'city',
    priority: 3,
    department: '45',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Orléans',
    description: 'Promeneurs de chien à Orléans',
    population: '116 000',
    highlights: ['Parc Floral', 'Bords de Loire']
  },
  {
    id: 'le-mans',
    name: 'Le Mans',
    slug: 'le-mans-72',
    type: 'city',
    priority: 3,
    department: '72',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien au Mans',
    description: 'Services canins au Mans',
    population: '145 000',
    highlights: ['Vieille ville', 'Arche de la Nature']
  },
  {
    id: 'angers',
    name: 'Angers',
    slug: 'angers-49',
    type: 'city',
    priority: 3,
    department: '49',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Angers',
    description: 'Dog walkers à Angers',
    population: '157 000',
    highlights: ['Château d\'Angers', 'Île Saint-Aubin', 'Maine']
  },
  {
    id: 'dijon',
    name: 'Dijon',
    slug: 'dijon-21',
    type: 'city',
    priority: 3,
    department: '21',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Dijon',
    description: 'Promeneurs de chien à Dijon',
    population: '159 000',
    highlights: ['Parc de la Colombière', 'Centre historique']
  },
  {
    id: 'reims',
    name: 'Reims',
    slug: 'reims-51',
    type: 'city',
    priority: 3,
    department: '51',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Reims',
    description: 'Services canins à Reims',
    population: '182 000',
    highlights: ['Parc de Champagne', 'Cathédrale']
  },
  {
    id: 'clermont-ferrand',
    name: 'Clermont-Ferrand',
    slug: 'clermont-ferrand-63',
    type: 'city',
    priority: 3,
    department: '63',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Clermont-Ferrand',
    description: 'Dog walkers à Clermont-Ferrand',
    population: '147 000',
    highlights: ['Puy de Dôme', 'Jardin Lecoq', 'Place de Jaude']
  },
  {
    id: 'limoges',
    name: 'Limoges',
    slug: 'limoges-87',
    type: 'city',
    priority: 3,
    department: '87',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Limoges',
    description: 'Promeneurs de chien à Limoges',
    population: '130 000',
    highlights: ['Jardins de l\'Évêché', 'Bords de Vienne']
  },
  {
    id: 'poitiers',
    name: 'Poitiers',
    slug: 'poitiers-86',
    type: 'city',
    priority: 3,
    department: '86',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Poitiers',
    description: 'Services canins à Poitiers',
    population: '88 000',
    highlights: ['Parc de Blossac', 'Vieux Poitiers']
  },
  {
    id: 'la-rochelle',
    name: 'La Rochelle',
    slug: 'la-rochelle-17',
    type: 'city',
    priority: 3,
    department: '17',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à La Rochelle',
    description: 'Dog walkers à La Rochelle',
    population: '77 000',
    highlights: ['Vieux Port', 'Île de Ré', 'Plages']
  },
  {
    id: 'rouen',
    name: 'Rouen',
    slug: 'rouen-76',
    type: 'city',
    priority: 3,
    department: '76',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Rouen',
    description: 'Promeneurs de chien à Rouen',
    population: '113 000',
    highlights: ['Jardin des Plantes', 'Vieux Rouen', 'Seine']
  },
  {
    id: 'le-havre',
    name: 'Le Havre',
    slug: 'le-havre-76',
    type: 'city',
    priority: 3,
    department: '76',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker au Havre',
    description: 'Services canins au Havre',
    population: '165 000',
    highlights: ['Plage', 'Centre Perret', 'Jardins suspendus']
  },
  {
    id: 'caen',
    name: 'Caen',
    slug: 'caen-14',
    type: 'city',
    priority: 3,
    department: '14',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Caen',
    description: 'Dog walkers à Caen',
    population: '106 000',
    highlights: ['Château', 'Prairie', 'Orne']
  },
  {
    id: 'amiens',
    name: 'Amiens',
    slug: 'amiens-80',
    type: 'city',
    priority: 3,
    department: '80',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Amiens',
    description: 'Promeneurs de chien à Amiens',
    population: '133 000',
    highlights: ['Hortillonnages', 'Cathédrale', 'Parc Saint-Pierre']
  },
  {
    id: 'metz',
    name: 'Metz',
    slug: 'metz-57',
    type: 'city',
    priority: 3,
    department: '57',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Metz',
    description: 'Services canins à Metz',
    population: '116 000',
    highlights: ['Plan d\'Eau', 'Centre Pompidou', 'Moselle']
  },
  {
    id: 'nancy',
    name: 'Nancy',
    slug: 'nancy-54',
    type: 'city',
    priority: 3,
    department: '54',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Nancy',
    description: 'Dog walkers à Nancy',
    population: '105 000',
    highlights: ['Place Stanislas', 'Parc de la Pépinière']
  },
  {
    id: 'besancon',
    name: 'Besançon',
    slug: 'besancon-25',
    type: 'city',
    priority: 3,
    department: '25',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Besançon',
    description: 'Promeneurs de chien à Besançon',
    population: '116 000',
    highlights: ['Citadelle', 'Doubs', 'Forêt de Chailluz']
  },
  {
    id: 'avignon',
    name: 'Avignon',
    slug: 'avignon-84',
    type: 'city',
    priority: 3,
    department: '84',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Avignon',
    description: 'Services canins à Avignon',
    population: '91 000',
    highlights: ['Palais des Papes', 'Île de la Barthelasse', 'Rhône']
  },
  {
    id: 'toulon',
    name: 'Toulon',
    slug: 'toulon-83',
    type: 'city',
    priority: 3,
    department: '83',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Toulon',
    description: 'Dog walkers à Toulon',
    population: '177 000',
    highlights: ['Rade de Toulon', 'Mont Faron', 'Port']
  },
  {
    id: 'saint-tropez',
    name: 'Saint-Tropez',
    slug: 'saint-tropez-83',
    type: 'city',
    priority: 3,
    department: '83',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Tropez',
    description: 'Services premium à Saint-Tropez',
    population: '4 000',
    highlights: ['Plages', 'Citadelle', 'Port']
  },
  {
    id: 'pau',
    name: 'Pau',
    slug: 'pau-64',
    type: 'city',
    priority: 3,
    department: '64',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Pau',
    description: 'Promeneurs de chien à Pau',
    population: '77 000',
    highlights: ['Boulevard des Pyrénées', 'Parc Beaumont', 'Gave']
  },
  {
    id: 'biarritz',
    name: 'Biarritz',
    slug: 'biarritz-64',
    type: 'city',
    priority: 3,
    department: '64',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Biarritz',
    description: 'Services canins à Biarritz',
    population: '25 000',
    highlights: ['Grande Plage', 'Rocher de la Vierge', 'Port des Pêcheurs']
  },
  {
    id: 'bayonne',
    name: 'Bayonne',
    slug: 'bayonne-64',
    type: 'city',
    priority: 3,
    department: '64',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Bayonne',
    description: 'Dog walkers à Bayonne',
    population: '52 000',
    highlights: ['Petit Bayonne', 'Nive', 'Remparts']
  },

  // ========================================
  // PRIORITÉ 4 : Villes secondaires et DOM-TOM
  // ========================================
  
  // Villes secondaires
  {
    id: 'troyes',
    name: 'Troyes',
    slug: 'troyes-10',
    type: 'city',
    priority: 4,
    department: '10',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Troyes',
    description: 'Promeneurs de chien à Troyes',
    population: '61 000',
    highlights: ['Vieille ville', 'Lacs de la Forêt d\'Orient']
  },
  {
    id: 'bourges',
    name: 'Bourges',
    slug: 'bourges-18',
    type: 'city',
    priority: 4,
    department: '18',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Bourges',
    description: 'Services canins à Bourges',
    population: '64 000',
    highlights: ['Marais de Bourges', 'Cathédrale']
  },
  {
    id: 'auxerre',
    name: 'Auxerre',
    slug: 'auxerre-89',
    type: 'city',
    priority: 4,
    department: '89',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Auxerre',
    description: 'Dog walkers à Auxerre',
    population: '35 000',
    highlights: ['Yonne', 'Vieille ville']
  },
  {
    id: 'valence',
    name: 'Valence',
    slug: 'valence-26',
    type: 'city',
    priority: 4,
    department: '26',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Valence',
    description: 'Promeneurs de chien à Valence',
    population: '64 000',
    highlights: ['Parc Jouvet', 'Rhône']
  },
  {
    id: 'saint-etienne',
    name: 'Saint-Étienne',
    slug: 'saint-etienne',
    type: 'city',
    priority: 4,
    department: '42',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Étienne',
    description: 'Services canins à Saint-Étienne',
    population: '175 000',
    highlights: ['Parc de l\'Europe', 'Pilat']
  },
  {
    id: 'ajaccio',
    name: 'Ajaccio',
    slug: 'ajaccio-2a',
    type: 'city',
    priority: 4,
    department: '2A',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Ajaccio',
    description: 'Dog walkers à Ajaccio',
    population: '71 000',
    highlights: ['Îles Sanguinaires', 'Plages']
  },
  {
    id: 'bastia',
    name: 'Bastia',
    slug: 'bastia-2b',
    type: 'city',
    priority: 4,
    department: '2B',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Bastia',
    description: 'Promeneurs de chien à Bastia',
    population: '48 000',
    highlights: ['Vieux Port', 'Place Saint-Nicolas']
  },
  {
    id: 'calvi',
    name: 'Calvi',
    slug: 'calvi-2b',
    type: 'city',
    priority: 4,
    department: '2B',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Calvi',
    description: 'Services canins à Calvi',
    population: '5 000',
    highlights: ['Citadelle', 'Plage']
  },

  // ========================================
  // PRÉFECTURES MANQUANTES - Couverture complète
  // ========================================
  
  // Région Grand Est
  {
    id: 'charleville-mezieres',
    name: 'Charleville-Mézières',
    slug: 'charleville-mezieres-08',
    type: 'city',
    priority: 4,
    department: '08',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Charleville-Mézières',
    description: 'Dog walkers à Charleville-Mézières',
    population: '47 000',
    highlights: ['Place Ducale', 'Meuse']
  },
  {
    id: 'laon',
    name: 'Laon',
    slug: 'laon-02',
    type: 'city',
    priority: 4,
    department: '02',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Laon',
    description: 'Promeneurs de chien à Laon',
    population: '24 000',
    highlights: ['Cathédrale', 'Ville haute']
  },
  {
    id: 'chaumont',
    name: 'Chaumont',
    slug: 'chaumont-52',
    type: 'city',
    priority: 4,
    department: '52',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Chaumont',
    description: 'Services canins à Chaumont',
    population: '22 000',
    highlights: ['Viaduc', 'Vieille ville']
  },
  {
    id: 'bar-le-duc',
    name: 'Bar-le-Duc',
    slug: 'bar-le-duc-55',
    type: 'city',
    priority: 4,
    department: '55',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Bar-le-Duc',
    description: 'Dog walkers à Bar-le-Duc',
    population: '15 000',
    highlights: ['Ville haute', 'Renaissance']
  },
  {
    id: 'epinal',
    name: 'Épinal',
    slug: 'epinal-88',
    type: 'city',
    priority: 4,
    department: '88',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Épinal',
    description: 'Promeneurs de chien à Épinal',
    population: '31 000',
    highlights: ['Moselle', 'Imagerie']
  },

  // Région Bourgogne-Franche-Comté
  {
    id: 'nevers',
    name: 'Nevers',
    slug: 'nevers-58',
    type: 'city',
    priority: 4,
    department: '58',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Nevers',
    description: 'Services canins à Nevers',
    population: '33 000',
    highlights: ['Loire', 'Cathédrale']
  },
  {
    id: 'macon',
    name: 'Mâcon',
    slug: 'macon-71',
    type: 'city',
    priority: 4,
    department: '71',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Mâcon',
    description: 'Dog walkers à Mâcon',
    population: '33 000',
    highlights: ['Saône', 'Vignobles']
  },
  {
    id: 'vesoul',
    name: 'Vesoul',
    slug: 'vesoul-70',
    type: 'city',
    priority: 4,
    department: '70',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Vesoul',
    description: 'Promeneurs de chien à Vesoul',
    population: '15 000',
    highlights: ['Motte', 'Lac de Vesoul']
  },
  {
    id: 'lons-le-saunier',
    name: 'Lons-le-Saunier',
    slug: 'lons-le-saunier-39',
    type: 'city',
    priority: 4,
    department: '39',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Lons-le-Saunier',
    description: 'Services canins à Lons-le-Saunier',
    population: '17 000',
    highlights: ['Thermes', 'Arcades']
  },
  {
    id: 'belfort',
    name: 'Belfort',
    slug: 'belfort-90',
    type: 'city',
    priority: 4,
    department: '90',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Belfort',
    description: 'Dog walkers à Belfort',
    population: '47 000',
    highlights: ['Lion de Belfort', 'Citadelle']
  },

  // Région Bretagne
  {
    id: 'saint-brieuc',
    name: 'Saint-Brieuc',
    slug: 'saint-brieuc-22',
    type: 'city',
    priority: 3,
    department: '22',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Brieuc',
    description: 'Promeneurs de chien à Saint-Brieuc',
    population: '44 000',
    highlights: ['Baie', 'Légué']
  },
  {
    id: 'vannes',
    name: 'Vannes',
    slug: 'vannes-56',
    type: 'city',
    priority: 3,
    department: '56',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Vannes',
    description: 'Services canins à Vannes',
    population: '54 000',
    highlights: ['Golfe du Morbihan', 'Remparts']
  },
  {
    id: 'lorient',
    name: 'Lorient',
    slug: 'lorient-56',
    type: 'city',
    priority: 3,
    department: '56',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Lorient',
    description: 'Dog walkers à Lorient',
    population: '57 000',
    highlights: ['Port', 'Île de Groix']
  },

  // Région Centre-Val de Loire
  {
    id: 'chartres',
    name: 'Chartres',
    slug: 'chartres-28',
    type: 'city',
    priority: 3,
    department: '28',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Chartres',
    description: 'Promeneurs de chien à Chartres',
    population: '39 000',
    highlights: ['Cathédrale', 'Eure']
  },
  {
    id: 'chateauroux',
    name: 'Châteauroux',
    slug: 'chateauroux-36',
    type: 'city',
    priority: 4,
    department: '36',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Châteauroux',
    description: 'Services canins à Châteauroux',
    population: '43 000',
    highlights: ['Belle-Isle', 'Indre']
  },
  {
    id: 'blois',
    name: 'Blois',
    slug: 'blois-41',
    type: 'city',
    priority: 3,
    department: '41',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Blois',
    description: 'Dog walkers à Blois',
    population: '46 000',
    highlights: ['Château', 'Loire']
  },

  // Région Hauts-de-France
  {
    id: 'beauvais',
    name: 'Beauvais',
    slug: 'beauvais-60',
    type: 'city',
    priority: 3,
    department: '60',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Beauvais',
    description: 'Promeneurs de chien à Beauvais',
    population: '55 000',
    highlights: ['Cathédrale', 'Maladrerie']
  },
  {
    id: 'arras',
    name: 'Arras',
    slug: 'arras-62',
    type: 'city',
    priority: 3,
    department: '62',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Arras',
    description: 'Services canins à Arras',
    population: '41 000',
    highlights: ['Grand\'Place', 'Beffroi']
  },

  // Région Normandie
  {
    id: 'evreux',
    name: 'Évreux',
    slug: 'evreux-27',
    type: 'city',
    priority: 4,
    department: '27',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Évreux',
    description: 'Dog walkers à Évreux',
    population: '48 000',
    highlights: ['Cathédrale', 'Iton']
  },
  {
    id: 'alencon',
    name: 'Alençon',
    slug: 'alencon-61',
    type: 'city',
    priority: 4,
    department: '61',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Alençon',
    description: 'Promeneurs de chien à Alençon',
    population: '26 000',
    highlights: ['Dentelle', 'Sarthe']
  },
  {
    id: 'saint-lo',
    name: 'Saint-Lô',
    slug: 'saint-lo-50',
    type: 'city',
    priority: 4,
    department: '50',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Lô',
    description: 'Services canins à Saint-Lô',
    population: '19 000',
    highlights: ['Remparts', 'Vire']
  },
  {
    id: 'coutances',
    name: 'Coutances',
    slug: 'coutances-50',
    type: 'city',
    priority: 4,
    department: '50',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Coutances',
    description: 'Dog walkers à Coutances',
    population: '9 000',
    highlights: ['Cathédrale', 'Jardin des plantes']
  },

  // Région Nouvelle-Aquitaine
  {
    id: 'angouleme',
    name: 'Angoulême',
    slug: 'angouleme-16',
    type: 'city',
    priority: 3,
    department: '16',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Angoulême',
    description: 'Promeneurs de chien à Angoulême',
    population: '42 000',
    highlights: ['Remparts', 'BD']
  },
  {
    id: 'niort',
    name: 'Niort',
    slug: 'niort-79',
    type: 'city',
    priority: 4,
    department: '79',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Niort',
    description: 'Services canins à Niort',
    population: '59 000',
    highlights: ['Donjon', 'Marais poitevin']
  },
  {
    id: 'gueret',
    name: 'Guéret',
    slug: 'gueret-23',
    type: 'city',
    priority: 4,
    department: '23',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Guéret',
    description: 'Dog walkers à Guéret',
    population: '13 000',
    highlights: ['Creuse', 'Monts de Guéret']
  },
  {
    id: 'tulle',
    name: 'Tulle',
    slug: 'tulle-19',
    type: 'city',
    priority: 4,
    department: '19',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Tulle',
    description: 'Promeneurs de chien à Tulle',
    population: '14 000',
    highlights: ['Corrèze', 'Dentelle']
  },
  {
    id: 'perigueux',
    name: 'Périgueux',
    slug: 'perigueux-24',
    type: 'city',
    priority: 3,
    department: '24',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Périgueux',
    description: 'Services canins à Périgueux',
    population: '30 000',
    highlights: ['Cathédrale Saint-Front', 'Isle']
  },
  {
    id: 'agen',
    name: 'Agen',
    slug: 'agen-47',
    type: 'city',
    priority: 3,
    department: '47',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Agen',
    description: 'Dog walkers à Agen',
    population: '33 000',
    highlights: ['Garonne', 'Canal']
  },
  {
    id: 'mont-de-marsan',
    name: 'Mont-de-Marsan',
    slug: 'mont-de-marsan-40',
    type: 'city',
    priority: 4,
    department: '40',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Mont-de-Marsan',
    description: 'Promeneurs de chien à Mont-de-Marsan',
    population: '31 000',
    highlights: ['Sculptures', 'Midouze']
  },
  {
    id: 'dax',
    name: 'Dax',
    slug: 'dax-40',
    type: 'city',
    priority: 4,
    department: '40',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Dax',
    description: 'Services canins à Dax',
    population: '21 000',
    highlights: ['Thermes', 'Adour']
  },

  // Région Occitanie
  {
    id: 'rodez',
    name: 'Rodez',
    slug: 'rodez-12',
    type: 'city',
    priority: 4,
    department: '12',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Rodez',
    description: 'Dog walkers à Rodez',
    population: '24 000',
    highlights: ['Cathédrale', 'Musée Soulages']
  },
  {
    id: 'cahors',
    name: 'Cahors',
    slug: 'cahors-46',
    type: 'city',
    priority: 4,
    department: '46',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Cahors',
    description: 'Promeneurs de chien à Cahors',
    population: '20 000',
    highlights: ['Pont Valentré', 'Lot']
  },
  {
    id: 'auch',
    name: 'Auch',
    slug: 'auch-32',
    type: 'city',
    priority: 4,
    department: '32',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Auch',
    description: 'Services canins à Auch',
    population: '22 000',
    highlights: ['Cathédrale', 'Escalier monumental']
  },
  {
    id: 'tarbes',
    name: 'Tarbes',
    slug: 'tarbes-65',
    type: 'city',
    priority: 3,
    department: '65',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Tarbes',
    description: 'Dog walkers à Tarbes',
    population: '42 000',
    highlights: ['Jardin Massey', 'Pyrénées']
  },
  {
    id: 'foix',
    name: 'Foix',
    slug: 'foix-09',
    type: 'city',
    priority: 4,
    department: '09',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Foix',
    description: 'Promeneurs de chien à Foix',
    population: '10 000',
    highlights: ['Château', 'Ariège']
  },
  {
    id: 'albi',
    name: 'Albi',
    slug: 'albi-81',
    type: 'city',
    priority: 3,
    department: '81',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Albi',
    description: 'Services canins à Albi',
    population: '49 000',
    highlights: ['Cathédrale Sainte-Cécile', 'Tarn']
  },
  {
    id: 'castres',
    name: 'Castres',
    slug: 'castres-81',
    type: 'city',
    priority: 4,
    department: '81',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Castres',
    description: 'Dog walkers à Castres',
    population: '42 000',
    highlights: ['Maisons sur l\'Agout', 'Goya']
  },
  {
    id: 'mende',
    name: 'Mende',
    slug: 'mende-48',
    type: 'city',
    priority: 4,
    department: '48',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Mende',
    description: 'Promeneurs de chien à Mende',
    population: '12 000',
    highlights: ['Cathédrale', 'Lot']
  },

  // Région Pays de la Loire
  {
    id: 'laval',
    name: 'Laval',
    slug: 'laval-53',
    type: 'city',
    priority: 3,
    department: '53',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Laval',
    description: 'Services canins à Laval',
    population: '51 000',
    highlights: ['Vieux château', 'Mayenne']
  },
  {
    id: 'la-roche-sur-yon',
    name: 'La Roche-sur-Yon',
    slug: 'la-roche-sur-yon-85',
    type: 'city',
    priority: 3,
    department: '85',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à La Roche-sur-Yon',
    description: 'Dog walkers à La Roche-sur-Yon',
    population: '55 000',
    highlights: ['Place Napoléon', 'Haras']
  },
  {
    id: 'les-sables-dolonne',
    name: 'Les Sables-d\'Olonne',
    slug: 'les-sables-dolonne-85',
    type: 'city',
    priority: 3,
    department: '85',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien aux Sables-d\'Olonne',
    description: 'Promeneurs de chien aux Sables-d\'Olonne',
    population: '45 000',
    highlights: ['Plage', 'Vendée Globe']
  },

  // Région Provence-Alpes-Côte d'Azur
  {
    id: 'gap',
    name: 'Gap',
    slug: 'gap-05',
    type: 'city',
    priority: 4,
    department: '05',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Gap',
    description: 'Services canins à Gap',
    population: '41 000',
    highlights: ['Alpes', 'Lac de Serre-Ponçon']
  },
  {
    id: 'digne-les-bains',
    name: 'Digne-les-Bains',
    slug: 'digne-les-bains-04',
    type: 'city',
    priority: 4,
    department: '04',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Digne-les-Bains',
    description: 'Dog walkers à Digne-les-Bains',
    population: '16 000',
    highlights: ['Thermes', 'Lavande']
  },
  {
    id: 'draguignan',
    name: 'Draguignan',
    slug: 'draguignan-83',
    type: 'city',
    priority: 4,
    department: '83',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Draguignan',
    description: 'Promeneurs de chien à Draguignan',
    population: '41 000',
    highlights: ['Provence verte', 'Gorges du Verdon']
  },

  // Région Auvergne-Rhône-Alpes
  {
    id: 'chambery',
    name: 'Chambéry',
    slug: 'chambery-73',
    type: 'city',
    priority: 3,
    department: '73',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Chambéry',
    description: 'Services canins à Chambéry',
    population: '59 000',
    highlights: ['Château des Ducs', 'Lac du Bourget']
  },
  {
    id: 'bourg-en-bresse',
    name: 'Bourg-en-Bresse',
    slug: 'bourg-en-bresse-01',
    type: 'city',
    priority: 4,
    department: '01',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Bourg-en-Bresse',
    description: 'Dog walkers à Bourg-en-Bresse',
    population: '42 000',
    highlights: ['Monastère de Brou', 'Poulet de Bresse']
  },
  {
    id: 'aurillac',
    name: 'Aurillac',
    slug: 'aurillac-15',
    type: 'city',
    priority: 4,
    department: '15',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Aurillac',
    description: 'Promeneurs de chien à Aurillac',
    population: '26 000',
    highlights: ['Cantal', 'Festival de théâtre de rue']
  },
  {
    id: 'le-puy-en-velay',
    name: 'Le Puy-en-Velay',
    slug: 'le-puy-en-velay-43',
    type: 'city',
    priority: 4,
    department: '43',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker au Puy-en-Velay',
    description: 'Services canins au Puy-en-Velay',
    population: '19 000',
    highlights: ['Rocher Corneille', 'Saint-Jacques']
  },
  {
    id: 'privas',
    name: 'Privas',
    slug: 'privas-07',
    type: 'city',
    priority: 4,
    department: '07',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Privas',
    description: 'Dog walkers à Privas',
    population: '8 000',
    highlights: ['Ardèche', 'Marrons glacés']
  },

  // DOM-TOM
  {
    id: 'fort-de-france',
    name: 'Fort-de-France',
    slug: 'fort-de-france-972',
    type: 'city',
    priority: 4,
    department: '972',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Fort-de-France Martinique',
    description: 'Dog walkers à Fort-de-France',
    population: '78 000',
    highlights: ['Savane', 'Jardin de Balata']
  },
  {
    id: 'pointe-a-pitre',
    name: 'Pointe-à-Pitre',
    slug: 'pointe-a-pitre-971',
    type: 'city',
    priority: 4,
    department: '971',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Pointe-à-Pitre Guadeloupe',
    description: 'Promeneurs de chien à Pointe-à-Pitre',
    population: '15 000',
    highlights: ['Place de la Victoire', 'Marina']
  },
  {
    id: 'saint-denis-reunion',
    name: 'Saint-Denis',
    slug: 'saint-denis-974',
    type: 'city',
    priority: 4,
    department: '974',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Saint-Denis Réunion',
    description: 'Services canins à Saint-Denis de la Réunion',
    population: '155 000',
    highlights: ['Barachois', 'Jardin de l\'État']
  },
  {
    id: 'saint-pierre-reunion',
    name: 'Saint-Pierre',
    slug: 'saint-pierre-974',
    type: 'city',
    priority: 4,
    department: '974',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Saint-Pierre Réunion',
    description: 'Dog walkers à Saint-Pierre',
    population: '85 000',
    highlights: ['Front de mer', 'Marché couvert']
  },
  {
    id: 'cayenne',
    name: 'Cayenne',
    slug: 'cayenne-973',
    type: 'city',
    priority: 4,
    department: '973',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Cayenne Guyane',
    description: 'Promeneurs de chien à Cayenne',
    population: '63 000',
    highlights: ['Place des Palmistes', 'Fort Cépérou']
  },
  {
    id: 'mamoudzou',
    name: 'Mamoudzou',
    slug: 'mamoudzou-976',
    type: 'city',
    priority: 4,
    department: '976',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Mamoudzou Mayotte',
    description: 'Services canins à Mamoudzou',
    population: '71 000',
    highlights: ['Lagon', 'Place Mariage']
  },
  {
    id: 'noumea',
    name: 'Nouméa',
    slug: 'noumea-988',
    type: 'city',
    priority: 4,
    department: '988',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
    altText: 'Promenade de chien à Nouméa Nouvelle-Calédonie',
    description: 'Dog walkers à Nouméa',
    population: '100 000',
    highlights: ['Baie des Citrons', 'Anse Vata']
  },
  {
    id: 'papeete',
    name: 'Papeete',
    slug: 'papeete-987',
    type: 'city',
    priority: 4,
    department: '987',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    altText: 'Dog walker à Papeete Tahiti',
    description: 'Promeneurs de chien à Papeete',
    population: '26 000',
    highlights: ['Marché', 'Front de mer']
  }
];

// Générer les FAQs locales pour chaque zone
export function generateLocalFAQ(zone: LocalZone, service: LocalService): { question: string; answer: string }[] {
  return [
    {
      question: `Quel est le tarif d'une ${service.name.toLowerCase()} à ${zone.name} ?`,
      answer: `Nos tarifs pour la ${service.name.toLowerCase()} à ${zone.name} commencent à partir de 15€. Le prix exact dépend de la durée, du nombre de chiens et des besoins spécifiques. Demandez un devis gratuit !`
    },
    {
      question: `Comment trouver un promeneur de chien de confiance à ${zone.name} ?`,
      answer: `Tous nos promeneurs à ${zone.name} sont vérifiés (casier judiciaire, pièce d'identité, assurance). Consultez leurs avis clients et réservez en toute sécurité avec notre système de paiement sécurisé.`
    },
    {
      question: `Quels sont les meilleurs endroits pour promener son chien à ${zone.name} ?`,
      answer: `À ${zone.name}, les meilleurs spots pour promener votre chien sont : ${zone.highlights.join(', ')}. Nos promeneurs connaissent parfaitement ces lieux.`
    },
    {
      question: `Proposez-vous des promenades de groupe à ${zone.name} ?`,
      answer: `Oui, nous proposons des promenades individuelles et en petit groupe (max 3 chiens) à ${zone.name}. Les promenades en groupe sont plus économiques tout en restant sécurisées.`
    },
    {
      question: `Comment fonctionne la réservation à ${zone.name} ?`,
      answer: `Réservez en 3 clics : choisissez votre promeneur à ${zone.name}, sélectionnez la date et l'heure, puis payez en ligne. Recevez des photos pendant la promenade et un compte-rendu à la fin !`
    }
  ];
}

// Générer le contenu SEO pour une page locale
export function generateLocalContent(zone: LocalZone, service: LocalService): string {
  const cityName = zone.parent ? `${zone.name} (${zones.find(z => z.id === zone.parent)?.name})` : zone.name;
  
  return `
Vous recherchez un service de ${service.name.toLowerCase()} à ${cityName} ? DogWalking Connect vous met en relation avec des promeneurs et gardiens de chien vérifiés et passionnés dans votre quartier.

## Pourquoi choisir DogWalking Connect à ${zone.name} ?

### Des professionnels de confiance près de chez vous

Tous nos dog walkers à ${zone.name} passent par un processus de vérification rigoureux :
- **Vérification d'identité** complète
- **Casier judiciaire** vierge exigé
- **Assurance responsabilité civile** professionnelle
- **Entretien** avec notre équipe

### Les meilleurs spots de ${zone.name} pour votre chien

Nos promeneurs connaissent parfaitement ${zone.name} et ses environs. Ils emmèneront votre compagnon dans les plus beaux endroits : ${zone.highlights.join(', ')}.

${zone.population ? `Avec ${zone.population} habitants, ${zone.name} compte de nombreux propriétaires de chiens qui nous font confiance au quotidien.` : ''}

## Comment ça marche ?

1. **Trouvez** un promeneur disponible à ${zone.name}
2. **Réservez** en ligne en quelques clics
3. **Suivez** la promenade en temps réel avec photos
4. **Payez** en toute sécurité (paiement libéré après validation)

## Nos services à ${zone.name}

- Promenade quotidienne (30min à 2h)
- Garde à domicile
- Visite à domicile
- Hébergement jour/nuit
- Accompagnement vétérinaire

Réservez dès maintenant votre ${service.name.toLowerCase()} à ${zone.name} et offrez à votre chien l'attention qu'il mérite !
  `.trim();
}

// Générer le JSON-LD LocalBusiness
export function generateLocalBusinessSchema(zone: LocalZone) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://dogwalking.fr/zone/${zone.slug}#local-business`,
    "name": `DogWalking ${zone.name}`,
    "description": zone.description,
    "image": zone.image,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": zone.name,
      "addressRegion": zone.department,
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates"
    },
    "url": `https://dogwalking.fr/zone/${zone.slug}`,
    "telephone": "+33 1 XX XX XX XX",
    "priceRange": "€€",
    "openingHours": "Mo-Su 07:00-21:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "areaServed": {
      "@type": "City",
      "name": zone.name
    },
    "serviceType": ["Dog Walking", "Pet Sitting", "Dog Boarding"],
    "parentOrganization": {
      "@id": "https://dogwalking.fr/#organization"
    }
  };
}

// Helper pour obtenir les zones par département
export function getZonesByDepartment(department: string): LocalZone[] {
  return zones.filter(zone => zone.department === department);
}

// Helper pour obtenir les zones par priorité
export function getZonesByPriority(priority: 1 | 2 | 3 | 4): LocalZone[] {
  return zones.filter(zone => zone.priority === priority);
}

// Helper pour obtenir les zones par type
export function getZonesByType(type: LocalZone['type']): LocalZone[] {
  return zones.filter(zone => zone.type === type);
}

// Liste des départements français couverts
export const departments = [
  { code: '75', name: 'Paris' },
  { code: '77', name: 'Seine-et-Marne' },
  { code: '78', name: 'Yvelines' },
  { code: '91', name: 'Essonne' },
  { code: '92', name: 'Hauts-de-Seine' },
  { code: '93', name: 'Seine-Saint-Denis' },
  { code: '94', name: 'Val-de-Marne' },
  { code: '95', name: 'Val-d\'Oise' },
  { code: '06', name: 'Alpes-Maritimes' },
  { code: '13', name: 'Bouches-du-Rhône' },
  { code: '14', name: 'Calvados' },
  { code: '17', name: 'Charente-Maritime' },
  { code: '18', name: 'Cher' },
  { code: '21', name: 'Côte-d\'Or' },
  { code: '25', name: 'Doubs' },
  { code: '26', name: 'Drôme' },
  { code: '29', name: 'Finistère' },
  { code: '30', name: 'Gard' },
  { code: '31', name: 'Haute-Garonne' },
  { code: '33', name: 'Gironde' },
  { code: '34', name: 'Hérault' },
  { code: '35', name: 'Ille-et-Vilaine' },
  { code: '37', name: 'Indre-et-Loire' },
  { code: '38', name: 'Isère' },
  { code: '42', name: 'Loire' },
  { code: '44', name: 'Loire-Atlantique' },
  { code: '45', name: 'Loiret' },
  { code: '49', name: 'Maine-et-Loire' },
  { code: '51', name: 'Marne' },
  { code: '54', name: 'Meurthe-et-Moselle' },
  { code: '56', name: 'Morbihan' },
  { code: '57', name: 'Moselle' },
  { code: '59', name: 'Nord' },
  { code: '63', name: 'Puy-de-Dôme' },
  { code: '64', name: 'Pyrénées-Atlantiques' },
  { code: '66', name: 'Pyrénées-Orientales' },
  { code: '67', name: 'Bas-Rhin' },
  { code: '68', name: 'Haut-Rhin' },
  { code: '69', name: 'Rhône' },
  { code: '72', name: 'Sarthe' },
  { code: '73', name: 'Savoie' },
  { code: '74', name: 'Haute-Savoie' },
  { code: '76', name: 'Seine-Maritime' },
  { code: '80', name: 'Somme' },
  { code: '83', name: 'Var' },
  { code: '84', name: 'Vaucluse' },
  { code: '86', name: 'Vienne' },
  { code: '87', name: 'Haute-Vienne' },
  { code: '89', name: 'Yonne' },
  { code: '10', name: 'Aube' },
  { code: '2A', name: 'Corse-du-Sud' },
  { code: '2B', name: 'Haute-Corse' },
  { code: '971', name: 'Guadeloupe' },
  { code: '972', name: 'Martinique' },
  { code: '973', name: 'Guyane' },
  { code: '974', name: 'La Réunion' },
  { code: '976', name: 'Mayotte' },
  { code: '987', name: 'Polynésie française' },
  { code: '988', name: 'Nouvelle-Calédonie' }
];
