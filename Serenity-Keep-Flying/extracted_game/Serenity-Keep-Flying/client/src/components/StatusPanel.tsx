import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ITEMS, INITIAL_STATE, type GameState } from "@/lib/game-data";
import { User, Shield, Battery, Flame, Coins, Heart } from "lucide-react";

interface StatusPanelProps {
  state: GameState;
}

export function StatusPanel({ state }: StatusPanelProps) {
  return (
    <div className="h-full bg-[#12110e] border-l border-[#2a2820] p-4 font-mono overflow-y-auto scrollbar-terminal flex flex-col gap-6 w-72">
      
      {/* SHIP STATUS */}
      <div>
        <h3 className="text-[#d4944c] text-xl mb-3 flex items-center gap-2 border-b border-[#2a2820] pb-2">
          <Shield className="w-4 h-4" /> SHIP SYSTEMS
        </h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-[#706848]">
              <span>Hull Integrity</span>
              <span>{state.ship.hull}%</span>
            </div>
            <Progress value={state.ship.hull} className="h-2 bg-[#0a0908] border border-[#2a2820]" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-[#706848]">
              <span>Fuel Reserves</span>
              <span>{state.ship.fuel}%</span>
            </div>
            <Progress value={state.ship.fuel} className="h-2 bg-[#0a0908] border border-[#2a2820]" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm text-[#706848]">
              <span>Engine Heat</span>
              <span>{state.ship.heat}%</span>
            </div>
            <Progress value={state.ship.heat} className="h-2 bg-[#0a0908] border border-[#2a2820]" />
          </div>
        </div>
      </div>

      {/* PLAYER STATUS */}
      <div>
        <h3 className="text-[#d4944c] text-xl mb-3 flex items-center gap-2 border-b border-[#2a2820] pb-2">
          <User className="w-4 h-4" /> CAPTAIN
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0a0908] p-2 border border-[#2a2820] text-center">
            <div className="text-[#706848] text-xs uppercase mb-1 flex justify-center items-center gap-1"><Heart className="w-3 h-3"/> Health</div>
            <span className="text-xl text-[#c8b88a]">{state.player.hp}/{state.player.maxHp}</span>
          </div>
          <div className="bg-[#0a0908] p-2 border border-[#2a2820] text-center">
            <div className="text-[#706848] text-xs uppercase mb-1 flex justify-center items-center gap-1"><Coins className="w-3 h-3"/> Credits</div>
            <span className="text-xl text-[#c8b88a]">{state.player.credits}</span>
          </div>
        </div>
      </div>

      {/* INVENTORY */}
      <div className="flex-1">
        <h3 className="text-[#d4944c] text-xl mb-3 flex items-center gap-2 border-b border-[#2a2820] pb-2">
          INVENTORY
        </h3>
        {state.player.inventory.length === 0 ? (
          <p className="text-[#706848] italic text-sm">Empty...</p>
        ) : (
          <ul className="space-y-2">
            {state.player.inventory.map((itemId, idx) => (
              <li key={idx} className="bg-[#0a0908] border border-[#2a2820] p-2 text-sm text-[#c8b88a]">
                {ITEMS[itemId]?.name || itemId}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CREW MORALE */}
      <div>
        <h3 className="text-[#d4944c] text-xl mb-3 flex items-center gap-2 border-b border-[#2a2820] pb-2">
          CREW MORALE
        </h3>
        <div className="flex gap-1">
          {Array.from({length: 10}).map((_, i) => (
            <div 
              key={i} 
              className={`h-4 w-full border border-[#2a2820] ${i < state.morale ? 'bg-[#5a9aba]' : 'bg-[#0a0908]'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
