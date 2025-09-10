import { useEffect, useRef, useState } from 'react'

type WaveParams = {
  amplitude: number
  frequency: number
  speed: number
  offsetY: number
  offsetX: number
  opacity: number
  colorId: string
}

const total = 25
const yMultipliers = Array.from({ length: total }, (_, i) => 25 - (5 * i) / (total - 1))

const baseWaves: WaveParams[] = Array.from({ length: total }, (_, i) => ({
  amplitude: 8 + Math.random() * 4, // entre 8 et 12
  frequency: 0.004 + Math.random() * 0.002,
  speed: 0.006 + Math.random() * 0.005,
  offsetY: -140 + i * yMultipliers[i],
  offsetX: 0,
  opacity: 0.8 - (i * (1 - 0.2)) / (total - 1),
  colorId: 'gradient1',
}))

export default function AnimatedWaves() {
  const pathRefs = useRef<Array<SVGPathElement | null>>([])
  const [width, setWidth] = useState(1980)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize() // première init
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const segments = 120
    const frameIds: number[] = []
    const tOffsets = new Array(baseWaves.length).fill(0)

    const optimalWidth = 1500
    let scaleCoef = width / optimalWidth
    if (scaleCoef < 1) scaleCoef = 1 // éviter un scale trop petit

    const draw = () => {
      const step = width / segments

      baseWaves.forEach((wave, idx) => {
        const path = pathRefs.current[idx]
        if (!path) return

        const slope = -0.1
        let d = `M 0 0 `

        for (let i = 0; i <= segments; i++) {
          const x = i * step + wave.offsetX

          const y =
            (wave.offsetY +
            wave.amplitude *
              Math.sin(wave.frequency * x + Math.sin(wave.frequency * x + tOffsets[idx])) +
            x * slope) * scaleCoef

          

          d += `L ${x} ${y} `
        }

        d += `L ${width} 0 Z`
        path.setAttribute('d', d)
        tOffsets[idx] += wave.speed
      })

      frameIds[0] = requestAnimationFrame(draw)
    }

    draw()
    return () => frameIds.forEach(id => cancelAnimationFrame(id))
  }, [width])

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} 320`}
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            {/* <stop offset="0%" stopColor="#ff00ff" /> */}
            {/* <stop offset="100%" stopColor="#00ffff" /> */}
            {/* <stop offset="0%" stopColor="#ff8c00" />
            <stop offset="100%" stopColor="#ffe4e1" /> */}
            <stop offset="0%" stopColor="#ff9f00" />
            <stop offset="100%" stopColor="#bf00ff" />
          </linearGradient>
        </defs>

        {baseWaves.map((wave, i) => (
          <path
            key={i}
            ref={el => {
              pathRefs.current[i] = el
            }}
            fill={`url(#${wave.colorId})`}
            style={{ fillOpacity: wave.opacity }}
          />
        ))}
      </svg>
    </div>
  )
}
