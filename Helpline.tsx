import { Phone } from "lucide-react";

export function Helpline() {
  return (
    <section id="section-helpline" className="py-12 bg-[#0F2854] border-t border-white/5">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/5">
          <div className="h-10 w-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
            <Phone className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Immediate Help</p>
            <p className="text-xl font-display font-bold text-white">988 <span className="text-sm font-sans font-normal text-white/60">(Suicide & Crisis Lifeline)</span></p>
          </div>
        </div>
        <p className="mt-4 text-white/20 text-sm">
          You are not alone. Help is available 24/7.
        </p>
      </div>
    </section>
  );
}
