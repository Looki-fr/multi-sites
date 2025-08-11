import React from 'react'
import AnimatedWaves from './components/AnimatedWaves'

export default function Home() {
  return (
    <>
      <AnimatedWaves />

      <main className="fullscreen">
        <div className="container">
          <h1>Bienvenue !</h1>

          <p>Plusieurs sites sont disponibles sur ce domaine :</p>

          <ul>
            <li className="link-preview">
              <a href="/multi-sites/louis">
                🖥️ <strong>Portfolio de Louis Le Meilleur</strong>
              </a>
              <p className="desc">Créateur de ce site web, passionné d’informatique polyvalent.</p>
              <div className="preview">
                <img src="/multi-sites/assets/preview_louis.png" alt="Aperçu Louis" />
              </div>
            </li>

            <li className="link-preview">
              <a href="/multi-sites/diane">
                🖼️ <strong>Portfolio de Diane Le Meilleur</strong>
              </a>
              <p className="desc">Lores ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <div className="preview">
                <img src="/multi-sites/assets/preview_diane.png" alt="Aperçu Diane" />
              </div>
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
        font-family: 'Poppins', system-ui, sans-serif;
      }

      .link-preview {
        position: relative;
        display: inline-block;
      }

      .preview {
        position: absolute;
        top: 50%;
        left: 105%;
        transform: translateY(-50%);
        width: 260px;
        height: 160px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.3s ease;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0,0,0,0.25);
        z-index: 5;
      }

      @media (max-width: 600px) {
        .preview {
          display: none;
        }
      }

      .preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: blur(3px) brightness(0.85);
      }

      .link-preview:hover .preview {
        opacity: 1;
        transform: translateY(-50%) scale(1.02);
      }



      .fullscreen {
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 10;
        padding: 1rem;
      }

      .container {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        width: 100%;
        max-width: 700px;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        text-align: center;
        transition: transform 0.4s ease, box-shadow 0.3s ease;
        animation: fadeIn 1.2s ease;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .container:hover {
        transform: scale(1.015) translateY(-3px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
      }

      h1 {
        font-size: 2.2rem;
        margin-bottom: 1rem;
        color: black;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: -0.02em;
        text-align: center;
      }

      p {
        margin-bottom: 1.5rem;
        color: #333;
      }

      ul {
        list-style: none;
        padding: 0;
      }

      li {
        margin: 1.5rem 0;
      }

      a {
        text-decoration: none;
        color: #111;
        font-weight: 600;
        font-size: 1.2rem;
        border-bottom: 2px solid transparent;
        transition: all 0.2s ease;
      }

      a:hover {
        color: #000;
        border-bottom: 2px solid #000;
      }

      .desc {
        font-size: 0.85rem;
        color: #333;
        margin-top: 0.3rem;
        font-style: italic;
      }

      .noscript {
        margin-top: 1rem;
        color: #b00020;
        font-size: 0.9rem;
      }

      @media (max-width: 500px) {
        h1 {
          font-size: 1.8rem;
        }

        a {
          font-size: 1rem;
        }

        .desc {
          font-size: 0.8rem;
        }

        .container {
          padding: 1.5rem;
        }
      }
    `}</style>


    </>
  )
}
