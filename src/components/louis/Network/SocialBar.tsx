// SocialBar.tsx
import React, { useState, useEffect } from "react";
import Network from "./Network";
import { motion } from "framer-motion";

interface SocialBarProps {
  isZoomedSkills: boolean;
  isMobile: boolean;
}

const SocialBar: React.FC<SocialBarProps> = ({isZoomedSkills, isMobile}) => {
  const [showSocialBar, setShowSocialBar] = useState(!isZoomedSkills);
  useEffect(() => {
      let timer: NodeJS.Timeout | null = null;
  
      if (isZoomedSkills) {
        // hide immediately when zooming-in
        setShowSocialBar(false);
      } else {
        // wait 2 s before showing again
        timer = setTimeout(() => setShowSocialBar(true), 2000);
      }
      return () => timer && clearTimeout(timer);
    }, [isZoomedSkills]);

  return (
    showSocialBar && <motion.div
      style={{
        position: isMobile ? "absolute" : "fixed",
        top: isMobile ? "" : "20px",
        right: isMobile ? "50vw" : "20px",
        transform: isMobile ? "translateX(50%)" : "",
        bottom: isMobile ? "20px" : "",
        display: "flex",
        gap: "20px",
        flexDirection: "row",
        zIndex: 1000,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
  );
};

export default SocialBar;
