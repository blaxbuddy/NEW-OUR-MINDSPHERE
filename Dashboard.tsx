import { CircleNavigation } from "@/components/CircleNavigation";
import { OuterMarquee } from "@/components/OuterMarquee";
import { QuoteSection } from "@/components/QuoteSection";
import { MusicSection } from "@/components/MusicSection";
import { HabitTracker } from "@/components/HabitTracker";
import { BookShelf } from "@/components/BookShelf";
import { TipsSection } from "@/components/TipsSection";
import { Helpline } from "@/components/Helpline";
import { DemotivationButton } from "@/components/DemotivationButton";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      {/* Hero Section with Circles */}
      <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <OuterMarquee />
        <CircleNavigation />
        
        <div className="absolute bottom-10 animate-bounce text-white/20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 space-y-0">
        <QuoteSection />
        <HabitTracker />
        <MusicSection />
        <BookShelf />
        <TipsSection />
        <Helpline />
      </div>

      <DemotivationButton />
    </div>
  );
}
