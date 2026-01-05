import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CircleItem {
  id: string;
  label: string;
  targetId: string;
}

const ITEMS: CircleItem[] = [
  { id: "1", label: "My Attitude", targetId: "section-quotes" },
  { id: "2", label: "My Effort", targetId: "section-habits" },
  { id: "3", label: "My Words", targetId: "section-music" },
  { id: "4", label: "My Actions", targetId: "section-books" },
  { id: "5", label: "My Decisions", targetId: "section-tips" },
  { id: "6", label: "My Boundaries", targetId: "section-helpline" },
];

export function CircleNavigation() {
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center z-20">
      {/* Central Hub */}
      <motion.div 
        className="absolute inset-0 m-auto w-48 h-48 rounded-full bg-card/10 backdrop-blur-md border border-white/10 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(28,77,141,0.3)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="text-center px-4">
          <h2 className="text-2xl font-display font-bold text-white mb-1">Control</h2>
          <p className="text-xs text-white/60 font-sans uppercase tracking-widest">What Matters</p>
        </div>
      </motion.div>

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <circle cx="300" cy="300" r="150" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
        {ITEMS.map((_, i) => {
          const angle = (i * 360) / ITEMS.length;
          const rad = (angle * Math.PI) / 180;
          const x2 = 300 + 220 * Math.cos(rad); // Length to card center roughly
          const y2 = 300 + 220 * Math.sin(rad);
          return (
            <line 
              key={i}
              x1="300" 
              y1="300" 
              x2={x2} 
              y2={y2} 
              stroke="currentColor" 
              strokeWidth="1" 
              className="text-primary"
            />
          );
        })}
      </svg>

      {/* Cards */}
      {ITEMS.map((item, i) => {
        const angle = (i * 360) / ITEMS.length;
        // Position on a circle of radius 220px
        const radius = 220;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.targetId)}
            onMouseEnter={() => setActiveHover(item.id)}
            onMouseLeave={() => setActiveHover(null)}
            className={cn(
              "absolute w-40 h-24 flex items-center justify-center rounded-xl transition-all duration-300 cursor-pointer group elevated-box",
              "bg-card/90 backdrop-blur-md border border-white/10 shadow-lg hover:bg-card"
            )}
            style={{
              x: x, // Centered by default due to flex justify-center of parent
              y: y,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
          >
            <div className="text-center">
              <span className="block text-sm font-medium text-white/90 group-hover:text-secondary transition-colors font-display">
                {item.label}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
