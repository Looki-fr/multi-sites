@echo off
echo --- Build Vite ---
npm run build
IF %ERRORLEVEL% NEQ 0 (
  echo Build failed. Aborting.
  exit /b 1
)

echo --- Déploiement sur GitHub Pages ---
npx gh-pages -d dist

echo --- Fini. Site mis en ligne ---
pause
