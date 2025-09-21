import React from 'react';

type CardProps = {
  suit: 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
  value: string;
  x: number;
  y: number;
  skill?: { name: string; src: string };
  isMobile: boolean;
};

type Pip = {
  left: string;
  top: string;
  flip?: boolean;
};

const Card: React.FC<CardProps> = ({ suit, value, x, y, skill, isMobile }) => {
  const display = value === '10' ? '10' : value.charAt(0);
  const isRed = suit === 'Hearts' || suit === 'Diamonds';
  const isFace = ['Jack', 'Queen', 'King'].includes(value);

  const getPipsForValue = (cardValue: string): Pip[] => {
    const center = (l: string, t: string, flip = false) => ({ left: l, top: t, flip });

    switch (cardValue) {
      case 'Ace': return [center('50%', '50%')];
      case '2': return [center('50%', '20%'), center('50%', '80%', true)];
      case '3': return [center('50%', '50%'), center('50%', '20%'), center('50%', '80%', true)];
      case '4': return [
        center('33%', '20%'), center('33%', '80%', true),
        center('67%', '20%'), center('67%', '80%', true)
      ];
      case '5': return [
        center('50%', '50%'),
        center('33%', '20%'), center('33%', '80%', true),
        center('67%', '20%'), center('67%', '80%', true)
      ];
      case '6': return [
        center('33%', '50%'), center('33%', '20%'), center('33%', '80%', true),
        center('67%', '50%'), center('67%', '20%'), center('67%', '80%', true)
      ];
      case '7': return [
        ...getPipsForValue('6'),
        center('50%', '35%')
      ];
      case '8': return [
        center('33%', '20%'), center('33%', '40%'), center('33%', '60%', true), center('33%', '80%', true),
        center('67%', '20%'), center('67%', '40%'), center('67%', '60%', true), center('67%', '80%', true)
      ];
      case '9': return [
        center('50%', '50%'),
        center('33%', '20%'), center('33%', '40%'), center('33%', '60%', true), center('33%', '80%', true),
        center('67%', '20%'), center('67%', '40%'), center('67%', '60%', true), center('67%', '80%', true)
      ];
      case '10': return [
        center('50%', '35%'), center('50%', '65%', true),
        center('33%', '20%'), center('33%', '40%'), center('33%', '60%', true), center('33%', '80%', true),
        center('67%', '20%'), center('67%', '40%'), center('67%', '60%', true), center('67%', '80%', true)
      ];
      default: return [];
    }
  };

  const pips = isFace ? [] : getPipsForValue(value);

  return (
    <div
      className="card-wrapper"
      style={{
        position: 'absolute',
        left: `${x}vw`,
        top: `${y}vh`,
        minWidth: '150px',
        minHeight: '200px',
        width: '9vw',
        height: '12vw',
        background: 'linear-gradient(to right bottom, white, #f0f0f0)',
        borderRadius: '5px',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.2)',
        isolation: 'isolate',
      }}
    >
      <div
        className="card"
        style={{ color: isRed ? 'crimson' : '#111' }}
      >

        {/* Corners */}
        {['top left', 'bottom right'].map((pos, i) => (
          <div key={i} className={`corner ${pos}`}>
            <h1>{display}</h1>
            <div className={`pip ${suit.toLowerCase()}`}></div>
          </div>
        ))}

        {/* Pips only for non-face cards */}
        <div className="pips">
          {pips.map((pip, i) => (
            <div
              key={i}
              className={`pip ${suit.toLowerCase()} ${pip.flip ? 'flip' : ''}`}
              style={{ left: pip.left, top: pip.top }}
            />
          ))}
        </div>

        {/* Skill Image always on center */}
        {skill && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              minHeight: '80px',
              height: '5.5vw',
              background: 'linear-gradient(to right bottom, white, #f0f0f0)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              src={skill.src}
              alt={skill.name}
              style={{
                minWidth: '70px',
                minHeight: '70px',
                width:'4.2vw',
                height: '4.2vw',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.2))',
              }}
            />
          </div>
        )}

      </div>

      <style>{`
        .card, .card * { color: inherit; }   /* tout hérite de la couleur de .card (red/black) */
        .pip::before { color: currentColor; }/* les symboles ♥♠♦♣ suivent la couleur héritée */

        .card {
          width: 100%;
          height: 100%;
          font-family: 'Lora', serif;
          font-weight: 700;
          position: relative;
        }

        .corner {
          position: absolute;
          text-align: center;
        }

        .top.left {
          top: 10px;
          left: 10px;
        }

        .bottom.right {
          bottom: 10px;
          right: 10px;
          transform: rotate(180deg);
        }

        .corner h1 {
          all: unset;             /* enlève les styles globaux (tailwind/typography) */
          display: block;
          font-size: clamp(1.5em, 1.5vw, 2.5em);
          line-height: 1;
          margin: 0;
        }

        .pip {
          font-family: serif;
          /* min = 1.3em (valeur actuelle) */
          font-size: clamp(0.7em, 1.3vw, 2em);
          ${isMobile ? "margin-top: 0.5rem;" : ""}
          ${isMobile ? "margin-bottom: 0.5rem;" : ""}
        }

        .pip.spades::before { content: '\\2660'; }
        .pip.hearts::before { content: '\\2665'; }
        .pip.clubs::before { content: '\\2663'; }
        .pip.diamonds::before { content: '\\2666'; }

        .pips {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .pips .pip {
          position: absolute;
          transform: translate(-50%, -50%);
          font-size: clamp(1em, 2.3vw, 3.5em);
        }

        .pips .pip.flip {
          transform: translate(-50%, -50%) rotate(180deg);
        }

      `}</style>
    </div>
  );
};

export default Card;
