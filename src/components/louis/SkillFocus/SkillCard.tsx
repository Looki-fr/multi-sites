// components/louis/SkillFocus/SkillCard.tsx
import { motion } from "framer-motion";
import React from "react";
import texts from "../../../texts/louis/texts.json";

// Réutilise ton tableau d'icônes existant
const skillIcons: Record<string, string> = {
  "Stable Diffusion": "/multi-sites/assets/louis/stable_diffusion.png",
  "Figma": "/multi-sites/assets/louis/figma.png",
  "Git": "/multi-sites/assets/louis/git.png",
  "Docker": "/multi-sites/assets/louis/docker.png",
  "Python": "/multi-sites/assets/louis/python.png",
  "DevOps": "/multi-sites/assets/louis/devops.png",
  "React": "/multi-sites/assets/louis/react.png",
  "HTML/CSS/JS": "/multi-sites/assets/louis/html_css_js.png",
  "Node.js": "/multi-sites/assets/louis/node.png",
  "Linux": "/multi-sites/assets/louis/linux.png",
  "Scikit-learn": "/multi-sites/assets/louis/scikit_learn.png",
  "Scala": "/multi-sites/assets/louis/scalla.png",
  "MySQL": "/multi-sites/assets/louis/mysql.png",
  "UI/UX Design": "/multi-sites/assets/louis/uiux.png",
};

type SkillCardProps = {
  name: string;
  description: string;
  usage: string;
  level: string;
  isMobile: boolean;
  language: "fr" | "en";
};

const SkillCard: React.FC<SkillCardProps> = ({ name, description, usage, level, isMobile, language }) => {
  const icon = skillIcons[name];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: "25vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        paddingLeft: "8vw",
        width: "60vw",
        fontFamily: "Poppins, sans-serif",
        color: "white",
        lineHeight: 1.6,
        textShadow: "0 0 6px rgba(0,0,0,0.4)",
      }}
    >
      {/* Titre avec icône */}
      <motion.div
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.6rem",
        }}
      >
        {icon && (
          <img
            src={icon}
            alt={name}
            style={{
              width: "clamp(24px, 3vw, 36px)",
              height: "clamp(24px, 3vw, 36px)",
              objectFit: "contain",
              filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))"
            }}
          />
        )}
        <h3 style={{ fontSize: "clamp(1.2rem, 2vw + 0.5rem, 2.2rem)", fontWeight: 700, color: "#fdfdfd", margin: 0 }}>{name}</h3>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        style={{
          fontSize: "clamp(0.9rem, 1vw + 0.5rem, 1.1rem)",
          marginBottom: "0.8rem",
          opacity: 0.95,
        }}
      >
        {description}
      </motion.p>

      {/* Utilisation */}
      <motion.p
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        style={{
          fontSize: "clamp(0.85rem, 0.8vw + 0.4rem, 1rem)",
          marginBottom: "0.4rem",
          color: "#ccc",
        }}
      >
        <strong style={{ fontWeight: 500, color: "#aaa" }}>{texts["louis"]["skillPage"]["skill_card"]["utilisation_perso"][language]}</strong>{" "}
        <span style={{ color: "#eee" }}>{usage}</span>
      </motion.p>

      {/* Niveau */}
      <motion.p
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        style={{
          fontSize: "0.95rem",
          color: "#ccc",
        }}
      >
        <strong style={{ fontWeight: 500, color: "#aaa" }}>{texts["louis"]["skillPage"]["skill_card"]["niveau_estime"][language]}</strong>{" "}
        <span style={{ color: "#eee" }}>{level}</span>
      </motion.p>
    </motion.div>
  );
};

export default SkillCard;
