import React from 'react';

export const FloatingParticles: React.FC<{ count?: number }> = ({ count = 18 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 100) / count + (Math.sin(i) * 5)}%`,
    size: (i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5),
    delay: `${(i * 0.7) % 5}s`,
    duration: `${8 + (i % 5) * 2}s`,
    opacity: 0.2 + (i % 4) * 0.15
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute rounded-full bg-[#C6A56B] shadow-[0_0_8px_#C6A56B]"
          style={{
            left: p.left,
            bottom: '-20px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay
          }}
        />
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          20% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-110vh) translateX(30px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
