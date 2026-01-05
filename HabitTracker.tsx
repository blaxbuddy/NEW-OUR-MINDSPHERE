"use client"

import { useState, useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"

interface Habit {
  id: number
  name: string
  completions: Date[]
}

export function HabitTracker() {
  const today = new Date()
  const monthStart = startOfMonth(today)
  const monthEnd = endOfMonth(today)
  const daysInMonth = useMemo(() => eachDayOfInterval({ start: monthStart, end: monthEnd }), [monthStart, monthEnd])

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Drink Water", completions: [new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)] },
    { id: 2, name: "Meditation", completions: [] },
    { id: 3, name: "Reading", completions: [] },
  ])
  const [newHabit, setNewHabit] = useState("")

  const addHabit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHabit.trim()) return
    setHabits([...habits, { id: Date.now(), name: newHabit, completions: [] }])
    setNewHabit("")
    toast({
      title: "Habit Added",
      description: `You've committed to ${newHabit}. Keep it up!`,
    })
  }

  const toggleHabit = (habitId: number, date: Date) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== habitId) return h
      const exists = h.completions.find(d => isSameDay(d, date))
      if (exists) {
        return { ...h, completions: h.completions.filter(d => !isSameDay(d, date)) }
      } else {
        return { ...h, completions: [...h.completions, date] }
      }
    }))
  }

  const chartData = useMemo(() => {
    return daysInMonth.map(day => {
      const completedCount = habits.reduce((acc, habit) => {
        return acc + (habit.completions.find(d => isSameDay(d, day)) ? 1 : 0)
      }, 0)
      return {
        date: format(day, "d"),
        completed: completedCount,
        fullDate: format(day, "MMM d")
      }
    })
  }, [habits, daysInMonth])

  return (
    <section id="section-habits" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-display text-white mb-2">Atomic Habits</h2>
            <p className="text-white/60">Small steps, compound results.</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-display text-primary font-bold">{format(today, "MMMM yyyy")}</p>
            <p className="text-white/40 text-sm">Today is {format(today, "EEEE, MMMM do")}</p>
          </div>
        </div>

        {/* Extended Habits Card */}
        <Card className="glass-card border-white/5 overflow-hidden elevated-box">
          <CardHeader className="border-b border-white/5 bg-white/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-white">Monthly Progress Tracker</CardTitle>
              <form onSubmit={addHabit} className="flex gap-2">
                <Input 
                  placeholder="Add new habit..." 
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  className="bg-white/10 border-white/10 text-white w-full md:w-64"
                />
                <Button type="submit" size="icon" variant="secondary" className="elevated-button">
                  <Plus className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-white/5">
                  <th className="p-4 text-white font-display sticky left-0 bg-[#252A34] z-10 w-48 shadow-lg">Habit</th>
                  {daysInMonth.map(day => (
                    <th key={day.toString()} className="p-2 text-center text-xs text-white font-mono font-bold border-l border-white/5">
                      {format(day, "dd")}
                      <div className="text-[10px] text-white/70">{format(day, "EEE")}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 sticky left-0 bg-[#252A34]/95 backdrop-blur-sm z-10 border-r border-white/10">
                      <p className="text-white font-medium truncate">{habit.name}</p>
                      <p className="text-[10px] text-white/40">{habit.completions.length} done</p>
                    </td>
                    {daysInMonth.map(day => (
                      <td key={day.toString()} className="p-2 text-center border-l border-white/5">
                        <Checkbox 
                          checked={!!habit.completions.find(d => isSameDay(d, day))}
                          onCheckedChange={() => toggleHabit(habit.id, day)}
                          className="border-white/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Connected Area Chart at the Bottom */}
        <Card className="glass-card border-white/5 bg-gradient-to-br from-card/50 to-background/50 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-white">Velocity Over Time</CardTitle>
            <CardDescription className="text-white/40">Connected progress visualization for {format(today, "MMMM")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] p-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHabit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4988C4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4988C4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.2)" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '500' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '500' }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1C4D8D', border: 'none', borderRadius: '12px', color: '#BDE8F5', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}
                  labelStyle={{ display: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#4988C4" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorHabit)" 
                  animationDuration={500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
