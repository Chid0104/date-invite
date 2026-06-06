import { useState, useRef, useCallback } from 'react';
import Stars from './components/Stars';
import Petals from './components/Petals';
import YesScreen from './components/YesScreen';

const TAUNT_MESSAGES = [
  'Nope! 😜', 'Run! 🏃', 'Catch me if you can! 🙈',
  'Not today! 😂', 'Too slow! 💨', 'Hehe~ 😋', 'Nice try! 😏',
  'Come on… 🙃', 'Almost! 😂', 'Not a chance! 💅',
];

export default function App() {
  const [said, setSaid]           = useState(false);
  const [noPos, setNoPos]         = useState({ x: 0, y: 0, set: false });
  const [noScale, setNoScale]     = useState(1);
  const [taunt, setTaunt]         = useState('No 🙈');
  const escapesRef                = useRef(0);
  const rowRef                    = useRef(null);
  const noBtnRef                  = useRef(null);

  const moveNo = useCallback(() => {
    if (!rowRef.current || !noBtnRef.current) return;
    escapesRef.current++;
    const row = rowRef.current.getBoundingClientRect();
    const btn = noBtnRef.current.getBoundingClientRect();
    const maxX = row.width  - btn.width;
    const maxY = row.height - btn.height;
    setNoPos({ x: Math.random() * maxX, y: Math.random() * maxY, set: true });
    setNoScale(Math.max(0.35, 1 - escapesRef.current * 0.07));
    setTaunt(TAUNT_MESSAGES[escapesRef.current % TAUNT_MESSAGES.length]);
  }, []);

  if (said) return <YesScreen />;

  return (
    <>
      {/* Backgrounds */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 20% 80%, rgba(192,57,90,.25) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 80% 20%, rgba(201,146,58,.15) 0%, transparent 65%),
          radial-gradient(ellipse 80% 80% at 50% 50%, rgba(59,13,26,1) 0%, #0e0407 100%)
        `,
      }} />
      <Stars />
      <Petals />

      {/* Scene */}
      <div style={{
        position: 'relative', zIndex: 10,
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}>
        {/* Card */}
        <div style={{
          width: 'min(520px, 92vw)',
          background: '#fdf6ee',
          borderRadius: '4px',
          boxShadow: `
            0 0 0 1px rgba(201,146,58,.4),
            0 8px 40px rgba(0,0,0,.6),
            0 0 80px rgba(192,57,90,.2)
          `,
          animation: 'floatCard 6s ease-in-out infinite',
          overflow: 'hidden',
        }}>

          {/* Envelope flap */}
          <div style={{ position: 'relative', height: '100px', overflow: 'hidden' }}>
            <div style={{
              width: '100%', height: 0,
              borderLeft: 'min(260px, 46vw) solid transparent',
              borderRight: 'min(260px, 46vw) solid transparent',
              borderTop: '100px solid #e8d5b7',
            }} />
            <span style={{
              position: 'absolute', top: '12px', left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '2rem',
            }}>💌</span>
          </div>

          {/* Letter body */}
          <div style={{
            padding: '2.4rem 2.8rem 2rem',
            borderTop: '2px solid rgba(201,146,58,.3)',
            background: `repeating-linear-gradient(
              transparent, transparent 31px,
              rgba(192,57,90,.08) 31px, rgba(192,57,90,.08) 32px
            )`,
          }}>
            <p style={{
              fontSize: '.72rem', letterSpacing: '.12em',
              color: '#c9923a', textTransform: 'uppercase', marginBottom: '1.4rem',
            }}>
              A love letter, just for you 🌹
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', fontSize: '1.55rem',
              color: '#c0395a', marginBottom: '1.2rem',
            }}>
              My dearest,
            </p>

            <p style={{ fontSize: '.97rem', lineHeight: 1.9, color: '#4a2030', marginBottom: '1rem' }}>
              Every moment I spend with you feels like the most beautiful chapter of a story I never want to end.
              Your laugh is my favorite sound, and your smile —{' '}
              <em style={{ fontStyle: 'italic', color: '#c0395a' }}>it genuinely stops my heart</em>.
            </p>

            <p style={{ fontSize: '.97rem', lineHeight: 1.9, color: '#4a2030', marginBottom: '1rem' }}>
              I've been searching for the right words, the right moment, the right everything.
              And then I realized —{' '}
              <em style={{ fontStyle: 'italic', color: '#c0395a' }}>there's no perfect moment, only the one I make with you.</em>
            </p>

            {/* Heart divider */}
            <div style={{
              textAlign: 'center', fontSize: '1.3rem',
              margin: '1.4rem 0', letterSpacing: '.4rem',
              animation: 'heartbeat 1.4s ease-in-out infinite',
            }}>
              ♥ ♥ ♥
            </div>

            <p style={{ fontSize: '.97rem', lineHeight: 1.9, color: '#4a2030', marginBottom: '1rem' }}>
              So, with all the courage and all the love I have in me, I'm asking you this one little question…
            </p>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.55rem', textAlign: 'center',
              color: '#3b0d1a', margin: '1.6rem 0 .5rem', lineHeight: 1.4,
            }}>
              "Will you go on a date with me?" 🌙✨
            </p>

            <div style={{ textAlign: 'right', marginTop: '1.4rem', color: '#7a3045', fontSize: '.9rem' }}>
              <span style={{ fontStyle: 'italic' }}>With all my love,</span><br />
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.4rem', color: '#c0395a',
              }}>
                Your person 💕
              </span>
            </div>
          </div>

          {/* Button row */}
          <div ref={rowRef} style={{
            display: 'flex', gap: '1rem',
            justifyContent: 'center', alignItems: 'center',
            padding: '1.6rem 2rem 2rem',
            position: 'relative', minHeight: '90px',
          }}>
            {/* YES */}
            <button
              onClick={() => setSaid(true)}
              style={{
                fontFamily: "'Lora', serif", fontSize: '1rem',
                padding: '.75rem 2.2rem', border: 'none', borderRadius: '50px',
                cursor: 'pointer', letterSpacing: '.04em',
                background: 'linear-gradient(135deg, #c0395a, #8b1a33)',
                color: '#fff',
                boxShadow: '0 4px 18px rgba(192,57,90,.5)',
                transition: 'transform .2s, box-shadow .2s',
                zIndex: 2,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow = '0 6px 28px rgba(192,57,90,.7)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(192,57,90,.5)';
              }}
            >
              Yes! 💖
            </button>

            {/* NO — runs away */}
            <button
              ref={noBtnRef}
              title={taunt}
              onMouseEnter={moveNo}
              onTouchStart={e => { e.preventDefault(); moveNo(); }}
              style={{
                fontFamily: "'Lora', serif", fontSize: '1rem',
                padding: '.75rem 2.2rem', border: 'none', borderRadius: '50px',
                cursor: 'pointer', letterSpacing: '.04em',
                background: '#e8d5b7', color: '#7a3045',
                boxShadow: '0 2px 8px rgba(0,0,0,.1)',
                transition: 'transform .15s',
                transform: `scale(${noScale})`,
                position: noPos.set ? 'absolute' : 'relative',
                left: noPos.set ? noPos.x : undefined,
                top:  noPos.set ? noPos.y  : undefined,
                zIndex: 2,
                userSelect: 'none',
              }}
            >
              {taunt}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
