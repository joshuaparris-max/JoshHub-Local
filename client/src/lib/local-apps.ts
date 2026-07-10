import type { App, InsertApp } from "@shared/schema";

const STORAGE_KEY = "hub-improvement.apps";

const seededApps: App[] = [
  { id: 1, title: "AI Chat Assistant", description: "A smart conversational agent powered by advanced LLMs.", icon: "Terminal", tags: ["AI", "React", "Node.js"], link: "#", status: "active", notes: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: "Project Nexus", description: "Collaborative project management tool for remote teams.", icon: "Layers", tags: ["Productivity", "SaaS", "Real-time"], link: "#", status: "active", notes: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, title: "DevDash", description: "All-in-one dashboard for monitoring server health and metrics.", icon: "Cpu", tags: ["DevOps", "Dashboard", "Monitoring"], link: "#", status: "active", notes: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, title: "CodeSnippet", description: "Share and discover beautiful code snippets instantly.", icon: "Code", tags: ["Social", "Developer", "Utility"], link: "#", status: "active", notes: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, title: "CryptoWatch", description: "Real-time cryptocurrency tracker and portfolio manager.", icon: "Zap", tags: ["Finance", "API", "Charts"], link: "#", status: "broken", notes: "API endpoint deprecated", createdAt: new Date(), updatedAt: new Date() },
  { id: 6, title: "Global Atlas", description: "Interactive 3D globe with demographic data visualization.", icon: "Globe", tags: ["Visualization", "3D", "Education"], link: "#", status: "active", notes: null, createdAt: new Date(), updatedAt: new Date() },
];

function normalizeApp(app: App): App {
  return {
    ...app,
    createdAt: app.createdAt ? new Date(app.createdAt) : null,
    updatedAt: app.updatedAt ? new Date(app.updatedAt) : null,
  };
}

export function getLocalApps(): App[] {
  if (typeof window === "undefined") return seededApps;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seededApps;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeApp) : seededApps;
  } catch {
    return seededApps;
  }
}

export function saveLocalApps(apps: App[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

export function createLocalApp(input: InsertApp): App {
  const apps = getLocalApps();
  const nextApp: App = {
    id: apps.reduce((maxId, app) => Math.max(maxId, app.id), 0) + 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...input,
  };
  saveLocalApps([...apps, nextApp]);
  return nextApp;
}

export function updateLocalApp(id: number, input: Partial<InsertApp>): App | undefined {
  const apps = getLocalApps();
  const index = apps.findIndex((app) => app.id === id);
  if (index === -1) return undefined;
  const updatedApp: App = { ...apps[index], ...input, updatedAt: new Date() };
  apps[index] = updatedApp;
  saveLocalApps(apps);
  return updatedApp;
}

export function deleteLocalApp(id: number): boolean {
  const apps = getLocalApps();
  const nextApps = apps.filter((app) => app.id !== id);
  if (nextApps.length === apps.length) return false;
  saveLocalApps(nextApps);
  return true;
}
