# Plan de tests

## Tests de l'accéssibilité

### 🎯 Bibliothèque axe-core avec Jest

- Spécialisé accessibilité : Détecte automatiquement les problèmes ARIA, sémantique, labels, etc.
- Rapports détaillés : Explique exactement ce qui ne va pas.
- Pas besoin de navigateur : Teste le code HTML pur.

### Installation 
```
npm install --save-dev jest @axe-core/cli jest-axe jsdom @testing-library/jest-dom
npm install --save-dev jest-environment-jsdom
```
### Utilisation

```
# Lancer tous les tests
npm test

# Lancer uniquement les tests d'accessibilité
npm run test:a11y

# Mode watch (relance automatiquement)
npm run test:watch
```
### 📊 Ce que ces tests vérifient (sans lecteur d'écran)

✅ **Structure sémantique**
- Un seul `<h1>` et `<main>` par page
- Hiérarchie correcte des titres (h1 → h2 → h3)
- Utilisation de `<dl>`, `<dt>`, `<dd>` pour les métadonnées

✅ **Attributs ARIA**
- `aria-label` présents et descriptifs
- `role="status"` et `aria-live="polite"`
- `aria-expanded`, `aria-controls`
- `aria-current="page"`

✅ **Labels et descriptions**
- Images avec `alt` descriptifs
- Formulaires avec labels associés
- Boutons avec texte ou `aria-label`

✅ **Navigation au clavier**
- Éléments interactifs focusables
- `tabindex` appropriés

✅ **Éléments cachés**
- Classes `.sr-only` correctes
- Contenu pertinent pour lecteurs d'écran

✅ **Violations automatiques**
- axe-core détecte 50+ règles d'accessibilité
