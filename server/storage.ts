import { db } from "../db";
import { apps, type App, type InsertApp } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAllApps(): Promise<App[]>;
  getApp(id: number): Promise<App | undefined>;
  createApp(app: InsertApp): Promise<App>;
  updateApp(id: number, app: Partial<InsertApp>): Promise<App | undefined>;
  deleteApp(id: number): Promise<boolean>;
}

export class DbStorage implements IStorage {
  async getAllApps(): Promise<App[]> {
    return await db.select().from(apps);
  }

  async getApp(id: number): Promise<App | undefined> {
    const result = await db.select().from(apps).where(eq(apps.id, id));
    return result[0];
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const result = await db.insert(apps).values(insertApp).returning();
    return result[0];
  }

  async updateApp(id: number, updateData: Partial<InsertApp>): Promise<App | undefined> {
    const result = await db
      .update(apps)
      .set(updateData)
      .where(eq(apps.id, id))
      .returning();
    return result[0];
  }

  async deleteApp(id: number): Promise<boolean> {
    const result = await db.delete(apps).where(eq(apps.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DbStorage();
