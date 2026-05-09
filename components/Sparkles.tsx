import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface SparklesProps {
  count?: number;
  className?: string;
}

interface Sparkle {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
}

const Sparkles = memo(function Sparkles({ count = 25, className = "" }: SparklesProps) {
  // Reduce sparkles on mobile
  const effectiveCount = useMemo(() => {
    if (typeof window === "undefined") return count;
    return window.innerWidth < 768 ? Math.floor(count * 0.6) : count;
  }, [count]);

  const sparkles = useMemo<Sparkle[]>(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
      })),
    [effectiveCount],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] will-change-transform"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -20, -40],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

export default Sparkles;
