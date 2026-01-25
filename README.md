# 🎨 Accessi'Art : Peinture en Mots

> Application web permettant de découvrir les œuvres des grands maîtres de la peinture impressionniste de manière accessible aux personnes malvoyantes.
* Visitez le site en production [ici](https://accessiart.douay-bigot.info).

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-blue.svg)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Accessibilité](https://img.shields.io/badge/Accessibilité-Testée-success.svg)](https://accessiart.douay-bigot.info)


## 🎯 À propos du projet

**Accessi'Art** est une application web éducative développée dans un cadre personnel après une formation en développement web (CDA école O'clock). Elle vise à rendre l'art impressionniste accessible à tous, notamment aux personnes malvoyantes, grâce à des descriptions détaillées et une interface optimisée et épurée pour les lecteurs d'écran.

### Objectifs

- 🖼️ Présenter des œuvres de grands maîtres de la peinture impressionniste
- ♿ Garantir une accessibilité maximale (WCAG niveau AA)
- 📚 Enrichir les connaissances en histoire de l'art
- 🌐 Utiliser uniquement des œuvres du domaine public

## ✨ Fonctionnalités

- 🎨 **Galerie de tableaux** : Parcourez une collection d'œuvres impressionnistes
- 🔍 **Filtrage par courant pictural** : Explorez les différents mouvements artistiques
- 📝 **Descriptions détaillées** : Chaque œuvre est accompagnée de descriptions courtes et longues
- ♿ **Optimisation pour lecteurs d'écran** : Navigation facilitée avec ARIA et sémantique HTML
- 📱 **Design responsive** : Interface adaptée à tous les appareils
- 🎨 **Contrastes élevés** : Respect des normes WCAG pour l'accessibilité visuelle

## 🛠️ Technologies utilisées

### Backend
- **Node.js** (v20+) avec **Express.js** (v5)
- **PostgreSQL** (v16) pour la base de données
- **EJS** comme moteur de templates

### Frontend
- **Tailwind CSS** pour le style
- **DaisyUI** pour les composants accessibles
- **JavaScript vanilla** pour les interactions côté client

### Développement
- **Docker & Docker Compose** pour la conteneurisation
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage
- **dotenv** pour la gestion des variables d'environnement

## 🏗️ Architecture

Le projet suit l'architecture **MVC (Modèle-Vue-Contrôleur)** :

```
├── src/
│   ├── database/          # Scripts SQL d'initialisation
│   ├── models/            # Modèles de données
│   ├── controllers/       # Logique métier
│   └── routes/            # Routes Express
├── views/                 # Templates EJS
│   ├── partials/          # Composants réutilisables
│   └── pages/             # Pages complètes
├── public/                # Assets statiques
│   ├── css/
│   ├── js/
│   └── images/
└── index.js               # Point d'entrée de l'application
```

## ♿ Accessibilité

Ce projet accorde une importance particulière à l'accessibilité pour les personnes malvoyantes et aveugles.

### Standards respectés

- ✅ **WCAG 2.1 niveau AA** : Contrastes, navigation au clavier, structure sémantique
- ✅ **ARIA** : Utilisation appropriée des attributs ARIA pour enrichir l'expérience
- ✅ **Sémantique HTML5** : Balises appropriées (`<nav>`, `<main>`, `<article>`, etc.)

### Bonnes pratiques implémentées

#### Sémantique HTML
- Balises sémantiques correctes (`<button>`, `<label>`, `<header>`, `<nav>`, `<main>`, `<article>`)
- Hiérarchie des titres respectée (`<h1>` → `<h2>` → `<h3>`)
- Une seule balise `<h1>` et `<main>` par page
- Listes de descriptions `<dl>` pour les paires clé-valeur
- Balise `<time>` pour les dates

#### ARIA et attributs d'accessibilité
- `aria-label` pour les boutons/liens sans texte visible
- `aria-labelledby` pour lier les labels aux éléments
- `role="status"` pour les informations importantes
- `aria-live="polite"` pour les mises à jour dynamiques
- Attributs `alt` descriptifs pour toutes les images

#### Contrastes et visibilité
- Ratio de contraste minimum de **4,5:1** pour le texte normal
- Ratio de contraste minimum de **3:1** pour le texte large
- Thèmes DaisyUI avec contrastes appropriés

#### Navigation
- Navigation au clavier complète
- Focus visible sur tous les éléments interactifs
- Skip links pour naviguer rapidement
- Lazy loading des images pour optimiser le chargement

## 💻 Installation

### Pour visualiser le projet

<details>
<summary><b>Option 1 : Installation locale (sans Docker)</b></summary>

#### Prérequis
- Node.js 20.x ou supérieur
- PostgreSQL 16.x installé et en cours d'exécution
- npm ou yarn

#### Étapes

**1. Cloner le projet**
```bash
git clone git@github.com:lesliebigot/accessiArt.git
cd accessiArt
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer l'environnement**
```bash
cp .env.example .env
```

Modifier le fichier `.env` avec vos paramètres :
```env
PG_URL=postgres://user:password@localhost:5432/db
```

**4. Initialiser la base de données**

Créer d'abord la base de données PostgreSQL, puis exécuter les scripts d'initialisation :
```bash
node src/database/01.create-tables.js
node src/database/02.seed-tables.js
```

**5. Lancer le serveur**
```bash
npm run dev
```

L'application sera accessible à l'adresse **http://localhost:3000**

</details>

<details>
<summary><b>Option 2 : Installation avec Docker (recommandé)</b></summary>

#### Prérequis
- [Docker](https://www.docker.com/get-started) installé
- [Docker Compose](https://docs.docker.com/compose/install/) installé

#### Étapes

**1. Cloner le projet**
```bash
git clone git@github.com:lesliebigot/accessiArt.git
cd accessiArt
```

**2. Lancer l'application**
```bash
docker compose up
```

**En cas d'erreur de permissions** :
```bash
docker compose down
chmod a+rx ./src/database
docker compose up
```

**3. Accéder à l'application**

L'application sera accessible à l'adresse **http://localhost:3000**

#### Commandes Docker utiles

```bash
# Arrêter l'application
docker compose down

