# 📘 CAHIER DES CHARGES COMPLET - DOGWALKING v5.0
## Plateforme Leader de Pet Care en France

---

## 📌 Informations Générales

| Élément | Valeur |
|---------|--------|
| **Nom du projet** | DogWalking |
| **Type** | Plateforme marketplace B2C Pet Care |
| **Cibles** | Propriétaires d'animaux + Prestataires professionnels |
| **Marché** | France métropolitaine |
| **Stack technique** | React 18 + TypeScript + Vite + Tailwind CSS + Supabase |
| **Date mise à jour** | Janvier 2026 |
| **Progression globale** | ~85% |

---

## 🎨 IDENTITÉ VISUELLE (OBLIGATOIRE)

### Palette de Couleurs
| Token | Valeur | Usage |
|-------|--------|-------|
| `primary` | Vert sauge `hsl(142, 76%, 36%)` | Boutons, liens, accents |
| `accent` | Bleu océan `hsl(200, 98%, 39%)` | Badges, highlights |
| `background` | Blanc/crème | Fond de page |
| `foreground` | Gris foncé | Texte principal |

### Règles Strictes
- ❌ **INTERDIT** : Fond noir/sombre, couleurs hardcodées (red-500, rose-500, etc.)
- ✅ **OBLIGATOIRE** : Tokens sémantiques uniquement (text-primary, bg-primary/10, etc.)
- ✅ **Accessibilité** : Textes min 16px, contrastes élevés, boutons larges
- ✅ **Cible seniors** : Navigation simple, icônes lisibles, pas de jargon technique

---

## 🔐 SÉPARATION DES RÔLES (FONDAMENTAL)

### Principe Absolu
Il existe **2 espaces totalement séparés** :
1. **Espace Propriétaire** (`/dashboard-proprietaire`)
2. **Espace Promeneur** (`/dashboard-promeneur`)

### Règles
- ❌ Aucun switch Promeneur/Propriétaire dans l'interface
- ❌ Aucun dashboard hybride
- ✅ Le rôle est choisi à l'inscription
- ✅ Mention visible "Espace Propriétaire" ou "Espace Promeneur" partout

---

## 📋 SPÉCIFICATIONS DÉTAILLÉES

### Documentation des Dashboards
Les spécifications complètes sont dans :
- `cahier-de-charges/DASHBOARD-PROPRIETAIRE.md`
- `cahier-de-charges/DASHBOARD-PROMENEUR.md`

---

## 🟩 ESPACE PROPRIÉTAIRE - Onglets

