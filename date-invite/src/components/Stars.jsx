import { useMemo } from 'react';

export default function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 120 }, (_, i) => ({
      id: i,
      left:     `${Math.random() * 100}%`,
      top:      `${Math.random() * 100}%`,
      size:     Math.random() < 0.3 ? 3 : 2,
      duration: `${2 + Math.random() * 4}s`,
      delay:    `${Math.random() * 5}s`,
    })), []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: s.left, top: s.top,
          width: s.size, height: s.size,
          background: '#fff',
          borderRadius: '50%',
          animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
        }} />
      ))}
    </div>
  );
}
