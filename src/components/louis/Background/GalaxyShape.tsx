const GalaxyShape = () => {
  const blobs = []
  const centerX = 20+Math.random() * 60
  const centerY = 20+Math.random() * 60
  const arms = 4
  const a = 1
  const b = 0.14
  const maxBlobs = 250
  const rMax = a * Math.exp(b * (maxBlobs * 0.1))

  for (let y = 0; y < 2; y++) {
    for (let i = 0; i < maxBlobs; i++) {
        const arm = i % arms
        const theta = i * 0.1 + (arm * (2 * Math.PI / arms)) // tighter steps

        const r = a * Math.exp(b * theta)

        const noiseX = (Math.random() - 0.5) * 5
        const noiseY = (Math.random() - 0.5) * 5

        const x = centerX + r * Math.cos(theta) + noiseX
        const y = centerY + r * Math.sin(theta) + noiseY

        const size = 6 + Math.random() * 10

        const baseOpacity = 0.2
        const maxOpacity = 0.5
        const opacity = r<10 ? baseOpacity : maxOpacity

        const colors = ['#ff8a00', '#ff0077', '#9b00ff']
        const color = colors[Math.floor(Math.random() * colors.length)]

        blobs.push(
        <div
            key={i}
            style={{
            position: 'absolute',
            top: `${y}vh`,
            left: `${x}vw`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: color,
            opacity: opacity,
            filter: 'blur(30px)',
            pointerEvents: 'none',
            zIndex: 0,
            }}
        />
        )
    }

  }
  return <>{blobs}</>
}

export default GalaxyShape
