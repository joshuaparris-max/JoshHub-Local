import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { type LogEntry, DIALOGUE_TREES } from '@/lib/game-data';

interface TerminalProps {
  log: LogEntry[];
  dialogue?: { npcId: string, nodeId: string } | null;
  gameState?: any;
}

export function Terminal({ log, dialogue, gameState }: TerminalProps) {
  const endRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log, dialogue]);

  const dialogueNode = dialogue ? DIALOGUE_TREES[dialogue.npcId][dialogue.nodeId] : null;
  const availableOptions = dialogueNode?.options.filter((opt: any) => !opt.condition || opt.condition(gameState)) || [];

  return (
    <ScrollArea className="h-full w-full bg-transparent p-4 font-mono text-lg scrollbar-terminal">
      <div className="flex flex-col gap-1 min-h-full justify-end">
        {log.map((entry, i) => (
          <div 
            key={i} 
            className={cn(
              "leading-relaxed break-words whitespace-pre-wrap",
              entry.type === 'system' && "text-[#706848] italic",
              entry.type === 'error' && "text-[#c44]",
              entry.type === 'success' && "text-[#5a5]",
              entry.type === 'info' && "text-[#5a9aba]",
              entry.type === 'accent' && "text-[#d4944c] font-bold",
              entry.type === 'npc' && "text-[#caa848]",
              entry.type === 'dim' && "text-[#706848]",
              !entry.type && "text-[#c8b88a]" // Default
            )}
          >
            {entry.text}
          </div>
        ))}
        
        {dialogue && (
          <div className="mt-4 p-3 border border-[#2a2820] bg-[#12110e]/50 rounded-sm">
            <div className="text-[#706848] text-xs uppercase mb-2 tracking-widest">Available Options:</div>
            {availableOptions.map((opt: any, i: number) => (
              <div key={i} className="text-[#c8b88a] hover:text-[#d4944c] cursor-pointer py-1 transition-colors">
                <span className="text-[#d4944c] mr-2">[{i + 1}]</span>
                {opt.text}
              </div>
            ))}
            <div className="text-[#706848] text-xs mt-3 italic">Type the number to respond, or 'end' to leave.</div>
          </div>
        )}
        
        <div ref={endRef} />
      </div>
    </ScrollArea>
  );
}
