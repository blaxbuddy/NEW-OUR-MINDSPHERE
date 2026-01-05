import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TIPS = [
  { id: 1, title: "The 2-Minute Rule", category: "Productivity", content: "If it takes less than 2 minutes, do it now." },
  { id: 2, title: "Pomodoro Technique", category: "Focus", content: "Work 25 minutes, break 5 minutes. Repeat." },
  { id: 3, title: "Box Breathing", category: "Anxiety", content: "Inhale 4s, hold 4s, exhale 4s, hold 4s." },
  { id: 4, title: "Digital Detox", category: "Wellbeing", content: "No screens 1 hour before bed for better sleep." },
  { id: 5, title: "Gratitude Journaling", category: "Mood", content: "Write 3 things you are grateful for every morning." },
  { id: 6, title: "Eat the Frog", category: "Productivity", content: "Do your hardest task first thing in the morning." },
  { id: 7, title: "Active Listening", category: "Personality", content: "Listen to understand, not to reply." },
  { id: 8, title: "Power Pose", category: "Confidence", content: "Stand like Superman for 2 mins to boost confidence." },
];

export function TipsSection() {
  const [search, setSearch] = useState("");

  const filteredTips = TIPS.filter(tip => 
    tip.title.toLowerCase().includes(search.toLowerCase()) || 
    tip.category.toLowerCase().includes(search.toLowerCase()) ||
    tip.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="section-tips" className="py-24 px-6 bg-black/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-display text-white">Mind Hacks</h2>
          <p className="text-white/60">Search for clarity, productivity, and peace.</p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-white/40" />
            <Input 
              placeholder="Search for tips (e.g., 'focus', 'anxiety')..." 
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-full h-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => (
            <Card key={tip.id} className="bg-card/40 border-white/5 hover:bg-card/60 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-white font-medium">{tip.title}</CardTitle>
                  <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">{tip.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm leading-relaxed">{tip.content}</p>
              </CardContent>
            </Card>
          ))}
          {filteredTips.length === 0 && (
            <div className="col-span-full text-center text-white/40 py-12">
              No tips found. Try a different keyword.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
