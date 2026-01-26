# Checklist de Validation SEO - Open-Go 2026

**Document de validation technique pour s'assurer que toutes les directives SEO 2026 sont correctement implémentées.**

---

## ✅ Phase 1 : Validation du Balisage Structuré

### Balisage Organization (@id)

- [ ] **Vérifier `SEOHead.tsx`** : La balise `@id: https://dogwalking.fr/#organization` est présente
- [ ] **Vérifier les ratings** : `aggregateRating` avec `ratingValue: 4.9` et `reviewCount: 2847`
- [ ] **Vérifier les mentions E-E-A-T** : Description contient "Escrow", "Assurance", "Vérifiés"
- [ ] **Tester avec Schema.org Validator** : https://validator.schema.org/
  - Copier le JSON-LD de la page d'accueil
  - Vérifier qu'il n'y a pas d'erreurs

### Balisage LocalBusiness (parentOrganization)

- [ ] **Vérifier `localSeoData.ts`** : Fonction `generateLocalBusinessSchema` contient `parentOrganization`
- [ ] **Vérifier l'URL** : Les URLs pointent vers `https://dogwalking.fr/zone/{slug}` (pas `dogwalking-connect.fr`)
- [ ] **Vérifier les `@id`** : Chaque LocalBusiness a un `@id` unique
- [ ] **Tester une page locale** : Ouvrir `/zone/paris` et vérifier le balisage dans DevTools (F12 > Elements)

### Balisage Service

- [ ] **Vérifier `ServicePromenade.tsx`** : Le schéma `Service` contient `provider` pointant vers Organization
- [ ] **Vérifier les offres** : Les prix sont listés dans `hasOfferCatalog`
- [ ] **Vérifier les 6 pages de services** : Toutes les pages ont le balisage Service
  - [ ] ServicePromenade.tsx
  - [ ] ServiceGarde.tsx
  - [ ] ServiceVisite.tsx
  - [ ] ServiceDogSitting.tsx
  - [ ] ServicePetSitting.tsx
  - [ ] ServiceMarcheReguliere.tsx

### Balisage FAQPage

- [ ] **Vérifier `seo-accordion.tsx`** : Le composant génère automatiquement le balisage FAQPage
- [ ] **Vérifier les pages avec FAQ** : 
  - [ ] Index.tsx (HomeFAQSection)
  - [ ] ServicePromenade.tsx
  - [ ] QuiSommesNous.tsx
- [ ] **Tester avec Google Rich Results Test** : https://search.google.com/test/rich-results
  - Copier l'URL de la page
  - Vérifier que les FAQ sont détectées

---

## ✅ Phase 2 : Validation E-E-A-T

### Composants Trust Badges

- [ ] **Vérifier `trust-badges.tsx`** : Composant affiche 4 badges
  - [ ] Paiement Escrow Sécurisé
  - [ ] Promeneurs Vérifiés
  - [ ] Preuves Photo/Vidéo
  - [ ] Assurance Incluse
- [ ] **Vérifier l'intégration** :
  - [ ] Index.tsx contient `<TrustBadges />`
  - [ ] Toutes les 6 pages de services contiennent `<TrustBadges />`

### Composants Expert Bio

- [ ] **Vérifier `expert-bio.tsx`** : Composant génère le balisage `Person` Schema
- [ ] **Vérifier `expertsData.ts`** : 4 experts sont définis
  - [ ] Marie Dupont (Comportementaliste)
  - [ ] Dr. Jean Martin (Vétérinaire)
  - [ ] Sophie Bernard (Qualité)
  - [ ] Thomas Leclerc (Expert Promenade)
- [ ] **Vérifier l'intégration** :
  - [ ] Index.tsx contient une section Expert
  - [ ] QuiSommesNous.tsx affiche les 4 experts en grille 2x2
  - [ ] Chaque expert a une biographie, certifications, et années d'expérience

### Mentions E-E-A-T dans le Contenu

