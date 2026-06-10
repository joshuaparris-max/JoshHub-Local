import { z } from 'zod';
import { insertGameSaveSchema, gameSaves } from './schema';

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
};

export const api = {
  gameSaves: {
    list: {
      method: 'GET' as const,
      path: '/api/saves' as const,
      responses: {
        200: z.array(z.custom<typeof gameSaves.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/saves' as const,
      input: insertGameSaveSchema.omit({ userId: true }), // userId comes from session
      responses: {
        201: z.custom<typeof gameSaves.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/saves/:id' as const,
      input: z.object({
        name: z.string().optional(),
        data: z.any().optional(),
      }),
      responses: {
        200: z.custom<typeof gameSaves.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/saves/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
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
