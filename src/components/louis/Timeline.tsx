import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import FaceFloating from "./Floating/FaceFloating";
import ElementFloating from "./Floating/ElementFloating";
import texts from '../../texts/louis/texts.json'

interface TimelineProps {
  isZoomedSkills: boolean;
  isMobile: boolean;
  language: "fr" | "en";
}

/**
 * Same timeline as before but the rocket animation is driven by plain JS
 * (requestAnimationFrame) using the native SVG path‑length API. No more
 * <animateMotion>, so the behaviour is consistent across browsers.
 */
const Timeline: React.FC<TimelineProps> = ({ isZoomedSkills, isMobile, language }) => {
  const pxToVw = (px: number) => (px / window.innerWidth) * 100;
  const [showTimeline, setShowTimeline] = useState(!isZoomedSkills);
  const enumHovered = {
    NONE: '',
    FACE: 'face',
    LYCEE: 'lycee',
    EFREI: 'efrei',
    ETN: 'etn',
    IDD: 'idd',
  };
  const [hovered, setHovered] = useState(enumHovered.NONE);

  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGImageElement>(null);

  // choose a rocket size in viewBox units (percent of width/height)
  // 5 == 5% of the viewBox width/height
  const ROCKET_SIZE = isMobile ? 10 :  window.innerWidth > 2500 ? 2 : window.innerWidth > 2000 ? 3 : 4;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isZoomedSkills) {
      // hide immediately when zooming-in
      setShowTimeline(false);
    } else {
      // wait 2 s before showing again
      timer = setTimeout(() => setShowTimeline(true), 2000);
    }
    return () => timer && clearTimeout(timer);
  }, [isZoomedSkills]);


  const positions = isMobile ? [
    {x: '50vw', y: '30vh'},
    {x:'45vw', y: '65vh'},
    {x: '55vw', y: '92vh'},
    {x: '42vw', y: '119vh'},
    {x: '62vw', y: '146vh'},
  ] :[
    {x: '5vw', y: '5vh'},
    {x: '26vw', y: '20vh'},
    {x: '43vw', y: '11vh'},
    {x: '63vw', y: '22vh'},
    {x: '87vw', y: '15vh'},
  ]

  
  // Waypoints in viewBox units (0‑100)
  const waypoints = isMobile ? [
    {x: 0, y:-100},
    { x:55, y: 0 },
    { x: 65, y: 100 },
    { x: 40, y: 170 },
    { x: 70, y: 230 },
    { x: 70, y: 230 },
  ] : [
    { x:-5, y: 20 },
    { x: 5 + pxToVw(100), y: 5},
    { x: 26 + pxToVw(100), y: 12},
    { x: 43 + pxToVw(125), y: 7},
    { x: 63 + pxToVw(100), y: 12},
    { x: 87 + pxToVw(75),  y: 8},
    { x:105,  y: 10}
  ];

  // Build an alternating wavy path (same as before)
  const buildPath = () => {
    const cmds: string[] = [`M ${waypoints[0].x} ${waypoints[0].y}`];
    for (let i = 1; i < waypoints.length; i++) {
      const prev = waypoints[i - 1];
      const curr = waypoints[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      const dir = i % 2 === 0 ? -1 : 1;
      const offX = dir * (curr.y - prev.y) * 0.5;
      const offY = dir * (prev.x - curr.x) * 0.5;
      cmds.push(`Q ${midX + offX} ${midY + offY} ${curr.x} ${curr.y}`);
    }
    return cmds.join(" ");
  };

  const pathD = buildPath();

  // --- JS‑driven rocket animation -------------------------------------------
  useEffect(() => {
    const pathEl = pathRef.current;
    const imgEl  = rocketRef.current;
    if (!pathEl || !imgEl) return;

    const total = pathEl.getTotalLength();
    let t = 0;
    let raf = 0;
    const delta = 0.3;

    const step = () => {
      t += 0.0004;
      if (t > 1) t -= 1;

      const len = t * total;
      const p  = pathEl.getPointAtLength(len);
      const q  = pathEl.getPointAtLength((len + delta) % total);
      const angle = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI;

      // place rocket centered on the path point
      imgEl.setAttribute("x", String(p.x - ROCKET_SIZE / 2));
      imgEl.setAttribute("y", String(p.y - ROCKET_SIZE / 2));
      imgEl.setAttribute("transform", `rotate(${angle + 45}, ${p.x}, ${p.y})`);

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [showTimeline]);



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{ position: isMobile ? "absolute" : "fixed", inset: 0, pointerEvents: isZoomedSkills ? "none" : "auto" }}
      onClick={() => {
        if (isMobile && hovered !== enumHovered.NONE) {
          setHovered(enumHovered.NONE);
        }
      }}
    >
      {/* SVG timeline */}
      {showTimeline && (
        <svg
          viewBox={isMobile ? "0 0 100 145" : "0 0 100 100"}
          preserveAspectRatio={isMobile ? "" : "xMidYMid meet"}
          style={{
            position: "absolute",
            inset: 0,
            width: "100vw",
            // Assure la même proportion que le viewBox → plus de letterboxing
            aspectRatio: isMobile ? "" : "1 / 1",
            height: isMobile ? "145vh" : "auto",
            display: isMobile ? "" : "block",
          }}
        >

          <path
            ref={pathRef}
            d={pathD}
            stroke="#888"
            strokeDasharray={isMobile ? "0.6 2.4" : "0.3 1.2"}
            strokeWidth={isMobile ? 0.5 : 0.1}
            fill="none"
          />
          {/* Rocket INSIDE the SVG, square and non-stretched */}
          {
            <image
              ref={rocketRef}
              href="/multi-sites/assets/louis/fusee.png"
              width={ROCKET_SIZE}
              height={ROCKET_SIZE}
              preserveAspectRatio="xMidYMid meet"
              style={{ pointerEvents: "none" }}
              opacity={showTimeline ? 1 : 0}
            />
          }
        </svg>
      )}



      {/* Existing floating elements */}
      <motion.div style={{ position: "absolute", top: positions[0].y, left: positions[0].x, pointerEvents: "none", translate: isMobile ? "-50% -50%" : "0 0" }}>
        <FaceFloating isZoomedSkills={isZoomedSkills} isMobile={isMobile} 
          hovered={hovered === enumHovered.FACE} 
          setHovered={() => setHovered(enumHovered.FACE)} 
          setHoveredNone={() => setHovered(enumHovered.NONE)}
          language={language}
        />
      </motion.div>
      <motion.div style={{ position: "absolute", top: positions[1].y, left: positions[1].x, translate: isMobile ? "-50% -50%" : "0 0"  }}>
        <ElementFloating
          isZoomedSkills={isZoomedSkills}
          image="/multi-sites/assets/louis/lycee.png"
          width={180}
          title={texts["louis"]["timeline"]["lycee"]["title"][language]}
          link="https://modeste-leroy.lycee.ac-normandie.fr/"
          short_description={texts["louis"]["timeline"]["lycee"]["short_description"][language]}
          description={texts["louis"]["timeline"]["lycee"]["description"][language]}
          hovered={hovered === enumHovered.LYCEE} 
          setHovered={() => setHovered(enumHovered.LYCEE)} 
          setHoveredNone={() => setHovered(enumHovered.NONE)}
          isMobile={isMobile}
        />
      </motion.div>
      <motion.div style={{ position: "absolute", top: positions[2].y, left: positions[2].x, translate: isMobile ? "-50% -50%" : "0 0"  }}>
        <ElementFloating
          isZoomedSkills={isZoomedSkills}
          image="/multi-sites/assets/louis/efrei.png"
          width={180}
          title={texts["louis"]["timeline"]["efrei"]["title"][language]}
          link="https://www.efrei.fr/"
          short_description={texts["louis"]["timeline"]["efrei"]["short_description"][language]}
          description={texts["louis"]["timeline"]["efrei"]["description"][language]}
          offsetXDescription={35} // Adjusted offset for better positioning
          hovered={hovered === enumHovered.EFREI} 
          setHovered={() => setHovered(enumHovered.EFREI)} 
          setHoveredNone={() => setHovered(enumHovered.NONE)}
          isMobile={isMobile}
        />
      </motion.div>
      <motion.div style={{ position: "absolute", top: positions[3].y, left: positions[3].x, translate: isMobile ? "-50% -50%" : "0 0"  }}>
        <ElementFloating
          isZoomedSkills={isZoomedSkills}
          image="/multi-sites/assets/louis/etn.png"
          width={180}
          title={texts["louis"]["timeline"]["etn"]["title"][language]}
          link="https://etn.fr/nos-domaines-dactivites/electrotechnique/"
          short_description={texts["louis"]["timeline"]["etn"]["short_description"][language]}
          description={texts["louis"]["timeline"]["etn"]["description"][language]}
          hovered={hovered === enumHovered.ETN} 
          setHovered={() => setHovered(enumHovered.ETN)} 
          setHoveredNone={() => setHovered(enumHovered.NONE)}
          isMobile={isMobile}
        />

      </motion.div>
      <motion.div style={{ position: "absolute", top: positions[4].y, left: positions[4].x, translate: isMobile ? "-50% -50%" : "0 0" }}>
        <ElementFloating
          isZoomedSkills={isZoomedSkills}
          image="/multi-sites/assets/louis/idd.png"
          width={140}
          link="http://www.idd-xpert.com/"
          title={texts["louis"]["timeline"]["idd"]["title"][language]}
          short_description={texts["louis"]["timeline"]["idd"]["short_description"][language]}
          description={texts["louis"]["timeline"]["idd"]["description"][language]}
          offsetXDescription={-45} // Adjusted offset for better positioning
          isLeftDescription={true}
          hovered={hovered === enumHovered.IDD} 
          setHovered={() => setHovered(enumHovered.IDD)} 
          setHoveredNone={() => setHovered(enumHovered.NONE)}
          isMobile={isMobile}
        />
      </motion.div>
    </motion.div>
  );
};

export default Timeline;
