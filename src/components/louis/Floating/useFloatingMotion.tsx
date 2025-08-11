import React, { useEffect } from "react";

const useFloatingMotion = (ref: React.RefObject<HTMLElement>, multiplier: number=0.7) => {
  useEffect(() => {
    if (!ref.current) return;

    let t = 0;
    let frame: number;
    const rand = (base: number, spread: number) => base + (Math.random() - 0.5) * spread;
    const sign = () => (Math.random() < 0.5 ? -1 : 1);

    const coeff = {
      wx1: rand(1.2, 0.3) * sign(),
      wx2: rand(0.4, 0.12) * sign(),
      wy1: rand(0.9, 0.25) * sign(),
      wy2: rand(0.2, 0.12) * sign(),
      wr: rand(0.5, 0.12) * sign(),
      ax1: rand(10, 2.5),
      ax2: rand(4, 1),
      ay1: rand(12, 3),
      ay2: rand(3, 0.75),
      ar: rand(1.5, 0.4),
      phx1: Math.random() * Math.PI * 2,
      phx2: Math.random() * Math.PI * 2,
      phy1: Math.random() * Math.PI * 2,
      phy2: Math.random() * Math.PI * 2,
      phr: Math.random() * Math.PI * 2,
    } as const;

    const float = () => {
      t += 0.008;
      const x =
        multiplier *
        (Math.sin(coeff.wx1 * t + coeff.phx1) * coeff.ax1 +
          Math.cos(coeff.wx2 * t + coeff.phx2) * coeff.ax2);
      const y =
        multiplier *
        (Math.cos(coeff.wy1 * t + coeff.phy1) * coeff.ay1 +
          Math.sin(coeff.wy2 * t + coeff.phy2) * coeff.ay2);
      const r = 0.7 * Math.sin(coeff.wr * t + coeff.phr) * coeff.ar;

      ref.current!.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${r.toFixed(
        2,
      )}deg)`;

      frame = requestAnimationFrame(float);
    };

    float();
    return () => cancelAnimationFrame(frame);
  }, [ref]);
};

export default useFloatingMotion;