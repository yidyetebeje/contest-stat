// file: src/app/db/index.ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Student, Contest, ContestInteraction } from "./schema";
if (!process.env.DB_URL) {
  throw new Error("DATABASE_URL must be a Neon postgres connection string");
}
const sql = neon(process.env.DB_URL);
export const db = drizzle(sql, {
  schema: {
    Student,
    Contest,
    ContestInteraction,
  },
});
