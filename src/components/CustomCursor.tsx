import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  visible?: boolean;
}

const CustomCursor = ({ visible = true }: CustomCursorProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>
      
      {/* Custom cursor with spring physics */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-6 h-6 rounded-full mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          background: "radial-gradient(circle, hsl(350 80% 65%) 0%, hsl(350 80% 65% / 0.5) 100%)",
        }}
      />
      
      {/* Small inner dot for precision */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-2 h-2 rounded-full"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          background: "white",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default CustomCursor;
