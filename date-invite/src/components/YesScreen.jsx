import Confetti from './Confetti';

export default function YesScreen() {
  return (
    <>
      <Confetti />
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'radial-gradient(ellipse at center, #3b0d1a 0%, #0e0407 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '2rem',
        animation: 'fadeIn .8s ease',
      }}>
        <div style={{ fontSize: '5rem', animation: 'pop .5s cubic-bezier(.36,.07,.19,.97)' }}>
          💑
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          color: '#f7c5d0',
          marginTop: '1.5rem',
        }}>
          She said YES! 🎉
        </h1>
        <p style={{
          fontFamily: "'Lora', serif",
          fontStyle: 'italic',
          color: 'rgba(247,197,208,.7)',
          marginTop: '.8rem',
          fontSize: '1.1rem',
        }}>
          Get ready for the most magical date ever. I can't wait. 🌹
        </p>
      </div>
    </>
  );
}
