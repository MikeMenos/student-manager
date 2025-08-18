import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, Users, Copy, MessageSquare } from "lucide-react";
import { StudentT } from "@/types/student.type";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]!.toUpperCase())
    .join("");
}

function formatTel(tel: string) {
  return tel.replace(/\s+/g, "");
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // no-op
  }
}

export default function RelationsContent({
  singleStudent,
}: {
  singleStudent: StudentT;
}) {
  const parents = singleStudent.parentInfo ?? [];

  if (!parents.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            No family relations added
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add parent/guardian details to contact them quickly from here.
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="grid gap-4 sm:grid-cols-2">
        {parents.map((parent, idx) => {
          const tel = formatTel(parent.phone || "");
          const initials = getInitials(parent.parentName || "N A");
          const hasEmail = Boolean(parent.email);

          return (
            <Card key={idx} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <CardTitle className="text-base leading-tight">
                      {parent.parentName}
                    </CardTitle>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-[11px]">
                        {parent.relation}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <Separator />

                {/* Phone row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a
                      href={`tel:${tel}`}
                      className="truncate text-sm underline-offset-4 hover:underline"
                    >
                      {parent.phone}
                    </a>
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => copy(parent.phone)}
                        aria-label="Copy phone"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy phone</TooltipContent>
                  </Tooltip>
                </div>

                {/* Email row */}
                {hasEmail && (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a
                        href={`mailto:${parent.email}`}
                        className="truncate text-sm underline-offset-4 hover:underline"
                      >
                        {parent.email}
                      </a>
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => copy(parent.email!)}
                          aria-label="Copy email"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy email</TooltipContent>
                    </Tooltip>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
