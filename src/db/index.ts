// file: src/app/db/index.ts

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { Student, Contest, ContestInteraction } from "./schema";
if (!process.env.DB_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}
const connectionString = process.env.DB_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const sql = postgres(connectionString, { prepare: false });
export const db = drizzle(sql, {
  schema: {
    Student,
    Contest,
    ContestInteraction,
  },
});
