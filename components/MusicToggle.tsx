import { memo, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MusicToggleProps {
  src?: string;
}

const MusicToggle = memo(function MusicToggle({ src = "/music.mp3" }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audio.addEventListener("error", () => setAvailable(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const fadeIn = (audio: HTMLAudioElement, targetVolume: number, duration = 800) => {
    audio.volume = 0;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      audio.volume = Math.min(volumeStep * currentStep, targetVolume);
      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);
  };

  const fadeOut = (audio: HTMLAudioElement, duration = 400) => {
    const startVolume = audio.volume;
    const steps = 10;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    return new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        currentStep++;
        audio.volume = Math.max(startVolume - volumeStep * currentStep, 0);
        if (currentStep >= steps) {
          clearInterval(interval);
          resolve();
        }
      }, stepTime);
    });
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        await fadeOut(audio);
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        fadeIn(audio, 0.4);
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  if (!available) return null;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.5, delay: 1 }}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/15 text-xl text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/25 btn-glow sm:h-14 sm:w-14 sm:text-2xl"
    >
      {playing ? "🔊" : "🔈"}
    </motion.button>
  );
});

export default MusicToggle;
