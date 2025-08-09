"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import DeleteUserFromClerkButton from "@/components/delete-user-button";
// import { MembershipsResponse } from "@/types/membership";
// import RenewSubscriptionButton from "@/components/renew-subscription-button";
import { AttendanceT } from "@/types/attendance.type";

export const getAttendanceColumns = (): ColumnDef<AttendanceT>[] => [
  {
    accessorKey: "sessionDate",
    header: "Date",
  },
  {
    accessorKey: "sessionDuration",
    header: "Duration",
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            {/* <DropdownMenuItem
              className="cursor-pointer bg-primary text-white focus:bg-primary focus:text-white"
              onSelect={(e) => e.preventDefault()}
            >
              <RenewSubscriptionButton rowData={rowData} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer bg-red-500 text-white focus:bg-red-600 focus:text-white"
              onSelect={(e) => e.preventDefault()}
            >
              <DeleteUserFromClerkButton rowData={rowData} />
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
