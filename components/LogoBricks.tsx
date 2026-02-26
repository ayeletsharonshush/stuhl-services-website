import { useState, useEffect } from "react";

interface LogoBricksProps {
  logoImage: string;
}

export function Logo3D({ logoImage }: LogoBricksProps) {
  return (
    <div className="logo-spin-3d shrink-0 overflow-hidden" style={{ width: '2.75rem', height: '2.75rem' }}>
      <img src={logoImage} alt="" className="w-full mix-blend-multiply" style={{ marginTop: '-8%', marginBottom: '-55%' }} />
    </div>
  );
}

export function LogoBricks({ logoImage }: LogoBricksProps) {
  const rows = 14;
  const cols = 10;
  const totalBricks = rows * cols;
  const animDuration = 2.5;
  const [phase, setPhase] = useState<'building' | 'reveal'>('building');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('reveal'), (animDuration + 0.5) * 1000);
    return () => clearTimeout(timer);
  }, []);

  const brandColors = ['#D42B2B', '#D99A1B', '#1E3A8A', '#38BDF8'];
  const bricks: { row: number; col: number; delay: number; color: string }[] = [];
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = 0; col < cols; col++) {
      const buildOrder = (rows - 1 - row) * cols + col;
      const delay = (buildOrder / totalBricks) * animDuration;
      const color = brandColors[(row + col) % brandColors.length];
      bricks.push({ row, col, delay, color });
    }
  }

  const brickW = 100 / cols;
  const brickH = 100 / rows;

  return (
    <div className="shrink-0 overflow-hidden" style={{ width: '3.25rem', height: '3.25rem', position: 'relative', marginTop: '-0.15rem' }}>
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: phase === 'building' ? 1 : 0 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0" style={{ zIndex: 1 }}>
          {bricks.map((b, i) => {
            const isOddRow = b.row % 2 === 1;
            const offsetX = isOddRow ? brickW * 0.5 : 0;
            return (
              <rect
                key={i}
                x={b.col * brickW + offsetX + 0.4}
                y={b.row * brickH + 0.4}
                width={brickW - 0.8}
                height={brickH - 0.8}
                rx="0.6"
                fill={b.color}
                className="logo-brick"
                style={{ animationDelay: `${b.delay}s` }}
              />
            );
          })}
        </svg>
        <img src={logoImage} alt="" className="w-full absolute inset-0" style={{ zIndex: 2, mixBlendMode: 'screen', marginTop: '-8%', opacity: 0 }} />
      </div>
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: phase === 'reveal' ? 1 : 0 }}
      >
        <img src={logoImage} alt="" className="w-full" style={{ marginTop: '-8%', marginBottom: '-55%' }} />
      </div>
    </div>
  );
}
