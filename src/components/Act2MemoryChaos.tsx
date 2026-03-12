import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import polaroid images
import polaroid1 from "@/assets/polaroid-1.jpg";
import polaroid2 from "@/assets/polaroid-2.jpg";
import polaroid3 from "@/assets/polaroid-3.jpg";
import polaroid4 from "@/assets/polaroid-4.jpg";
import polaroid5 from "@/assets/polaroid-5.jpg";
import polaroid6 from "@/assets/polaroid-6.jpg";
import polaroid7 from "@/assets/polaroid-7.jpg";
import polaroid8 from "@/assets/polaroid-8.jpg";
import polaroid9 from "@/assets/polaroid-9.jpg";
import polaroid10 from "@/assets/polaroid-10.jpg";

interface Act2MemoryChaosProps {
  onComplete: () => void;
}

interface Polaroid {
  id: number;
  src: string;
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

const polaroidImages = [polaroid1, polaroid2, polaroid3, polaroid4, polaroid5, polaroid6, polaroid7, polaroid8, polaroid9, polaroid10];

const Act2MemoryChaos = ({ onComplete }: Act2MemoryChaosProps) => {
  const [stage, setStage] = useState<"envelope" | "chaos">("envelope");
  const [polaroids, setPolaroids] = useState<Polaroid[]>([]);
  const [isNoteVisible, setIsNoteVisible] = useState(false);
  const [draggedCount, setDraggedCount] = useState(0);

  // Generate scattered polaroids on explosion
  useEffect(() => {
    if (stage === "chaos") {
      const newPolaroids = polaroidImages.map((src, index) => ({
        id: index,
        src,
        x: Math.random() * 60 + 20, // 20% to 80%
        y: Math.random() * 60 + 20,
        rotation: Math.random() * 90 - 45, // -45 to 45 degrees
        zIndex: 100 + index,
      }));
      setPolaroids(newPolaroids);
    }
  }, [stage]);

  // Check if note should be visible (after moving some polaroids)
  useEffect(() => {
    if (draggedCount >= 2) {
      setIsNoteVisible(true);
    }
  }, [draggedCount]);

  const handleEnvelopeClick = () => {
    setStage("chaos");
  };

  const handleDragEnd = () => {
    setDraggedCount(prev => prev + 1);
  };

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: "linear-gradient(135deg, hsl(30 40% 96%) 0%, hsl(350 75% 95%) 100%)",
      }}
    >
      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="envelope"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.6 }}
          >
            {/* Envelope */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleEnvelopeClick}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Envelope Body */}
              <div className="w-72 h-48 relative">
                {/* Back of envelope */}
                <div
                  className="absolute inset-0 rounded-lg shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, hsl(350 75% 80%) 0%, hsl(350 80% 65%) 100%)",
                  }}
                />
                
                {/* Envelope flap */}
                <div
                  className="absolute top-0 left-0 right-0 h-24 origin-top"
                  style={{
                    background: "linear-gradient(180deg, hsl(350 80% 65%) 0%, hsl(350 70% 55%) 100%)",
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  }}
                />

                {/* Wax seal */}
                <motion.div
                  className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, hsl(350 70% 45%) 0%, hsl(350 80% 35%) 100%)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 4px 15px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                      "0 4px 25px hsl(350 80% 65% / 0.5), inset 0 2px 4px rgba(255,255,255,0.2)",
                      "0 4px 15px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-xl">❤️</span>
                </motion.div>
              </div>

              {/* Hint text */}
              <motion.p
                className="text-center mt-8 text-rose-dark/80 font-romantic text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Click to open...
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {stage === "chaos" && (
          <motion.div
            key="chaos"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hidden Note - Lower z-index, revealed by moving polaroids */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isNoteVisible ? 1 : 0.3, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="glass-rose px-16 py-14 rounded-2xl cursor-pointer"
                onClick={onComplete}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(350 80% 65% / 0.4)" }}
                whileTap={{ scale: 0.95 }}
                animate={isNoteVisible ? {
                  boxShadow: [
                    "0 0 20px hsl(350 80% 65% / 0.2)",
                    "0 0 40px hsl(350 80% 65% / 0.4)",
                    "0 0 20px hsl(350 80% 65% / 0.2)",
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="font-romantic text-3xl text-rose-dark text-center">
                  🔄 Turn me around 🔄
                </p>
              </motion.div>
            </motion.div>

            {/* Scattered Polaroids */}
            {polaroids.map((polaroid, index) => (
              <motion.div
                key={polaroid.id}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: `${polaroid.x}%`,
                  top: `${polaroid.y}%`,
                  zIndex: polaroid.zIndex,
                }}
                initial={{
                  opacity: 0,
                  scale: 0,
                  rotate: 0,
                  x: "-50%",
                  y: "-50%",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: polaroid.rotation,
                  x: "-50%",
                  y: "-50%",
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.1,
                }}
                drag
                dragMomentum={true}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                whileDrag={{ scale: 1.1, zIndex: 1000 }}
              >
                <div className="polaroid w-32 md:w-44">
                  <img
                    src={polaroid.src}
                    alt={`Memory ${polaroid.id + 1}`}
                    className="polaroid-image rounded-sm"
                    draggable={false}
                  />
                </div>
              </motion.div>
            ))}

            {/* Instruction text */}
            <motion.p
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-rose-dark/60 text-sm font-light z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Trage pozele pentru a descoperi ce se ascunde dedesubt...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Act2MemoryChaos;
