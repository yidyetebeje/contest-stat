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
const local_url = "http://127.0.0.1:3000/api/525050";
const remote_url = "https://contest-stat.vercel.app/api/525050";
export default async function Home() {
  let data = await fetch(remote_url, {
    cache: "no-cache",
  });
  data = await data.json();
  data.noSubmission.all = data.noSubmission["g5students"].concat(
    data.noSubmission["ghanastudent"],
    data.noSubmission["AAIT_G4student"],
    data.noSubmission["aastug4student"],
  );
  console.log(data);
  let groups = [
    {
      name: "All",
      accessor: "all",
    },
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
      <div className="grid grid-cols-4 gap-5">
        {groups.map((el) => {
          return (
            <Card key={el.name}>
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
        Live Contest Standing
      </h1>
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          {groups.map((el) => (
            <TabsTrigger key={el.name} value={el.name}>
              {el.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((el) => {
          return (
            <TabsContent value={el.name} key={el.name}>
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
        Virtual Contest Standing
      </h1>
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          {groups.map((el) => (
            <TabsTrigger key={el.name} value={el.name}>
              {el.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((el) => {
          return (
            <TabsContent value={el.name} key={el.name}>
              <Suspense fallback={<div>Loading</div>}>
                <div className="w-full">
                  <DataTable
                    columns={columns}
                    data={data.virtual[el.accessor].map((d, index) => {
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
      <Tabs defaultValue="All" className="w-full">
        <TabsList>
          {groups.map((el) => (
            <TabsTrigger key={el.name} value={el.name}>
              {el.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {groups.map((el) => {
          return (
            <TabsContent key={el.name} value={el.name}>
              <Suspense fallback={<div>Loading</div>}>
                <div className="w-full">
                  <DataTable
                    columns={absentColumns}
                    data={data.noSubmission[el.accessor]?.map((d, index) => {
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
