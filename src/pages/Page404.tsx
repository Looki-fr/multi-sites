import React, { useLayoutEffect, useState, useState as useStateIcon, type ChangeEvent, type CSSProperties } from 'react';
import FuzzyText from '../components/404/FuzzyText';
import FallingText from '../components/404/FallingText';
import { useNavigate } from 'react-router-dom';

function useLockBodyScroll(lock: boolean = true) {
  useLayoutEffect(() => {
    if (!lock) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyMargin = body.style.margin;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.margin = '0';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.margin = prevBodyMargin;
    };
  }, [lock]);
}

// Palette centralisée
const COLORS = {
  accent: '#ffcf00',
  accentDim: 'rgba(255,207,0,0.5)',
  bg: '#0d0d0d',
  bgPanel: '#1a1a1a',
  text: '#ffffff',
  textDim: '#bbbbbb',
};

// --- Style objects --- //
// NB: position fixed + inset 0 > couvre tout le viewport sans provoquer de scroll.
const rootStyle: CSSProperties = {
  position: 'fixed',
  inset: 0, // top:0,right:0,bottom:0,left:0
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '4rem 1rem 6rem',
  backgroundColor: COLORS.bg,
  color: COLORS.text,
  fontFamily: 'Inter, system-ui, sans-serif',
  lineHeight: 1.4,
  boxSizing: 'border-box',
};

const headerStyle: CSSProperties = {
  textAlign: 'center',
  marginBottom: '3rem',
  marginTop:'10vh',
  width: '100%',
  zIndex: 999,
  pointerEvents: 'none'
};

const subtitleStyle: CSSProperties = {
  marginTop: '0.5rem',
  fontSize: '1.25rem',
  fontWeight: 500,
  color: COLORS.textDim,
};

// IMPORTANT: ne pas mettre 100vh ici, sinon contenu + padding du root déborde -> scroll.
const fallingWrapperStyle: CSSProperties = {
  width: '100vw',
  height: '95vh',
  marginInline: 'auto',
  marginBottom: '4rem',
  textAlign: 'center',
  flex: '0 0 auto',
  alignContent: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  top:0
};

const footerStyle: CSSProperties = {
  marginTop: 'auto',
  paddingTop: '2rem',
  fontSize: '0.9rem',
  color: COLORS.textDim,
};

const homeLinkStyle: CSSProperties = {
  color: COLORS.accent,
  textDecoration: 'none',
  transition: 'color 0.15s ease, text-shadow 0.15s ease',
};

// Hover inline
const HoverLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({ href, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      style={{
        ...homeLinkStyle,
        color: hover ? '#ffffff' : COLORS.accent,
        textShadow: hover ? `0 0 8px ${COLORS.accentDim}` : undefined,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
};

// Style de surbrillance (si FallingText le supporte)
const highlightStyle: CSSProperties = {
  color: COLORS.accent,
  fontWeight: 600,
  filter: 'drop-shadow(0 0 4px ' + COLORS.accentDim + ')',
};

// Icon button home (haut gauche)
const iconButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '2rem',
  left: '2rem',
  width: '50px',
  height: '50px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  color: COLORS.text,
  opacity: 0.8,
  transition: 'opacity 0.15s ease, transform 0.15s ease',
  zIndex:9999
};

const IconHomeButton: React.FC<{ onClick: () => void }>=({onClick})=>{const [hover,setHover]=useState(false);return(<button
  type="button"
  aria-label="Retour à l'accueil"
  onClick={onClick}
  onMouseEnter={()=>setHover(true)}
  onMouseLeave={()=>setHover(false)}
  style={{...iconButtonStyle,opacity:hover?1:0.8,transform:hover?'scale(1.05)':'scale(1)'}}
>
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9.5L12 3l9 6.5"/>
    <path d="M5 10v10h5v-6h4v6h5V10"/>
  </svg>
</button>)};

const Page404: React.FC = () => {
  const [hoverIntensity, setHoverIntensity] = useState<number>(0.8);
  const [enableHover, setEnableHover] = useState<boolean>(true);

  // Verrouille le scroll du body quand la page 404 est affichée
  useLockBodyScroll(true);

  const navigate = useNavigate();

  const handleIntensityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHoverIntensity(parseFloat(e.target.value));
  };

  const handleEnableHoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnableHover(e.target.checked);
  };

  return (
    <div style={rootStyle}>
      <IconHomeButton onClick={() => navigate('/multi-sites/')} />
      <header style={headerStyle}>
        <FuzzyText baseIntensity={0.2} hoverIntensity={hoverIntensity} enableHover={enableHover}>
          404
        </FuzzyText>
        <h2 style={subtitleStyle}>Page non trouvée</h2>
      </header>

      <section style={fallingWrapperStyle}>
        <FallingText
          text={`Oups! 🧭 Cette page n'existe pas ou a été déplacée. Cliquer sur la maison pour retourner à l'accueil.`}
          highlightWords={['page', "l'accueil", 'Oups', 'maison', 'Cliquer']}
          highlightClass="highlighted"
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="clamp(1.2rem, 5vw ,2rem)"
          mouseConstraintStiffness={0.9}
        />
      </section>

      <footer style={footerStyle}/>
    </div>
  );
};

export default Page404;

