import { memo, useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  left: string;
  delay: number;
  duration: number;
  color: string;
  rotate: number;
  size: number;
}

const colors = [
  "#fbbf24", // gold
  "#f472b6", // pink
  "#c084fc", // purple
  "#fde68a", // light gold
  "#fb7185", // rose
  "#ffffff",
  "#fcd34d", // amber
  "#e879f9", // fuchsia
];

const Confetti = ({ count = 80, active = true }: { count?: number; active?: boolean }) => {
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: Math.random() * 360,
        size: Math.random() * 12 + 6,
      })),
    [count],
  );

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-[-10%] block rounded-sm will-change-transform"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            boxShadow: `0 0 10px ${p.color}60`,
          }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: ["-10vh", "115vh"],
            opacity: [0, 1, 1, 0.8, 0],
            rotate: [0, p.rotate, p.rotate * 2, p.rotate * 3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const smoothEase = "easeInOut";

interface FinaleSectionProps {
  message?: string;
  name?: string;
}

const FinaleSection = memo(function FinaleSection({
  message = "Our little princess, our biggest joy",
  name = "Sunmathi",
}: FinaleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden noise spotlight">
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-950 via-purple-950 to-rose-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      
      {/* Animated central glow */}
      <motion.div 
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/20 blur-[180px] depth-float-slow"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/25 blur-[120px] depth-float-medium"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-purple-500/20 blur-[100px] depth-float-fast" />
      <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-rose-400/15 blur-[100px] depth-float-medium" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.25),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.4)_100%)]" />
      
      <Confetti count={90} active={isVisible} />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
          className="text-8xl glow-pulse float sm:text-9xl"
        >
          🎂
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: smoothEase, delay: 0.2 }}
          className="glass-card glass-card-shimmer mt-10 rounded-[3rem] px-12 py-14 sm:px-20 sm:py-16 relative shadow-premium"
        >
          {/* Premium inner glow */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-amber-300/15 via-transparent to-pink-400/15 pointer-events-none" />
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="relative max-w-4xl heading-glow heading-premium heading-pulse-glow text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {message}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: smoothEase }}
            className="mx-auto mt-8 h-px w-32 origin-center bg-gradient-to-r from-transparent via-amber-200/70 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
            className="relative mt-6 body-premium text-xl text-white/90 sm:text-2xl md:text-3xl"
          >
            Happy 1st Birthday, {name} 👑✨
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1.1, ease: smoothEase }}
          className="mt-12 h-px w-56 origin-center bg-gradient-to-r from-transparent via-amber-200/60 to-transparent sm:w-72"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-10 text-[11px] font-medium uppercase tracking-[0.5em] text-white/50 sm:text-xs"
        >
          With all our love — Forever & Always
        </motion.p>
        
        {/* Hearts animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex gap-4"
        >
          {['💖', '💕', '💖'].map((heart, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {heart}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

export default FinaleSection;
