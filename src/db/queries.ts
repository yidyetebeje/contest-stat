import { db } from ".";
import { avg, countDistinct, eq, notInArray } from "drizzle-orm";
import {
  ContestInteraction,
  InsertContest,
  InsertContestInteraction,
  Student,
  Contest,
} from "./schema";

export async function getContests() {
  return await db.query.Contest.findMany();
}
export async function getStanding(contestId: string) {
  let standing = await db
    .select()
    .from(ContestInteraction)
    .innerJoin(Student, eq(Student.cf_handle, ContestInteraction.cf_handle))
    .where(eq(ContestInteraction.contest_id, contestId))
    .orderBy((st) => st.contest_interaction.rank);
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
    .groupBy((t) => [t.group, t.school])
    .orderBy((t) => t.avg);

  return average;
}
export async function getAbsents(contestId: string) {
  const nonParticipants = await db
    .select()
    .from(Student)
    .where((student) =>
      notInArray(
        student.cf_handle,
        db
          .select({ cf_handle: ContestInteraction.cf_handle })
          .from(ContestInteraction)
          .where(eq(ContestInteraction.contest_id, contestId)),
      ),
    );
  // const nonParticipants = await db.query.Student.findMany({
  //   where: (Student, { sql }) =>
  //     sql`${Student.cf_handle} NOT IN (
  //       SELECT ${ContestInteraction.cf_handle}
  //       FROM ${ContestInteraction}
  //       WHERE ${eq(ContestInteraction.contest_id, contestId)}
  //   )`,
  // });
  return nonParticipants;
}
export async function insertStudents() {
  const students = await fetch("https://sheetdb.io/api/v1/ol9aqoixrsqxd");
  const data = await students.json();
  const studentsData = data.map((student: any) => {
    return {
      cf_handle: student.handle.toLowerCase(),
      school: student.school,
      group: student.group,
      name: student.name,
    };
  });
  console.log("I reached here");
  const d = await db.select().from(Student);
  console.log(d, "we are here");
  await db.insert(Student).values(studentsData);
}
interface ContestDto {
  contestinfo: InsertContest;
  participantInfo: InsertContestInteraction[];
}
export async function insertContest(contest: ContestDto) {
  const contestData = contest;
  await db.insert(Contest).values([contestData.contestinfo]);
  await db.insert(ContestInteraction).values(contestData.participantInfo);
}
export async function studentInfoAggregate() {
  const contestNotToInclude = [525050];
  const average = await db
    .select({
      cf_handle: ContestInteraction.cf_handle,
      avg: avg(ContestInteraction.no_solved),
    })
    .from(ContestInteraction)
    .groupBy((t) => t.cf_handle);
  const students = await fetch("https://sheetdb.io/api/v1/ol9aqoixrsqxd", {
    cache: "no-store",
  });
  const data = await students.json();
  const wkmap = new Map();
  data.forEach((el: any) => {
    wkmap.set(el.handle.toLowerCase(), el);
  });
  const studentData = average.map((el: any) => {
    return {
      cf_handle: el.cf_handle,
      avg: el.avg,
      ...wkmap.get(el.cf_handle),
    };
  });

  return studentData;
}
