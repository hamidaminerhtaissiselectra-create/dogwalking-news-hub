# 📄 Cahier des Charges – DogWalking

Le site web DogWalking permet aux utilisateurs de s'inscrire soit en tant que propriétaire d'animal, soit en tant que promeneur certifié.
Après inscription et validation (selon le profil), chacun accède à son espace personnel (dashboard) pour gérer ses réservations, services et informations.

---

## 🟦 1. PARTIE GÉNÉRALE

### 1.1 Interface & Navigation

- **Header** : logo DogWalking + menu principal (Accueil, Services, Dashboard Promeneur/Propriétaires, Blog, Connexion/Inscription)
- **Responsive** : site adapté ordinateur, tablette et mobile

---

### 1.2 Page d'Accueil

Titre principal : **"Trouvez le Promeneur Certifié Idéal pour Votre Compagnon"**

*(Visuel actuel à enrichir)*

---

### 1.3 Services et Tarifs

Les tarifs sont fixés par le propriétaire selon la durée :

| Service | Tarif de base |
|---------|---------------|
| Promenade 30 min | 7 € |
| Promenade 1h | 13 € |
| +30 min supplémentaires | option |
| Visite simple | 19 € |
| Visite sanitaire / entretien | 35 € |
| Garde à domicile (24h/nuitée) | 31 € |
| Pension canine (24h) | 26 € |
| Accompagnement vétérinaire | 35 € |

→ Affichage sous forme de tableau clair + bouton "Réserver"

---

### 1.4 Réservation & Paiement

- Réservation avec calendrier
- Choix de la durée (30 min, 1h, + tranches)
- Validation automatique ou après acceptation du promeneur
- Paiement en ligne sécurisé
- Factures téléchargeables
- Gestion des dons ou pourboires pour la plateforme

---

### 1.5 Suivi de Mission (Remplacement de la géolocalisation)

❗ **Géolocalisation en temps réel supprimée.** Remplacée par un système de preuve obligatoire.

- Bouton "Prise en charge" dans le dashboard du promeneur
- Photo ou vidéo obligatoire dès la prise en charge de l'animal → visible par le propriétaire
- En fin de mission :
  - Si le propriétaire a demandé des preuves → photos/vidéos envoyées
  - **Si le propriétaire n'a pas demandé de preuve → photo/vidéo obligatoire pour débloquer le paiement**
- Notifications début et fin de mission
- Pas de suivi GPS en direct

---

### 1.6 Communication

- Messagerie intégrée entre propriétaires et promeneurs (anonyme pour les 2 utilisateurs)
- Envoi d'instructions ou informations spécifiques
- Bouton "Urgence" pour signalements rapides

---

### 1.7 Sécurité & Vérifications

- **Supabase** utilisé pour : authentification, stockage documents (CNI, casier, assurance), profils, réservations, messagerie
- Carte d'identité obligatoire pour tous les comptes + accord de principe obligatoire
- **Promeneurs** : casier judiciaire B2 obligatoire + assurance Responsabilité Civile obligatoire
- Validation manuelle via Supabase avant activation du profil promeneur
- **Propriétaires** : validation par CNI et accord de principe
- Authentification par email + mot de passe
- Certifications / formations promeneurs possibles (optionnel)
- Interface admin → prévue plus tard (pas dans cette version)

---

### 1.8 SEO & Contenu

- Suppression de toute mention "Rover" ou "pet-sitter" → remplacés par "DogWalking" et "promeneur certifié"
- Optimisation SEO (balises, titres, métadonnées)
- Sitemap, robots.txt
- Blog intégré pour référencement
- Optimisation du contenu pour recherches locales

---

## 🟩 2. ESPACE PROPRIÉTAIRES

### 2.1 Inscription

- Formulaire : prénom, nom, email, mot de passe
- Carte d'identité obligatoire
- Case obligatoire "accord de principe"

---

### 2.2 Profil Animal

- Nom, âge, poids
- Photo(s)
- Santé : carnet de vaccination, informations médicales
- Comportement : sociabilité, habitudes, caractère
- Besoins spécifiques (régime, traitement...)

---

### 2.3 Dashboard Propriétaire

- Réservations en cours + historique
- Possibilité d'annuler jusqu'à 3h avant le rendez-vous
- Factures disponibles
- Favoris : sauvegarde de promeneurs

**Fichier principal** : `src/pages/dashboard/OwnerDashboard.tsx`

**Onglets** :
| Onglet | Fichier |
|--------|---------|
| Accueil | `src/components/dashboard/owner/OverviewTab.tsx` |
| Réservations | `src/components/dashboard/owner/BookingsTab.tsx` |
| Mes Chiens | `src/components/dashboard/owner/DogsTab.tsx` |
| Messages | `src/components/dashboard/owner/MessagesTab.tsx` |
| Factures | `src/components/dashboard/owner/InvoicesSection.tsx` |
| Parrainage | `src/components/dashboard/owner/ReferralTab.tsx` |
| Profil | `src/components/dashboard/owner/ProfileTab.tsx` |

