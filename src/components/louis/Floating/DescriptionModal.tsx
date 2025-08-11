import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface DescriptionModalProps {
  hovered: boolean;
  anchor: HTMLElement | null;
  title?: string;
  description?: string;
  offsetX?: number;
  isLeftDescription?: boolean;
  isMobile?: boolean;
}

export const DescriptionModal: React.FC<DescriptionModalProps> = ({
  hovered,
  anchor,
  title,
  description,
  offsetX = 0,
  isLeftDescription = false,
  isMobile
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();

    const top = (isMobile ? rect.bottom : rect.top - 10) + window.scrollY;
    const left =
      (isMobile
        ? rect.left - 30
        : isLeftDescription
        ? rect.left - 240 + offsetX
        : rect.left + 220 + offsetX) + window.scrollX;

    setPosition({ top, left });
  };

  // Recalculate when hovered or anchor changes
  useEffect(() => {
    if (hovered) updatePosition();
  }, [hovered, anchor]);

  // Recalculate on scroll and resize
  useEffect(() => {
    if (!hovered) return;

    const handleScroll = () => updatePosition();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [hovered]);

  if (!anchor) return null;

  return createPortal(
    <AnimatePresence>
      {hovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            width: 240,
            padding: "1rem",
            borderRadius: 16,
            background: "rgba(0,0,0,0.5)",
            color: "white",
            fontFamily: "Poppins, sans-serif",
            zIndex: 9999,
            boxShadow: "0 0 12px rgba(0,0,0,0.6)",
            pointerEvents: "none",
            backdropFilter: "blur(8px)",
          }}
        >
          <strong style={{ fontSize: "1.1rem" }}>{title}</strong>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.35, marginTop: 8 }}>
            {description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
