// LanguageSelect.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFloatingMotion from "../Floating/useFloatingMotion";

export type Lang = "fr" | "en";

interface LanguageSelectProps {
  value: Lang;
  onChange: (lang: Lang) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useFloatingMotion(ref, 0.2);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const pill: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(6px)",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    border: "1px solid rgba(0,0,0,0.06)",
    cursor: "pointer",
    userSelect: "none",
    color: "#111",
  };

  const menu: React.CSSProperties = {
    position: "absolute",
    top: "110%",
    left: 0,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 14,
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
    border: "1px solid rgba(0,0,0,0.06)",
    padding: 6,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 6,
    fontFamily: "Poppins, system-ui, sans-serif",
    color: "#111", // force le texte en noir en prod
    zIndex: 1000,
  };

  const item: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "8px 10px",
    cursor: "pointer",
    borderRadius: 10,
    fontFamily: "Poppins, system-ui, sans-serif",
    color: "#111",
  };

  const flagStyle: React.CSSProperties = {
    width: 22,
    height: 22,
    borderRadius: 4,
    display: "block",
    objectFit: "cover",
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.97 }}
        style={pill}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={value === "fr" ? "Français" : "English"}
      >
        <img
          src={`/multi-sites/assets/louis/${value === "fr" ? "france" : "anglais"}.png`}
          alt={value === "fr" ? "Drapeau français" : "Drapeau britannique"}
          width={22}
          height={22}
          style={flagStyle}
          draggable={false}
        />
        <span style={{ fontSize: 14, fontWeight: 600 }}>{value.toUpperCase()}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" style={{ opacity: 0.6 }}>
          <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            style={menu}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            role="listbox"
          >
            {(["fr", "en"] as Lang[]).map((opt) => (
              <div
                key={opt}
                role="option"
                aria-selected={opt === value}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                onMouseDown={(e) => e.preventDefault()}
                style={{
                  ...item,
                  background: opt === value ? "rgba(0,0,0,0.06)" : "transparent",
                }}
                title={opt === "fr" ? "Français" : "English"}
              >
                <img
                  src={`/multi-sites/assets/louis/${opt === "fr" ? "france" : "anglais"}.png`}
                  alt={opt === "fr" ? "Drapeau français" : "Drapeau britannique"}
                  width={26}
                  height={26}
                  style={{ ...flagStyle, width: 26, height: 26 }}
                  draggable={false}
                />
                <span style={{ fontSize: 14, fontWeight: 600 }}>{opt.toUpperCase()}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelect;
