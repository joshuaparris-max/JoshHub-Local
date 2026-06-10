import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSaves, useSaveGame, useLoadGame, useDeleteSave } from "@/hooks/use-saves";
import { useAuth } from "@/hooks/use-auth";
import { format } from "date-fns";
import { Loader2, Trash2, Save, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { GameState } from "@/lib/game-data";

interface SaveManagerProps {
  currentState: GameState;
  onLoad: (state: GameState) => void;
}

export function SaveManager({ currentState, onLoad }: SaveManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { data: saves, isLoading: loadingSaves } = useSaves();
  const saveMutation = useSaveGame();
  const loadMutation = useLoadGame();
  const deleteMutation = useDeleteSave();

  const handleSave = async () => {
    if (!saveName.trim()) return;
    try {
      await saveMutation.mutateAsync({
        name: saveName,
        data: currentState,
        userId: user?.id || ""
      });
      toast({ title: "Game Saved", description: `Saved as "${saveName}"` });
      setSaveName("");
    } catch (err) {
      toast({ title: "Error", description: "Failed to save game", variant: "destructive" });
    }
  };

  const handleLoad = async (id: number) => {
    try {
      const save = await loadMutation.mutateAsync(id);
      onLoad(save.data as GameState);
      toast({ title: "Game Loaded", description: `Loaded "${save.name}"` });
      setIsOpen(false);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load save", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete save", variant: "destructive" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="btn-retro flex items-center gap-2">
          <Save className="w-4 h-4" /> SYSTEM
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#12110e] border-[#2a2820] text-[#c8b88a] font-mono max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#d4944c] font-vt323 text-2xl tracking-wide uppercase">
            CORTEX DATA STORAGE
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* SAVE SECTION */}
          <div className="space-y-4 border-r border-[#2a2820] pr-6">
            <h4 className="text-[#5a9aba] font-bold border-b border-[#2a2820] pb-2">CREATE BACKUP</h4>
            <div className="flex gap-2">
              <Input
                value={saveName}
                onChange={(e) => setSaveName(e.target.value)}
                placeholder="Enter save name..."
                className="bg-[#0a0908] border-[#2a2820] text-[#c8b88a] font-mono"
              />
              <Button 
                onClick={handleSave}
                disabled={!saveName || saveMutation.isPending}
                className="bg-[#d4944c] hover:bg-[#b0783a] text-[#0a0908] font-bold font-mono"
              >
                {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "SAVE"}
              </Button>
            </div>
            <p className="text-xs text-[#706848]">
              Current Location: {currentState.player.location}<br/>
              Time: {currentState.time}
            </p>
          </div>

          {/* LOAD SECTION */}
          <div className="space-y-4">
            <h4 className="text-[#5a5] font-bold border-b border-[#2a2820] pb-2">RESTORE DATA</h4>
            {loadingSaves ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-[#d4944c]" /></div>
            ) : saves?.length === 0 ? (
              <div className="text-[#706848] italic py-8 text-center">No data found in cortex.</div>
            ) : (
              <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-terminal pr-2">
                {saves?.map((save) => (
                  <div key={save.id} className="group flex items-center justify-between p-3 bg-[#0a0908] border border-[#2a2820] hover:border-[#d4944c] transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#e8d8a0]">{save.name}</span>
                      <span className="text-xs text-[#706848]">
                        {format(new Date(save.updatedAt || new Date()), "MMM d, HH:mm")}
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleLoad(save.id)}
                        disabled={loadMutation.isPending}
                        className="hover:bg-[#5a5] hover:text-[#0a0908] h-8 w-8"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(save.id)}
                        disabled={deleteMutation.isPending}
                        className="hover:bg-[#c44] hover:text-[#0a0908] h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
