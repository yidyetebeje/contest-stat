import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  absentColumns,
  columns,
  contest_column,
} from "@/ui-com/contest-table/columns";
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
import Link from "next/link";
const local_url = "http://127.0.0.1:3000/api";
const remote_url = "https://contest-stat.vercel.app/api";
export default async function Home() {
  return <div>Hello</div>;
  // let contest_list = [];
  // try {
  //   let data = await fetch(local_url, {
  //     cache: "no-cache",
  //   });
  //   contest_list = await data.json();
  //   console.log(contest_list);
  // } catch (ex) {
  //   console.log(ex);
  //   contest_list = [];
  // }
  // return (
  //   <main className="flex flex-col py-24 gap-10 lg:w-5/6 w-11/12 mx-auto">
  //     <Suspense fallback={<div>Loading...</div>}>
  //       <Card className="w-64">
  //         <CardHeader>
  //           <CardTitle>Contest List</CardTitle>
  //         </CardHeader>
  //         <CardContent>
  //           {contest_list &&
  //             contest_list?.map((contest, index) => (
  //               <div key={contest.contest_name}>
  //                 <Link
  //                   href={`/${contest.contest_id}`}
  //                   className="text-blue-700"
  //                 >
  //                   {index + 1}.{contest.contest_name}
  //                 </Link>
  //               </div>
  //             ))}
  //         </CardContent>
  //       </Card>
  //     </Suspense>
  //   </main>
  // );
}
