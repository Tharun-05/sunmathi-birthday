import { memo, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../lib/supabase";

interface Wish {
  from: string;
  message: string;
}

interface WishesSectionProps {
  wishes?: Wish[];
  intervalMs?: number;
}

const smoothEase = "easeInOut";

const defaultWishes: Wish[] = [
  { from: "Mom & Dad", message: "You are our greatest blessing, our forever sunshine." },
  { from: "Grandma", message: "May your life be filled with endless love and laughter." },
  { from: "Grandpa", message: "Our little princess, the joy of the entire family." },
  { from: "Aunties", message: "Stay sweet, brave, and magical, always." },
  { from: "Uncles", message: "May every dream of yours come true." },
];

const bannedWords = ["hate", "stupid", "badword", "xxx"];

const WishesSection = memo(function WishesSection({
  wishes = defaultWishes,
  intervalMs = 4000,
}: WishesSectionProps) {
  const [index, setIndex] = useState(0);
  const [liveWishes, setLiveWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const allWishes = [...liveWishes.slice(0, 20), ...wishes];
  const total = allWishes.length;

  // 🔁 Rotation
  useEffect(() => {
    if (total === 0) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, intervalMs);

    return () => clearInterval(id);
  }, [total, intervalMs]);

  // 📡 Fetch wishes
  useEffect(() => {
    const fetchLiveWishes = async () => {
      const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        const formatted = data.map((w: any) => ({
          from: w.name || "Guest",
          message: w.message,
        }));
        setLiveWishes(formatted);
      }
    };

    fetchLiveWishes();
    const interval = setInterval(fetchLiveWishes, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✍️ Submit
  const handleSubmit = async () => {
    setErrorMsg("");

    const now = Date.now();

    if (now - lastSubmitTime < 10000) {
      setErrorMsg("Please wait before sending another wish 😊");
      return;
    }

    if (!name.trim()) {
      setErrorMsg("Name is required");
      return;
    }

    if (!message.trim()) {
      setErrorMsg("Please write a wish 💖");
      return;
    }

    if (message.length < 5) {
      setErrorMsg("Write a meaningful wish");
      return;
    }

    if (message.length > 150) {
      setErrorMsg("Keep your wish under 150 characters");
      return;
    }

    const text = message.toLowerCase();
    if (bannedWords.some((word) => text.includes(word))) {
      setErrorMsg("Please use respectful language 💖");
      return;
    }

    const { error } = await supabase.from("wishes").insert([
      {
        name: name.trim(),
        message: message.trim(),
        status: "pending",
      },
    ]);

    if (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Try again!");
      return;
    }

    // instant update
   

    setLastSubmitTime(now);
    setName("");
    setMessage("");
    setIndex(0);
  };

  const current =
    total > 0
      ? allWishes[index % total]
      : { from: "Loading...", message: "Waiting for wishes..." };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-800" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="text-4xl md:text-6xl text-white font-bold mb-6">
          Wishes from Loved Ones 💌
        </h2>

        {/* ✍️ FORM */}
        <div className="w-full max-w-2xl mb-8">
          <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-md border border-white/20">
            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none"
            />

            <textarea
              placeholder="Write your wishes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full mb-3 p-2 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none"
            />

            {/* hidden bot trap */}
            <input type="text" style={{ display: "none" }} />

            {errorMsg && (
              <p className="text-red-300 text-sm mb-2">{errorMsg}</p>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
            >
              Submit Wish ✨
            </button>
          </div>
        </div>

        {/* 🎬 DISPLAY */}
        <div className="flex min-h-[200px] w-full max-w-4xl items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl bg-white/10 backdrop-blur-lg px-10 py-10"
            >
              <p className="text-xl md:text-3xl text-white">
                {current.message}
              </p>
              <p className="mt-4 text-sm text-amber-200 uppercase">
                {current.from}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* dots */}
        <div className="mt-6 flex gap-2">
          {allWishes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WishesSection;