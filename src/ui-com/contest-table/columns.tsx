"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ContestInfo = {
  contest_id: string;
  cf_handle: string;
  rank: number;
  no_solved: number;
  participant_type: "VIRTUAL" | "CONTESTANT"; // Assuming there are only two types
  penality: number;
  name: string;
  group: string; // Same as above
  school: string;
};
export type AbsentInfo = {
  handle: string;
  index: number;
};
export type ContestList = {
  name: string;
};
export const contest_column: ColumnDef<ContestList>[] = [
  {
    header: "#",
    cell: (app) => app.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
export const absentColumns: ColumnDef<AbsentInfo>[] = [
  {
    header: "#",
    cell: (app) => app.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "school",
    header: "School",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "group",
    header: "Group",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
export const columns: ColumnDef<ContestInfo>[] = [
  {
    header: "#",
    cell: (app) => app.row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "no_solved",
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
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Global Rank
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "group",
    header: "Group",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "school",
    header: "School",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "participant_type",
    header: "participation",
    cell: ({ getValue }) => {
      return (
        <span
          className={cn(
            getValue() === "VIRTUAL" ? "bg-blue-500" : "bg-green-500",
            "font-bold",
            "px-2 py-1 text-xs font-semibold text-white rounded-full",
          )}
        >
          {getValue() === "VIRTUAL" ? "Virtual" : "Contestant"}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
