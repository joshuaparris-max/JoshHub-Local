import { type GameState, ROOMS, ITEMS } from '@/lib/game-data';
import { Shield, Fuel, Heart, Coins, MapPin, Backpack } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function StatusPanel({ state }: { state: GameState }) {
  const roomName = ROOMS[state.player.location]?.name || "Unknown";

  return (
    <div className="h-full bg-[#12110e] border-l border-[#2a2820] p-6 font-mono flex flex-col gap-8 overflow-y-auto">
      {/* SHIP STATUS */}
      <div className="space-y-4">
        <h3 className="text-[#d4944c] text-lg font-bold border-b border-[#2a2820] pb-2 uppercase tracking-widest">
          Serenity Status
        </h3>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs uppercase text-[#706848]">
              <span className="flex items-center gap-2"><Shield className="w-3 h-3" /> Hull Integrity</span>
              <span>{state.ship.hull}%</span>
            </div>
            <Progress value={state.ship.hull} className="h-1 bg-[#2a2820]" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs uppercase text-[#706848]">
              <span className="flex items-center gap-2"><Fuel className="w-3 h-3" /> Fuel Reserves</span>
              <span>{state.ship.fuel}%</span>
            </div>
            <Progress value={state.ship.fuel} className="h-1 bg-[#2a2820]" />
          </div>

          <div className="flex justify-between items-center bg-[#1a1814] p-2 rounded border border-[#2a2820]">
            <span className="text-xs uppercase text-[#706848]">Docked At</span>
            <span className="text-xs text-[#c8b88a] uppercase">{state.ship.docked}</span>
          </div>
        </div>
      </div>

      {/* CREW STATUS */}
      <div className="space-y-4">
        <h3 className="text-[#d4944c] text-lg font-bold border-b border-[#2a2820] pb-2 uppercase tracking-widest">
          Captain's Log
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1a1814] p-3 rounded border border-[#2a2820]">
            <div className="text-xs text-[#706848] mb-1 flex items-center gap-2">
              <Heart className="w-3 h-3" /> Health
            </div>
            <div className="text-xl font-bold text-[#c8b88a]">
              {state.player.hp} <span className="text-sm text-[#706848]">/ {state.player.maxHp}</span>
            </div>
          </div>
          
          <div className="bg-[#1a1814] p-3 rounded border border-[#2a2820]">
            <div className="text-xs text-[#706848] mb-1 flex items-center gap-2">
              <Coins className="w-3 h-3" /> Credits
            </div>
            <div className="text-xl font-bold text-[#d4944c]">
              {state.player.credits} ¤
            </div>
          </div>
        </div>

        <div className="bg-[#1a1814] p-3 rounded border border-[#2a2820]">
          <div className="text-xs text-[#706848] mb-1 flex items-center gap-2">
            <MapPin className="w-3 h-3" /> Location
          </div>
          <div className="text-sm font-bold text-[#c8b88a]">
            {roomName}
          </div>
        </div>
      </div>

      {/* INVENTORY */}
      <div className="flex-1 min-h-0 flex flex-col">
        <h3 className="text-[#d4944c] text-lg font-bold border-b border-[#2a2820] pb-2 mb-4 uppercase tracking-widest flex items-center gap-2">
          <Backpack className="w-4 h-4" /> Cargo
        </h3>
        
        <div className="flex-1 overflow-y-auto pr-2 space-y-2 scrollbar-custom">
          {state.player.inventory.length === 0 ? (
            <div className="text-xs text-[#706848] italic py-4 text-center">Empty pockets, empty hands.</div>
          ) : (
            state.player.inventory.map((itemId, i) => (
              <div key={i} className="bg-[#1a1814] p-2 rounded border border-[#2a2820] flex items-center justify-between group hover:border-[#706848] transition-colors">
                <span className="text-sm text-[#c8b88a] capitalize">{ITEMS[itemId]?.name}</span>
                <span className="text-[10px] text-[#706848] uppercase border border-[#2a2820] px-1 rounded">
                  {ITEMS[itemId]?.type}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
