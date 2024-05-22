import { Contest, ContestVirtual } from "@/utilities/codeforcesquery";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { constestId: string } },
) {
  console.log(params);
  const { constestId } = params;
  console.log(constestId);
  const data = await Contest(constestId);
  return Response.json(data);
}
