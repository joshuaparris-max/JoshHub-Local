import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, ShieldCheck, Gamepad2, Skull } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#c8b88a] font-mono selection:bg-[#d4944c] selection:text-black overflow-hidden relative">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)50%,rgba(0,0,0,0.25)50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,6px_6px]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4944c]/30 bg-[#d4944c]/10 text-[#d4944c] text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4944c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4944c]"></span>
              </span>
              System Online // Class: Firefly
            </div>
            
            <h1 className="text-5xl md:text-8xl font-vt323 text-glow text-[#d4944c] mb-4">
              SERENITY
              <span className="block text-3xl md:text-5xl text-[#c8b88a] mt-2">KEEP FLYING</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#706848] leading-relaxed">
              Take command of a Firefly-class transport ship. Manage your crew, 
              keep flying, and aim to misbehave in this text-based adventure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/game">
              <Button className="h-14 px-8 text-lg bg-[#d4944c] hover:bg-[#b07b3e] text-black font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(212,148,76,0.3)] hover:shadow-[0_0_30px_rgba(212,148,76,0.5)] transition-all">
                Initialize System <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Terminal className="w-8 h-8 text-[#d4944c]" />,
              title: "Text Adventure",
              desc: "Classic parser-based gameplay. Look, go, take, and talk your way through the 'Verse."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-[#d4944c]" />,
              title: "Crew Management",
              desc: "Keep morale high and the ship flying. Your crew is your family, for better or worse."
            },
            {
              icon: <Skull className="w-8 h-8 text-[#d4944c]" />,
              title: "Aim to Misbehave",
              desc: "Take jobs, dodge the Alliance, and deal with Reavers. It's a dangerous universe out there."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#12110e] border border-[#2a2820] p-6 hover:border-[#d4944c] transition-colors group"
            >
              <div className="mb-4 p-3 bg-[#0a0908] w-fit rounded border border-[#2a2820] group-hover:border-[#d4944c] transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-vt323 text-[#c8b88a] mb-2 uppercase tracking-wide group-hover:text-[#d4944c] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#706848] text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center border-t border-[#2a2820] pt-8">
          <p className="text-[#706848] text-xs uppercase tracking-widest">
            Broadcast Signal Source: Serenity Valley • <span className="text-[#d4944c]">No Power in the Verse Can Stop Me</span>
          </p>
        </div>
      </div>
    </div>
  );
}
