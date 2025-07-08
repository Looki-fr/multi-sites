import React from 'react'
import AnimatedWavesCss from './components/AnimatedWavesCss'
import AnimatedWaves from './components/AnimatedWaves'

export default function Home() {
  return (
    <>
      <AnimatedWaves />
      <noscript>
        <AnimatedWavesCss />
      </noscript>

      <main className="fullscreen">
        <div className="container">
          <h1>Bienvenue sur le site&nbsp;!</h1>

          <p>Plusieurs sites sont disponibles sur ce domaine:</p>

          <ul>
            <li>
              <a href="/multi-sites/louis">
                💻 <strong>Portfolio de Louis Le Meilleur</strong>
              </a>
              <p className="desc">Créateur de ce site web, passionné d’informatique polyvalent.</p>
            </li>

            <li>
              <a href="/multi-sites/diane">
                🎨 <strong>Portfolio de Diane Le Meilleur</strong>
              </a>
              <p className="desc">Lores ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </li>
          </ul>

          <noscript>
            <p className="noscript">
              JavaScript est désactivé dans votre navigateur.
            </p>
            <p className="noscript">
              Le site reste accessible, mais certaines fonctionnalités avancées ne seront pas disponibles.<br />
              Pour une expérience optimale, activez JavaScript dans les paramètres de votre navigateur.
            </p>
          </noscript>
        </div>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          font-family: system-ui, sans-serif;
        }

        .fullscreen {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .container {
          background: rgba(255, 255, 255, 0.8);
          min-width: 500px;
          max-width: 700px;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        h1 {
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }

        p {
          margin-bottom: 1.5rem;
          color: #444;
        }

        ul {
          list-style: none;
        }

        li {
          margin: 1.5rem 0;
        }

        a {
          text-decoration: none;
          color: #0070f3;
          font-weight: 600;
          font-size: 1.2rem;
          transition: color 0.2s ease;
        }

        a:hover {
          color: #0051a3;
        }

        .desc {
          font-size: 0.9rem;
          color: #666;
          margin-top: 0.3rem;
        }

        .noscript {
          margin-top: 1rem;
          color: #b00020;
          font-size: 0.9rem;
        }

        @media (max-width: 700px) {
          .container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  )
}
