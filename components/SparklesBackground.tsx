import { memo, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface SparklesBackgroundProps {
  count?: number;
}

const SparklesBackground = memo(function SparklesBackground({ count = 50 }: SparklesBackgroundProps) {
  // Reduce particles on mobile/low-end devices
  const effectiveCount = useMemo(() => {
    if (typeof window === "undefined") return count;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return 0;
    return isMobile ? Math.floor(count * 0.5) : count;
  }, [count]);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [effectiveCount]
  );

  if (effectiveCount === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="sparkle-particle will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

export default SparklesBackground;
