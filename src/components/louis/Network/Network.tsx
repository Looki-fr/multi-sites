// Network.tsx
import React, { useRef } from "react";
import useFloatingMotion from "./../Floating/useFloatingMotion";

interface NetworkProps {
  icon: string;       // chemin vers l'image ou icône
  alt: string;        // texte alternatif
  url: string;        // lien de redirection
  size?: number;      // taille en px (par défaut 30)
}

const Network: React.FC<NetworkProps> = ({ icon, alt, url, size = 30 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useFloatingMotion(ref, 0.2);

  return (
    <div
      ref={ref}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "pointer",
        willChange: "transform",
      }}
      onClick={() => window.open(url, "_blank")}
    >
      <img
        src={icon}
        alt={alt}
        style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
      />
    </div>
  );
};

export default Network;
