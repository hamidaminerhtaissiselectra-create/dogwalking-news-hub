# Dashboard Promeneur - Spécifications Complètes

## Principes UX/UI

- **Accessibilité seniors** : textes lisibles (min 16px), contrastes élevés, boutons larges, navigation simple
- **Couleurs** : Tokens sémantiques uniquement (primary = vert sauge, accent = bleu océan)
- **Animations** : Fluides avec framer-motion, non distrayantes
- **Responsive** : Mobile-first avec tabs en bas sur mobile
- **Fond** : Clair uniquement (blanc/crème), jamais noir

---

## Identification de l'Espace

- Badge visible "Espace Promeneur" avec icône utilisateur
- Présent sur le dashboard, dans le menu, sur les pages clés
- Aucun switch de rôle possible dans l'interface

---

## Onglets du Dashboard (7 onglets)

### 1. Tableau de Bord (Aperçu)
**Status : ✅ Fonctionnel**

| Élément | Description |
|---------|-------------|
| Statistiques animées | Gains du mois, promenades, note, taux acceptation |
| Alerte actions | Demandes en attente (accepter/refuser) |
| Nouvelles demandes | Boutons Accepter / Refuser |
| Timeline | Activité récente |
| Prochaines missions | Confirmées avec détails |
| Badges | Progression vers distinctions |

### 2. Missions (Réservations)
**Status : ✅ Fonctionnel**

| Sous-onglet | Fonctionnalité |
|-------------|----------------|
| En attente | Demandes à accepter/refuser |
| Confirmées | Missions acceptées |
| En cours | Mission active |
| Terminées | Historique complet |

**Actions par statut :**
- En attente : Accepter / Refuser
- Confirmées : Message, Incident, Annuler
- En cours : **Prise en charge (photo obligatoire)**, Fin mission

### 3. Revenus (Gains)
**Status : ✅ Fonctionnel**

| Section | Description |
|---------|-------------|
| Solde disponible | Prêt à retirer |
| En attente | Libéré après 48h |
| Total gagné | Depuis le début |
| Graphique | Évolution mensuelle |
| Historique | Transactions détaillées |
| Commission | 13% affichée clairement |
| Retrait | Bouton demande (2-3 jours ouvrés) |

### 4. Disponibilités (Calendrier)
**Status : ✅ Fonctionnel**

| Fonctionnalité | Description |
|----------------|-------------|
| Calendrier | Vue hebdomadaire |
| Jours | Toggle disponible/indisponible |
| Plages horaires | Début/fin configurable |
| Sauvegarde | Automatique |

### 5. Messages
**Status : ✅ Fonctionnel**

| Fonctionnalité | Description |
|----------------|-------------|
| Conversations | Avec propriétaires |
| Temps réel | Via Supabase Realtime |
| Anonymat | Numéros masqués |
| Bouton urgence | Signalement rapide |

### 6. Performance
**Status : ✅ Fonctionnel**

| Métrique | Description |
|----------|-------------|
| Note moyenne | Détaillée par critère |
| Taux complétion | Missions terminées |
| Temps de réponse | Moyenne |
| Badges | Gagnés et à débloquer |
| Avis clients | Récents avec commentaires |

### 7. Profil
**Status : ✅ Fonctionnel**

| Sous-section | Contenu |
|--------------|---------|
| **Profil public** | Photo, bio, expérience |
| **Tarifs** | Configuration services, prix |
| **Documents** | CNI, casier B2, assurance RC |
| **Paramètres** | Notifications, confidentialité |

---

## Documents Obligatoires

| Document | Obligatoire | Bucket |
|----------|-------------|--------|
| Carte d'identité | ✅ | walker-documents |
| Casier judiciaire B2 | ✅ | walker-documents |
| Assurance RC Pro | ✅ | walker-documents |

**Processus :**
1. Upload via composant DocumentUpload
2. Stockage Supabase Storage (bucket privé)
3. Validation manuelle par admin
4. Activation du profil public

---

## Système de Preuves Photo

### Prise en Charge
1. Bouton "Prise en charge" dans les missions confirmées
2. Photo obligatoire de l'animal au départ
3. Notification envoyée au propriétaire
4. Statut booking → "in_progress"

### Fin de Mission
1. Photo obligatoire pour valider
2. Envoi au propriétaire
3. **Si pas de preuve → paiement bloqué**
4. Statut booking → "completed"

---

## Finances

| Élément | Valeur |
|---------|--------|
| Commission plateforme | 13% |
| Libération paiement | 48h après mission |
| Délai retrait | 2-3 jours ouvrés |

**Calcul :**
```
Gain net = Prix mission × 0.87
```

---

## Communication

- Messagerie intégrée anonyme (pas de numéro visible)
- Bouton SOS pour urgences
- Signalement incidents (retard, absence, problème)

---

## Composants Utilisés

| Composant | Fichier |
|-----------|---------|
| AnimatedStatsCard | Statistiques avec animations |
| ActivityTimeline | Historique activité |
| EarningsChart | Graphique gains (recharts) |
| SOSButton | Bouton urgence |
| DocumentUpload | Upload documents |
| PricingSettings | Configuration tarifs |
| MissionTakeover | Prise en charge avec photo |

---

## Style et Design

```css
/* Couleurs principales (tokens) */
--primary: hsl(142, 76%, 36%);      /* Vert sauge */
--accent: hsl(200, 98%, 39%);        /* Bleu océan */

/* Couleurs gains */
--success: Utiliser primary
--warning: Utiliser accent

/* INTERDIT */
❌ text-red-500, bg-rose-50, text-amber-600 (hardcoded)
✅ text-primary, bg-primary/10, text-accent
```

---

## Navigation Mobile

- Tab bar fixe en bas de l'écran
- 4 onglets visibles : Accueil, Missions, Revenus, Profil
- Autres onglets accessibles via menu ou recherche
- Icônes claires et labels courts

---

## Fichier Principal

`src/pages/dashboard/WalkerDashboard.tsx`

### Composants Onglets
- `src/components/dashboard/walker/OverviewTab.tsx`
- `src/components/dashboard/walker/BookingsTab.tsx`
- `src/components/dashboard/walker/EarningsTab.tsx`
- `src/components/dashboard/walker/AvailabilityTab.tsx`
- `src/components/dashboard/walker/MessagesTab.tsx`
- `src/components/dashboard/walker/PerformanceTab.tsx`
- `src/components/dashboard/walker/ProfileTab.tsx`

---

*Mise à jour : Janvier 2026*
