# Multi-Sites (Vite + React + GitHub Pages)

Ce projet contient **plusieurs sections indépendantes** (`/louis/`, `/test/`, `/diane/`) dans un **seul site React**, construit avec **Vite** et hébergé sur **GitHub Pages**.

---

## 🚀 Démo en ligne

- Page d’accueil : [https://looki-fr.github.io/multi-sites/](https://looki-fr.github.io/multi-sites/)
- Section Louis : [https://looki-fr.github.io/multi-sites/louis/](https://looki-fr.github.io/multi-sites/louis/)
- Section Test : [https://looki-fr.github.io/multi-sites/test/](https://looki-fr.github.io/multi-sites/test/)

---

## 🧱 Structure du projet

```
/src
  ├── pages/
  │   ├── Home.tsx         // Page d'accueil
  │   ├── louis.tsx        // Sous-site Louis
  │   └── test.tsx         // Sous-site Test
  └── main.tsx             // Point d'entrée principal
```

---

## ⚙️ Technologies utilisées

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) *(optionnel)*
- [GitHub Pages](https://pages.github.com/) pour l’hébergement statique
- [gh-pages](https://www.npmjs.com/package/gh-pages) pour le déploiement automatique

---

## 🛠️ Commandes utiles

### Installation

```bash
npm install
```

### Lancement local

```bash
npm run dev
```

### Build

```bash
npm run build
```

→ Le contenu statique sera généré dans le dossier `/dist`.

### Déploiement sur GitHub Pages

```bash
npx gh-pages -d dist
```

---

## 🧠 Notes importantes

- Le site peut être configuré avec un `base` dans `vite.config.ts` :
  ```ts
  export default defineConfig({
    base: '/multi-sites/',
    ...
  })
  ```

- Les routes doivent être adaptées au déploiement GitHub Pages (préfixe `/multi-sites/`)
- Chaque section peut évoluer indépendamment comme un mini-site (parfait pour un portfolio multi-projets).

---

## 💡 Auteur

Made by [Looki-fr](https://github.com/Looki-fr)
