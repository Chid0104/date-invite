import { useMemo } from 'react';

const ITEMS = ['💖', '🌹', '✨', '🎊', '💕', '🌸', '💗', '🎉'];

export default function Confetti() {
  const pieces = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      emoji:    ITEMS[Math.floor(Math.random() * ITEMS.length)],
      left:     `${Math.random() * 100}%`,
      fontSize: `${1 + Math.random() * 1.5}rem`,
      duration: `${2 + Math.random() * 3}s`,
      delay:    `${Math.random() * 1.5}s`,
    })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          top: '-20px',
          left: p.left,
          fontSize: p.fontSize,
          animation: `confettiFall ${p.duration} linear ${p.delay} forwards`,
        }}>
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
