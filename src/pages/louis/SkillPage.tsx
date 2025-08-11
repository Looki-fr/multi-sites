import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Cards from "../../components/louis/SkillFocus/Cards";
import { ArrowLeft } from "lucide-react";
import SkillCard from "../../components/louis/SkillFocus/SkillCard";
import RotatingText from "../../components/louis/SkillFocus/RotatingText";

type SkillInfo = {
  description: string;
  usage: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
};

const skillDescriptions: Record<string, SkillInfo> = {
  "React": {
    description: "Librairie front-end permettant de créer des interfaces dynamiques.",
    usage: "Utilisé dans ce portfolio, applications webs et application mobile (React Native).",
    level: "Avancé",
  },
  "Node.js": {
    description: "Exécute du JavaScript côté serveur pour créer des APIs performantes.",
    usage: "Utilisé pour des backends REST/GraphQL.",
    level: "Intermédiaire",
  },
  "Git": {
    description: "Système de versionnage indispensable pour collaborer efficacement.",
    usage: "Utilisé sur tous les projets, avec GitHub et GitHub Copilot.",
    level: "Avancé",
  },
  "Stable Diffusion": {
    description: "Génération d’images via IA, utile pour créer des assets visuels.",
    usage: "Création d’illustrations personnalisées à l'effigie d'autrui.",
    level: "Intermédiaire",
  },
  "HTML/CSS/JS": {
    description: "Trio fondamental pour toute interface web moderne.",
    usage: "Utilisé sur tous mes projets front-end.",
    level: "Avancé",
  },
  "Docker": {
    description: "Conteneurisation d’applications pour une portabilité maximale.",
    usage: "Utilisé pour orchestrer des stacks web complets (React + Node + MySQL) et dans le cadre de DevOps.",
    level: "Intermédiaire",
  },
  "DevOps": {
    description: "Intégration et déploiement continus pour une livraison rapide.",
    usage: "Automatisation des différentes phases de développement, déploiement avec Docker.",
    level: "Intermédiaire",
  },
  "Figma": {
    description: "Outil de design collaboratif pour créer des maquettes interactives.",
    usage: "Conception d’interfaces avant implémentation React.",
    level: "Avancé",
  },
  "UI/UX Design": {
    description: "Conception centrée utilisateur pour une expérience optimale.",
    usage: "Réflexion sur l’accessibilité et l’ergonomie dans chaque projet.",
    level: "Intermédiaire",
  },
  "Python": {
    description: "Langage polyvalent, performant en data science et IA.",
    usage: "Utilisé pour scripts, projets de data science et création de jeux-vidéos.",
    level: "Avancé",
  },
  "Scikit-learn": {
    description: "Bibliothèque Python pour le machine learning et l'analyse de données.",
    usage: "Utilisé pour entraîner des modèles simples de classification.",
    level: "Intermédiaire",
  },
  "Scala": {
    description: "Langage fonctionnel et orienté objet, idéal pour le big data.",
    usage: "Découverte des concepts de programmation fonctionnelle et utilisation dans un projet de Graph.",
    level: "Intermédiaire",
  },
  "Java": {
    description: "Langage robuste pour le développement d'applications serveur.",
    usage: "Utilisé dans des projets de backend et applications des différents concepts de POO.",
    level: "Intermédiaire",
  },
  "Linux": {
    description: "Système d'exploitation open source, fondation de nombreux serveurs.",
    usage: "Utilisé pour le développement, la conteneurisation et l’hébergement local.",
    level: "Intermédiaire",
  },
  "MySQL": {
    description: "Système de gestion de base de données relationnelle, robuste et fiable.",
    usage: "Utilisé dans plusieurs projets Node.js et Python.",
    level: "Avancé",
  }
};


const verbs = ["animent", "propulsent", "déploient", "soutiennent", "accélèrent", "alimentent"];

