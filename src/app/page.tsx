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

export default async function Home() {
  let data = await fetch("http://localhost:3000/api/523525", {
    cache: "no-cache",
  });
  data = await data.json();
  console.log(data);
  let groups = [
    {
      name: "G5 student",
      accessor: "g5students",
    },
    {
      name: "Ghana",
      accessor: "ghanastudent",
    },
    {
      name: "AAIT G4",
      accessor: "AAIT_G4student",
    },
    {
      name: "AASTU G4",
      accessor: "aastug4student",
    },
  ];
  return (
    <main className="flex flex-col p-24 w-3/4 mx-auto">
      <div class="grid grid-cols-4 gap-5">
        {groups.map((el) => {
          return (
            <Card>
              <CardHeader>
                <CardTitle>Average Solved</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-semibold">
                  {data.averageSolved[el.accessor] ?? 0}{" "}
                </p>
              </CardContent>
              <CardFooter>
                <p>{el.name}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      <h1 className="text-3xl font-extrabold py-10 text-start">
        Contest Standing
      </h1>
      <Tabs defaultValue="G5 student" className="w-full">
        <TabsList>
          {groups.map((el) => (
            <TabsTrigger value={el.name}>{el.name}</TabsTrigger>
          ))}
        </TabsList>
        {groups.map((el) => {
          return (
            <TabsContent value={el.name}>
              <Suspense fallback={<div>Loading</div>}>
                <div className="w-full">
                  <DataTable
                    columns={columns}
                    data={data[el.accessor].map((d, index) => {
                      return {
                        ...d,
                        index: index + 1,
                      };
                    })}
                  />
                </div>
              </Suspense>
            </TabsContent>
          );
        })}
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <h1 className="text-3xl font-extrabold py-10 text-start">
        Student with No Submission or Absent
      </h1>
      <Tabs defaultValue="G5 student" className="w-full">
        <TabsList>
          {groups.map((el) => (
            <TabsTrigger value={el.name}>{el.name}</TabsTrigger>
          ))}
        </TabsList>
        {groups.map((el) => {
          return (
            <TabsContent value={el.name}>
              <Suspense fallback={<div>Loading</div>}>
                <div className="w-full">
                  <DataTable
                    columns={absentColumns}
                    data={data.noSubmission[el.accessor].map((d, index) => {
                      return {
                        handle: d,
                        index: index + 1,
                      };
                    })}
                  />
                </div>
              </Suspense>
            </TabsContent>
          );
        })}
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
