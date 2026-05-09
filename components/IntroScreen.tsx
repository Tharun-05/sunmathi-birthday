import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTRO_LINES = [
  "In a magical kingdom...",
  "A princess was born",
  "Sanmathi 👑",
];

const LINE_DELAY = 0.6;
const FADE_OUT_DELAY = 3000;

interface IntroScreenProps {
  trigger?: number;
}

const IntroScreen = memo(function IntroScreen({ trigger = 0 }: IntroScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (trigger > 0) {
      setIsVisible(true);
    }
  }, [trigger]);

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, FADE_OUT_DELAY);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #000000 0%, #1a0a2e 30%, #2d1b4e 50%, #4a2c5a 70%, #3d2a1f 85%, #1a1008 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Sparkle overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Text content */}
          <div className="text-center z-10">
            {INTRO_LINES.map((line, index) => (
              <motion.div
                key={index}
                className={`font-serif ${
                  index === 2
                    ? "text-5xl md:text-7xl font-bold heading-glow heading-pulse-glow"
                    : "text-2xl md:text-4xl text-purple-200/90 body-premium"
                } ${index < 2 ? "mb-4" : "mt-6"}`}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * LINE_DELAY,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default IntroScreen;
