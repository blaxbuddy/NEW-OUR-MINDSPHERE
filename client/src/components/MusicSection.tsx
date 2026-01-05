import { Play, Pause, SkipForward, SkipBack, Heart } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MOODS = [
  { id: 1, name: "Focus", color: "from-blue-900 to-blue-600", track: "Deep Work Flow" },
  { id: 2, name: "Calm", color: "from-teal-900 to-teal-600", track: "Rain Sounds" },
  { id: 3, name: "Energy", color: "from-orange-900 to-orange-600", track: "High Voltage" },
  { id: 4, name: "Sleep", color: "from-indigo-900 to-indigo-600", track: "Night Waves" },
];

export function MusicSection() {
  const [activeMood, setActiveMood] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="section-music" className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-display text-white mb-2">Sonic Sanctuary</h2>
            <p className="text-white/60">Curated soundscapes for your current state.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOODS.map((mood) => (
            <Card 
              key={mood.id} 
              className={cn(
                "border-none overflow-hidden transition-all duration-300 cursor-pointer group hover:scale-105",
                activeMood === mood.id ? "ring-2 ring-primary shadow-lg shadow-primary/20" : "opacity-70 hover:opacity-100"
              )}
              onClick={() => setActiveMood(mood.id)}
            >
              <div className={cn("h-32 bg-gradient-to-br flex items-center justify-center relative", mood.color)}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <span className="text-2xl font-bold text-white font-display relative z-10">{mood.name}</span>
              </div>
              <CardContent className="bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <p className="text-white font-medium">{mood.track}</p>
                    <p className="text-white/40 text-xs">45 mins</p>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (activeMood === mood.id) setIsPlaying(!isPlaying);
                      else { setActiveMood(mood.id); setIsPlaying(true); }
                    }}
                  >
                    {activeMood === mood.id && isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Player Bar (Mock) */}
        <div className="mt-12 bg-card/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row items-center gap-6">
           <div className="flex-1 flex items-center gap-4">
             <div className={cn("w-12 h-12 rounded-lg bg-gradient-to-br animate-pulse", MOODS.find(m => m.id === activeMood)?.color)} />
             <div>
               <p className="text-white font-medium">{MOODS.find(m => m.id === activeMood)?.track}</p>
               <p className="text-white/40 text-xs">Playing now</p>
             </div>
           </div>
           
           <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="text-white/60 hover:text-white"><SkipBack className="h-5 w-5" /></Button>
             <Button 
                size="icon" 
                className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                onClick={() => setIsPlaying(!isPlaying)}
             >
               {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current" />}
             </Button>
             <Button variant="ghost" size="icon" className="text-white/60 hover:text-white"><SkipForward className="h-5 w-5" /></Button>
           </div>
           
           <div className="flex-1 w-full flex items-center gap-3">
             <span className="text-xs text-white/40 font-mono">02:14</span>
             <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
               <div className="h-full w-1/3 bg-primary rounded-full" />
             </div>
             <span className="text-xs text-white/40 font-mono">45:00</span>
           </div>
        </div>
      </div>
    </section>
  );
}
