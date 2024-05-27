"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { PlusCircle } from "lucide-react";
import { groupFilter, schoolFilter } from "./filters";
import { DataTableFacetedFilter } from "./data-table-filters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="search student"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("school") && (
          <DataTableFacetedFilter
            column={table.getColumn("school")}
            title="school"
            options={schoolFilter}
          />
        )}
        {table.getColumn("group") && (
          <DataTableFacetedFilter
            column={table.getColumn("group")}
            title="group"
            options={groupFilter}
          />
        )}
        {table.getColumn("participant_type") && (
          <DataTableFacetedFilter
            column={table.getColumn("participant_type")}
            title="participant type"
            options={[
              { label: "virtual", value: "VIRTUAL" },
              { label: "contestant", value: "CONTESTANT" },
            ]}
          ></DataTableFacetedFilter>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
