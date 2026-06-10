import { z } from "zod";
import { insertGameSaveSchema, gameSaves } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unauthorized: z.object({
    message: z.string(),
  }),
};

export const api = {
  saves: {
    list: {
      method: "GET" as const,
      path: "/api/saves" as const,
      responses: {
        200: z.array(z.custom<typeof gameSaves.$inferSelect>()),
        401: errorSchemas.unauthorized,
      },
    },
    save: {
      method: "POST" as const,
      path: "/api/saves" as const,
      input: insertGameSaveSchema,
      responses: {
        201: z.custom<typeof gameSaves.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.unauthorized,
      },
    },
    load: {
      method: "GET" as const,
      path: "/api/saves/:id" as const,
      responses: {
        200: z.custom<typeof gameSaves.$inferSelect>(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/saves/:id" as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
        401: errorSchemas.unauthorized,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type GameSaveResponse = z.infer<typeof api.saves.load.responses[200]>;
export type InsertGameSaveInput = z.infer<typeof api.saves.save.input>;
