"use client";

import { APP_NAME } from "@/lib/utils";
import { CalendarClock } from "lucide-react";

export function WelcomeHeader({ firstName }: { firstName?: string | null }) {
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={`space-y-2 my-6 xl:mt-0`}>
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">
          {timeOfDay()}, <span className="text-primary">{firstName}</span>
        </h1>
        <div className="sm:flex items-center text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4 mr-1" />
          <span>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground">Welcome back to {APP_NAME}</p>
    </div>
  );
}
