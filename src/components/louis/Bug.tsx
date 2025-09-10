import React, { useRef } from "react";
import useFloatingMotion from "./Floating/useFloatingMotion"; // ajuste le chemin si besoin

const Bug: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useFloatingMotion(ref);

  return (
    <a
      ref={ref}
      href="/multi-sites/404"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        width: "20px",
        height: "20px",
        cursor: "pointer",
        zIndex: 1000,
        willChange: "transform",
        rotate: '30deg'
      }}
      aria-label="Bug décoratif cliquable"
      role="img"
    >
      <img
        src="/multi-sites/assets/louis/bug.png"
        alt="bug"
        style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
      />
    </a>
  );
};

export default Bug;
