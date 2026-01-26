# 📖 La Bible Open-Go 2026 : Document Maître Unifié

**Auteur :** Manus AI  
**Date :** 29 Décembre 2025  
**Statut :** Document Maître de Référence Unique

---

## 📑 TABLE DES MATIÈRES

1. [Vision et Objectifs](#1-vision-et-objectifs)
2. [Stack Technique](#2-stack-technique)
3. [Standards SEO 2026](#3-standards-seo-2026)
4. [Architecture E-E-A-T](#4-architecture-e-e-a-t)
5. [Structure Géographique](#5-structure-géographique)
6. [Inventaire des Composants](#6-inventaire-des-composants)
7. [Backend & Fonctionnalités](#7-backend--fonctionnalités)
8. [Checklist d'Implémentation](#8-checklist-dimplémentation)
9. [Stratégie Externe (Digital PR)](#9-stratégie-externe-digital-pr)

---

## 1. Vision et Objectifs

### 1.1. Présentation
DogWalking est la plateforme n°1 en France pour trouver des promeneurs de chiens professionnels vérifiés.

### 1.2. Proposition de Valeur
- **Vérification Triple** : CNI, casier judiciaire, assurance RC jusqu'à 2M€
- **Sécurité Absolue** : Paiement escrow, preuves photo/vidéo obligatoires
- **Transparence** : Commission 13% tout inclus, tarifs affichés

### 1.3. Objectif Principal
Transformer la plateforme en une **Entité d'Autorité** incontestable pour Google, en misant sur la clarté géographique et la preuve d'expertise humaine.

---

## 2. Stack Technique

### 2.1. Frontend
- **Framework** : React 18 + TypeScript
- **Build** : Vite
- **Styling** : Tailwind CSS + CSS Variables (Design System)
- **Animations** : Framer Motion
- **SEO** : React Helmet Async

### 2.2. Backend
- **BaaS** : Supabase (Auth, Database, Edge Functions, Storage)
- **Realtime** : Supabase Realtime (bookings, messages, notifications)
- **Paiement** : Stripe (Escrow) - À finaliser

### 2.3. Structure des Dossiers
```
src/
├── components/
│   ├── seo/          # StructuredDataGraph, SEOHead
│   ├── ui/           # Composants UI (SemanticFAQ, TrustBadges, etc.)
│   ├── booking/      # WalkerCard, BookingSteps, SearchFilters
│   ├── dashboard/    # StatsCard, EarningsChart, PerformanceStats
│   └── messaging/    # MessageBubble, TypingIndicator
├── pages/
│   └── services/     # 6 pages piliers SEO
├── data/             # expertsData, clientReviewsData, blogData
└── hooks/            # useRealtimeBookings, useWalkerMatching
```

---

## 3. Standards SEO 2026

### 3.1. Règles de Contenu
| Critère | Standard |
|---------|----------|
| Volume de mots | 1400-1700 mots par page pilier |
| Images | 4-6 images uniques par page |
| ALT tags | Descriptifs avec mots-clés |
| FAQ | Accordéons HTML5 `<details>/<summary>` |
| Duplication | Zéro tolérance |

### 3.2. Balisage Structuré (@graph)
- **Organization racine** avec `@id` unique
- **LocalBusiness** liés via `parentOrganization`
- **FAQPage Schema** automatique sur tous les accordéons
- **Person Schema** pour les experts
- **Review/Article Schema** pour les preuves d'expérience

### 3.3. Optimisation Technique
- Balises `<details>/<summary>` natives (IA-Ready)
- Contenu toujours visible dans le DOM
- Meta-descriptions avec garanties explicites
- Canonical URLs sur toutes les pages

---

## 4. Architecture E-E-A-T

### 4.1. Expertise (E)
**4 Experts Certifiés :**
| Nom | Titre | Spécialité | Expérience |
|-----|-------|------------|------------|
| Marie Dupont | Comportementaliste Canin Certifiée | Comportement, anxiété, socialisation | 12 ans |
| Dr. Jean Martin | Vétérinaire Diplômé | Santé canine, nutrition, prévention | 18 ans |
| Sophie Bernard | Responsable Qualité | Vérification, formation, standards | 10 ans |
| Thomas Leclerc | Expert Promenade | Techniques, environnements, sécurité | 15 ans |

### 4.2. Expérience (E)
- **8 Avis Clients Réalistes** : Localisés, datés, variés
- **3 Études de Cas** : Format Problème > Solution > Résultat
- **Balisage Review Schema** automatique

### 4.3. Confiance (T)
**Trust Badges obligatoires :**
- Paiement Escrow Sécurisé
- Promeneurs 100% Vérifiés (35% d'acceptation)
- Preuves Photo/Vidéo Obligatoires
- Assurance RC jusqu'à 2M€

---

## 5. Structure Géographique

### 5.1. Hiérarchie de Silotage
```
France (Accueil)
└── Département (/zone/departement-{code})
    └── Ville (/zone/{slug})
```

### 5.2. Maillage Interne
- **Descendant** : Département → liste des villes
- **Horizontal** : Ville → villes voisines du même département
- **Breadcrumbs** : Sur toutes les pages

---

## 6. Inventaire des Composants

### 6.1. Composants SEO
| Composant | Fonction |
|-----------|----------|
| `StructuredDataGraph.tsx` | Balisage @graph imbriqué |
| `SEOHead.tsx` | Meta-tags + OpenGraph |
| `SemanticFAQ.tsx` | Accordéons HTML5 + FAQPage Schema |

### 6.2. Composants E-E-A-T
| Composant | Fonction |
|-----------|----------|
| `ExpertBio.tsx` | Affichage expert + Person Schema |
| `TrustBadges.tsx` | Garanties de confiance |
| `ClientReviews.tsx` | Avis + Review Schema |
| `CaseStudies.tsx` | Études de cas + Article Schema |

### 6.3. Composants Réservation
| Composant | Fonction |
|-----------|----------|
| `WalkerCard.tsx` | Carte promeneur avec matching score |
| `BookingSteps.tsx` | Flux de réservation 4 étapes |
| `SearchFilters.tsx` | Filtres avancés |
| `WalkProofUpload.tsx` | Upload preuves photo |

### 6.4. Composants Dashboard
| Composant | Fonction |
|-----------|----------|
| `EarningsChart.tsx` | Graphiques de revenus |
| `PerformanceStats.tsx` | Statistiques détaillées |
| `StatsCard.tsx` | Cartes statistiques |

---

## 7. Backend & Fonctionnalités

### 7.1. Tables Supabase
| Table | Fonction | RLS | Realtime |
|-------|----------|-----|----------|
| `profiles` | Données utilisateur | ✅ | ❌ |
| `dogs` | Chiens des propriétaires | ✅ | ❌ |
| `bookings` | Réservations | ✅ | ✅ |
| `walker_profiles` | Profils promeneurs | ✅ | ❌ |
| `walker_documents` | Vérification documents | ✅ | ❌ |
| `messages` | Messagerie | ✅ | ✅ |
| `notifications` | Notifications | ✅ | ✅ |
| `reviews` | Avis clients | ✅ | ❌ |
| `favorites` | Favoris | ✅ | ❌ |
| `referrals` | Parrainage | ✅ | ❌ |

### 7.2. Hooks Temps Réel
- `useRealtimeBookings` : Gestion réservations live
- `useRealtimeMessages` : Chat temps réel
- `useRealtimeNotifications` : Notifications push
- `useWalkerMatching` : Algorithme de matching

---

## 8. Checklist d'Implémentation

### ✅ Complété (100%)
- [x] Balisage @graph JSON-LD
- [x] Lien LocalBusiness → Organization
- [x] Base de données experts
- [x] Composant ExpertBio
- [x] Trust Badges
- [x] Avis clients + Review Schema
- [x] Études de cas + Article Schema
- [x] Page DepartmentZone
- [x] Maillage géographique
- [x] Accordéons HTML5 sémantiques
- [x] 6 pages services piliers
- [x] Realtime Supabase
- [x] Système de matching
- [x] Blog avec articles SEO

### ⏳ À Finaliser
- [ ] Intégration Stripe Escrow
- [ ] Emails transactionnels (Resend)
- [ ] Images WebP optimisées
- [ ] Service Worker (PWA)

---

## 9. Stratégie Externe (Digital PR)

### 9.1. Citations NAP
| Plateforme | Action |
|------------|--------|
| Google My Business | Optimiser fiche + NAP cohérent |
| Pages Jaunes | Inscription + mots-clés |
| Annuaires Vétérinaires | Lier profils experts |

### 9.2. Angles de Presse
| Atout | Angle | Cibles |
|-------|-------|--------|
| Expertise | "Les erreurs à éviter en promenade" | Blogs santé animale |
| Sécurité | "Paiement escrow contre les arnaques" | Médias généralistes |
| Données locales | "Classement des villes les plus dog-friendly" | Presse régionale |

---

## 🎯 Métriques Attendues

### Court terme (1-3 mois)
- Rich Snippets sur 80% des pages
- Indexation complète du silo géographique

### Moyen terme (3-6 mois)
- Visibilité Google AI Overviews
- Positions Local Pack Top 3

### Long terme (6-12 mois)
- Domination "promenade chien [ville]"
- Autorité établie (DA > 40)

---

*Document compilé par Manus AI - 29 Décembre 2025*
*Ce document remplace tous les fichiers précédents du cahier-de-charges.*
