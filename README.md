# 🐕 DogWalking - Plateforme de Promeneurs de Chiens Vérifiés en France

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Connected-green.svg)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-purple.svg)](https://www.framer.com/motion/)

---

## 📋 Présentation

**DogWalking** est la plateforme n°1 en France pour trouver des promeneurs de chiens professionnels vérifiés. Notre mission : garantir la sécurité et le bien-être de votre compagnon grâce à :

- ✅ **Promeneurs 100% vérifiés** (CNI, casier judiciaire B2, assurance RC)
- ✅ **Paiement escrow sécurisé** (argent bloqué jusqu'à validation)
- ✅ **Preuves photo/vidéo obligatoires** à chaque mission
- ✅ **Assurance incluse** jusqu'à 2M€

---

## 🎨 Identité Visuelle

| Élément | Valeur |
|---------|--------|
| **Couleur Primaire** | Vert sauge `hsl(142, 76%, 36%)` |
| **Couleur Accent** | Bleu océan `hsl(200, 98%, 39%)` |
| **Fond** | Clair (blanc/crème) |
| **Style** | Moderne, accessible, rassurant |
| **Cible** | Tous publics (y compris seniors) |

> ⚠️ **Règle absolue** : Pas de fond sombre/noir. Utiliser uniquement les tokens sémantiques du design system.

---

## 🚀 Fonctionnalités Principales

### 👤 Parcours Propriétaire (Espace Propriétaire)
| Onglet | Description | Status |
|--------|-------------|--------|
| **Accueil** | Résumé, stats, prochaines réservations | ✅ |
| **Réservations** | À venir, passées, annulation | ✅ |
| **Mes Chiens** | Profils, photos, santé | ✅ |
| **Messages** | Messagerie temps réel | ✅ |
| **Factures** | Historique paiements, téléchargements | ✅ |
| **Parrainage** | Code unique, tracking | ✅ |
| **Profil** | Informations, CNI, paramètres | ✅ |

### 🚶 Parcours Promeneur (Espace Promeneur)
| Onglet | Description | Status |
|--------|-------------|--------|
| **Accueil** | Demandes, revenus, missions | ✅ |
| **Missions** | Accepter/refuser, prise en charge photo | ✅ |
| **Calendrier** | Disponibilités hebdomadaires | ✅ |
| **Messages** | Conversations propriétaires | ✅ |
| **Revenus** | Gains, historique, commission 13% | ✅ |
| **Performance** | Note, avis, badges | ✅ |
| **Profil** | Documents, tarifs, bio publique | ✅ |

### 🔒 Sécurité & Confiance
- ✅ Vérification manuelle des documents sous 48h
- ✅ Upload documents vers bucket privé
- ✅ Preuves photo/vidéo obligatoires (remplace GPS)
- ✅ Signalement incidents et litiges
- ✅ Avis certifiés (uniquement après service)
- 🔜 Paiement escrow (Stripe Connect)

---

## 📁 Architecture du Projet

```
src/
├── assets/                    # Images et ressources statiques
│   ├── pages/                 # Images hero des pages
│   ├── homepage/              # Images sections homepage
│   ├── services/              # Images services détaillés
│   └── trust/                 # Images confiance et sécurité
│
├── components/
│   ├── booking/               # Réservation, preuves photo
│   ├── dashboard/
│   │   ├── owner/             # Onglets dashboard propriétaire
│   │   ├── walker/            # Onglets dashboard promeneur
│   │   └── shared/            # Composants partagés
│   ├── seo/                   # SEOHead, structured data
│   └── ui/                    # 50+ composants Shadcn personnalisés
│
├── pages/
│   ├── dashboard/
│   │   ├── OwnerDashboard.tsx    # Espace Propriétaire
│   │   └── WalkerDashboard.tsx   # Espace Promeneur
│   └── services/              # 6 Pages piliers SEO
│
├── hooks/                     # Hooks personnalisés (realtime, PWA, etc.)
├── integrations/supabase/     # Client et types Supabase
└── cahier-de-charges/         # Spécifications détaillées
```

---

## 🌐 Routes de l'Application

### Dashboards (Séparation stricte)
| Route | Description |
|-------|-------------|
| `/dashboard-proprietaire` | Espace Propriétaire (7 onglets) |
| `/dashboard-promeneur` | Espace Promeneur (7 onglets) |

### Pages Publiques
| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/services/promenade` | Promenade de chien |
| `/services/garde` | Garde à domicile |
| `/services/visite` | Visite à domicile |
| `/services/dog-sitting` | Dog sitting |
| `/services/pet-sitting` | Pet sitting |
| `/services/marche-reguliere` | Marche régulière |
| `/walkers` | Recherche promeneurs |
| `/zone/:slug` | Pages locales SEO |
| `/blog` | Articles et conseils |

---

## 💾 Supabase Storage Buckets

| Bucket | Public | Usage |
|--------|--------|-------|
| `avatars` | ✅ Oui | Photos profil utilisateurs |
| `dog-photos` | ✅ Oui | Photos des chiens |
| `walker-documents` | ❌ Non | CNI, casier B2, assurance RC |
| `walk-proofs` | ❌ Non | Preuves photo/vidéo missions |

---

## 📊 Base de Données (Tables Principales)

| Table | Description |
|-------|-------------|
| `profiles` | Informations utilisateurs |
| `dogs` | Profils des chiens |
| `bookings` | Réservations |
| `walker_profiles` | Profils promeneurs (tarifs, services) |
| `walker_documents` | Documents vérification |
| `walker_earnings` | Revenus promeneurs |
| `walk_proofs` | Preuves photo missions |
| `reviews` | Avis clients |
| `favorites` | Promeneurs favoris |
| `messages` | Messagerie |
| `notifications` | Notifications |
| `referrals` | Parrainage |
| `disputes` | Litiges |
| `incident_reports` | Signalements |

---

## 📅 Roadmap

### ✅ Phase 1 : Fondations (COMPLET - 100%)
- [x] Authentification Supabase
- [x] Dashboards séparés propriétaire/promeneur
- [x] Upload photos et documents
- [x] Système de preuves photo obligatoires
- [x] SEO optimisé (6 pages piliers)
- [x] Design responsive accessible

### 🔜 Phase 2 : Paiement (EN ATTENTE)
- [ ] Intégration Stripe Connect
- [ ] Paiement escrow 48h
- [ ] Facturation automatique

### 🔜 Phase 3 : Communication
- [ ] Emails transactionnels (Resend)
- [ ] Notifications push PWA
- [ ] SMS urgences (Twilio)

### ⚪ Phase 4 : Fonctionnalités Avancées
- [ ] Calendrier synchronisé (Google, iCal)
- [ ] Réservations récurrentes
- [ ] Application mobile native

---

## 🛠️ Stack Technique

| Technologie | Usage | Version |
|-------------|-------|---------|
| **React** | Framework UI | 18.3 |
| **TypeScript** | Typage strict | 5.0 |
| **Vite** | Build & HMR | 5.x |
| **Tailwind CSS** | Styling utility-first | 3.4 |
| **Shadcn/UI** | Composants accessibles | Latest |
| **Framer Motion** | Animations fluides | 12.x |
| **Supabase** | Backend complet | 2.x |
| **React Router** | Navigation SPA | 6.x |
| **React Query** | Data fetching & cache | 5.x |

---

## 📄 Documentation

- `README.md` - Ce fichier
- `CAHIER_DES_CHARGES.md` - Spécifications fonctionnelles complètes
- `SEO_VALIDATION_CHECKLIST.md` - Checklist SEO
- `cahier-de-charges/DASHBOARD-PROPRIETAIRE.md` - Specs dashboard propriétaire
- `cahier-de-charges/DASHBOARD-PROMENEUR.md` - Specs dashboard promeneur
- `cahier-de-charges/BIBLE-OPEN-GO-2026.md` - Vision projet

---

## 📄 Licence

MIT License - Voir [LICENSE](LICENSE)

---

*Développé avec ❤️ pour les amoureux des chiens en France - Objectif : Leader français Pet Care 🇫🇷 🐕*

**Progression globale : ~85%** | Mise à jour : Janvier 2026
