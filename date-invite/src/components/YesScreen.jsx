import { useState } from 'react';
import Confetti from './Confetti';
import Stars from './Stars';
import Petals from './Petals';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const FULL_DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const TIME_OPTIONS = [
  { id: 1, emoji: '☀️', label: 'Afternoon',  sub: 'Sunny & sweet'       },
  { id: 2, emoji: '🌅', label: 'Sunset',     sub: 'Golden hour magic ✨' },
  { id: 3, emoji: '🌙', label: 'Evening',    sub: 'Candlelight vibes 🕯️' },
];

const VIBE_OPTIONS = [
  { id: 1, emoji: '🍽️', label: 'Fancy dinner',    sub: 'Dress up & dine 💃'        },
  { id: 2, emoji: '🎬', label: 'Movie night',     sub: 'Cozy & close 🍿'           },
  { id: 3, emoji: '🌊', label: 'Outdoor picnic',  sub: 'Nature & romance 🌸'       },
  { id: 4, emoji: '🎡', label: 'Theme park',      sub: 'Fun & adventurous 🎢'      },
  { id: 5, emoji: '☕', label: 'Coffee & walk',   sub: 'Chill & easy going 🌿'     },
];

function Calendar({ onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [cur, setCur] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [selected, setSelected] = useState(null);

  const firstDay = new Date(cur.y, cur.m, 1).getDay();
  const daysInMonth = new Date(cur.y, cur.m + 1, 0).getDate();
  const isPrevDisabled = cur.y === today.getFullYear() && cur.m === today.getMonth();

  const changeMonth = (dir) => {
    setCur(prev => {
      let m = prev.m + dir;
      let y = prev.y;
      if (m < 0) { m = 11; y--; }
      if (m > 11) { m = 0; y++; }
      return { y, m };
    });
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const bg = {
    background: 'rgba(253,246,238,0.06)',
    border: '1px solid rgba(201,146,58,.3)',
    borderRadius: '16px',
    padding: '1.4rem',
    width: 'min(360px, 88vw)',
  };

  return (
    <div style={bg}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
        <button
          onClick={() => !isPrevDisabled && changeMonth(-1)}
          style={{
            background: 'none', border: '1px solid rgba(201,146,58,.3)',
            borderRadius: '8px', width: '32px', height: '32px',
            cursor: isPrevDisabled ? 'default' : 'pointer',
            color: isPrevDisabled ? 'rgba(247,197,208,.2)' : 'rgba(247,197,208,.7)',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >‹</button>
        <span style={{ fontFamily: "'Playfair Display', serif", color: '#f7c5d0', fontSize: '1rem' }}>
          {MONTHS[cur.m]} {cur.y}
        </span>
        <button
          onClick={() => changeMonth(1)}
          style={{
            background: 'none', border: '1px solid rgba(201,146,58,.3)',
            borderRadius: '8px', width: '32px', height: '32px',
            cursor: 'pointer', color: 'rgba(247,197,208,.7)',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >›</button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '6px' }}>
        {DAY_NAMES.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '.7rem', color: 'rgba(247,197,208,.4)', fontFamily: "'Lora', serif", padding: '2px 0' }}>{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`e-${i}`} />;
          const date = new Date(cur.y, cur.m, d);
          date.setHours(0, 0, 0, 0);
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isSel = selected && date.getTime() === selected.getTime();
          return (
            <div
              key={d}
              onClick={() => !isPast && setSelected(date)}
              style={{
                textAlign: 'center', padding: '7px 2px', fontSize: '.85rem',
                borderRadius: '8px', cursor: isPast ? 'default' : 'pointer',
                color: isPast ? 'rgba(247,197,208,.2)' : isSel ? '#fff' : isToday ? '#f7c5d0' : 'rgba(247,197,208,.8)',
                background: isSel ? 'linear-gradient(135deg, #c0395a, #8b1a33)' : 'transparent',
                border: isToday && !isSel ? '1px solid rgba(192,57,90,.5)' : '1px solid transparent',
                fontFamily: "'Lora', serif",
                fontWeight: isSel ? '600' : '400',
                transition: 'all .15s',
              }}
            >{d}</div>
          );
        })}
      </div>

      {/* Confirm button */}
      <button
        disabled={!selected}
        onClick={() => selected && onSelect(selected)}
        style={{
          marginTop: '1.2rem', width: '100%',
          fontFamily: "'Lora', serif", fontSize: '.95rem',
          padding: '.7rem', border: 'none', borderRadius: '50px',
          cursor: selected ? 'pointer' : 'default',
          background: selected ? 'linear-gradient(135deg, #c0395a, #8b1a33)' : 'rgba(253,246,238,0.08)',
          color: selected ? '#fff' : 'rgba(247,197,208,.3)',
          border: selected ? 'none' : '1px solid rgba(201,146,58,.2)',
          transition: 'all .2s',
        }}
      >
        {selected
          ? `${FULL_DAYS[selected.getDay()]}, ${MONTHS[selected.getMonth()]} ${selected.getDate()} ✓`
          : 'Pick a day'}
      </button>
    </div>
  );
}