---

### 2.4 Réservation

- Sélection du service, de la date, horaire, durée
- Validation automatique ou après acceptation du promeneur
- Paiement en ligne obligatoire pour confirmer
- Modification/annulation possible selon délai

---

### 2.5 Suivi de la Mission (Sans GPS en direct)

- ❌ Plus de carte GPS
- ✅ Réception des photos/vidéos obligatoires de départ et/ou fin
- ✅ Notifications début/fin de prestation
- ✅ Rapport de mission automatique

---

### 2.6 Communication

- Messagerie intégrée avec le promeneur
- Envoi d'instructions spécifiques
- Gestion d'urgences

---

### 2.7 Avis & Notations

- Note (1 à 5 étoiles)
- Commentaire écrit possible
- Ajout optionnel de photos

---

## 🟨 3. ESPACE PROMENEURS

### 3.1 Inscription

- Formulaire : prénom, nom, email, mot de passe
- Carte d'identité + casier judiciaire B2 obligatoires
- Certificats (optionnel)
- **Profil activé uniquement après validation manuelle**

---

### 3.2 Profil Public

- Photo de profil
- Nom, zone d'activité (ville / secteur)
- Services proposés et tarifs
- Description personnelle
- Expérience, badges éventuels
- Notes & avis
- Temps de réponse moyen

---

### 3.3 Dashboard Promeneur

- Gestion des demandes (accepter/refuser)
- Calendrier de disponibilités
- Historique des missions
- Statistiques : revenus, avis, taux de réponse
- Gestion de ses tarifs
- Bouton "Prise en charge" → photo/vidéo obligatoire (remplace GPS)

**Fichier principal** : `src/pages/dashboard/WalkerDashboard.tsx`

**Onglets** :
| Onglet | Fichier |
|--------|---------|
| Accueil | `src/components/dashboard/walker/OverviewTab.tsx` |
| Missions | `src/components/dashboard/walker/BookingsTab.tsx` |
| Revenus | `src/components/dashboard/walker/EarningsTab.tsx` |
| Disponibilités | `src/components/dashboard/walker/AvailabilityTab.tsx` |
| Messages | `src/components/dashboard/walker/MessagesTab.tsx` |
| Performance | `src/components/dashboard/walker/PerformanceTab.tsx` |
| Profil | `src/components/dashboard/walker/ProfileTab.tsx` |

---

### 3.4 Communication & Rapports

- Messagerie avec les propriétaires
- Envoi de photos/vidéos pendant la mission
- Rapport automatique en fin de service

---

### 3.5 Finances

- Suivi des revenus
- Historique des paiements
- Téléchargement des factures
- Réception des pourboires/dons
- **Commission plateforme : 13%**

---

### 3.6 Formations (Optionnel)

- Accès à des modules de formation
- Validation par quiz
- Badges de compétences (soins, premiers secours, etc.)

---

## 🗃️ TABLES SUPABASE

| Table | Description |
|-------|-------------|
| `profiles` | Infos utilisateurs |
| `dogs` | Profils chiens |
| `bookings` | Réservations |
| `walker_profiles` | Profils promeneurs |
| `walker_documents` | Documents vérification (CNI, casier, assurance) |
| `walker_earnings` | Revenus (commission 13%) |
| `walk_proofs` | Preuves photo/vidéo missions |
| `reviews` | Avis (1-5 étoiles + commentaire) |
| `favorites` | Promeneurs favoris |
| `messages` | Messagerie anonyme |
| `notifications` | Notifications |
| `referrals` | Parrainage (15€ parrain, 10€ filleul) |
| `disputes` | Litiges/médiation |
| `incident_reports` | Signalements (retards, absences) |
| `user_roles` | Rôles sécurisés (admin, moderator, user) |

---

## 🎨 IDENTITÉ VISUELLE

### Palette de Couleurs

| Token | Usage |
|-------|-------|
| `primary` | Vert sauge – Boutons, liens, accents |
| `accent` | Bleu océan – Badges, highlights |
| `heart` | Rose – Éléments propriétaire |
| `background` | Blanc/crème – Fond de page |
| `foreground` | Gris foncé – Texte principal |

### Règles Strictes

- ❌ **INTERDIT** : Fond noir/sombre, couleurs hardcodées (red-500, rose-500, etc.)
- ✅ **OBLIGATOIRE** : Tokens sémantiques uniquement
- ✅ **Accessibilité** : Textes min 16px, contrastes élevés, boutons larges
- ✅ **Cible seniors** : Navigation simple, icônes lisibles

---

## ✅ Conclusion

DogWalking devient une plateforme :

- ✔ **Fiable et sécurisée** : vérifications manuelles, identité et casier exigés
- ✔ **Claire et transparente** : services définis, tarifs simples, preuves par photo/vidéo
- ✔ **Pratique et moderne** : réservation, paiement sécurisé, messagerie intégrée
- ✔ **Évolutive** : blog, SEO, interface admin prévue plus tard

---

*Document mis à jour – Février 2026*
