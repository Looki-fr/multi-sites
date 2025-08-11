import React, { useEffect, useMemo, useState  } from "react";
import { motion, useAnimation } from "framer-motion";
import SkillPage from "./../../pages/louis/SkillPage";
import { AnimatePresence } from "framer-motion";

type Skill = {
  src: string;
  rx: number;   // demi-grand axe (vw)
  ry: number;   // demi-petit axe (vh)
  speed: number;
  phase: number;
  width: number;
};

/**
 * Génère un font/size fluide : conserve la taille px mini,
 * grandit doucement après 1500px de viewport,
 * plafonne à maxScale * base.
 */
function clampSizePx(
  basePx: number,
  viewportRefPx = 1500,
  maxScale = 1.3 // 30% plus grand max
): string {
  const vwVal = (basePx / viewportRefPx) * 100;         // px -> vw
  const maxPx = Math.round(basePx * maxScale);
  return `clamp(${basePx}px, ${vwVal.toFixed(3)}vw, ${maxPx}px)`;
}


const WIDTH_EFREI = 70;          // taille de l’icône centrale


/* ─────────────────────────  COMPONENT  ───────────────────────── */

export default function SkillsOrbit({ isZoomedSkills, setIsZoomedSkills, isMobile }: {
  isZoomedSkills: boolean;
  setIsZoomedSkills: (zoomed: boolean) => void;
  isMobile: boolean;
}) {
  const CENTER_X = 30;             // centre des orbites en vw
  const CENTER_Y = 25;             // centre des orbites en vh

  const rx1 = isMobile ? 25 : 18; // demi-grand axe orbite 1
  const rx2 = isMobile ? 45 : 26;
  const rx3 = isMobile ? 65 : 34;
  const ry1 = 14;
  const ry2 = 20;
  const ry3 = 26;
  const speed1 = 0.02; // vitesse orbite 1
  const speed2 = 0.035; // vitesse orbite 2
  const speed3 = 0.025; // vitesse orbite 3

  /* ─────────────────────────  SKILLS  ───────────────────────── */

  const skills: Skill[] = [
    // Orbite 1 – proche (rx 18, ry 14)
    { src: "/multi-sites/assets/louis/react.png",        rx: rx1, ry: ry1, speed: speed1, phase: 0.3,                width: 50 },
    { src: "/multi-sites/assets/louis/node.png",         rx: rx1, ry: ry1, speed: speed1, phase: 2.1,                width: 50 },
    { src: "/multi-sites/assets/louis/git.png",          rx: rx1, ry: ry1, speed: speed1, phase: 4.7,                width: 50 },
    { src: "/multi-sites/assets/louis/stable_diffusion.png", rx: rx1, ry: ry1, speed: speed1, phase: 3.5,                width: 50 },
    { src: "/multi-sites/assets/louis/html_css_js.png",  rx: rx1, ry: ry1, speed: speed1, phase: 5.9,                width: 50 },

    // Orbite 2 – moyenne (rx 26, ry 20)
    { src: "/multi-sites/assets/louis/docker.png",       rx: rx2, ry: ry2, speed: speed2, phase: 1.1,                width: 50 },
    { src: "/multi-sites/assets/louis/devops.png",       rx: rx2, ry: ry2, speed: speed2, phase: 3.4,                width: 50 },
    { src: "/multi-sites/assets/louis/figma.png",        rx: rx2, ry: ry2, speed: speed2, phase: 4.2,                width: 30 },
    { src: "/multi-sites/assets/louis/uiux.png",         rx: rx2, ry: ry2, speed: speed2, phase: 0.7,                width: 50 },
    { src: "/multi-sites/assets/louis/java.png",   rx: rx2, ry: ry2, speed: speed2, phase: 5.0,                width: 50 },

    // Orbite 3 – large (rx 34, ry 24)
    { src: "/multi-sites/assets/louis/python.png",       rx: rx3, ry: ry3, speed: speed3, phase: 0.4,                width: 50 },
    { src: "/multi-sites/assets/louis/scikit_learn.png", rx: rx3, ry: ry3, speed: speed3, phase: 2.6,                width: 50 },
    { src: "/multi-sites/assets/louis/scalla.png",       rx: rx3, ry: ry3, speed: speed3, phase: 3.9,                width: 30 },
    { src: "/multi-sites/assets/louis/linux.png",        rx: rx3, ry: ry3, speed: speed3, phase: 5.5,                width: 40 },
    { src: "/multi-sites/assets/louis/mysql.png",        rx: rx3, ry: ry3, speed: speed3, phase: 1.8,                width: 50 },
  ];

  const iconRefs = useMemo(() => skills.map(() => React.createRef<HTMLImageElement>()), []);

  useEffect(() => {
    let frame = 0;
    let running = true;

    const step = () => {
      frame++;
      const t = frame / 60;
      skills.forEach((s, i) => {
        const img = iconRefs[i].current;
        if (!img) return;
        const x = s.rx * Math.cos(2 * Math.PI * s.speed * t + s.phase);
        const y = s.ry * Math.sin(2 * Math.PI * s.speed * t + s.phase);
        img.style.transform = `translate(calc(${x}vw - 50%), calc(${y}vh - 50%))`;
      });
      if (running) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
    return () => { running = false; };
  }, []);

  /* ---------- helper pour dessiner une ellipse en SVG ---------- */
  const ellipseSvg = (rx: number, ry: number, key: string) => (
    <svg
      key={key}
      width={`calc(${rx * 2}vw)`}
      height={`calc(${ry * 2}vh)`}
      style={{
        position: "absolute",
        left: `calc(${CENTER_X}vw - ${rx}vw)`,
        bottom: `calc(${CENTER_Y}vh - ${ry}vh)`,
        pointerEvents: "none",
      }}
    >
      <ellipse
        cx="50%"
        cy="50%"
        rx="50%"
        ry="50%"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
    </svg>
  );

  /* ───────── ZOOM AU CLIC ───────── */
  const controls = useAnimation();

  const handleClick = async () => {
    if (isZoomedSkills) {
      // si déjà zoomé, on revient à l'état normal
      setIsZoomedSkills(false);
      await controls.start({ scale: 1, transition: { duration: 2 , ease: "easeInOut"} });
      return;
    }
    setIsZoomedSkills(true);
    await controls.start({
      scale: isMobile ? 30 : 20,          // facteur de zoom
      transition: { duration: 2, ease: "easeInOut" },
      transformOrigin: isMobile ? "30% " : ``, // centre sur EFREI
    });
    // une fois le zoom terminé tu affiches le panneau d'infos
  };
  

  return (
    <motion.a initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {isZoomedSkills && (
            <motion.div
              key="skillpage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <SkillPage onBack={handleClick} isMobile={isMobile} />
            </motion.div>
          )}
        </AnimatePresence>
      <motion.div           /* conteneur cliquable */
        initial={{ scale: 1, opacity: 1 }}
        animate={controls}
        style={{
          position: "absolute",
          top: isMobile ? '165vh' : '100vh',
          right: isMobile? '50vw' : 0,
          translate: isMobile ? "50% 0" : "0 -100%",
          width: "50vw",
          height: "50vh",
          transformOrigin: `${CENTER_X-5}vw ${50 - CENTER_Y}vh`, // centre sur EFREI
          cursor: isZoomedSkills ? "auto" : "pointer",
          pointerEvents: isZoomedSkills ? "none" : "all",
        }}
        onClick={isZoomedSkills ? undefined : handleClick}
      >
        {/* ellipses de fond */}
        {ellipseSvg(rx1, ry1, "e1")}
        {ellipseSvg(rx2, ry2, "e2")}
        {ellipseSvg(rx3, ry3, "e3")}

        {/* icône centrale */}
        <img
          src="/multi-sites/assets/louis/efrei_paris.png"
          alt="EFREI Paris"
          style={{
            position: "absolute",
            left: `${CENTER_X}vw`,
            bottom: `${CENTER_Y}vh`,
            width: clampSizePx(WIDTH_EFREI, 1500, 1.5),
            height: clampSizePx(WIDTH_EFREI, 1500, 1.5),
            transform: "translate(-50%, 50%)",
            borderRadius: "50%",
            boxShadow: "0 0 15px 5px rgba(255,255,255,0.5)",
          }}
        />

        {/* skills */}
        {skills.map((s, i) => (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: i * 0.1 }}
            key={s.src}
            ref={iconRefs[i]}
            src={s.src}
            alt=""
            style={{
              position: "absolute",
              left: `${CENTER_X}vw`,
              top: `${CENTER_Y}vh`,
              width: clampSizePx(s.width, 1500, 1.5),
              height: "auto",
              borderRadius: 12,
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
            }}
          />
        ))}
      </motion.div>
    </motion.a>
  );
}
