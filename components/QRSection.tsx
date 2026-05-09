import { memo } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

interface QRSectionProps {
  url?: string;
  label?: string;
}

const smoothEase: [number, number, number, number] = [0.23, 1, 0.32, 1];

const QRSection = memo(function QRSection({
  url = typeof window !== "undefined" ? window.location.href : "https://sanmathi.birthday",
  label = "Scan to relive the magic",
}: QRSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden noise spotlight">
      {/* Multi-layer gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-fuchsia-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute left-1/3 top-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[150px] depth-float-slow"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-amber-400/15 blur-[120px] depth-float-medium"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.4)_100%)]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase }}
          className="mb-12"
        >
          <h2 className="heading-glow heading-premium heading-pulse-glow text-3xl sm:text-4xl md:text-5xl">
            Share the Joy ✨
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: smoothEase }}
            className="mx-auto mt-5 h-px w-20 origin-center bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
          />
        </motion.div>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
          className="glass-card glass-card-shimmer rounded-[2.5rem] p-8 sm:p-12 shadow-premium"
        >
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-amber-300/10 via-transparent to-purple-400/10 pointer-events-none" />

          {/* QR Code Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: smoothEase }}
            className="relative rounded-2xl bg-white p-4 sm:p-6 shadow-lg"
          >
            <QRCodeSVG
              value={url}
              size={180}
              level="H"
              marginSize={0}
              className="h-[140px] w-[140px] sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px]"
              style={{ height: "auto", width: "100%", maxWidth: "220px" }}
            />
          </motion.div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-8 body-premium text-lg text-white/90 sm:text-xl"
          >
            {label}
          </motion.p>

          {/* Decorative sparkles */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-4 flex justify-center gap-3"
          >
            {["✨", "📱", "✨"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 text-[11px] font-medium uppercase tracking-[0.4em] text-white/50 sm:text-xs"
        >
          Capture • Share • Celebrate
        </motion.p>
      </div>
    </section>
  );
});

export default QRSection;
