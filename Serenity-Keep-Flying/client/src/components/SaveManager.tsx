import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useGameSaves, useCreateSave, useUpdateSave, useDeleteSave } from '@/hooks/use-saves';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Save, Trash2, PlayCircle, LogIn } from "lucide-react";
import { format } from "date-fns";
import type { GameState } from '@/lib/game-data';
import { useToast } from '@/hooks/use-toast';

interface SaveManagerProps {
  currentState: GameState;
  onLoad: (state: GameState) => void;
}

export function SaveManager({ currentState, onLoad }: SaveManagerProps) {
  const { user, isAuthenticated } = useAuth();
  const { data: saves, isLoading } = useGameSaves();
  const createSave = useCreateSave();
  const updateSave = useUpdateSave();
  const deleteSave = useDeleteSave();
  const { toast } = useToast();
  
  const [newSaveName, setNewSaveName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    if (!newSaveName.trim()) return;
    try {
      await createSave.mutateAsync({
        name: newSaveName,
        data: currentState,
      });
      setNewSaveName("");
      toast({ title: "Game Saved", description: "Your progress has been secured." });
    } catch (error) {
      toast({ title: "Save Failed", description: (error as Error).message, variant: "destructive" });
    }
  };

  const handleOverwrite = async (id: number, name: string) => {
    try {
      await updateSave.mutateAsync({
        id,
        name,
        data: currentState,
      });
      toast({ title: "Game Saved", description: "Save file updated successfully." });
    } catch (error) {
      toast({ title: "Save Failed", description: (error as Error).message, variant: "destructive" });
    }
  };

  const handleLoad = (data: unknown) => {
    onLoad(data as GameState);
    setIsOpen(false);
    toast({ title: "Game Loaded", description: "Welcome back, Captain." });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this save?")) return;
    try {
      await deleteSave.mutateAsync(id);
      toast({ title: "Save Deleted", description: "Record scrubbed from the cortex." });
    } catch (error) {
      toast({ title: "Delete Failed", description: (error as Error).message, variant: "destructive" });
    }
  };

  if (!isAuthenticated) {
    return (
      <Button variant="outline" className="gap-2 border-[#d4944c] text-[#d4944c] hover:bg-[#d4944c]/10 bg-transparent font-mono" onClick={() => window.location.href = "/api/login"}>
        <LogIn className="w-4 h-4" /> Login to Save
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-[#d4944c] text-[#d4944c] hover:bg-[#d4944c]/10 bg-transparent font-mono">
          <Save className="w-4 h-4" /> Save / Load
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#12110e] border-[#2a2820] text-[#c8b88a] font-mono sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#d4944c] font-vt323 text-2xl uppercase tracking-widest">Flight Logs</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Create New Save */}
          <div className="flex gap-2">
            <Input
              placeholder="New Save Name..."
              value={newSaveName}
              onChange={(e) => setNewSaveName(e.target.value)}
              className="bg-[#0a0908] border-[#2a2820] text-[#c8b88a] focus-visible:ring-[#d4944c]"
            />
            <Button 
              onClick={handleSave}
              disabled={createSave.isPending || !newSaveName}
              className="bg-[#d4944c] text-black hover:bg-[#b07b3e]"
            >
              {createSave.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </Button>
          </div>

          <div className="h-px bg-[#2a2820]" />

          {/* List Saves */}
          <ScrollArea className="h-[300px] pr-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#d4944c]" />
              </div>
            ) : saves?.length === 0 ? (
              <div className="text-center text-[#706848] italic py-8">No records found in the cortex.</div>
            ) : (
              <div className="space-y-3">
                {saves?.map((save) => (
                  <div key={save.id} className="group bg-[#1a1814] p-3 rounded border border-[#2a2820] hover:border-[#d4944c] transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-[#c8b88a]">{save.name}</div>
                        <div className="text-xs text-[#706848]">
                          {save.updatedAt ? format(new Date(save.updatedAt), "MMM d, yyyy HH:mm") : 'Unknown Date'}
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOverwrite(save.id, save.name)}
                          className="h-8 w-8 hover:text-[#d4944c] hover:bg-[#d4944c]/10"
                          title="Overwrite"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(save.id)}
                          className="h-8 w-8 hover:text-[#c44] hover:bg-[#c44]/10"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#2a2820] hover:bg-[#d4944c] hover:text-black text-[#c8b88a] border border-transparent hover:border-[#d4944c] transition-all"
                      onClick={() => handleLoad(save.data)}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" /> Load Flight Log
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
