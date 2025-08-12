"use client";

import AttendanceForm from "@/components/forms/attendance-form";
import Error from "@/components/shared/error";
import { Loader } from "@/components/shared/loader";
import TileCardWrapper from "@/components/shared/tile-card-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteAttendance } from "@/hooks/use-attendance";
import { useGetSingleStudent } from "@/hooks/use-student";
import { formatToDDMMYYYY } from "@/lib/helpers";
import { StudentT } from "@/types/student.type";
import { useUser } from "@clerk/nextjs";
import {
  CalendarIcon,
  Clock,
  Delete,
  Edit,
  FileText,
  Trash,
  User,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type AttendanceCardContentProps = {
  studentId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
};

export default function AttendanceCardContent({
  studentId,
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
}: AttendanceCardContentProps) {
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useUser();
  const {
    singleStudent,
    isSingleStudentLoading,
    isSingleStudentError,
    isSingleStudentRefetching,
    refetchSingleStudent,
  } = useGetSingleStudent(studentId, selectedDate);
  const { deleteAttendanceMutation, isDeleteAttendanceLoading } =
    useDeleteAttendance();

  const onOpenEditAttendanceForm = () => {
    setIsOpen(true);
    setIsEdit(true);
  };

  const role = (user?.publicMetadata?.role as string) || "";

  const therapistMap = new Map(
    singleStudent?.therapists?.map((t) => [t.therapistId, t])
  );
  const matched =
    singleStudent?.attendances?.map((attendance) => ({
      ...attendance,
      therapist: therapistMap.get(attendance.therapistId!) || null,
    })) ?? [];

  return (
    <CardContent>
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-2">
        <Card className="h-fit w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow w-full"
              disabled={isSingleStudentRefetching || isSingleStudentLoading}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Session Details
              {isSingleStudentRefetching && !isSingleStudentLoading && (
                <span className="ml-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader size="sm" /> updating…
                </span>
              )}
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? `Details for ${formatToDDMMYYYY(selectedDate)}`
                : "Select a date to view session details"}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">
            {isSingleStudentLoading ? (
              <div className="py-10 flex justify-center">
                <Loader size="lg" />
              </div>
            ) : isSingleStudentError ? (
              <div className="text-center py-10 text-red-500">
                <Error<StudentT> refetchData={refetchSingleStudent} />
              </div>
            ) : selectedDate &&
              singleStudent?.attendances &&
              singleStudent.attendances.length > 0 ? (
              singleStudent.attendances.map((attendance) => (
                <TileCardWrapper key={attendance.id}>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <h2 className="text-xl font-semibold">
                          Session Duration
                        </h2>
                        <Clock className="h-6 w-6" />
                      </div>
                      {role !== "admin" && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={onOpenEditAttendanceForm}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              deleteAttendanceMutation(attendance.id!)
                            }
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6 flex items-end justify-between">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold mr-2">
                        {attendance.sessionDuration}
                      </span>
                      <span className="text-gray-600">
                        hours with {singleStudent.firstName}{" "}
                        {singleStudent.lastName}
                      </span>
                    </div>
                    {role === "admin" &&
                      matched
                        ?.filter((a) => a.id === attendance.id)
                        .map((a) => (
                          <div
                            key={a.id}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <User />
                            {a.therapist?.therapistName ?? "Unknown therapist"}
                          </div>
                        ))}
                  </CardContent>
                  <AttendanceForm
                    studentId={studentId}
                    studentName={`${singleStudent.firstName} ${singleStudent.lastName}`}
                    formData={attendance}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                  />
                </TileCardWrapper>
              ))
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  {selectedDate
                    ? "No session scheduled for this date"
                    : "Select a date in the calendar to view session details"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CardContent>
  );
}