- [ ] **Vérifier les descriptions de schémas** : Toutes les descriptions mentionnent
  - [ ] "Paiement escrow sécurisé"
  - [ ] "Preuves photo obligatoires"
  - [ ] "Assurance incluse"
  - [ ] "Promeneurs vérifiés"
- [ ] **Vérifier les pages de services** : Chaque page contient une section "Preuves de Confiance"

---

## ✅ Phase 3 : Validation de l'Architecture Géographique

### Hiérarchie Départementale

- [ ] **Vérifier `DepartmentZone.tsx`** : Page créée et fonctionnelle
- [ ] **Vérifier la route** : `/zone/departement-75` est accessible
- [ ] **Vérifier le contenu** :
  - [ ] Titre H1 : "Promenade de Chien dans le Département {code}"
  - [ ] Villes principales affichées
  - [ ] Accordéon avec toutes les villes
  - [ ] Services listés
- [ ] **Vérifier le balisage** : LocalBusiness Schema pour le département

### Maillage Interne

- [ ] **Vérifier le breadcrumb** : LocalZone.tsx contient le lien vers la page département
- [ ] **Vérifier les liens** :
  - [ ] Index.tsx → Pages de services
  - [ ] Pages de services → LocalZone (villes)
  - [ ] LocalZone → DepartmentZone (département)
  - [ ] DepartmentZone → LocalZone (villes du département)

### Cohérence H1/Meta Title/URL

- [ ] **Vérifier Index.tsx** :
  - [ ] Meta Title : "DogWalking | Promeneurs de Chiens Vérifiés en France | Paiement Sécurisé"
  - [ ] H1 : Correspond au titre principal
  - [ ] URL : https://dogwalking.fr
- [ ] **Vérifier ServicePromenade.tsx** :
  - [ ] Meta Title : "Promenade de Chien | Promeneurs Professionnels Vérifiés | DogWalking"
  - [ ] H1 : "Promenade de Chien Professionnelle"
  - [ ] URL : https://dogwalking.fr/services/promenade
- [ ] **Vérifier LocalZone.tsx** :
  - [ ] Meta Title : "Promenade & Garde de Chien à {Ville} | DogWalking"
  - [ ] H1 : "Promenade & Garde de Chien à {Ville}"
  - [ ] URL : https://dogwalking.fr/zone/{slug}

---

## ✅ Phase 4 : Validation Technique

### Sémantique HTML5

- [ ] **Vérifier les balises principales** :
  - [ ] Chaque page a un `<main>` unique
  - [ ] Les sections utilisent `<section>`
  - [ ] Les articles utilisent `<article>`
  - [ ] Les en-têtes utilisent `<h1>`, `<h2>`, `<h3>` en hiérarchie correcte
- [ ] **Vérifier les balises sémantiques** :
  - [ ] `<nav>` pour la navigation
  - [ ] `<header>` pour l'en-tête
  - [ ] `<footer>` pour le pied de page
  - [ ] `<article>` pour le contenu principal

### Accordéons et Contenu Masqué

- [ ] **Vérifier la sémantique des accordéons** :
  - [ ] Utiliser `<details>` et `<summary>` si possible
  - [ ] Sinon, assurer le double balisage FAQPage JSON-LD
- [ ] **Vérifier l'indexabilité** :
  - [ ] Le contenu des accordéons est visible dans le DOM
  - [ ] Le balisage FAQPage est présent

### Performance et Accessibilité

- [ ] **Vérifier les images** :
  - [ ] Toutes les images ont un `alt` descriptif
  - [ ] Les images sont optimisées (format WebP si possible)
- [ ] **Vérifier les couleurs** :
  - [ ] Contraste suffisant entre le texte et le fond
  - [ ] Pas de dépendance à la couleur seule pour transmettre l'information
- [ ] **Vérifier les liens** :
  - [ ] Tous les liens ont un texte descriptif
  - [ ] Les liens externes ont `target="_blank"` et `rel="noopener noreferrer"`

