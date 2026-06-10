import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type GameState, type LogEntry, DIALOGUE_TREES, NPCS } from '@/lib/game-data';

interface TerminalProps {
  log: LogEntry[];
  dialogue: GameState['dialogue'];
  gameState: GameState;
}

export function Terminal({ log, dialogue, gameState }: TerminalProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const getLogClass = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return 'text-[#c44] font-bold';
      case 'success': return 'text-green-500';
      case 'accent': return 'text-[#d4944c] font-bold tracking-wide';
      case 'npc': return 'text-cyan-400 italic';
      case 'dim': return 'text-[#706848]';
      case 'system': return 'text-yellow-200/50';
      default: return 'text-[#c8b88a]';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 font-mono text-base md:text-lg leading-relaxed scrollbar-custom">
      <div className="flex flex-col gap-2 max-w-4xl mx-auto">
        <AnimatePresence initial={false}>
          {log.map((entry, i) => (
            <motion.div
              key={`${entry.turn}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`${getLogClass(entry.type)} whitespace-pre-wrap break-words`}
            >
              {entry.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {dialogue && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 border border-[#d4944c]/30 bg-[#d4944c]/5 rounded-lg"
          >
            <div className="text-[#d4944c] uppercase font-bold text-xs mb-2">
              Conversation with {NPCS[dialogue.npcId].name}
            </div>
            <div className="flex flex-col gap-2">
              {DIALOGUE_TREES[dialogue.npcId][dialogue.nodeId].options
                .filter((opt: any) => !opt.condition || opt.condition(gameState))
                .map((opt: any, idx: number) => (
                  <div key={idx} className="flex gap-3 text-[#c8b88a] hover:text-white cursor-default">
                    <span className="text-[#d4944c] font-bold">[{idx + 1}]</span>
                    <span>{opt.text}</span>
                  </div>
                ))
              }
            </div>
          </motion.div>
        )}
        
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
