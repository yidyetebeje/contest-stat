import { db } from ".";
import { avg, countDistinct, eq } from "drizzle-orm";
import { ContestInteraction, Student } from "./schema";
import { Contest } from "@/utilities/codeforcesquery";

export async function getContests() {
  return await db.query.Contest.findMany();
}
export async function getStanding(contestId: string) {
  let standing = await db
    .select()
    .from(ContestInteraction)
    .innerJoin(Student, eq(Student.cf_handle, ContestInteraction.cf_handle))
    .where(eq(ContestInteraction.contest_id, contestId));
  let mapped = standing.map((st) => {
    return {
      ...st.contest_interaction,
      ...st.student,
    };
  });
  return mapped;
}
export async function aggregateStanding(contestId: string) {
  let average = await db
    .select({
      school: Student.school,
      group: Student.group,
      avg: avg(ContestInteraction.no_solved),
      participant_number: countDistinct(ContestInteraction.cf_handle),
    })
    .from(Student)
    .innerJoin(
      ContestInteraction,
      eq(Student.cf_handle, ContestInteraction.cf_handle),
    )
    .where(eq(ContestInteraction.contest_id, contestId))
    .groupBy((t) => [t.group, t.school]);

  return average;
}
export async function getAbsents(contestId: string) {
  // TODO: to be implemented
}