# Tout supprimer (y compris les données)
docker compose down -v

# Reconstruire après modification
docker compose up --build

# Voir les logs en temps réel
docker compose logs -f
```

</details>

## 🚀 Utilisation

### Parcourir les tableaux
1. Accédez à la page d'accueil
2. Naviguez vers "Collection de tableaux"
3. Filtrez par courant pictural si souhaité
4. Cliquez sur un tableau pour voir ses détails

### Explorer les courants picturaux
1. Accédez à "Les courants picturaux"
2. Cliquez sur un mouvement pour en savoir plus
3. Accédez aux tableaux de ce courant

### Navigation au clavier
- `Tab` : Naviguer entre les éléments
- `Entrée` / `Espace` : Activer un élément
- `Échap` : Fermer les modales/accordéons

##  🧪 Plan de tests

Les tests arrivent bientôt dans la branche "tests" ... ;-)

##  🚀 Déploiement en production

<details>
<summary><b>Déploiement avec Portainer</b></summary>

### 1. Créer une nouvelle Stack

Dans Portainer, allez dans **Stacks** → **+ Add stack** et choisissez **Git Repository** :

```
Repository URL: https://github.com/lesliebigot/accessiArt
Reference: refs/heads/prod (ou branche prod-v2 pour la version production)
Compose path: compose.prod.yml
```

### 2. Configurer les variables d'environnement

Dans l'onglet **Environment variables** (mode avancé), ajoutez :

```env
POSTGRES_USER=accessiart
POSTGRES_PASSWORD=motDePasseComplexe
POSTGRES_DB=accessiart_db
PG_URL=postgres://accessiart:motDePasseComplexe@db:5432/accessiart_db
NODE_ENV=production
PORT=3000
```

### 3. Déployer la stack

Cliquez sur **Deploy the stack**. L'application sera accessible sur le port 3000.

### 4. Configurer le reverse proxy

Configurez votre reverse proxy (Nginx, Traefik, ou le reverse proxy intégré du NAS) pour rediriger le trafic HTTPS vers `localhost:3000`.

**Note** : Si vous avez modifié le schéma de la base de données, vous devez supprimer la stack et ses volumes associés avant de la recréer, sinon les anciennes données seront conservées.

</details>

## 🚧 Développements et fonctionnalités futures

- Le visiteur pourra proposer des tableaux libres de droit et leurs descriptions pour les malvoyants dans un formulaire restrictif et sécurisé ;
- Pagination de la liste de tous les tableaux ;
- Ajout d'une table pour fournir une biographie concise sur chaque peintre.

## 🤝 Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez enrichir la collection avec de nouvelles descriptions pour les malvoyants, je serai enchantée de recevoir vos idées. Je suis également preneuse de vos corrections des descriptions actuelles si besoin.
<details>
<summary>Comment contribuer ?</summary>

1. **Forkez** le projet
2. Créez une **branche** pour votre fonctionnalité  
   ```bash
   git checkout -b feature/nouvelle-description
   ```
3. **Commitez** vos changements  
   ```bash
   git commit -m 'Ajout de descriptions pour Renoir'
   ```
4. **Poussez** vers la branche  
   ```bash
   git push origin feature/nouvelle-description
   ```
5. Ouvrez une **Pull Request**
</details>

## 💬 Témoignages d'utilisateurs

<table>
<tr>
<td width="50%" valign="top">

### 👤 Philippe Pelletier - Association H2VL
**Utilisateur aveugle**

> "Je trouve ton projet très pertinent. Au niveau de l'accessibilité, tout était très bien."

**Ce qu'il apprécie :**
- ✅ Navigation fluide
- ✅ Descriptions sensibles et détaillées
- ✅ Structure claire (Composition, Technique, Interprétation)

*Testé avec lecteur d'écran - Jan. 2026*

</td>
<td width="50%" valign="top">

### 👤 Saifeddin Ayedi - Association H2VL
**Utilisateur aveugle**

> "Le site respecte les normes d'accessibilité au plus haut niveau. **Aucune anomalie détectée.**"

**Tests réalisés :**
- ✅ VoiceOver (iOS)
- ✅ NVDA (Windows)
- ✅ JAWS (Windows)

*Testé avec lecteur d'écran - Jan. 2026*

</td>
</tr>
</table>

## 📝 Sources des données

- **Images** : [Wikimedia Commons](https://commons.wikimedia.org/) - Œuvres du domaine public ;
- **Descriptions** : Recherches historiques et documentation muséale.

## 📜 Licence

Ce projet est un projet personnel à vocation éducative et non commerciale.

Les œuvres présentées sont dans le **domaine public** (artistes décédés depuis plus de 70 ans).

## 📞 Contact

**Leslie BIGOT** - Développeuse Full Stack JavaScript  
📧 [leslieBIGOT@hotmail.com](mailto:leslieBIGOT@hotmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/lesliebigot)  

## 💡 Prochain projet
Pourquoi pas un site qui décrit la musique aux personnes atteintes de surdité ?

---

⭐ **Si ce projet vous plaît, n'hésitez pas à proposer de nouvelles descriptions de tableaux !**

---

<div align="center">
  <sub>Développé avec ❤️ pour rendre l'art accessible à tous</sub>
</div>
