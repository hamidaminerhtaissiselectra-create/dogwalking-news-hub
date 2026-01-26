# Dashboard Propriétaire - Spécifications Complètes

## Principes UX/UI

- **Accessibilité seniors** : textes lisibles (min 16px), contrastes élevés, boutons larges, navigation simple
- **Couleurs** : Tokens sémantiques uniquement (primary = vert sauge, accent = bleu océan)
- **Animations** : Fluides avec framer-motion, non distrayantes
- **Responsive** : Mobile-first avec tabs en bas sur mobile
- **Fond** : Clair uniquement (blanc/crème), jamais noir

---

## Identification de l'Espace

- Badge visible "Espace Propriétaire" avec icône chien
- Présent sur le dashboard, dans le menu, sur les pages clés
- Aucun switch de rôle possible dans l'interface

---

## Onglets du Dashboard (7 onglets)

### 1. Accueil (Aperçu)
**Status : ✅ Fonctionnel**

| Élément | Description |
|---------|-------------|
| Statistiques | Réservations, chiens, dépenses, favoris |
| Actions rapides | Ajouter chien, trouver promeneur, réserver |
| Prochaines réservations | Liste avec détails (chien, date, promeneur) |
| Notifications | Alertes importantes |
| Complétion profil | Barre de progression avec incitation |

### 2. Réservations (Missions)
**Status : ✅ Fonctionnel**

| Sous-onglet | Fonctionnalité |
|-------------|----------------|
| À venir | Réservations confirmées/en attente |
| Passées | Historique complet |
| Annulées | Réservations annulées |

**Actions disponibles :**
- Voir détails
- Envoyer message au promeneur
- Annuler (jusqu'à 3h avant)
- Laisser un avis (après mission)
- Export calendrier (.ics, Google Calendar)

### 3. Mes Chiens
**Status : ✅ Fonctionnel**

| Fonctionnalité | Description |
|----------------|-------------|
| Liste des chiens | Photo, nom, race, âge, poids |
| Ajout | Formulaire complet |
| Modification | Édition de tous les champs |
| Photo | Upload vers Supabase Storage |
| Santé | Vaccinations, traitements |
| Tempérament | Comportement, besoins spéciaux |

### 4. Messages
**Status : ✅ Fonctionnel**

| Fonctionnalité | Description |
|----------------|-------------|
| Conversations | Liste avec promeneurs |
| Temps réel | Via Supabase Realtime |
| Recherche | Dans les conversations |
| Indicateur | Messages non lus |
| Anonymat | Numéros masqués |

### 5. Factures & Paiements
**Status : ✅ Fonctionnel**

| Fonctionnalité | Description |
|----------------|-------------|
| Historique | Toutes les transactions |
| Téléchargement | Factures PDF |
| Détails | Date, service, montant, promeneur |

### 6. Parrainage
**Status : ✅ Fonctionnel**

| Fonctionnalité | Description |
|----------------|-------------|
| Code unique | Généré automatiquement |
| Partage | Copier, partage natif |
| Historique | Parrainages effectués |
| Statistiques | Invitations, complétés, gains |
| Récompenses | 15€ parrain, 10€ filleul |

### 7. Profil
**Status : ✅ Fonctionnel**

| Section | Contenu |
|---------|---------|
| Photo | Upload avatar |
| Informations | Nom, prénom, téléphone, ville |
| Bio | Présentation personnelle |
| Documents | CNI obligatoire |
| Paramètres | Notifications, confidentialité, thème |
| Déconnexion | Bouton clair |

---

## Suivi de Mission (Sans GPS)

- ❌ Pas de carte GPS en temps réel
- ✅ Réception des photos/vidéos obligatoires de prise en charge
- ✅ Notification début et fin de mission
- ✅ Photos en fin de mission
- ✅ Rapport automatique généré

---

## Composants Utilisés

| Composant | Source |
|-----------|--------|
| Card, Button, Badge, Avatar | shadcn/ui |
| Tabs | Navigation onglets |
| Sheet | Formulaires latéraux |
| Motion | Animations (framer-motion) |
| Toast | Notifications |
| Progress | Complétion profil |

---

## Style et Design

```css
/* Couleurs principales (tokens) */
--primary: hsl(142, 76%, 36%);      /* Vert sauge */
--accent: hsl(200, 98%, 39%);        /* Bleu océan */
--background: hsl(0, 0%, 100%);      /* Blanc */
--muted: hsl(220, 14%, 96%);         /* Gris clair */

/* Gradients */
--gradient-primary: linear-gradient(135deg, primary/10, accent/5);

/* Ombres */
--shadow-card: 0 8px 30px -6px hsl(primary / 0.15);
```

---

## Navigation Mobile

- Tab bar fixe en bas de l'écran
- 4 onglets visibles : Accueil, Missions, Calendrier, Profil
- Autres onglets accessibles via menu ou recherche
- Icônes claires et labels courts

---

## Fichier Principal

`src/pages/dashboard/OwnerDashboard.tsx`

### Composants Onglets
- `src/components/dashboard/owner/OverviewTab.tsx`
- `src/components/dashboard/owner/BookingsTab.tsx`
- `src/components/dashboard/owner/DogsTab.tsx`
- `src/components/dashboard/owner/MessagesTab.tsx`
- `src/components/dashboard/owner/InvoicesSection.tsx`
- `src/components/dashboard/owner/ReferralTab.tsx`
- `src/components/dashboard/owner/ProfileTab.tsx`
- `src/components/dashboard/owner/WalkersTab.tsx`

---

*Mise à jour : Janvier 2026*
