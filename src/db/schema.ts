// file: src/app/db/schema.ts
import { relations } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

/**
 * This table stores quotes submitted by users.
 */
export const schoolEnum = pgEnum("school", ["AASTU", "AAiT", "Ghana", "ASTU"]);
export const participantTypeEnum = pgEnum("participant_type", [
  "CONTESTANT",
  "VIRTUAL",
  "PRACTICE",
]);
export const Student = pgTable("student", {
  name: text("name"),
  group: text("group").notNull(),
  school: schoolEnum("school"),
  cf_handle: text("cf_handle").primaryKey(),
});
export const studentRelation = relations(Student, ({ many }) => ({
  ContestInteraction: many(ContestInteraction),
}));

export const Contest = pgTable("contest", {
  contest_id: text("contest_id").primaryKey(),
  contest_name: text("name"),
  no_questions: integer("no_questions"),
});
export const contestRelation = relations(Contest, ({ many }) => ({
  ContestInteraction: many(ContestInteraction),
}));
export const ContestInteraction = pgTable(
  "contest_interaction",
  {
    contest_id: text("contest_id").references(() => Contest.contest_id),
    cf_handle: text("cf_handle").references(() => Student.cf_handle),
    rank: integer("rank"),
    no_solved: integer("no_solved"),
    participant_type: participantTypeEnum("participant_type"),
    penality: integer("penality"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.cf_handle, table.contest_id] }),
    };
  },
);

export type InsertStudent = typeof Student.$inferInsert;
export type SelectStudent = typeof Student.$inferSelect;
export type InsertContest = typeof Contest.$inferInsert;
export type SelectContest = typeof Contest.$inferSelect;
export type InsertContestInteraction = typeof ContestInteraction.$inferInsert;
export type SelectContestInteraction = typeof ContestInteraction.$inferSelect;
