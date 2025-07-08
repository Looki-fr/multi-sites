# CONTEXT.md

## 🛠️ Projet

Ce projet est un site web développé en **React** à l’aide de **Vite**.  
L’objectif est de créer un site :

- moderne, esthétique, dynamique (React)
- **lisible sans JavaScript**, même sur d’anciens navigateurs (Internet Explorer, Windows XP, etc.)
- **entièrement exporté en HTML/CSS/JS statique** avec **Vite**
- **hébergé gratuitement** sur **GitHub Pages**, sans serveur Node.js en production

---

## ✅ Contraintes techniques

- Aucun framework serveur (pas de SSR, pas d’API dynamique)
- Tout le contenu doit être **généré à la build**, sans besoin de serveur à l'exécution
- Ne pas dépendre de `window`, `document`, `localStorage` au moment du build
- Pas de `useEffect` pour afficher du contenu initial obligatoire
- Utiliser uniquement des routes compatibles avec un export statique
- Toujours prévoir une **version lisible sans JS** : contenu HTML rendu directement
- Utiliser `<noscript>` pour informer les utilisateurs sans JS
- Éviter les librairies client-side incompatibles avec le rendu statique

---

## 🧠 Cadre de collaboration intellectuelle

> À chaque nouvelle idée, raisonnement ou choix technique, appliquer systématiquement la démarche suivante :

### 🎯 Exigences de rigueur

- Ne pas se contenter d’être d’accord par défaut
- Remettre en question les **suppositions implicites**
- Adopter un **point de vue sceptique**
- Identifier les **biais cognitifs**, raccourcis logiques ou erreurs de raisonnement
- Proposer des **angles alternatifs**
- Privilégier l’**exactitude**, pas la validation
- Corriger clairement et frontalement tout raisonnement bancal

### 🎓 Objectif

L’objectif n’est **ni la rapidité ni la validation facile**, mais l’**affinement rigoureux de la pensée**, du code et des décisions.

---
