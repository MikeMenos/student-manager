"use client";

import TileCardWrapper from "@/components/shared/tile-card-wrapper";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllStudents } from "@/hooks/use-student";
import { useGetAllTherapists } from "@/hooks/use-therapists";
import { Speech, Users } from "lucide-react";
import Error from "../shared/error";
import { Loader } from "../shared/loader";

export default function AdminTiles() {
  const { allTherapists, isAllTherapistsError, isAllTherapistsLoading } =
    useGetAllTherapists({
      filter: "",
    });
  const { allStudents, isAllStudentsError, isAllStudentsLoading } =
    useGetAllStudents({
      offset: undefined,
      filter: "",
    });

  if (isAllTherapistsLoading || isAllStudentsLoading) return <Loader />;
  if (isAllTherapistsError || isAllStudentsError) return <Error />;

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-12">
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
          <span className="text-5xl font-bold">{allStudents?.length ?? 0}</span>
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
          <span className="text-5xl font-bold">
            {allTherapists?.length ?? 0}
          </span>
        </CardContent>
      </TileCardWrapper>
    </div>
  );
}
