import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./replit_integrations/auth";
import { registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { isAuthenticated } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const offline = !process.env.DATABASE_URL;
  if (!offline) {
    await setupAuth(app);
    registerAuthRoutes(app);
  }

  // Game Save Routes

  // List saves
  if (!offline) {
    app.get(api.gameSaves.list.path, isAuthenticated, async (req: any, res) => {
      const userId = req.user.claims.sub;
      const saves = await storage.getGameSaves(userId);
      res.json(saves);
    });

  // Create save
    app.post(api.gameSaves.create.path, isAuthenticated, async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const input = api.gameSaves.create.input.parse(req.body);
        const save = await storage.createGameSave(userId, input);
        res.status(201).json(save);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        throw err;
      }
    });

  // Update save
    app.put(api.gameSaves.update.path, isAuthenticated, async (req: any, res) => {
      try {
        const userId = req.user.claims.sub;
        const id = parseInt(req.params.id);
        const input = api.gameSaves.update.input.parse(req.body);
        
        const updated = await storage.updateGameSave(id, userId, input);
        if (!updated) {
          return res.status(404).json({ message: "Save not found" });
        }
        
        res.json(updated);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        throw err;
      }
    });

  // Delete save
    app.delete(api.gameSaves.delete.path, isAuthenticated, async (req: any, res) => {
      const userId = req.user.claims.sub;
      const id = parseInt(req.params.id);
      await storage.deleteGameSave(id, userId);
      res.status(204).send();
    });
  }

  return httpServer;
}
