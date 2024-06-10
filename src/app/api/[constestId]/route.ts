import {
  aggregateStanding,
  getAbsents,
  getContests,
  getStanding,
} from "@/db/queries";
import { CodeforceStandingApi } from "@/utilities/codeforcesquery";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(
  req: NextRequest,
  { params }: { params: { constestId: string } },
) {
  const { constestId } = params;
  try {
    const stats = await aggregateStanding(constestId);
    const standing = await getStanding(constestId);
    const absents = await getAbsents(constestId);
    return Response.json({
      stats,
      standing,
      absents,
    });
  } catch (ex) {
    console.log(ex);
    return Response.error();
  }
}
export async function POST(
  req: NextRequest,
  { params }: { params: { constestId: string } },
) {
  const { constestId } = params;
  try {
    const data = await CodeforceStandingApi(constestId);
    revalidateTag(constestId);
    return Response.json({
      message: "inserted",
    });
  } catch (ex) {
    console.log(ex, "error");
    return Response.error();
  }
}
