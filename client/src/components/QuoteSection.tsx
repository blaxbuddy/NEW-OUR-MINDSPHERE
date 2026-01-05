import { TypeAnimation } from 'react-type-animation';

const QUOTES = [
  "No one is coming to save you. Save yourself.",
  "Your feelings are valid, but they aren't facts.",
  "Growth is uncomfortable. Stay in it.",
  "You can't heal in the same environment that made you sick.",
  "Discipline is self-love in action.",
  "Stop waiting for the perfect moment. Take the moment and make it perfect.",
  "Motivation gets you started. Habit keeps you going.",
  "Don't let your ice cream melt while you're counting someone else's sprinkles."
];

// Create a sequence array: [quote1, 5000, quote2, 5000, ...]
const SEQUENCE = QUOTES.flatMap(q => [q, 5000]);

export function QuoteSection() {
  return (
    <section id="section-quotes" className="py-24 px-6 min-h-[50vh] flex flex-col items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        
        <h2 className="text-primary text-sm font-mono uppercase tracking-widest mb-8">Reality Check</h2>
        
        <div className="max-w-4xl w-full text-center min-h-[200px]">
          <TypeAnimation
            sequence={SEQUENCE}
            wrapper="h3"
            speed={50}
            className="text-4xl md:text-6xl font-display font-bold text-white leading-tight"
            repeat={Infinity}
            cursor={true}
          />
        </div>
    </section>
  );
}
