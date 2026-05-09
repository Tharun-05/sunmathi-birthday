import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_DURATION = 1800;

const LoadingScreen = memo(function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #0c0514 0%, #1a0a2e 50%, #0c0514 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Glowing dots loader */}
          <div className="flex items-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-3 w-3 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)",
                  boxShadow:
                    "0 0 20px rgba(251, 191, 36, 0.6), 0 0 40px rgba(244, 114, 182, 0.4)",
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Loading text */}
          <motion.p
            className="mt-6 text-xs font-medium uppercase tracking-[0.4em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Loading magic...
          </motion.p>

          {/* Subtle ambient glow */}
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[100px]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default LoadingScreen;
