import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export function DemotivationButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-8 right-8 z-50 rounded-full h-14 px-6 shadow-2xl bg-[#1C4D8D] hover:bg-[#4988C4] text-white border border-white/20 animate-bounce hover:animate-none transition-all"
        >
          <Frown className="mr-2 h-5 w-5" />
          I'm feeling demotivated
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-background/95 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">You Got This.</DialogTitle>
          <DialogDescription className="text-white/60">
            Take a deep breath. Watch this. Reset.
          </DialogDescription>
        </DialogHeader>
        <div className="aspect-video w-full rounded-xl overflow-hidden mt-4 bg-black">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/k7X7sZzSXYs?autoplay=1" 
            title="Motivation Video" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
