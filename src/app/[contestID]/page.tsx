import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { absentColumns, columns } from "@/ui-com/contest-table/columns";
import { DataTable } from "@/ui-com/contest-table/data-table";
import Image from "next/image";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DivPromotion } from "@/components/ui/divpromotiontable";
const local_url = "http://127.0.0.1:3000/api/";
const remote_url = "https://contest-stat.vercel.app/api/";
interface ApiResponse {
  stats: {
    school: string;
    group: string; // Assuming group is a string like "5"
    avg: string; // The average could be stored as a number, but since it's in the API response as a string, we use a string here for type safety
    participant_number: number;
  }[];
  standing: {
    contest_id: string;
    cf_handle: string;
    rank: number;
    no_solved: number;
    participant_type: "VIRTUAL" | "ONSITE"; // Assuming there are only two types
    penality: number;
    name: string;
    group: string; // Same as above
    school: string;
  }[];
  absents: {
    name: string;
    group: string; // Same as above
    school: string;
    cf_handle: string;
  }[];
}
export default async function Home({
  params,
}: {
  params: { contestID: string };
}) {
  let contest_data: ApiResponse;
  let promoted_data: any;
  try {
    let data = await fetch(remote_url + params.contestID, {
      next: { tags: [params.contestID] },
    });
    let promoted = await fetch(remote_url +  "/promoted");
    promoted_data = await promoted.json();
    contest_data = await data.json();
  } catch (ex) {
    contest_data = {
      stats: [],
      standing: [],
      absents: [],
    };
  }
  return (
    <main className="flex py-20 flex-col gap-10 lg:w-5/6 w-11/12 mx-auto">
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Average Solved Per Group</h1>
        <div className="flex gap-10">
          {contest_data.stats.map((el) => {
            return (
              <Card
                key={el.school}
                className="flex py-5 flex-col items-center justify-center w-48"
              >
                <CardContent>
                  <p className="text-4xl font-semibold">
                    {parseFloat(el.avg).toFixed(2) ?? 0}{" "}
                  </p>
                  <p>{`${el.school} G${el.group}`}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {
        params.contestID == "543431" ? (
          <div className="flex flex-col gap-5 md:w-1/2">
        <h1 className="text-3xl font-bold">Promoted to Div 1</h1>
       <DivPromotion title="Promoted Students to Div 1" data={promoted_data['div1']} />
       <h1 className="text-3xl font-bold">Promoted to Div 2</h1>
        <DivPromotion title="Promoted Students to Div 2" data={promoted_data['div2']} />
      </div>
        ) : null
      }
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Contest Standing</h1>
        <DataTable columns={columns} data={contest_data.standing} />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">Absent Students</h1>
        <DataTable columns={absentColumns} data={contest_data.absents} />
      </div>
    </main>
  );
}
