import React, { useEffect, useState, useMemo } from 'react'
import GalaxyShape from './GalaxyShape'

const NUM_STARS = (window.innerWidth * window.innerHeight) / 7000


export default function SpaceBackground() {
  const [showShootingStar, setShowShootingStar] = useState(false)

  const stars = useMemo(() =>
    Array.from({ length: NUM_STARS }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    })), [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowShootingStar(true)
      setTimeout(() => setShowShootingStar(false), 3000)
    }, Math.random() * 10000 + 50000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      @keyframes shootStraight {
        0%   { transform: translateX(0);       opacity: 1; }
        70%  { opacity: 0; }
        100% { transform: translateX(-110vw); opacity: 0; }
        }

    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const galaxy = useMemo(() => <GalaxyShape />, [])


  return (
    <div style={wrapperStyle}>
        {galaxy}
    
      {stars.map(star => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: `${star.y}vh`,
            left: `${star.x}vw`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {showShootingStar && (
        <div style={rotatedWrapperStyle}>
          <div style={shootingStarStyle} />
        </div>
      )}
    </div>
  )
}

const wrapperStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
  overflow: 'hidden',
  zIndex: -1,
}

// Rotated container to tilt the movement
const rotatedWrapperStyle: React.CSSProperties = {
  position: 'absolute',
  top: '60vh',
  left: '100vw',
  transform: 'rotate(17deg)', // controls the diagonal angle
  transformOrigin: 'top left',
  width: '200px',
  height: '2px',
  zIndex: 2,
  pointerEvents: 'none',
}

const shootingStarStyle: React.CSSProperties = {
  width: '120px',
  height: '2px',
  background: 'linear-gradient(to right, white, rgba(255,255,255,0))',
  animation: 'shootStraight 2s forwards',
}
