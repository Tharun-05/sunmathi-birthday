import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineSectionProps {
  months?: { month: string; title: string; emoji: string; note: string }[];
}

const defaultMonths = [
  { month: "Month 1", emoji: "👶", title: "Hello World", note: "Tiny fingers, tiny toes." },
  { month: "Month 2", emoji: "😊", title: "First Smile", note: "Sunshine in human form." },
  { month: "Month 3", emoji: "👀", title: "Curious Eyes", note: "Discovering every color." },
  { month: "Month 4", emoji: "🤣", title: "Giggles", note: "The sweetest melody." },
  { month: "Month 5", emoji: "🤲", title: "Reaching Out", note: "Tiny hands, big dreams." },
  { month: "Month 6", emoji: "🍼", title: "First Taste", note: "A whole new world of flavor." },
  { month: "Month 7", emoji: "🐢", title: "Crawling", note: "On the move at last!" },
  { month: "Month 8", emoji: "🦷", title: "First Tooth", note: "A pearly little surprise." },
  { month: "Month 9", emoji: "👏", title: "Clap Clap", note: "Cheering for life." },
  { month: "Month 10", emoji: "🚶", title: "First Steps", note: "Wobbly but brave." },
  { month: "Month 11", emoji: "🗣️", title: "First Words", note: "Mama. Papa. Magic." },
  { month: "Month 12", emoji: "🎂", title: "One Year!", note: "A princess turns one." },
];

const smoothEase = [0.23, 1, 0.32, 1];

const Card = ({
  data,
  index,
}: {
  data: { month: string; title: string; emoji: string; note: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.85, y: 60, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ duration: 0.7, ease: smoothEase, delay: (index % 4) * 0.08 }}
      whileHover={{ scale: 1.05, y: -6 }}
      className="group relative shrink-0 snap-center py-2"
    >
      <div className="glass-card glass-card-shimmer relative w-[280px] rounded-[2rem] p-7 sm:w-[320px] hover-lift">
        {/* Multiple gradient orbs for depth */}
        <motion.div 
          className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-pink-400/60 via-fuchsia-400/40 to-amber-300/50 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        />
        <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-purple-500/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />
        
        <motion.span 
          className="relative block text-5xl drop-shadow-lg sm:text-6xl"
          whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        >
          {data.emoji}
        </motion.span>
        <p className="relative mt-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-300/90">
          {data.month}
        </p>
        <h3 className="relative mt-2 heading-premium text-xl text-white sm:text-2xl">
          {data.title}
        </h3>
        <p className="relative mt-3 body-premium text-sm text-white/70">
          {data.note}
        </p>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-300/80 via-pink-400/80 to-purple-400/80 transition-all duration-500 group-hover:w-16" />
      </div>
    </motion.div>
  );
};

const TimelineSection = memo(function TimelineSection({ months = defaultMonths }: TimelineSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden noise spotlight">
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-fuchsia-900 to-pink-800" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 via-transparent to-rose-900/40" />
      
      {/* Animated glow orbs */}
      <motion.div 
        className="absolute left-1/4 top-1/4 h-[450px] w-[450px] rounded-full bg-fuchsia-500/25 blur-[150px] depth-float-slow"
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-amber-400/20 blur-[120px] depth-float-medium"
        animate={{ scale: [1.1, 1, 1.1], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/15 blur-[100px] depth-float-fast" />
      
      {/* Radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,128,0.25),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.3)_100%)]" />

      <div className="relative z-10 flex h-full w-full flex-col justify-center px-4 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
          className="mb-12 text-center"
        >
          <h2 className="heading-glow heading-premium heading-pulse-glow text-4xl sm:text-5xl md:text-6xl">
            A Year of Magic ✨
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 text-base font-light tracking-wide text-white/60 sm:text-lg"
          >
            Twelve months of giggles, milestones & love
          </motion.p>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: smoothEase }}
            className="mx-auto mt-6 h-px w-24 origin-center bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
          />
        </motion.div>

        <div className="flex gap-6 overflow-x-auto px-6 pt-4 pb-10 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-8">
          {months.map((m, i) => (
            <Card key={m.month} data={m} index={i} />
          ))}
        </div>
        
        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Swipe to explore</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
});

export default TimelineSection;
