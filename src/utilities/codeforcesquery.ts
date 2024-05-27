import { insertContest } from "@/db/queries";
import crypto from "crypto";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const apiKey = "44cfcb065b39a1d98756b6d4335dacfb1274be38";
export const secret = "0ce71e2af1be124c5f1c5d45a3ebef42dcc24a92";
export async function CodeforceStandingApi(contestId: string) {
  const from = 1;
  const count = 300;
  const showUnofficial = true;
  const base_url = `https://codeforces.com/api/contest.standings?contestId=${contestId}&from=${from}&count=${count}&showUnofficial=${showUnofficial}`;
  const timestamp = Math.round(new Date().getTime() / 1000);
  const start = 123456;
  const apiSign = `${start}/contest.standings?apiKey=${apiKey}&contestId=${contestId}&count=${count}&from=${from}&showUnofficial=${showUnofficial}&time=${timestamp}#${secret}`;
  const apiSig = crypto.createHash("sha512").update(apiSign).digest("hex");
  const url = `${base_url}&apiKey=${apiKey}&time=${timestamp}&apiSig=${start}${apiSig}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();
  const contestinfo = {
    contest_id: data.result.contest.id,
    contest_name: data.result.contest.name,
    no_questions: data.result.problems.length,
  };
  console.log(data.result.contest.name);

  let virtualParticipant = data.result.rows.filter(
    (el: any) =>
      el.party.participantType === "VIRTUAL" ||
      el.party.participantType === "CONTESTANT",
  );
  let participantInfo = virtualParticipant.map((el: any) => {
    return {
      cf_handle: el.party.members[0].handle.toLowerCase(),
      contest_id: contestinfo.contest_id,
      rank: el.rank,
      no_solved: el.points,
      participant_type: el.party.participantType,
      penality: el.penalty,
    };
  });
  const seenHandles = new Set();
  participantInfo = participantInfo.filter((el: any) => {
    const handle = el.cf_handle;
    if (!seenHandles.has(handle)) {
      seenHandles.add(handle);
      return true; // It's a duplicate
    } else {
      return false;
    }
  });
  const insertData = await insertContest({ contestinfo, participantInfo });
  return { contestinfo, participantInfo };
}
