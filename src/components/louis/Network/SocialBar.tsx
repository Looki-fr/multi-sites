// SocialBar.tsx
import React, { useState, useEffect } from "react";
import Network from "./Network";
import { motion } from "framer-motion";
import LanguageSelect, { type Lang } from "./LanguageSelect";

interface SocialBarProps {
  isZoomedSkills: boolean;
  isMobile: boolean;
  language: Lang;                          // <— NEW
  setLanguage: (lang: Lang) => void;       // <— NEW
}

const SocialBar: React.FC<SocialBarProps> = ({ isZoomedSkills, isMobile, language, setLanguage }) => {
  const [showSocialBar, setShowSocialBar] = useState(!isZoomedSkills);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isZoomedSkills) setShowSocialBar(false);
    else timer = setTimeout(() => setShowSocialBar(true), 2000);
    return () => timer && clearTimeout(timer);
  }, [isZoomedSkills]);

  return (
    showSocialBar && (
      <motion.div
        style={{
          position: isMobile ? "absolute" : "fixed",
          top: "20px",
          right: isMobile ? "50vw" : "20px",
          transform: isMobile ? "translateX(50%)" : "",
          display: "flex",
          gap: "16px",
          flexDirection: "row",
          alignItems: "center",
          zIndex: 1000,
          // petit fond flouté pour tout le groupe (optionnel)
          background: isMobile ? "transparent" : "transparent",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* --- Sélecteur de langue à gauche --- */}
        <LanguageSelect value={language} onChange={setLanguage} isMobile={isMobile} />

        {/* --- Icônes --- */}
        <Network
          icon="/multi-sites/assets/louis/github.png"
          alt="GitHub"
          url="https://github.com/Looki-fr"
          size={30}
        />
        <Network
          icon="/multi-sites/assets/louis/linkedin.png"
          alt="LinkedIn"
          url="https://www.linkedin.com/in/louis-le-meilleur-41a90321b/"
          size={30}
        />
        <Network
          icon="/multi-sites/assets/louis/gmail.png"
          alt="Gmail"
          url="mailto:lemeilllouis@gmail.com"
          size={30}
        />
        <Network
          icon="/multi-sites/assets/louis/phone.png"
          alt="Téléphone"
          url="tel:+33618406094"
          size={30}
        />
      </motion.div>
    )
  );
};

export default SocialBar;
