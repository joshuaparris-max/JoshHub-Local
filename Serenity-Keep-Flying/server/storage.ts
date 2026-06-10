import { gameSaves, type GameSave, type InsertGameSave } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Game Saves
  getGameSaves(userId: string): Promise<GameSave[]>;
  getGameSave(id: number): Promise<GameSave | undefined>;
  createGameSave(userId: string, save: InsertGameSave): Promise<GameSave>;
  updateGameSave(id: number, userId: string, save: Partial<InsertGameSave>): Promise<GameSave | undefined>;
  deleteGameSave(id: number, userId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getGameSaves(userId: string): Promise<GameSave[]> {
    return await db.select().from(gameSaves).where(eq(gameSaves.userId, userId));
  }

  async getGameSave(id: number): Promise<GameSave | undefined> {
    const [save] = await db.select().from(gameSaves).where(eq(gameSaves.id, id));
    return save;
  }

  async createGameSave(userId: string, save: InsertGameSave): Promise<GameSave> {
    const [newSave] = await db.insert(gameSaves).values({ ...save, userId }).returning();
    return newSave;
  }

  async updateGameSave(id: number, userId: string, save: Partial<InsertGameSave>): Promise<GameSave | undefined> {
    const [updated] = await db
      .update(gameSaves)
      .set({ ...save, updatedAt: new Date() })
      .where(and(eq(gameSaves.id, id), eq(gameSaves.userId, userId)))
      .returning();
    return updated;
  }

  async deleteGameSave(id: number, userId: string): Promise<void> {
    await db.delete(gameSaves).where(and(eq(gameSaves.id, id), eq(gameSaves.userId, userId)));
  }
}

export const storage = new DatabaseStorage();
