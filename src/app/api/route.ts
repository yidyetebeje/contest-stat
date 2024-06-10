import { getContests, insertStudents } from "@/db/queries";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req: NextRequest) {
  try {
    const contests = await getContests();
    return Response.json(contests);
  } catch (ex) {
    console.log(ex);
    console.log("Error fetching contests");
    return Response.error();
  }
}