const SkillPage: React.FC<{ onBack: () => void, isMobile: boolean }> = ({ onBack, isMobile }) => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(`${verbs[0]} mes projets`);
  const [phase, setPhase] = useState<"idle" | "deleting" | "typing">("idle");
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    description: string;
    usage: string;
    level: string;
  } | null>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      setPhase("idle");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show || phase === "idle") return;

    const full = `${verbs[index]} mes projets`;
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (text.length < full.length) {
        timeout = setTimeout(() => {
          setText(full.slice(0, text.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), 5000);
      }
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, text.length - 1));
        }, 30);
      } else {
        setIndex((prev) => (prev + 1) % verbs.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, show]);

  useEffect(() => {
    if (!show) return;
    const delay = setTimeout(() => setPhase("deleting"), 10000);
    return () => clearTimeout(delay);
  }, [show]);

  if (!show) return null;


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        paddingTop: "8vh",
      }}
    >
      {/* Vrai icon bouton discret */}
      <div
        onClick={onBack}
        role="button"
        aria-label="Retour"
        style={{
          position: "absolute",
          top: "11.5vh",
          left: "2vw",
          padding: "8px",
          borderRadius: "50%",
          backgroundColor: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
        }}
      >
        <ArrowLeft size={30} color="white" style={{ opacity: 0.9 }} />
      </div>

      {/* Titre */}
      

      
      <h2
        style={{
          position: "absolute",
          top:'11.5vh',
          transform: "translateY(-50%)",
          color: "white",
          fontSize: "clamp(1.2rem, 2vw + 0.5rem, 2.5rem)",
          fontFamily: "Poppins, sans-serif",
          textAlign: "center",
          textShadow: "0 0 10px rgba(255,255,255,0.3)",
          maxWidth: isMobile ? "70vw" : "100vw",
        }}
      >
        Voici les technologies qui{" "}
        <span>
          <span style={{ color: "#00ffff" }}>{text.split(' ')[0]}</span>{" "+text.split(' ').slice(1).join(' ')}
        </span>

        <span className="cursor" />
        <style>{`
          .cursor {
            display: inline-block;
            width: 2px;
            height: 1.2em;
            background-color: white;
            margin-left: 5px;
            animation: blink 1s steps(2, start) infinite;
            vertical-align: bottom;
          }
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "20vh",
          width: isMobile ? "90vw" : "60vw",
          maxWidth: "800px",
          textAlign: "center",
          fontSize: isMobile ? "1rem" : "1.2rem",
          color: "#ccc",
          lineHeight: 1.6,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Survolez une compétence pour en savoir plus.
      </motion.div>

        {hoveredSkill && skillDescriptions[hoveredSkill.name] && (
          <SkillCard
            name={hoveredSkill.name}
            description={skillDescriptions[hoveredSkill.name].description}
            usage={skillDescriptions[hoveredSkill.name].usage}
            level={skillDescriptions[hoveredSkill.name].level}
            isMobile={isMobile}
        />
        )}

        <Cards
          onHoverSkillChange={(s) =>
            setHoveredSkill(
              s && skillDescriptions[s.name]
                ? {
                    name: s.name,
                    description: skillDescriptions[s.name].description,
                    usage: skillDescriptions[s.name].usage,
                    level: skillDescriptions[s.name].level,
                  }
                : null
            )
          }
          isMobile={isMobile}

        />
        {/* Note explicative à droite */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: isMobile ? "10vh" : "25vh",
            right: "5vw",
            maxWidth: isMobile ? '25vw' : "200px",
            fontSize: "clamp(0.6rem, 1vw + 0.25rem, 0.9rem)",
            fontFamily: "Poppins, sans-serif",
            color: "#ccc",
            textAlign: "right",
            lineHeight: 1.4,
            textShadow: "0 0 6px rgba(0,0,0,0.4)",
            rotate: '1deg',
          }}
        >
          Compétences acquises à <strong>EFREI Paris</strong>, et consolidées lors de projets personnels et professionnels.
        </motion.div>



    </motion.div>
  );
};

export default SkillPage;
