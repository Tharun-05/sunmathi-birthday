import { memo } from "react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AutoScrollToggleProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  sectionCount: number;
  intervalMs?: number;
  defaultEnabled?: boolean;
  onLoop?: () => void;
}

const AutoScrollToggle = memo(function AutoScrollToggle({
  containerRef,
  sectionCount,
  intervalMs = 5000,
  defaultEnabled = true,
  onLoop,
}: AutoScrollToggleProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    const id = setInterval(() => {
      const { scrollTop, clientHeight, scrollHeight } = container;
      const currentIndex = Math.round(scrollTop / clientHeight);
      const atEnd = scrollTop + clientHeight >= scrollHeight - 4;
      const next = atEnd ? 0 : Math.min(currentIndex + 1, sectionCount - 1);
      
      if (atEnd && onLoop) {
        onLoop();
      }
      
      container.scrollTo({
        top: next * clientHeight,
        behavior: "smooth",
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [enabled, containerRef, sectionCount, intervalMs]);

  return (
    <motion.button
      type="button"
      onClick={() => setEnabled((v) => !v)}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 1, delay: 1.5 }}
      aria-label={enabled ? "Pause auto-scroll" : "Resume auto-scroll"}
      className="fixed bottom-5 right-20 z-50 flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 text-sm text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/25 btn-glow sm:h-14 sm:px-5 sm:text-base"
    >
      <span>{enabled ? "⏸" : "▶"}</span>
      <span className="hidden sm:inline">{enabled ? "Auto" : "Manual"}</span>
    </motion.button>
  );
});

export default AutoScrollToggle;
