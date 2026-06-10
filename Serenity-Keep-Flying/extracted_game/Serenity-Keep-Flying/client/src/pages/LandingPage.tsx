import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Rocket, Terminal } from "lucide-react";

export default function LandingPage() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) setLocation("/game");
  }, [user, setLocation]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#0a0908] text-[#c8b88a] font-mono flex flex-col items-center justify-center p-4 crt-screen relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,148,76,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-2xl w-full text-center space-y-8 relative z-10 border border-[#2a2820] p-8 bg-[#12110e]/80 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        
        <div className="space-y-2">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-[#d4944c] flex items-center justify-center bg-[#0a0908] shadow-[0_0_15px_rgba(212,148,76,0.3)]">
              <Rocket className="w-12 h-12 text-[#d4944c]" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-vt323 tracking-widest text-[#d4944c] text-glow uppercase">
            Serenity
          </h1>
          <h2 className="text-xl md:text-2xl text-[#c8b88a] font-vt323 tracking-wide">
            Interactive Text Adventure
          </h2>
        </div>

        <div className="text-left space-y-4 font-mono text-sm md:text-base border-t border-b border-[#2a2820] py-6 my-6 text-[#706848]">
          <p className="type-writer">
            <span className="text-[#5a5] mr-2">root@serenity:~$</span> 
            Initializing cortex uplink...
          </p>
          <p className="type-writer delay-1">
            <span className="text-[#5a5] mr-2">root@serenity:~$</span> 
            Loading sector charts... OK
          </p>
          <p className="type-writer delay-2">
            <span className="text-[#5a5] mr-2">root@serenity:~$</span> 
            Connection established. Welcome aboard, Captain.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => window.location.href = "/api/login"}
            className="w-full md:w-auto px-8 py-6 text-xl bg-[#d4944c] hover:bg-[#b0783a] text-[#0a0908] font-vt323 tracking-wider font-bold shadow-[0_0_10px_rgba(212,148,76,0.4)] transition-all hover:scale-105"
          >
            INITIALIZE UPLINK [LOGIN]
          </Button>
          
          <p className="text-xs text-[#706848] mt-4">
            Authorized Personnel Only • Blue Sun Corp • 2517
          </p>
        </div>
      </div>
    </div>
  );
}
