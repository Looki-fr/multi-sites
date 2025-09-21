import React, { useEffect, useRef, useState } from "react";
import { motion  } from "framer-motion";
import { DescriptionModal } from "./DescriptionModal";
import useFloatingMotion from "./useFloatingMotion"; // Hook réutilisable
import texts from '../../../texts/louis/texts.json'
import { type Lang } from "../Network/LanguageSelect";

const ORIGINAL_IMAGE = "/multi-sites/assets/louis_pro.jpg";
const ALT_IMAGE = "/multi-sites/assets/louis_alt.png";

interface FaceFloatingProps {
  isMobile?: boolean;
  isZoomedSkills: boolean;
  hovered: boolean;
  setHovered: () => void;
  setHoveredNone: () => void; // pour réinitialiser l'état de survol
  language: Lang;
}


const FaceFloating: React.FC<FaceFloatingProps> = ({ isZoomedSkills, isMobile, hovered, setHovered, setHoveredNone, language }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const [useAltImage, setUseAltImage] = useState(false);
  const [glitchRects, setGlitchRects] = useState<
    { top: number; left: number; width: number; height: number; color: string }[]
  >([]);

  // Précharge l'image alternative au montage
  useEffect(() => {
    const img = new Image();
    img.src = ALT_IMAGE;
  }, []);

  // Mouvement flottant
  useFloatingMotion(ref);

  // Glitch + changement image
  useEffect(() => {
    const interval = setInterval(() => {
      const burst = () => {
        generateRects();
        setTimeout(() => setGlitchRects([]), 100 + Math.random() * 150);
      };

      burst();
      const extra = 1 + Math.floor(Math.random() * 2);
      for (let i = 1; i <= extra; i++) setTimeout(burst, 300 * i);

      setTimeout(() => setUseAltImage(true), 500);

      setTimeout(() => {
        burst();
        const again = 1 + Math.floor(Math.random() * 2);
        for (let i = 1; i <= again; i++) setTimeout(burst, 150 * i);
      }, 1500);

      setTimeout(() => setUseAltImage(false), 2000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const generateRects = () =>
    setGlitchRects(
      Array.from({ length: 20 }).map(() => ({
        top: Math.random() * 250 - 50,
        left: Math.random() * 250 - 50,
        width: 25 + Math.random() * 40,
        height: 8 + Math.random() * 20,
        color: ["#ff0040", "#00fff7", "#ffffff", "#00ff00", "#ffa600"][
          Math.floor(Math.random() * 5)
        ],
      }))
    );


  return (
      <>

      <motion.div
        ref={ref}
        animate={{ opacity: isZoomedSkills ? 0 : 1 }}
        transition={{ duration: 0.6, delay: isZoomedSkills ? 0 : 2 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          cursor: "pointer",
          zIndex: 5,
          pointerEvents: isZoomedSkills ? "none" : "auto", // empêche clic quand invisible
        }}
        onMouseEnter={() => setHovered()}
        onMouseLeave={() => {
          if (hovered) setHoveredNone();
        }}
        onClick={() => {
          if (isMobile) {
            if (hovered) {
              setHoveredNone();
            }
            else {
              setHovered();
            }
          }
        }}
      >

          {/* IMAGE + glitch rectangles */}
          <div
            style={{
              position: "relative",
              width: 200,
              height: 200,
              overflow: "hidden",
              borderRadius: 25,
              border: "3px solid white",
              pointerEvents: "none",
            }}
          >
            {/* image originale */}
            <img
              src={ORIGINAL_IMAGE}
              alt="Louis"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: useAltImage ? 0 : 1,
                pointerEvents: "none",
              }}
            />
            {/* image alternative */}
            <img
              src={ALT_IMAGE}
              alt="Louis alt"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: useAltImage ? 1 : 0,
                pointerEvents: "none",
              }}
            />

            {glitchRects.map((r, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: r.top,
                  left: r.left,
                  width: r.width,
                  height: r.height,
                  background: r.color,
                  opacity: 0.9,
                  mixBlendMode: "screen",
                  animation: "fadeOut 0.45s forwards",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          {/* TEXTE + glitch rectangles */}
          <div
            style={{
              position: "relative",
              marginTop: "0.6rem",
              color: "white",
              fontSize: "1.2rem",
              textAlign: "center",
              fontWeight: 500,
              lineHeight: 1.4,
              fontFamily: "Poppins, sans-serif",
              textShadow: "0 0 6px rgba(0,0,0,0.6)",
              pointerEvents: "none",
            }}
          >
            Louis<br />
            <span style={{ fontSize: "0.9rem", color: "#ccc" }}>
              {useAltImage ? texts["louis"]["timeline"]["louis"]["short_description_2"][language] : texts["louis"]["timeline"]["louis"]["short_description"][language]}
            </span>

            {glitchRects.slice(0, 10).map((_, i) => (
              <div
                key={`tg-${i}`}
                style={{
                  position: "absolute",
                  top: 15 + Math.random() * 45,
                  left: Math.random() * 140,
                  width: 10 + Math.random() * 30,
                  height: 4 + Math.random() * 10,
                  background: ["#ff0040", "#00fff7", "#ffffff", "#00ff00", "#ffa600"][
                    Math.floor(Math.random() * 5)
                  ],
                  opacity: 0.9,
                  mixBlendMode: "screen",
                  animation: "fadeOut 0.45s forwards",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>
        </motion.div>
        {hovered && <DescriptionModal hovered={hovered} anchor={ref.current} title={texts["louis"]["timeline"]["louis"]["title"][language]} description={texts["louis"]["timeline"]["louis"]["description"][language]} isMobile={isMobile} />}
      </>
  );
};

export default FaceFloating;
