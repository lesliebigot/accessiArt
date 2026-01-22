# Plan de tests

## Tests de l'accéssibilité

### 🎯 Avec Jest

- Tests de structure HTML sémantique ;
- Vérification des attributs ARIA ;
- Validation des images et navigation.

### Installation 
```
npm install --save-dev jest jsdom 
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

