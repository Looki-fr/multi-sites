import SpaceBackground from '../components/louis/Background/SpaceBackground'
import SkillsOrbit from '../components/louis/SkillsOrbit'
import {useState} from 'react'
import Timeline from '../components/louis/Timeline'
import HologramCarousel from '../components/louis/HologramCarousel'
import ClickSpark from '../components/louis/ClickSpark';
import Bug from '../components/louis/Bug'
import SocialBar from '../components/louis/Network/SocialBar'

export default function Louis() {
  const [isZoomedSkills, setIsZoomedSkills] = useState(false);
  const isMobile = window.innerWidth <= 768;
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
          <Timeline isZoomedSkills={isZoomedSkills} isMobile={isMobile} />
          <SkillsOrbit isZoomedSkills={isZoomedSkills} setIsZoomedSkills={setIsZoomedSkills} isMobile={isMobile} />
          <HologramCarousel
            images={["projet_dod.png", 'projet_jeu.png', 'projet_goto.png', "projet_parici.png", "projet_scamazon.png"]}
            descriptions={[
              "Site communautaire d'un jeu vidéo", 
              "Jeu de plateforme à carte générée procéduralement (python)",
              "Application mobile de randonnée collaborative",
              "Site d'itinéraire de transport en commun dans Paris",
              "Machine learning & web scapping : analyse d'avis Amazon et recommendation de produits"
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
          />
          </ClickSpark>
          <Bug/>
          <SocialBar isZoomedSkills={isZoomedSkills} isMobile={isMobile} />
        </main>
      </div>
  )
}