| Onglet | Fonctionnalités | Status |
|--------|-----------------|--------|
| **Accueil** | Stats, prochaines réservations, actions rapides | ✅ |
| **Réservations** | À venir, passées, annulation (jusqu'à 3h avant) | ✅ |
| **Mes Chiens** | Liste, ajout, modification, photos, santé | ✅ |
| **Messages** | Messagerie temps réel avec promeneurs | ✅ |
| **Factures** | Historique paiements, téléchargement PDF | ✅ |
| **Parrainage** | Code unique, partage, historique, gains | ✅ |
| **Profil** | Infos personnelles, CNI, paramètres | ✅ |

---

## 🟨 ESPACE PROMENEUR - Onglets

| Onglet | Fonctionnalités | Status |
|--------|-----------------|--------|
| **Accueil** | Demandes en attente, missions à venir, revenus | ✅ |
| **Missions** | Accepter/refuser, prise en charge photo obligatoire | ✅ |
| **Calendrier** | Disponibilités jours/heures | ✅ |
| **Messages** | Conversations propriétaires | ✅ |
| **Revenus** | Gains, commission 13%, historique, retrait | ✅ |
| **Performance** | Note moyenne, avis, badges | ✅ |
| **Profil** | Bio publique, tarifs, documents obligatoires | ✅ |

---

## 📸 SYSTÈME DE PREUVES PHOTO (Remplace GPS)

### Flux Mission
1. Promeneur accepte la demande
2. **Prise en charge** : Photo/vidéo OBLIGATOIRE de l'animal
3. Notification envoyée au propriétaire
4. **Fin de mission** : Photo/vidéo OBLIGATOIRE
5. Si pas de preuve → paiement bloqué
6. Rapport automatique généré

### Tables Supabase
- `walk_proofs` : Stockage des preuves
- `bookings.status` : pending → confirmed → in_progress → completed

---

## 💰 TARIFICATION

| Service | Tarif de base |
|---------|---------------|
| Promenade 30 min | 7€ |
| Promenade 1h | 13€ |
| Visite simple | 19€ |
| Visite sanitaire | 35€ |
| Garde 24h/nuit | 31€ |
| Pension canine 24h | 26€ |
| Accompagnement vétérinaire | 35€ |

**Commission plateforme** : 13% (vs 20% Rover)

---

## 🔒 VÉRIFICATION & SÉCURITÉ

### Propriétaires
- CNI obligatoire
- Accord de principe à l'inscription

### Promeneurs
- CNI obligatoire
- Casier judiciaire B2 obligatoire
- Assurance Responsabilité Civile obligatoire
- Validation manuelle admin avant activation

### Storage Buckets
| Bucket | Public | Usage |
|--------|--------|-------|
| `avatars` | ✅ | Photos profil |
| `dog-photos` | ✅ | Photos chiens |
| `walker-documents` | ❌ | Documents vérification |
| `walk-proofs` | ❌ | Preuves missions |

---

## 🗃️ TABLES SUPABASE

| Table | Description | RLS |
|-------|-------------|-----|
| `profiles` | Infos utilisateurs | ✅ |
| `dogs` | Profils chiens | ✅ |
| `bookings` | Réservations | ✅ |
| `walker_profiles` | Profils promeneurs | ✅ |
| `walker_documents` | Documents vérification | ✅ |
| `walker_earnings` | Revenus (commission 13%) | ✅ |
| `walk_proofs` | Preuves photo missions | ✅ |
| `reviews` | Avis (1-5 étoiles + commentaire) | ✅ |
| `favorites` | Promeneurs favoris | ✅ |
| `messages` | Messagerie anonyme | ✅ |
| `notifications` | Notifications push | ✅ |
| `referrals` | Parrainage (15€ parrain, 10€ filleul) | ✅ |
| `disputes` | Litiges/médiation | ✅ |
| `incident_reports` | Signalements (retards, absences) | ✅ |
| `user_roles` | Rôles sécurisés (admin, moderator, user) | ✅ |

---

## 📅 ÉTAT D'AVANCEMENT

### ✅ FAIT (85%)
- Authentification email Supabase
- Dashboards séparés propriétaire/promeneur
- 7 onglets fonctionnels chaque dashboard
- Upload photos (profil, chiens)
- Upload documents promeneurs
- Système de preuves photo obligatoires
- Messagerie temps réel
- Système parrainage
- Gestion avis et favoris
- Signalement incidents et litiges
- SEO optimisé (6 pages piliers)
- Design responsive accessible
- PWA (manifest, service worker, install prompt)

### 🔜 À FAIRE (15%)
- Intégration Stripe Connect (paiement escrow)
- Emails transactionnels (Resend)
- Interface Admin sécurisée (modération documents)
- Notifications push navigateur
- Export calendrier Google Calendar bidirectionnel

---

## ✅ CHECKLIST AVANT LANCEMENT

### Technique
- [ ] Tests E2E
- [ ] Audit sécurité Supabase
- [ ] Optimisation images WebP
- [ ] Error boundaries

### Légal
- [ ] CGV/CGU finalisées
- [ ] Politique de confidentialité RGPD
- [ ] Contrat promeneur
- [ ] Assurance plateforme

### Business
- [ ] Compte Stripe Connect vérifié
- [ ] Compte Resend configuré
- [ ] Support email actif

---

## 🎯 DIRECTIVES DÉVELOPPEMENT

### Couleurs
```css
/* TOUJOURS utiliser les tokens sémantiques */
✅ text-primary, bg-primary/10, border-primary/20
❌ text-red-500, bg-rose-50, text-green-600
```

### Animations
```typescript
/* Animations légères, non distrayantes */
✅ transition-all duration-300
❌ Animations infinies, gradients animés complexes
```

### Accessibilité
```html
<!-- Textes lisibles, boutons larges -->
✅ text-base (16px min), py-3 px-6 (boutons)
❌ text-xs, boutons trop petits
```

---

*Document mis à jour le 26 Janvier 2026 - Version 5.0*
*Objectif : Leader français Pet Care 🇫🇷 🐕*
