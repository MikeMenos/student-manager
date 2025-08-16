"use client";

import DeleteUserFromClerkAndDbButton from "@/components/delete-user-from-clerk-and-db";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TherapistCreationResponseT } from "@/types/therapistType";
import { ColumnDef } from "@tanstack/react-table";
import { parse, subMonths } from "date-fns";
import { MoreHorizontal } from "lucide-react";

export const getUsersColumns = (): ColumnDef<TherapistCreationResponseT>[] => [
  {
    accessorKey: "therapistName",
    header: "Name",
  },
  {
    accessorKey: "sessions",
    header: "Total hours this month",
    cell: ({ row }) => {
      const sessions = row?.original?.sessions ?? [];
      const thisMonth = new Date();

      const sumForMonth = (target: Date) =>
        sessions
          .filter((a) => {
            const d = parse(a.sessionDate as string, "dd-MM-yyyy", new Date());
            return (
              d.getMonth() === target.getMonth() &&
              d.getFullYear() === target.getFullYear()
            );
          })
          .reduce((sum, a) => sum + (a.sessionDuration || 0), 0);
      const thisMonthHours = sumForMonth(thisMonth);

      return thisMonthHours;
    },
  },
  {
    accessorKey: "sessions",
    header: "Total hours previous month",
    cell: ({ row }) => {
      const sessions = row?.original?.sessions ?? [];
      const thisMonth = new Date();
      const lastMonth = subMonths(thisMonth, 1);

      const sumForMonth = (target: Date) =>
        sessions
          .filter((a) => {
            const d = parse(a.sessionDate as string, "dd-MM-yyyy", new Date());
            return (
              d.getMonth() === target.getMonth() &&
              d.getFullYear() === target.getFullYear()
            );
          })
          .reduce((sum, a) => sum + (a.sessionDuration || 0), 0);
      const lastMonthHours = sumForMonth(lastMonth);

      return lastMonthHours;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.email;
    },
  },
  {
    accessorKey: "therapistRole",
    header: "Role",
  },
  {
    accessorKey: "center",
    header: "Center",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      console.log(row.original);
      const rowData = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer bg-red-500 text-white focus:bg-red-600 focus:text-white"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteUserFromClerkAndDbButton rowData={rowData} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
