import { motion } from "framer-motion";

const UNCONTROLLABLE = [
  "Other People's Actions",
  "The Past",
  "The Future",
  "The Weather",
  "Traffic",
  "Global Events",
  "Other People's Opinions",
  "Getting Older",
  "Change",
];

export function OuterMarquee() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Dashed Orbit Line */}
      <div className="absolute w-[800px] h-[800px] rounded-full border border-dashed border-white/10 opacity-50" />
      
      {/* Rotating Container */}
      <motion.div 
        className="absolute w-full h-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {UNCONTROLLABLE.map((item, i) => {
          const angle = (i * 360) / UNCONTROLLABLE.length;
          const radius = 400; // Radius of orbit
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          
          return (
            <div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
              }}
            >
              <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 text-white/40 text-sm whitespace-nowrap">
                {item}
              </div>
            </div>
          );
        })}
      </motion.div>
      
      <div className="absolute bottom-10 text-white/20 text-xs uppercase tracking-widest font-mono">
        Things you cannot control
      </div>
    </div>
  );
}