---

## ✅ Phase 5 : Tests avec les Outils Google

### Google Search Console

- [ ] **Indexation** :
  - [ ] Soumettre le sitemap XML
  - [ ] Vérifier que les pages principales sont indexées
  - [ ] Vérifier que les pages locales sont indexées
- [ ] **Rich Results** :
  - [ ] Vérifier que les FAQ sont détectées
  - [ ] Vérifier que les schémas Organization et LocalBusiness sont valides
- [ ] **Couverture** :
  - [ ] Vérifier qu'il n'y a pas d'erreurs d'indexation

### Google Rich Results Test

- [ ] **Tester les pages principales** :
  - [ ] https://dogwalking.fr
  - [ ] https://dogwalking.fr/services/promenade
  - [ ] https://dogwalking.fr/zone/paris
  - [ ] https://dogwalking.fr/zone/departement-75
- [ ] **Vérifier les résultats** :
  - [ ] FAQPage détectée sur les pages avec FAQ
  - [ ] Organization détectée sur la page d'accueil
  - [ ] LocalBusiness détectée sur les pages locales

### Schema.org Validator

- [ ] **Valider chaque page** :
  - [ ] Copier le JSON-LD de chaque page
  - [ ] Vérifier qu'il n'y a pas d'erreurs
  - [ ] Vérifier que les propriétés obligatoires sont présentes

---

## ✅ Phase 6 : Vérification Finale

### Audit SEO Global

- [ ] **Vérifier les meta-tags** :
  - [ ] Toutes les pages ont un `<title>` unique et descriptif
  - [ ] Toutes les pages ont une `<meta name="description">` unique et descriptive
  - [ ] Toutes les pages ont un `<link rel="canonical">` correct
- [ ] **Vérifier les images OG** :
  - [ ] `og:image` défini pour chaque page
  - [ ] Images OG ont une taille appropriée (1200x630px)
- [ ] **Vérifier les liens internes** :
  - [ ] Pas de liens cassés
  - [ ] Maillage interne logique et cohérent

### Vérification Mobile

- [ ] **Responsive Design** :
  - [ ] Toutes les pages s'affichent correctement sur mobile
  - [ ] Les éléments interactifs sont facilement cliquables (au moins 48x48px)
- [ ] **Performance Mobile** :
  - [ ] Utiliser Google PageSpeed Insights
  - [ ] Score mobile > 80

### Vérification Desktop

- [ ] **Affichage** :
  - [ ] Toutes les pages s'affichent correctement sur desktop
  - [ ] Pas de problèmes de mise en page
- [ ] **Performance Desktop** :
  - [ ] Utiliser Google PageSpeed Insights
  - [ ] Score desktop > 90

---

## 📊 Résumé de la Validation

| Phase | Tâches | Statut |
| :--- | :--- | :--- |
| Phase 1 : Balisage Structuré | 12 | ⏳ À VÉRIFIER |
| Phase 2 : E-E-A-T | 11 | ⏳ À VÉRIFIER |
| Phase 3 : Architecture Géographique | 10 | ⏳ À VÉRIFIER |
| Phase 4 : Validation Technique | 9 | ⏳ À VÉRIFIER |
| Phase 5 : Tests Google | 9 | ⏳ À VÉRIFIER |
| Phase 6 : Vérification Finale | 9 | ⏳ À VÉRIFIER |
| **TOTAL** | **60** | **À VÉRIFIER** |

---

## 🎯 Instructions d'Utilisation

1. **Imprimer cette checklist** ou l'ouvrir dans un éditeur de texte
2. **Cocher chaque case** au fur et à mesure de la vérification
3. **Utiliser les liens fournis** pour tester avec les outils Google
4. **Documenter les problèmes** trouvés et les corriger
5. **Valider à nouveau** après chaque correction

---

*Checklist créée pour valider la conformité du site Open-Go avec les directives SEO 2026.*
