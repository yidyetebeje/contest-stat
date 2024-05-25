import { aggregateStanding, getContests, getStanding } from "@/db/queries";
import { Contest } from "@/utilities/codeforcesquery";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { constestId: string } },
) {
  const { constestId } = params;
  // const data = await Contest(constestId);
  const d = await aggregateStanding(constestId);
  return Response.json(d);
}
