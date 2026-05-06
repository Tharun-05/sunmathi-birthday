import { memo } from "react";
import { motion } from "framer-motion";
import Sparkles from "./Sparkles";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const spring = { type: "spring", stiffness: 80, damping: 20 };
const smoothEase = [0.23, 1, 0.32, 1];

const HeroSection = memo(function HeroSection({
  title = "Princess Sunmathi 👑",
  subtitle = "A magical journey begins",
}: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden noise spotlight">
      {/* Multi-layer gradient background with slow zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 camera-drift will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/90 via-purple-600 to-amber-400" />
        <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-transparent to-yellow-400/20" />
      </motion.div>

      {/* Ambient orbs - GPU accelerated */}
      <div 
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-pink-400/30 blur-[150px] depth-float-slow will-change-transform"
      />
      <div 
        className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-amber-400/25 blur-[120px] depth-float-medium will-change-transform"
      />

      {/* Soft radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_40%,_rgba(255,255,255,0.4),_transparent_60%)]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />

      <Sparkles count={50} />

      {/* Content */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {/* Glassmorphism card behind content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: smoothEase, delay: 0.1 }}
          className="glass-card glass-card-shimmer rounded-[3rem] px-12 py-16 sm:px-20 sm:py-24 shadow-premium"
        >
          {/* Inner ambient glow */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-amber-300/10 via-transparent to-pink-300/10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ ...spring, delay: 0.4 }}
            className="relative text-7xl glow-pulse float sm:text-8xl"
          >
            ✨
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: smoothEase, delay: 0.6 }}
            className="relative mt-6 heading-glow heading-premium heading-pulse-glow text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.9 }}
            className="relative mt-8 body-premium text-xl text-white/85 sm:text-2xl md:text-3xl"
          >
            {subtitle}
          </motion.p>

          {/* Decorative shimmer line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1.2, ease: smoothEase }}
            className="mx-auto mt-10 h-px w-40 origin-center bg-gradient-to-r from-transparent via-amber-200/80 to-transparent sm:w-56"
          />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-12 flex flex-col items-center gap-3 scroll-indicator"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/60 sm:text-xs">
            Scroll to explore
          </span>
          <motion.div 
            className="flex flex-col items-center"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-8 w-5 rounded-full border border-white/30 flex items-start justify-center p-1">
              <motion.div 
                className="h-2 w-1 rounded-full bg-white/60"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default HeroSection;
