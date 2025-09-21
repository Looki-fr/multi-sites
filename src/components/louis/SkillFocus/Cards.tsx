import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const suits = ["Spades", "Hearts", "Clubs", "Diamonds"] as const;
const values = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"];


type CardData = { suit: typeof suits[number]; value: string };

const someSkillList: { name: string; src: string }[] = [
  { name: "Stable Diffusion", src: "/multi-sites/assets/louis/stable_diffusion.png" },
  { name: "Figma", src: "/multi-sites/assets/louis/figma.png" },
  { name: "Git", src: "/multi-sites/assets/louis/git.png" },
  { name: "Docker", src: "/multi-sites/assets/louis/docker.png" },
  { name: "Python", src: "/multi-sites/assets/louis/python.png" },
  { name: "DevOps", src: "/multi-sites/assets/louis/devops.png" },
  { name: "React", src: "/multi-sites/assets/louis/react.png" },
  { name: "HTML/CSS/JS", src: "/multi-sites/assets/louis/html_css_js.png" },
  { name: "Node.js", src: "/multi-sites/assets/louis/node.png" },
  { name: "Linux", src: "/multi-sites/assets/louis/linux.png" },
  { name: "Java", src: "/multi-sites/assets/louis/java.png" },
  { name: "Scikit-learn", src: "/multi-sites/assets/louis/scikit_learn.png" },
  { name: "MySQL", src: "/multi-sites/assets/louis/mysql.png" },
  { name: "UI/UX Design", src: "/multi-sites/assets/louis/uiux.png" },
  { name: "Scala", src: "/multi-sites/assets/louis/scalla.png" },
];

const NUM_CARDS = someSkillList.length;

const buildDeck = () => suits.flatMap(suit => values.map(value => ({ suit, value })));

const randomHand = (n: number) => {
  const deck = [...buildDeck()], hand: CardData[] = [];
  while (hand.length < n) hand.push(deck.splice(Math.random() * deck.length | 0, 1)[0]);
  return hand;
};

type Skill = { name: string };

export default function Cards({ onHoverSkillChange, isMobile }: { onHoverSkillChange: (s: Skill | null) => void, isMobile: boolean }) {
  const [mobileIndex, setMobileIndex] = useState(7);

  const { hand, jitter } = useMemo(() => {
    const picked = randomHand(NUM_CARDS);
    const j = Array.from({ length: NUM_CARDS }, () => ({
      dx: (Math.random() - .5) * 1.5,
      dy: (Math.random() - .5) * 1.2,
      dθ: (Math.random() - .5) * 2.8
    }));
    return { hand: picked, jitter: j };
  }, []);

  const c = Math.floor(hand.length / 2);

  useEffect(() => {
    if (isMobile) {
      onHoverSkillChange({ name: someSkillList[mobileIndex % NUM_CARDS].name });
    }
  }, [mobileIndex, isMobile, onHoverSkillChange]);


  if (isMobile) {
    const i = mobileIndex % NUM_CARDS;
    const card = hand[i];
    const { dx, dy, dθ } = jitter[i];
    const liftX = 15 * Math.sin(dθ * Math.PI / 180);
    const liftY = -10 * Math.cos(dθ * Math.PI / 180);

    return (
      <>
        <button
          onClick={() => setMobileIndex((i) => (i - 1 + NUM_CARDS) % NUM_CARDS)}
          style={{
            position: 'absolute',
            left: '5vw',
            top: '80vh',
            transform: 'translateY(-50%)',
            zIndex: 9999,
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
          }}
        >
          ←
        </button>

        <motion.div
          key={`${card.suit}-${card.value}`}
          style={{
            position: "absolute",
            left: "calc(50vw - 75px)",
            bottom: "35vh",
            rotate: dθ,
            zIndex: 100,
          }}
        >
          <Card suit={card.suit} value={card.value} x={0} y={0} skill={someSkillList[i]} isMobile={isMobile} />
        </motion.div>
        
        <button
          onClick={() => setMobileIndex((i) => (i + 1) % NUM_CARDS)}
          style={{
            position: 'absolute',
            right: '5vw',
            top: '80vh',
            transform: 'translateY(-50%)',
            zIndex: 9999,
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
          }}
        >
          →
        </button>
      </>
    );
  }


  return (
    <>
    
      {hand.map((card, i) => {
        const o   = i - c;
        const x0  = 48 + o * 4.5;
        const θ0  =  o * 3.5;
        const y0  = 70 + 0.3*o*o - θ0*0.15;

        const { dx, dy, dθ } = jitter[i];
        const x = x0 + dx, y = y0 + dy, θ = θ0 + dθ;

        const liftX = 15 * Math.sin(θ * Math.PI / 180);
        const liftY = -10 * Math.cos(θ * Math.PI / 180);

        return (
          <motion.div
            key={`${card.suit}-${card.value}`}
            style={{
              position: "absolute",
              left: `${x}vw`,
              top:  `${y}vh`,
              transformOrigin: "center bottom",
              rotate: θ,
              zIndex: 100 - Math.abs(o),
            }}
            whileHover={{
              x: `${liftX}vh`,
              y: `${liftY}vh`,
              scale: 1.08,
              transition: { duration: .25, ease: "easeOut" },
              zIndex: 99999
            }}
            onMouseEnter={() => onHoverSkillChange({ name: someSkillList[i].name })}  
            onMouseLeave={() => onHoverSkillChange(null)}
          >
            <Card
              suit={card.suit}
              value={card.value}
              x={0}
              y={0}
              skill={someSkillList[i]}
            />
          </motion.div>
        );
      })}
    </>
  );
}
