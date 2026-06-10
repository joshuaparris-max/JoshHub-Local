import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertGameSaveInput } from "@shared/routes";
import { useAuth } from "@/hooks/use-auth";

export function useSaves() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: [api.saves.list.path],
    queryFn: async () => {
      if (!isAuthenticated) return [];
      const res = await fetch(api.saves.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch saves");
      return api.saves.list.responses[200].parse(await res.json());
    },
    enabled: isAuthenticated,
  });
}

export function useSaveGame() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertGameSaveInput) => {
      const res = await fetch(api.saves.save.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to save game");
      }
      
      return api.saves.save.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.saves.list.path] });
    },
  });
}

export function useLoadGame() {
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.saves.load.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Save not found");
        throw new Error("Failed to load save");
      }
      
      return api.saves.load.responses[200].parse(await res.json());
    },
  });
}

export function useDeleteSave() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.saves.delete.path, { id });
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      
      if (!res.ok) throw new Error("Failed to delete save");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.saves.list.path] });
    },
  });
}
