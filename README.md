# Multi-Sites (Vite + React + GitHub Pages)

Ce projet contient **plusieurs sections indépendantes** (`/louis/`, `/diane/`) dans un **seul site React**, construit avec **Vite** et hébergé sur **GitHub Pages**.

---

## 🚀 Démo en ligne

- Page d’accueil : [https://looki-fr.github.io/multi-sites/](https://looki-fr.github.io/multi-sites/)
- Section Louis : [https://looki-fr.github.io/multi-sites/louis/](https://looki-fr.github.io/multi-sites/louis/)

---

---

## ⚙️ Technologies utilisées

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
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

### Tester le déploiement en local
```bash
npx vite preview --host --port 4173 --strictPort --base /multi-sites/

```


## 💡 Auteur

Made by [Looki-fr](https://github.com/Looki-fr)
