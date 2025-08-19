"use client";

import TileCardWrapper from "@/components/shared/tile-card-wrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllStudents } from "@/hooks/use-student";
import { useGetAllTherapists } from "@/hooks/use-therapists";
import { Speech, Users, MapPin } from "lucide-react";
import Error from "../shared/error";
import { Loader } from "../shared/loader";

type HasCenter = { center?: string | null };

function countByCenter<T extends HasCenter>(items: T[] | undefined) {
  const map = new Map<string, number>();
  if (!items) return map;
  for (const it of items) {
    const key = (it.center ?? "Unknown").trim() || "Unknown";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return map;
}

export default function AdminTiles() {
  const { allTherapists, isAllTherapistsError, isAllTherapistsLoading } =
    useGetAllTherapists({ filter: "" });

  const { allStudents, isAllStudentsError, isAllStudentsLoading } =
    useGetAllStudents({ offset: undefined, filter: "" });

  if (isAllTherapistsLoading || isAllStudentsLoading) return <Loader />;
  if (isAllTherapistsError || isAllStudentsError) return <Error />;

  const therapistsByCenter = countByCenter(allTherapists);
  const studentsByCenter = countByCenter(allStudents);

  const centers = ["Patras", "Amaliada", "Aigio"];

  const totalStudents = allStudents?.length ?? 0;
  const totalTherapists = allTherapists?.length ?? 0;

  return (
    <div className="grid gap-6 mb-12">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total students */}
        <TileCardWrapper>
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Total Students
              </CardTitle>
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <span className="text-5xl font-bold">{totalStudents}</span>
          </CardContent>
        </TileCardWrapper>

        {/* Total therapists */}
        <TileCardWrapper>
          <CardHeader className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                Total Therapists
              </CardTitle>
              <Speech className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-4">
            <span className="text-5xl font-bold">{totalTherapists}</span>
          </CardContent>
        </TileCardWrapper>
      </div>

      {/* One tile per center (nice if you prefer individual cards) */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
        {centers.map((c) => {
          const s = studentsByCenter.get(c) ?? 0;
          const t = therapistsByCenter.get(c) ?? 0;
          return (
            <TileCardWrapper key={`center-card-${c}`}>
              <CardHeader className="p-6 pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">{c}</CardTitle>
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      Students
                    </span>
                  </div>
                  <span className="text-3xl font-bold">{s}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Speech className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      Therapists
                    </span>
                  </div>
                  <span className="text-3xl font-bold">{t}</span>
                </div>
              </CardContent>
            </TileCardWrapper>
          );
        })}
      </div>
    </div>
  );
}
