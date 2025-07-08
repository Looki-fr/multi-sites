export default function AnimatedWavesCss() {
  return (
    <>
      <div className="waves-container">
        <svg width="0" height="0">
          <defs>
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff00ff" />
              <stop offset="100%" stopColor="#00ffff" />
            </linearGradient>
          </defs>
        </svg>

        {/* VAGUE 1 */}
        <svg className="wave wave1" viewBox="0 0 2000 320" preserveAspectRatio="none">
          <path
            d="M0,140 C250,40 500,240 750,140 C1000,40 1250,240 1500,140 C1750,40 2000,240 2000,140 L2000,0 L0,0 Z"
            fill="url(#mainGradient)"
            fillOpacity="0.4"
          />
        </svg>



        {/* VAGUE 3 */}
        <svg className="wave wave3" viewBox="0 0 2000 320" preserveAspectRatio="none">
          <path
            d="M0,150 C220,80 440,220 660,150 C880,80 1100,220 1320,150 C1540,80 1760,220 2000,150 L2000,0 L0,0 Z"
            fill="url(#mainGradient)"
            fillOpacity="0.25"
          />
        </svg>

        {/* VAGUE 4 — plus large + offset */}
        <svg className="wave wave4" viewBox="0 0 2200 320" preserveAspectRatio="none">
          <path
            d="M-100,180 C300,100 700,260 1100,180 C1500,100 1900,260 2300,180 L2300,0 L-100,0 Z"
            fill="url(#mainGradient)"
            fillOpacity="0.2"
          />
        </svg>

        {/* VAGUE 5 */}
        <svg className="wave wave5" viewBox="0 0 2000 320" preserveAspectRatio="none">
          <path
            d="M0,170 C260,100 520,240 780,170 C1040,100 1300,240 1560,170 C1820,100 2000,240 2000,170 L2000,0 L0,0 Z"
            fill="url(#mainGradient)"
            fillOpacity="0.15"
          />
        </svg>

        {/* VAGUE 6 (copie de la 5) */}
        <svg className="wave wave5" viewBox="0 0 2000 320" preserveAspectRatio="none">
          <path
            d="M0,170 C260,100 520,240 780,170 C1040,100 1300,240 1560,170 C1820,100 2000,240 2000,170 L2000,0 L0,0 Z"
            fill="url(#mainGradient)"
            fillOpacity="0.1"
          />
        </svg>

      </div>

      <style jsx>{`
        .waves-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: white;
          z-index: 0;
        }

        .wave {
          position: absolute;
          width: 100%;
          height: 150%; /* plus de hauteur pour un effet de vague plus ample */
          animation: waveFloat 6s ease-in-out infinite alternate;
        }

        .wave1 {
          top: -300px;
          animation-duration: 17s;
        }
        .wave2 {
          top: -225px;
          animation-duration: 13s;
        }
        .wave3 {
          top: -150px;
          animation-duration: 18s;
        }
        .wave4 {
          top: -75px;
          animation-duration: 15s;
        }
        .wave5 {
          top: 0px;
          animation-duration: 10s;
        }

        @keyframes waveFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-60px); /* effet vertical plus visible */
          }
        }

      `}</style>
    </>
  );
}
