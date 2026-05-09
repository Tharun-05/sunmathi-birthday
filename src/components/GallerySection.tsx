import { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import photo1 from "../assets/gallery/photo1.jpg";

interface GalleryItem {
  src: string;
  caption?: string;
}


// Placeholder gradients used until real photos are dropped in.
const placeholderGradients = [
  "from-pink-300 via-rose-400 to-fuchsia-500",
  "from-amber-200 via-yellow-300 to-pink-400",
  "from-purple-400 via-fuchsia-500 to-pink-500",
  "from-rose-300 via-pink-400 to-purple-500",
  "from-yellow-200 via-amber-300 to-rose-400",
  "from-fuchsia-400 via-purple-500 to-indigo-500",
  "from-pink-200 via-rose-300 to-yellow-300",
  "from-purple-300 via-pink-400 to-amber-300",
];

const spring = { type: "spring" as const, stiffness: 100, damping: 18 };
const smoothEase: [number, number, number, number] = [0.23, 1, 0.32, 1];

const GallerySection = memo(function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  const items: GalleryItem[] = [
  {
    src: photo1,
    caption: "Little Princess ✨",
  },
  // {
  //   src: photo2,
  //   caption: "Cute Smile 💖",
  // },
  // {
  //   src: photo3,
  //   caption: "Royal Memories 👑",
  // },
  // {
  //   src: photo4,
  //   caption: "Magical Moments 🌸",
  // },
];

  return (
    <section className="relative h-screen w-full overflow-hidden noise spotlight">
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-600 via-pink-700 to-purple-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-950/70 via-transparent to-transparent" />
      
      {/* Animated glow orbs */}
      <motion.div 
        className="absolute right-1/3 top-1/4 h-80 w-80 rounded-full bg-amber-400/25 blur-[120px] depth-float-medium"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute left-1/4 bottom-1/4 h-96 w-96 rounded-full bg-pink-400/25 blur-[130px] depth-float-slow"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-purple-500/20 blur-[100px] depth-float-fast" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,215,128,0.2),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.35)_100%)]" />

      <div className="relative z-10 flex h-full w-full flex-col px-4 py-12 sm:px-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
          className="text-center"
        >
          <h2 className="heading-glow heading-premium heading-pulse-glow text-4xl sm:text-5xl md:text-6xl">
            Royal Memories 📸
          </h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-5 text-base font-light tracking-wide text-white/60 sm:text-lg"
          >
            Every smile, frozen in time
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: smoothEase }}
            className="mx-auto mt-5 h-px w-20 origin-center bg-gradient-to-r from-transparent via-pink-300/60 to-transparent"
          />
        </motion.div>

        <div className="mt-10 grid flex-1 grid-cols-2 gap-4 overflow-hidden sm:grid-cols-3 sm:gap-5 md:grid-cols-4 md:gap-6">
          {items.map((item, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: smoothEase, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
              className="group relative overflow-hidden rounded-2xl glass-card glass-card-shimmer aspect-square shadow-premium"
            >
              {item ? (
                <img
                  src={item.src}
                  alt={item.caption ?? `Memory ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                />
              ) : (
                <div
                  className={`flex h-full min-h-[120px] w-full items-center justify-center bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]} transition-transform duration-700 ease-out group-hover:scale-115`}
                >
                  <motion.span 
                    className="text-4xl drop-shadow-lg sm:text-5xl"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {["👑", "🌸", "🎀", "✨", "🦋", "🌷", "💖", "🎈"][i % 8]}
                  </motion.span>
                </div>
              )}
              {/* Premium gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Shine sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none" />
              
              {/* Inner border shine */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all duration-500" />
              
              {/* View indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/90 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  View
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-lg p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ ...spring }}
              className="relative max-h-[85vh] max-w-[85vw] overflow-hidden rounded-[2rem] glass shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {items[active] ? (
                <img
                  src={items[active]!.src}
                  alt={items[active]!.caption ?? "Memory"}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div
                  className={`flex h-[60vh] w-[80vw] max-w-2xl items-center justify-center bg-gradient-to-br ${placeholderGradients[active % placeholderGradients.length]}`}
                >
                  <span className="text-9xl drop-shadow-lg">
                    {["👑", "🌸", "🎀", "✨", "🦋", "🌷", "💖", "🎈"][active % 8]}
                  </span>
                </div>
              )}
              <motion.button
                type="button"
                onClick={() => setActive(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full glass text-xl font-medium text-white shadow-lg transition-colors hover:bg-white/30"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default GallerySection;
