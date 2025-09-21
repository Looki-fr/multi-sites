import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useFloatingMotion from "./Floating/useFloatingMotion"; // Hook réutilisable
import texts from '../../texts/louis/texts.json'

// ─────────────────────────────────────────────────────────
// Hook réutilisable : applique le mouvement flottant à l’élément passé
// ─────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────
// Composant HologramCarousel
// ─────────────────────────────────────────────────────────
interface HologramCarouselProps {
  images: string[];                         // URLs des images
  descriptions: string[];                   // Descriptions associées
  autoDelayMs?: number;
  isZoomedSkills: boolean;
  githubLinks?: string[];
  externalLinks?: string[];
  isMobile: boolean;                        // Pour ajuster le style si besoin
  language: "fr" | "en";
}


const HologramCarousel: React.FC<HologramCarouselProps> = ({
  images,
  descriptions = [],
  autoDelayMs = 12000,
  isZoomedSkills,
  githubLinks = [],
  externalLinks = [],
  isMobile,
  language,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  useFloatingMotion(anchorRef);                     // mouvement flottant

  const [idx, setIdx] = useState(0);

  // Passage manuel ↦ clic ou touche "Espace"
  const prevImg = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const nextImg = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  const handleClick = (e: React.MouseEvent) => {
    const bounds = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = e.clientX - bounds.left;
    const isLeft = clickX < bounds.width / 2;
    if (isLeft) {
      prevImg();
    } else {
      nextImg();
    }
  };

  // Passage auto
  useEffect(() => {
    const id = setInterval(nextImg, autoDelayMs);
    return () => clearInterval(id);
  }, [nextImg, autoDelayMs]);

  // Gestion barre espace (accessibilité clavier)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        nextImg();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextImg]);

  const width = isMobile ?  "80vw": "25vw"

  return (
    <motion.div
      animate={{ opacity: isZoomedSkills ? 0 : 1 }}
      transition={{ duration: 0.6, delay: isZoomedSkills ? 0 : 2 }}
      >
      <motion.div
        ref={anchorRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
          zIndex: 5,
          position: "absolute",
          top: isMobile ? "230vh" :"50vh",
          left: isMobile ? "10vw" : "5vw",
          pointerEvents: isZoomedSkills ? "none" : "auto",
        }}
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        {/* Titre */}
        <h2
          style={{
            margin: "0 0 0.8rem 0",
            color: "#ffffff",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.4rem",
            letterSpacing: "0.06rem",
            textShadow: "0 0 8px rgba(0, 0, 0, 0.6)",
            textTransform: "uppercase",
          }}
        >
          {texts["louis"]["hologramCarousel"]["title"][language]}
        </h2>

        {/* Conteneur hologramme */}
        <div
          style={{
            position: "relative",
            perspective: "900px",
          }}
        >
          {/* Glow + reflexion */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "20px",
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25), rgba(0,0,255,0.05) 70%)",
              filter: "blur(12px)",
              transform: "translateZ(-20px) scale(1.1)",
            }}
          />

          {/* Image active */}
          <motion.img
            key={idx}
            src={"/multi-sites/assets/louis/"+images[idx]}
            alt={`Projet ${idx + 1}`}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.7 }}
            style={{
              width: width,
              height: "auto",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow: "0 0 18px rgba(0, 255, 255, 0.35)",
              transformStyle: "preserve-3d",
            }}
          />
        </div>

        {/* Description + Liens */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            gap: "0.8rem",
            marginTop: "0.8rem",
            maxWidth: width,
            color: "#ccc",
            fontFamily: "Poppins, sans-serif",
            textShadow: "0 0 4px rgba(0,0,0,0.5)",
          }}
        >
          {/* Description */}
          <div
            style={{
              flex: 1,
              fontSize: "0.95rem",
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {descriptions[idx]}
          </div>

          {/* Icônes */}
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              flexShrink: 0,
              alignItems: "center",
            }}
          >
            {githubLinks?.[idx] && (
              <a
                href={githubLinks[idx]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ccc" }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.15-.02-2.08-3.2.69-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.46-2.29 1.2-3.09-.12-.3-.52-1.51.12-3.16 0 0 .98-.31 3.2 1.18a11.1 11.1 0 012.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.65.24 2.86.12 3.16.75.8 1.2 1.83 1.2 3.09 0 4.44-2.71 5.41-5.29 5.69.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.21.67.8.56A10.99 10.99 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
                </svg>
              </a>
            )}

            {externalLinks?.[idx] && (
              <a
                href={externalLinks[idx]}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#ccc" }}
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
                  <path d="M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7H5V5z" />
                </svg>
              </a>
            )}
          </div>
        </div>


      </motion.div>
    </motion.div>
  );
};

export default HologramCarousel;
