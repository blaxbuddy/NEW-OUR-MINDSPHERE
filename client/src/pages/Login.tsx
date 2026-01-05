import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [_, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <Card className="glass-card border-white/5 bg-card/30 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
            >
              <div className="w-8 h-8 border-2 border-white rounded-full" />
            </motion.div>
            <CardTitle className="text-3xl font-display text-white">MindSphere</CardTitle>
            <CardDescription className="text-secondary/80">
              Your sanctuary for clarity and control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50 group-focus-within:text-secondary transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="you@example.com"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-secondary/50 focus:ring-secondary/20 transition-all"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/80">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50 group-focus-within:text-secondary transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-secondary/50 focus:ring-secondary/20 transition-all"
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-[#4988C4] hover:to-[#BDE8F5] text-white hover:text-primary-foreground font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-primary/20 group"
              >
                Sign In
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-white/40">
              <p>Forgot your password? <a href="#" className="text-secondary hover:underline">Reset here</a></p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
