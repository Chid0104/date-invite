import { useMemo } from 'react';

const EMOJIS = ['🌸', '🌺', '🌹', '✨', '💮'];

export default function Petals() {
  const petals = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      emoji:    EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left:     `${Math.random() * 100}%`,
      fontSize: `${14 + Math.random() * 10}px`,
      duration: `${7 + Math.random() * 10}s`,
      delay:    `${Math.random() * 12}s`,
    })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          top: '-60px',
          left: p.left,
          fontSize: p.fontSize,
          opacity: 0.75,
          animation: `fall ${p.duration} linear ${p.delay} infinite`,
        }}>
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
