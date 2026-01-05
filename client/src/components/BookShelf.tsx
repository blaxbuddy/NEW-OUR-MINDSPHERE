import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const BOOKS = [
  { id: 1, title: "Atomic Habits", author: "James Clear", image: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg", desc: "An easy & proven way to build good habits & break bad ones." },
  { id: 2, title: "Deep Work", author: "Cal Newport", image: "https://covers.openlibrary.org/b/isbn/9781455586691-M.jpg", desc: "Rules for focused success in a distracted world." },
  { id: 3, title: "The Power of Now", author: "Eckhart Tolle", image: "https://covers.openlibrary.org/b/isbn/9781577314806-M.jpg", desc: "A guide to spiritual enlightenment and living in the moment." },
  { id: 4, title: "Mindset", author: "Carol S. Dweck", image: "https://covers.openlibrary.org/b/isbn/9780345472328-M.jpg", desc: "The new psychology of success. How we can learn to fulfill our potential." },
  { id: 5, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", image: "https://covers.openlibrary.org/b/isbn/9780374275631-M.jpg", desc: "The two systems that drive the way we think." },
  { id: 6, title: "Essentialism", author: "Greg McKeown", image: "https://covers.openlibrary.org/b/isbn/9780804137386-M.jpg", desc: "The disciplined pursuit of less." },
  { id: 7, title: "Man's Search for Meaning", author: "Viktor Frankl", image: "https://covers.openlibrary.org/b/isbn/9780807014295-M.jpg", desc: "Psychiatrist Viktor Frankl's memoir of life in Nazi death camps." },
];

export function BookShelf() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [AutoScroll({ playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true, speed: 1 })]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section id="section-books" className="py-24 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display text-white">Library of Wisdom</h2>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={scrollPrev} className="rounded-full border-white/20 hover:bg-white/10 text-white">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" onClick={scrollNext} className="rounded-full border-white/20 hover:bg-white/10 text-white">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y gap-6">
            {BOOKS.map((book) => (
              <div key={book.id} className="flex-[0_0_200px] min-w-0 relative group">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Card className="border-none bg-transparent overflow-hidden rounded-xl relative aspect-[2/3] shadow-2xl transition-transform duration-300 hover:-translate-y-2">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                         <h3 className="text-white font-bold mb-1">{book.title}</h3>
                         <p className="text-white/60 text-xs mb-4">{book.author}</p>
                         <Button size="sm" className="bg-primary text-primary-foreground">
                           <Download className="h-4 w-4 mr-2" />
                           Get
                         </Button>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[200px] bg-card border-white/10 text-white">
                    <p>{book.desc}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
