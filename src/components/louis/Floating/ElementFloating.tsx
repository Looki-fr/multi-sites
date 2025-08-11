import React, { useRef } from "react";
import { motion } from "framer-motion";
import { DescriptionModal } from "./DescriptionModal";
import useFloatingMotion from "./useFloatingMotion"; // Hook réutilisable

interface ElementFloatingProps {
  isZoomedSkills: boolean;
  image: string;
  width: number;
  link: string;
  title: string;
  description: string;
  short_description?: string;
  offsetXDescription?: number; // pas encore utilisé, à intégrer si besoin
  isLeftDescription?: boolean; // pour ajuster la position de la description
  hovered: boolean;
  setHovered: () => void;
  setHoveredNone: () => void; // pour réinitialiser l'état de survol
  isMobile  : boolean; // pour gérer les styles spécifiques aux mobiles
}

const ElementFloating: React.FC<ElementFloatingProps> = ({
  isZoomedSkills,
  image,
  width,
  link,
  title,
  description,
  short_description,
  offsetXDescription = 0,
  isLeftDescription = false,
  hovered,
  setHovered,
  setHoveredNone,
  isMobile,
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  // Mouvement flottant
  useFloatingMotion(ref);

  return (
    <>
      <motion.div
        ref={ref}
        onMouseEnter={() => setHovered()}
        onMouseLeave={() => {
          if (hovered) {
            setHoveredNone();
          }
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
          else {
            window.open(link, "_blank");
          }
        }}
        animate={{ opacity: isZoomedSkills ? 0 : 1 }}
        transition={{ duration: 0.6, delay: isZoomedSkills ? 0 : 2 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          cursor: "pointer",
          zIndex: 5,
          pointerEvents: isZoomedSkills ? "none" : "auto",
          userSelect: 'none'
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: width,
            height: "100%",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
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
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#ccc" }}>{short_description}</span>
        </div>
      </motion.div>

      <DescriptionModal hovered={hovered} anchor={ref.current} title={title} description={description} offsetX={offsetXDescription} isLeftDescription={isLeftDescription} isMobile={isMobile} />
    </>
  );
};

export default ElementFloating;
