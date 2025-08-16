"use client";

import TileCardWrapper from "@/components/shared/tile-card-wrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, parse, subMonths } from "date-fns";
import { Clock, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Loader } from "../shared/loader";
import Error from "../shared/error";
import { useGetSingleStudent } from "@/hooks/use-student";

export default function AttendanceContent({
  studentId,
}: {
  studentId: string;
}) {
  const { singleStudent, isSingleStudentLoading, isSingleStudentError } =
    useGetSingleStudent(studentId, undefined);

  if (!studentId) return <Loader />;
  if (isSingleStudentLoading) return <Loader />;
  if (isSingleStudentError) return <Error />;

  const sessions = singleStudent?.sessions ?? [];
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

  const thisMonthHours = sumForMonth(thisMonth);
  const lastMonthHours = sumForMonth(lastMonth);

  const delta = thisMonthHours - lastMonthHours;
  const hasDelta = thisMonthHours + lastMonthHours > 0;
  const DeltaIcon = delta >= 0 ? TrendingUp : TrendingDown;
  const deltaLabel =
    delta === 0
      ? "no change"
      : `${delta > 0 ? "+" : ""}${delta}h vs last month`;

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {/* This month */}
      <TileCardWrapper>
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Total hours —{" "}
              <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-2 py-0.5 text-xs">
                {format(thisMonth, "MMMM")}
              </span>
              <p className="text-muted-foreground text-xs mt-2">
                Current month
              </p>
            </CardTitle>
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <div className="flex items-end justify-between">
            <span className="text-5xl font-bold">{thisMonthHours}</span>
            {hasDelta && (
              <div className="flex items-center gap-1 text-sm">
                <DeltaIcon
                  className={`h-4 w-4 ${
                    delta >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                />
                <span
                  className={delta >= 0 ? "text-emerald-700" : "text-red-700"}
                >
                  {deltaLabel}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </TileCardWrapper>

      {/* Last month */}
      <TileCardWrapper>
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Total hours —{" "}
              <span className="inline-flex items-center rounded-full bg-zinc-100 text-zinc-700 px-2 py-0.5 text-xs">
                {format(lastMonth, "MMMM")}
              </span>
              <p className="text-muted-foreground text-xs mt-2">
                Previous month
              </p>
            </CardTitle>
            <Clock className="h-5 w-5 text-zinc-500" />
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <span className="text-5xl font-bold">{lastMonthHours}</span>
        </CardContent>
      </TileCardWrapper>
    </div>
  );
}
