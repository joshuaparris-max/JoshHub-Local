import { users, gameSaves, type User, type UpsertUser, type GameSave, type InsertGameSave } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getGameSaves(userId: string): Promise<GameSave[]>;
  getGameSave(id: number): Promise<GameSave | undefined>;
  createGameSave(save: InsertGameSave): Promise<GameSave>;
  deleteGameSave(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: { ...userData, updatedAt: new Date() },
      })
      .returning();
    return user;
  }

  async getGameSaves(userId: string): Promise<GameSave[]> {
    return await db.select().from(gameSaves).where(eq(gameSaves.userId, userId)).orderBy(desc(gameSaves.updatedAt));
  }

  async getGameSave(id: number): Promise<GameSave | undefined> {
    const [save] = await db.select().from(gameSaves).where(eq(gameSaves.id, id));
    return save;
  }

  async createGameSave(save: InsertGameSave): Promise<GameSave> {
    const [newSave] = await db.insert(gameSaves).values(save).returning();
    return newSave;
  }

  async deleteGameSave(id: number): Promise<void> {
    await db.delete(gameSaves).where(eq(gameSaves.id, id));
  }
}

export const storage = new DatabaseStorage();
