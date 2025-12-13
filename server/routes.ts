import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppSchema, updateAppSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { db } from "../db";
import { sql } from "drizzle-orm";

function adminAuth(req: Request, res: Response, next: NextFunction) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminToken = process.env.ADMIN_TOKEN;
  
  const authHeader = req.headers.authorization;
  const queryToken = req.query.token as string;
  
  if (!adminPassword && !adminToken) {
    return res.status(500).json({ error: "Admin authentication not configured" });
  }

  if (authHeader) {
    const [type, credentials] = authHeader.split(" ");
    if (type === "Bearer" && (credentials === adminPassword || credentials === adminToken)) {
      return next();
    }
    if (type === "Basic") {
      const decoded = Buffer.from(credentials, "base64").toString();
      const [, password] = decoded.split(":");
      if (password === adminPassword) {
        return next();
      }
    }
  }

  if (queryToken && (queryToken === adminPassword || queryToken === adminToken)) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/health", async (req, res) => {
    try {
      await db.execute(sql`SELECT 1`);
      res.json({ 
        status: "healthy", 
        database: "connected",
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(503).json({ 
        status: "unhealthy", 
        database: "disconnected",
        timestamp: new Date().toISOString()
      });
    }
  });

  app.get("/api/apps", async (req, res) => {
    try {
      const apps = await storage.getAllApps();
      res.json(apps);
    } catch (error) {
      console.error("Error fetching apps:", error);
      res.status(500).json({ error: "Failed to fetch apps" });
    }
  });

  app.get("/api/apps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid app ID" });
      }
      
      const appData = await storage.getApp(id);
      if (!appData) {
        return res.status(404).json({ error: "App not found" });
      }
      
      res.json(appData);
    } catch (error) {
      console.error("Error fetching app:", error);
      res.status(500).json({ error: "Failed to fetch app" });
    }
  });

  app.post("/api/apps", adminAuth, async (req, res) => {
    try {
      const validation = insertAppSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromZodError(validation.error).message 
        });
      }

      const newApp = await storage.createApp(validation.data);
      res.status(201).json(newApp);
    } catch (error) {
      console.error("Error creating app:", error);
      res.status(500).json({ error: "Failed to create app" });
    }
  });

  app.put("/api/apps/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid app ID" });
      }

      const validation = updateAppSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromZodError(validation.error).message 
        });
      }

      const updatedApp = await storage.updateApp(id, validation.data);
      if (!updatedApp) {
        return res.status(404).json({ error: "App not found" });
      }

      res.json(updatedApp);
    } catch (error) {
      console.error("Error updating app:", error);
      res.status(500).json({ error: "Failed to update app" });
    }
  });

  app.patch("/api/apps/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid app ID" });
      }

      const validation = updateAppSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: fromZodError(validation.error).message 
        });
      }

      const updatedApp = await storage.updateApp(id, validation.data);
      if (!updatedApp) {
        return res.status(404).json({ error: "App not found" });
      }

      res.json(updatedApp);
    } catch (error) {
      console.error("Error updating app:", error);
      res.status(500).json({ error: "Failed to update app" });
    }
  });

  app.delete("/api/apps/:id", adminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid app ID" });
      }

      const deleted = await storage.deleteApp(id);
      if (!deleted) {
        return res.status(404).json({ error: "App not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting app:", error);
      res.status(500).json({ error: "Failed to delete app" });
    }
  });

  return httpServer;
}
