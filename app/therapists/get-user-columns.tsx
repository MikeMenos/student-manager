"use client";

import { TherapistCreationResponse } from "@/types/therapistType";
import { ColumnDef } from "@tanstack/react-table";

export const getUsersColumns = (): ColumnDef<TherapistCreationResponse>[] => [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return row.original.email;
    },
  },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const rowData = row.original;
  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal className="h-4 w-4" />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end" className="bg-white">
  //             <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem
  //               className="cursor-pointer bg-primary text-white focus:bg-primary focus:text-white"
  //               onSelect={(e) => e.preventDefault()}
  //             >
  //               <RenewSubscriptionButton rowData={rowData} />
  //             </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem
  //               className="cursor-pointer bg-red-500 text-white focus:bg-red-600 focus:text-white"
  //               onSelect={(e) => e.preventDefault()}
  //             >
  //               <DeleteUserFromClerkButton rowData={rowData} />
  //             </DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       );
  //     },
  //   },
];
