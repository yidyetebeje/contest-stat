import { NextRequest } from "next/server";
import { promotedStudent } from "@/db/queries";

export async function GET(req: NextRequest) {
  try {
    const contests = await promotedStudent();
    return Response.json(contests);
  } catch (ex) {
    console.log(ex);
    console.log("Error fetching contests");
    return Response.error();
  }
}
