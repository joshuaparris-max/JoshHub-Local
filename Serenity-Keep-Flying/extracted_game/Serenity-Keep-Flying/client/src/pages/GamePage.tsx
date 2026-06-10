import { useState, useRef, useEffect } from 'react';
import { useGame } from '@/hooks/use-game';
import { Terminal } from '@/components/Terminal';
import { StatusPanel } from '@/components/StatusPanel';
import { SaveManager } from '@/components/SaveManager';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut, Terminal as TerminalIcon } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function GamePage() {
  const { gameState, setGameState, parseCommand, addLog } = useGame();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
    // Initial look
    if (gameState.log.length === 1) {
      parseCommand("look");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    parseCommand(input);
    setInput("");
  };

  const handleQuickCmd = (cmd: string) => {
    parseCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen w-screen bg-[#0a0908] text-[#c8b88a] flex flex-col overflow-hidden crt-screen">
      {/* HEADER */}
      <header className="h-14 border-b border-[#2a2820] bg-[#12110e] flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <TerminalIcon className="text-[#d4944c] w-6 h-6" />
          <h1 className="text-2xl font-vt323 tracking-widest text-[#d4944c] text-glow hidden sm:block">
            SERENITY: <span className="text-[#c8b88a]">KEEP FLYING</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-4 mr-4 text-xs font-mono text-[#706848]">
            <span>USER: {user?.firstName || 'GUEST'}</span>
            <span>CLASS: FIREFLY</span>
          </div>
          
          <SaveManager currentState={gameState} onLoad={setGameState} />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => logout()}
            className="text-[#c44] hover:bg-[#2a2820] hover:text-red-400"
          >
            <LogOut className="w-4 h-4" />
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-[#d4944c]">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#12110e] border-l border-[#2a2820] p-0 w-80">
               <StatusPanel state={gameState} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex min-h-0 relative z-0">
        {/* TERMINAL AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0a0908] relative">
          <div className="flex-1 overflow-hidden relative">
            <Terminal 
              log={gameState.log} 
              dialogue={gameState.dialogue} 
              gameState={gameState}
            />
          </div>
          
          {/* INPUT AREA */}
          <div className="p-4 bg-[#12110e] border-t border-[#2a2820] z-20">
            <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
              <span className="text-[#d4944c] font-bold py-2 font-mono">{'>'}</span>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none text-[#c8b88a] font-mono text-lg focus-visible:ring-0 px-0 h-auto placeholder:text-[#2a2820]"
                placeholder="What do you do, Captain?"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {['look', 'inv', 'status', 'help', 'wait', 'clear'].map(cmd => (
                <button
                  key={cmd}
                  onClick={() => handleQuickCmd(cmd)}
                  className="px-3 py-1 bg-[#0a0908] border border-[#2a2820] text-xs text-[#706848] font-mono uppercase hover:border-[#d4944c] hover:text-[#d4944c] transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR (Desktop only) */}
        <div className="hidden md:block w-72 flex-shrink-0 h-full">
          <StatusPanel state={gameState} />
        </div>
      </main>
    </div>
  );
}