export default function YesScreen() {
  const [step, setStep] = useState('celebrate');
  const [showConfetti, setShowConfetti] = useState(true);
  const [picks, setPicks] = useState({ date: null, time: null, vibe: null });

  const pick = (key, val) => {
    setPicks(p => ({ ...p, [key]: val }));
    setShowConfetti(false);
    setTimeout(() => {
      if (key === 'date') setStep('time');
      if (key === 'time') setStep('vibe');
      if (key === 'vibe') setStep('final');
    }, 300);
  };

  const bg = {
    position: 'fixed', inset: 0, zIndex: 100,
    background: 'radial-gradient(ellipse at center, #3b0d1a 0%, #0e0407 100%)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', padding: '2rem',
    animation: 'fadeIn .8s ease',
    overflowY: 'auto',
  };

  const card = {
    background: 'rgba(253,246,238,0.06)',
    border: '1px solid rgba(201,146,58,.3)',
    borderRadius: '16px',
    padding: '1rem 1.4rem',
    cursor: 'pointer',
    transition: 'all .2s',
    marginBottom: '.8rem',
    width: 'min(360px, 88vw)',
    display: 'flex', alignItems: 'center', gap: '1rem',
    textAlign: 'left',
  };

  const formatDate = (d) =>
    `${FULL_DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  // ── CELEBRATE ──
  if (step === 'celebrate') return (
    <>
      {showConfetti && <Confetti />}
      <Stars /><Petals />
      <div style={bg}>
        <div style={{ fontSize: '5rem', animation: 'pop .5s cubic-bezier(.36,.07,.19,.97)' }}>💑</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', color: '#f7c5d0', marginTop: '1.5rem' }}>
          She said YES! 🎉
        </h1>
        <p style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: 'rgba(247,197,208,.7)', marginTop: '.8rem', fontSize: '1.05rem' }}>
          Now let's plan the perfect date… 🌹
        </p>
        <button
          onClick={() => { setShowConfetti(false); setStep('when'); }}
          style={{
            marginTop: '2rem', fontFamily: "'Lora', serif", fontSize: '1rem',
            padding: '.8rem 2.5rem', border: 'none', borderRadius: '50px', cursor: 'pointer',
            background: 'linear-gradient(135deg, #c0395a, #8b1a33)', color: '#fff',
            boxShadow: '0 4px 18px rgba(192,57,90,.5)',
            animation: 'heartbeat 1.4s ease-in-out infinite',
          }}
        >
          Let's plan it! 💕
        </button>
      </div>
    </>
  );

  // ── WHEN (Calendar) ──
  if (step === 'when') return (
    <><Stars /><Petals />
    <div style={bg}>
      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>📅</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#f7c5d0', marginBottom: '.5rem' }}>
        When would you like to go?
      </h2>
      <p style={{ color: 'rgba(247,197,208,.5)', fontSize: '.9rem', marginBottom: '1.5rem', fontFamily: "'Lora', serif" }}>
        Pick any day that feels right 🌸
      </p>
      <Calendar onSelect={(date) => pick('date', date)} />
    </div></>
  );

  // ── TIME ──
  if (step === 'time') return (
    <><Stars /><Petals />
    <div style={bg}>
      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>⏰</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#f7c5d0', marginBottom: '.5rem' }}>
        What time of day?
      </h2>
      <p style={{ color: 'rgba(247,197,208,.5)', fontSize: '.9rem', marginBottom: '1.5rem', fontFamily: "'Lora', serif" }}>
        Every hour with you is golden ✨
      </p>
      {TIME_OPTIONS.map(o => (
        <div key={o.id} style={card}
          onClick={() => pick('time', o)}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,57,90,.2)'; e.currentTarget.style.borderColor = '#c0395a'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(253,246,238,0.06)'; e.currentTarget.style.borderColor = 'rgba(201,146,58,.3)'; }}
        >
          <span style={{ fontSize: '2rem' }}>{o.emoji}</span>
          <div>
            <div style={{ color: '#f7c5d0', fontFamily: "'Playfair Display', serif", fontSize: '1.05rem' }}>{o.label}</div>
            <div style={{ color: 'rgba(247,197,208,.5)', fontSize: '.8rem', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>{o.sub}</div>
          </div>
        </div>
      ))}
    </div></>
  );

  // ── VIBE ──
  if (step === 'vibe') return (
    <><Stars /><Petals />
    <div style={bg}>
      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🎭</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#f7c5d0', marginBottom: '.5rem' }}>
        What's the vibe?
      </h2>
      <p style={{ color: 'rgba(247,197,208,.5)', fontSize: '.9rem', marginBottom: '1.5rem', fontFamily: "'Lora', serif" }}>
        I'll make it perfect, I promise 💌
      </p>
      {VIBE_OPTIONS.map(o => (
        <div key={o.id} style={card}
          onClick={() => pick('vibe', o)}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(192,57,90,.2)'; e.currentTarget.style.borderColor = '#c0395a'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(253,246,238,0.06)'; e.currentTarget.style.borderColor = 'rgba(201,146,58,.3)'; }}
        >
          <span style={{ fontSize: '2rem' }}>{o.emoji}</span>
          <div>
            <div style={{ color: '#f7c5d0', fontFamily: "'Playfair Display', serif", fontSize: '1.05rem' }}>{o.label}</div>
            <div style={{ color: 'rgba(247,197,208,.5)', fontSize: '.8rem', fontFamily: "'Lora', serif", fontStyle: 'italic' }}>{o.sub}</div>
          </div>
        </div>
      ))}
    </div></>
  );

  // ── FINAL SUMMARY ──
  if (step === 'final') return (
    <>
      <Confetti />
      <Stars /><Petals />
      <div style={bg}>
        <div style={{ fontSize: '3.5rem', animation: 'pop .5s cubic-bezier(.36,.07,.19,.97)' }}>🌹</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#f7c5d0', marginTop: '1rem', marginBottom: '.5rem' }}>
          It's a date! 💕
        </h1>
        <p style={{ color: 'rgba(247,197,208,.6)', fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '.95rem', marginBottom: '2rem' }}>
          Here's what we're doing together…
        </p>
        <div style={{
          background: 'rgba(253,246,238,0.07)', border: '1px solid rgba(201,146,58,.4)',
          borderRadius: '20px', padding: '1.8rem 2.2rem', width: 'min(380px, 90vw)',
          textAlign: 'left', boxShadow: '0 0 40px rgba(192,57,90,.15)',
        }}>
          {[
            { label: 'Date', value: picks.date ? formatDate(picks.date) : '', emoji: '📅' },
            { label: 'Time', value: picks.time?.label, emoji: picks.time?.emoji },
            { label: 'Vibe', value: picks.vibe?.label, emoji: picks.vibe?.emoji },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '1.8rem' }}>{row.emoji}</span>
              <div>
                <div style={{ color: 'rgba(247,197,208,.4)', fontSize: '.7rem', letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: "'Lora', serif" }}>{row.label}</div>
                <div style={{ color: '#f7c5d0', fontFamily: "'Playfair Display', serif", fontSize: '1.05rem' }}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '2rem', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.15rem', color: '#c0395a', animation: 'heartbeat 1.4s ease-in-out infinite' }}>
          I can't wait to be with you. 💖
        </p>
      </div>
    </>
  );
}