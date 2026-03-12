import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const Act3Revelation = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  // Generate heart positions once and keep them stable
  const hearts = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 20 + 10}px`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    })), []
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const fireConfetti = () => {
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ["#e91e63", "#ff4081", "#f8bbd9", "#fce4ec", "#ffcdd2", "#ef9a9a"];

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(() => {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors });
    }, 300);
  };

  const handleYes = () => {
    setAnswered(true);
    fireConfetti();
  };

  const handleNoHover = () => {
    setNoButtonPos({ x: Math.random() * 200 - 100, y: Math.random() * 200 - 100 });
  };

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden select-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: "linear-gradient(135deg, hsl(350 80% 15%) 0%, hsl(0 0% 5%) 50%, hsl(330 60% 15%) 100%)",
      }}
    >
      {/* Floating hearts background - stable positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-rose/30"
            style={{ left: heart.left, top: heart.top, fontSize: heart.fontSize }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: heart.duration, repeat: Infinity, delay: heart.delay }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!answered ? (
          <motion.div
            key="card"
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative w-80 h-96 md:w-96 md:h-[28rem]"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 rounded-2xl flex items-center justify-center p-8 card-face"
                style={{
                  background: "linear-gradient(135deg, hsl(350 75% 80%) 0%, hsl(350 80% 65%) 100%)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  backfaceVisibility: "hidden",
                }}
              >
                <p className="font-romantic text-3xl text-white text-center">
                  🔄 Turn me around 🔄
                </p>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-8 card-face"
                style={{
                  background: "linear-gradient(135deg, hsl(350 80% 65%) 0%, hsl(330 70% 55%) 100%)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px hsl(350 80% 65% / 0.4)",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <motion.div className="absolute top-4 left-4 text-4xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💕</motion.div>
                <motion.div className="absolute top-4 right-4 text-4xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>💕</motion.div>

                <motion.p
                  className="font-romantic text-xl md:text-2xl text-white/80 text-center mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  I'm sorry it took so long, but pookie...
                </motion.p>
                <motion.h1
                  className="font-romantic text-3xl md:text-5xl text-white text-center mb-8 text-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  Will you be my Valentine? 💕
                </motion.h1>

                <motion.div
                  className="flex gap-6 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFlipped ? 1 : 0 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  <motion.button className="btn-romantic text-xl px-10 py-4" onClick={handleYes} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    YES! 💖
                  </motion.button>

                  <motion.button
                    className="px-8 py-4 rounded-full font-medium border-2 border-white/30 text-white/70 text-lg"
                    style={{ x: noButtonPos.x, y: noButtonPos.y }}
                    onMouseEnter={handleNoHover}
                    whileHover={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    No...
                  </motion.button>
                </motion.div>

                <motion.div className="absolute bottom-4 text-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}>❤️</motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div className="text-8xl mb-8" animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>💕</motion.div>
            
            <motion.h1 className="font-romantic text-5xl md:text-7xl text-white mb-6 text-glow" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              I knew you'd say yes! 🎉
            </motion.h1>
            
            <motion.p className="font-romantic text-2xl md:text-3xl text-rose-light mb-4" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              You just made me the happiest person alive 💕
            </motion.p>
            
            <motion.p className="text-xl text-white/80 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Happy Valentine's Day, pookie! 💝
            </motion.p>

            <motion.p className="text-lg text-white/60 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
              (was there ever really a choice?)
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Act3Revelation;
