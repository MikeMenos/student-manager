"use client";

import DeleteUserFromClerkAndDbButton from "@/components/delete-user-from-clerk-and-db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TherapistCreationResponseT } from "@/types/therapistType";
import { ColumnDef } from "@tanstack/react-table";
import { parse, subMonths } from "date-fns";
import {
  ArrowDownRight,
  ArrowUpRight,
  Copy,
  Mail,
  MoreHorizontal,
  Phone,
} from "lucide-react";

const initials = (name?: string) =>
  (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");

const copyToClipboard = async (text?: string) => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // noop
  }
};

const monthHours = (
  sessions: TherapistCreationResponseT["sessions"],
  target: Date
) =>
  (sessions ?? [])
    .filter((s) => {
      const d = parse(s.sessionDate as string, "dd-MM-yyyy", new Date());
      return (
        d.getMonth() === target.getMonth() &&
        d.getFullYear() === target.getFullYear()
      );
    })
    .reduce((sum, s) => sum + (s.sessionDuration || 0), 0);

const roleVariant = (role?: string) => {
  switch ((role ?? "").toLowerCase()) {
    case "admin":
      return "destructive";
    case "therapist":
      return "default";
    case "assistant":
      return "secondary";
    default:
      return "outline";
  }
};

export const getUsersColumns = (): ColumnDef<TherapistCreationResponseT>[] => [
  // Therapist: avatar initials + stacked name/email
  {
    accessorKey: "therapistName",
    header: "Therapist",
    cell: ({ row }) => {
      const { therapistName } = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{therapistName || "—"}</span>
        </div>
      );
    },
  },

  // Hours (this month) with delta chip vs previous month
  {
    accessorKey: "sessions",
    header: "Hours (this month)",
    cell: ({ row }) => {
      const { sessions } = row.original;
      const now = new Date();
      const prev = subMonths(now, 1);

      const thisMonth = monthHours(sessions, now);
      const lastMonth = monthHours(sessions, prev);

      const delta = thisMonth - lastMonth;
      const up = delta >= 0;

      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{thisMonth || 0}h</span>
          <div
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
              up
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {up ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(delta).toFixed(1)}h
          </div>
        </div>
      );
    },
  },

  // Hours (previous month), numeric right-aligned
  {
    accessorKey: "sessions",
    header: () => <div className="text-left">Hours (previous month)</div>,
    cell: ({ row }) => {
      const { sessions } = row.original;
      const prev = subMonths(new Date(), 1);
      const last = monthHours(sessions, prev);
      return <div className="text-left">{last || 0}h</div>;
    },
    meta: { align: "right" },
  },

  // Phone with tel: and copy
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original.phone;
      if (!phone) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="flex items-center gap-2">
          <p className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
            <Phone className="h-4 w-4" />
            {phone}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => copyToClipboard(phone)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy phone</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },

  // Email with mailto: and copy
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original.email;
      if (!email) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="flex items-center gap-2">
          <p className="inline-flex items-center gap-1 underline-offset-4 hover:underline">
            <Mail className="h-4 w-4" />
            {email}
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => copyToClipboard(email)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy email</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },

  // Role badge
  {
    accessorKey: "therapistRole",
    header: "Role",
    cell: ({ row }) => {
      const role = row.original.therapistRole || "—";
      return (
        <Badge variant={roleVariant(role)} className="capitalize">
          {role}
        </Badge>
      );
    },
  },

  // Center pill
  {
    accessorKey: "center",
    header: "Center",
    cell: ({ row }) => {
      const center = row.original.center || "—";
      return (
        <Badge variant="outline" className="rounded-full">
          {center}
        </Badge>
      );
    },
  },

  // Actions
  {
    id: "actions",
    size: 40,
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <div className="w-full">
                <DeleteUserFromClerkAndDbButton rowData={rowData} />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
