import { db } from "./index";
import { apps } from "@shared/schema";

const seedApps = [
  {
    title: "AI Chat Assistant",
    description: "A smart conversational agent powered by advanced LLMs.",
    icon: "Terminal",
    tags: ["AI", "React", "Node.js"],
    link: "#"
  },
  {
    title: "Project Nexus",
    description: "Collaborative project management tool for remote teams.",
    icon: "Layers",
    tags: ["Productivity", "SaaS", "Real-time"],
    link: "#"
  },
  {
    title: "DevDash",
    description: "All-in-one dashboard for monitoring server health and metrics.",
    icon: "Cpu",
    tags: ["DevOps", "Dashboard", "Monitoring"],
    link: "#"
  },
  {
    title: "CodeSnippet",
    description: "Share and discover beautiful code snippets instantly.",
    icon: "Code",
    tags: ["Social", "Developer", "Utility"],
    link: "#"
  },
  {
    title: "CryptoWatch",
    description: "Real-time cryptocurrency tracker and portfolio manager.",
    icon: "Zap",
    tags: ["Finance", "API", "Charts"],
    link: "#"
  },
  {
    title: "Global Atlas",
    description: "Interactive 3D globe with demographic data visualization.",
    icon: "Globe",
    tags: ["Visualization", "3D", "Education"],
    link: "#"
  }
];

async function seed() {
  console.log("Seeding database...");
  
  // Check if apps already exist
  const existingApps = await db.select().from(apps);
  
  if (existingApps.length > 0) {
    console.log("Database already seeded. Skipping...");
    return;
  }

  // Insert seed apps
  await db.insert(apps).values(seedApps);
  
  console.log(`Seeded ${seedApps.length} apps successfully!`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
