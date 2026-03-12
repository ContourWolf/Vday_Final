import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Act2MemoryChaos from "@/components/Act2MemoryChaos";
import Act3Revelation from "@/components/Act3Revelation";

type Stage = "envelope" | "reveal";

const Index = () => {
  const [stage, setStage] = useState<Stage>("envelope");

  const handlePhotosComplete = () => setStage("reveal");

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <Act2MemoryChaos key="act2" onComplete={handlePhotosComplete} />
        )}
        
        {stage === "reveal" && (
          <Act3Revelation key="act3" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
