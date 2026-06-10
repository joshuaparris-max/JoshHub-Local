import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertGameSave, type GameSave } from "@shared/schema";

export function useGameSaves() {
  return useQuery({
    queryKey: [api.gameSaves.list.path],
    queryFn: async () => {
      const res = await fetch(api.gameSaves.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch saves");
      return api.gameSaves.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateSave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Omit<InsertGameSave, "userId">) => {
      const res = await fetch(api.gameSaves.create.path, {
        method: api.gameSaves.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.gameSaves.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create save");
      }
      return api.gameSaves.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.gameSaves.list.path] }),
  });
}

export function useUpdateSave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<Pick<GameSave, "name" | "data">>) => {
      const url = buildUrl(api.gameSaves.update.path, { id });
      const res = await fetch(url, {
        method: api.gameSaves.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Save not found");
        throw new Error("Failed to update save");
      }
      return api.gameSaves.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.gameSaves.list.path] }),
  });
}

export function useDeleteSave() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.gameSaves.delete.path, { id });
      const res = await fetch(url, {
        method: api.gameSaves.delete.method,
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 404) throw new Error("Save not found");
        throw new Error("Failed to delete save");
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.gameSaves.list.path] }),
  });
}
