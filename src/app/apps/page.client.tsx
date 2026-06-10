"use client";

import { useMemo, useState } from "react";

import { AppCard } from "@/components/app-card";
import { AppFilters } from "@/components/app-filters";
import type { AppCategory, AppStatus, CatalogItem } from "@/data/apps";
import { addRecent } from "@/lib/recent";
import { usePinnedApps } from "@/features/apps/hooks/usePinnedApps";

type AppsStatusFilter = AppStatus | "all";
type AppsCategoryFilter = AppCategory | "all";

interface Props {
  searchParams?: { status?: string };
  apps: CatalogItem[];
}

export default function AppsPageClient({ searchParams, apps }: Props) {
  const statusParam = searchParams?.status;
  const allowedStatus: AppStatus[] = ["ok", "broken", "wip", "archived"];
  const initialStatus: AppsStatusFilter = allowedStatus.includes(statusParam as AppStatus)
    ? (statusParam as AppStatus)
    : "all";

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AppsStatusFilter>(initialStatus);
  const [category, setCategory] = useState<AppsCategoryFilter>("all");
  const { pinnedIds, togglePinned } = usePinnedApps();

  const filteredApps = useMemo(() => {
    const term = search.trim().toLowerCase();
    const statusOrder: Partial<Record<AppStatus, number>> = { ok: 0, wip: 1, broken: 2, archived: 3 };

    return apps
      .filter((app) => {
        if (category !== "all" && app.category !== category) return false;
        if (status !== "all" && app.status !== status) return false;
        if (term) {
          const haystack = [app.name, app.category, app.notes ?? "", ...(app.tags ?? [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(term)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const aPinned = pinnedIds.includes(a.id);
        const bPinned = pinnedIds.includes(b.id);
        if (aPinned && !bPinned) return -1;
        if (!aPinned && bPinned) return 1;

        const aStatus = statusOrder[a.status] ?? 99;
        const bStatus = statusOrder[b.status] ?? 99;
        if (aStatus !== bStatus) return aStatus - bStatus;

        return a.name.localeCompare(b.name);
      });
  }, [apps, category, status, search, pinnedIds]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catalogue</p>
        <h1 className="text-3xl font-semibold text-foreground">Apps & Games</h1>
        <p className="text-muted-foreground">
          Search, filter, and open every app or game from one place.
        </p>
      </div>
      <AppFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
      />

      <div className="flex flex-wrap gap-4 rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 p-3 text-[10px] uppercase tracking-wider text-neutral-500 dark:border-slate-800 dark:bg-slate-900/30">
        <span className="font-bold">Status Legend:</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> OK / Production</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> WIP / Development</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Broken / Blocked</span>
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-neutral-400" /> Archived</span>
      </div>

      {filteredApps.length === 0 ? (
        <p className="text-sm text-muted-foreground">No items match that search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredApps.map((app) => (
            <AppCard
              key={app.id}
              app={app}
              pinned={pinnedIds.includes(app.id)}
              onTogglePinned={() => togglePinned(app.id)}
              onOpen={addRecent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
