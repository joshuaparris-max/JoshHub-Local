import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

let pool: any = undefined;
let db: any = undefined;
if (process.env.DATABASE_URL) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema });
} else {
  // eslint-disable-next-line no-console
  console.warn("Running in offline mode: DATABASE_URL is not set.");
}

export { pool, db };
