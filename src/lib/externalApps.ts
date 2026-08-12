import fs from "fs";
import path from "path";
import { CatalogItem } from "@/data/apps";

const KNOWN_EXCLUDES = new Set([".git", "node_modules", "JoshHub", "public", ".next"]);

function findIndexFileIn(dir: string): string | null {
  const candidates = [
    "index.html",
    path.join("dist", "index.html"),
    path.join("build", "index.html"),
    path.join("public", "index.html"),
    path.join("client", "index.html"),
  ];
  for (const c of candidates) {
    const p = path.join(/*turbopackIgnore: true*/ dir, c);
    if (fs.existsSync(/*turbopackIgnore: true*/ p) && fs.statSync(/*turbopackIgnore: true*/ p).isFile()) return p;
  }

  try {
    const subents = fs.readdirSync(/*turbopackIgnore: true*/ dir, { withFileTypes: true });
    for (const s of subents) {
      if (!s.isDirectory()) continue;
      const p = path.join(/*turbopackIgnore: true*/ dir, s.name);
      for (const c of candidates) {
        const candidatePath = path.join(/*turbopackIgnore: true*/ p, c);
        if (fs.existsSync(/*turbopackIgnore: true*/ candidatePath) && fs.statSync(/*turbopackIgnore: true*/ candidatePath).isFile()) return candidatePath;
      }
    }
  } catch (e) {
    // ignore
  }

  return null;
}

export async function discoverExternalApps(): Promise<CatalogItem[]> {
  const cwd = process.cwd();
  const workspaceRoot = path.resolve(cwd, "..");
  let entries: CatalogItem[] = [];
  try {
    const dirents = fs.readdirSync(/*turbopackIgnore: true*/ workspaceRoot, { withFileTypes: true });
    for (const d of dirents) {
      if (!d.isDirectory()) continue;
      if (KNOWN_EXCLUDES.has(d.name)) continue;
      const projectPath = path.join(/*turbopackIgnore: true*/ workspaceRoot, d.name);
      const indexPath = findIndexFileIn(projectPath);
      if (!indexPath) continue;

      const lower = d.name.toLowerCase();
      const isNeverwinter = lower.includes("neverwinter");
      const isDinnerDecider = lower === "dinner-decider";
      const isForbiddenQuests = lower.includes("forbiddenquests") || lower.includes("forbidden-quests");
      const item: CatalogItem = {
        id: `external-${d.name}`,
        name: d.name,
        type: "app",
        category: "Games",
        status: "ok",
        tags: ["external", "workspace"],
        primaryUrl: isNeverwinter
          ? "/games/neverwinter-tales/index.html"
          : isDinnerDecider
            ? "/games/dinner-decider/index.html"
            : isForbiddenQuests
              ? "/games/forbidden-quests/index.html"
              : `/external/${encodeURIComponent(d.name)}/`,
        urls: isNeverwinter
          ? [{ label: "Local (fixed)", url: "/games/neverwinter-tales/index.html" }]
          : isDinnerDecider
            ? [{ label: "Play (Local)", url: "/games/dinner-decider/index.html" }]
            : isForbiddenQuests
              ? [{ label: "Play (Local)", url: "/games/forbidden-quests/index.html" }]
              : [{ label: "Local", url: `/external/${encodeURIComponent(d.name)}/` }],
      };
      entries.push(item);
    }
  } catch (e) {
    // ignore
  }
  return entries;
}
