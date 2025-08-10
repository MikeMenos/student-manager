"use client";

import DeleteUserFromClerkAndDbButton from "@/components/delete-user-from-clerk";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TherapistCreationResponse } from "@/types/therapistType";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export const getUsersColumns = (): ColumnDef<TherapistCreationResponse>[] => [
  {
    accessorKey: "therapistName",
    header: "Name",
  },
  {
    accessorKey: "therapistRole",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.email;
    },
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
