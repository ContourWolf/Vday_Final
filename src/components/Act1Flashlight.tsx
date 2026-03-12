import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Act1FlashlightProps {
  onComplete: () => void;
}

const Act1Flashlight = ({ onComplete }: Act1FlashlightProps) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate random button position on mount
  useEffect(() => {
    const generatePosition = () => {
      const x = Math.random() * 60 + 20; // 20% to 80%
      const y = Math.random() * 60 + 20; // 20% to 80%
      setButtonPos({ x, y });
    };
    generatePosition();

    // Show hint after 5 seconds
    const hintTimer = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(hintTimer);
  }, []);

  // Track mouse position using refs to avoid re-renders
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Check if mouse is near button
  useEffect(() => {
    if (!containerRef.current) return;
    
    const buttonX = (buttonPos.x / 100) * window.innerWidth;
    const buttonY = (buttonPos.y / 100) * window.innerHeight;
    const distance = Math.sqrt(
      Math.pow(mousePos.x - buttonX, 2) + Math.pow(mousePos.y - buttonY, 2)
    );
    
    setIsHoveringButton(distance < 150);
  }, [mousePos, buttonPos]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Base Layer - Static Text (z-10) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-8">
          <motion.h1
            className="font-romantic text-4xl md:text-6xl text-foreground/90 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Uneori trebuie să cauți printre umbre...
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            pentru a găsi ceea ce contează cu adevărat
          </motion.p>
        </div>
      </div>

      {/* Hidden Button (z-10) - Revealed by flashlight */}
      <motion.button
        className="absolute z-10 btn-romantic text-lg md:text-xl font-romantic"
        style={{
          left: `${buttonPos.x}%`,
          top: `${buttonPos.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={onComplete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isHoveringButton ? { 
          boxShadow: [
            "0 0 20px hsl(350 80% 65% / 0.4)",
            "0 0 40px hsl(350 80% 65% / 0.6)",
            "0 0 20px hsl(350 80% 65% / 0.4)"
          ]
        } : {}}
        transition={{ duration: 1, repeat: isHoveringButton ? Infinity : 0 }}
      >
        ✨ DESCOPERĂ ✨
      </motion.button>

      {/* Flashlight Mask Layer (z-20) - Infinite Shadow Technique */}
      <div
        className="absolute z-20 pointer-events-none rounded-full"
        style={{
          width: "300px",
          height: "300px",
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          background: "transparent",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.97)",
          transition: "left 0.05s ease-out, top 0.05s ease-out",
        }}
      />

      {/* Soft glow at flashlight center */}
      <div
        className="absolute z-20 pointer-events-none rounded-full"
        style={{
          width: "300px",
          height: "300px",
          left: mousePos.x - 150,
          top: mousePos.y - 150,
          background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.3) 70%, transparent 100%)",
          transition: "left 0.05s ease-out, top 0.05s ease-out",
        }}
      />

      {/* Hint text */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-muted-foreground/60 text-sm font-light tracking-wider">
              Mișcă mouse-ul pentru a explora întunericul...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Act1Flashlight;
