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
  return <div>"hello"</div>;
}
