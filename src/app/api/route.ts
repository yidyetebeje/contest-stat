import { getContests, insertStudents } from "@/db/queries";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const contests = await getContests();
  return Response.json(contests);
}
