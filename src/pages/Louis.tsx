import SpaceBackground from '../components/louis/Background/SpaceBackground'
import SkillsOrbit from '../components/louis/SkillsOrbit'
import {useState} from 'react'
import Timeline from '../components/louis/Timeline'
import HologramCarousel from '../components/louis/HologramCarousel'
import ClickSpark from '../components/louis/ClickSpark';
import Bug from '../components/louis/Bug'
import SocialBar from '../components/louis/Network/SocialBar'
import texts from '../texts/louis/texts.json'

export default function Louis() {
  const [isZoomedSkills, setIsZoomedSkills] = useState(false);
  const isMobile = window.innerWidth <= 768;
  // Parent.jsx/tsx
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: isMobile ? '280vh' : '100vh', overflow: isMobile ? 'auto' : 'hidden', overflowX: 'hidden', maxWidth: '100vw', touchAction: isMobile ? 'manipulation' : '' }}>
        <SpaceBackground />
        <main
          style={{
            height: isMobile ? '280vh' : '100vh',
            minHeight: '100vh',
            width: '100vw',
            overflow: 'hidden', 
            maxWidth: '100vw',
            position: 'relative',
            zIndex: 1,
          }}
        >
            <ClickSpark
              sparkColor='#fff'
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
          <Timeline isZoomedSkills={isZoomedSkills} isMobile={isMobile} language={language} />
          <SkillsOrbit isZoomedSkills={isZoomedSkills} setIsZoomedSkills={setIsZoomedSkills} isMobile={isMobile} language={language} />
          <HologramCarousel
            images={["projet_dod.png", 'projet_jeu.png', 'projet_goto.png', "projet_parici.png", "projet_scamazon.png"]}
            descriptions={[
              texts["louis"]["hologramCarousel"]["projet_dod"][language],
              texts["louis"]["hologramCarousel"]["projet_jeu"][language],
              texts["louis"]["hologramCarousel"]["projet_goto"][language],
              texts["louis"]["hologramCarousel"]["projet_parici"][language],
              texts["louis"]["hologramCarousel"]["projet_scamazon"][language]
            ]} 
            githubLinks={[
              "https://github.com/DoDLooki/DeitiesOfDeath", 
              "https://github.com/Looki-fr/game",
              "https://github.com/deway-developpement/Goto",
              "https://github.com/Mastercamp-2024-Team-5/Pari-ci",
              "https://github.com/Looki-fr/scamazon",
            ]} 
            externalLinks={["https://thedodclan.com/", "", "https://deway.fr/goto/", "", ""]} 
            isZoomedSkills={isZoomedSkills}
            isMobile={isMobile}
            language={language}
          />
          </ClickSpark>
          <Bug/>
          <SocialBar isZoomedSkills={isZoomedSkills} isMobile={isMobile} language={language} setLanguage={setLanguage} />
        </main>
      </div>
  )
}
