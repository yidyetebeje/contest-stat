"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContestInfo = {
  handle: string;
  solvedInContest: number;
  rank: number;
};
export type AbsentInfo = {
  handle: string;
  index: number;
};
export const absentColumns: ColumnDef<AbsentInfo>[] = [
  {
    header: "#",
    accessorKey: "index",
  },
  {
    accessorKey: "handle",
    header: "Handle",
  },
];
export const columns: ColumnDef<ContestInfo>[] = [
  {
    header: "#",
    accessorKey: "index",
  },
  {
    accessorKey: "handle",
    header: "Handle",
  },
  {
    accessorKey: "rank",
    header: "Global Rank",
  },

  {
    accessorKey: "solvedInContest",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Solved
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
