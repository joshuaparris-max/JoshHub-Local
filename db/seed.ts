import { db } from "./index";
import { apps } from "../shared/schema";

const seedApps = [
  {
    title: "AI Chat Assistant",
    description: "A smart conversational agent powered by advanced LLMs.",
    icon: "Terminal",
    tags: ["AI", "React", "Node.js"],
    link: "#",
    status: "active",
    notes: null,
  },
  {
    title: "Project Nexus",
    description: "Collaborative project management tool for remote teams.",
    icon: "Layers",
    tags: ["Productivity", "SaaS", "Real-time"],
    link: "#",
    status: "active",
    notes: null,
  },
  {
    title: "DevDash",
    description: "All-in-one dashboard for monitoring server health and metrics.",
    icon: "Cpu",
    tags: ["DevOps", "Dashboard", "Monitoring"],
    link: "#",
    status: "active",
    notes: null,
  },
  {
    title: "CodeSnippet",
    description: "Share and discover beautiful code snippets instantly.",
    icon: "Code",
    tags: ["Social", "Developer", "Utility"],
    link: "#",
    status: "active",
    notes: null,
  },
  {
    title: "CryptoWatch",
    description: "Real-time cryptocurrency tracker and portfolio manager.",
    icon: "Zap",
    tags: ["Finance", "API", "Charts"],
    link: "#",
    status: "broken",
    notes: "API endpoint deprecated",
  },
  {
    title: "Global Atlas",
    description: "Interactive 3D globe with demographic data visualization.",
    icon: "Globe",
    tags: ["Visualization", "3D", "Education"],
    link: "#",
    status: "active",
    notes: null,
  }
];

async function seed() {
  console.log("Seeding database...");
  
  const existingApps = await db.select().from(apps);
  
  if (existingApps.length > 0) {
    console.log("Database already seeded. Skipping...");
    process.exit(0);
    return;
  }

  await db.insert(apps).values(seedApps);
  
  console.log(`Seeded ${seedApps.length} apps successfully!`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
