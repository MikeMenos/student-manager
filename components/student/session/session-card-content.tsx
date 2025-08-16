"use client";

import SessionForm from "@/components/forms/session-form";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDeleteSession } from "@/hooks/use-session";
import { useGetSingleStudent } from "@/hooks/use-student";
import { formatToDDMMYYYY } from "@/lib/helpers";
import { StudentT } from "@/types/student.type";
import { useUser } from "@clerk/nextjs";
import { CalendarIcon, Clock, Edit, FileText, Trash, User } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type SessionCardContentProps = {
  studentId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
};

export default function SessionCardContent({
  studentId,
  isOpen,
  setIsOpen,
  selectedDate,
  setSelectedDate,
}: SessionCardContentProps) {
  const [isEdit, setIsEdit] = useState(false);

  const { user } = useUser();
  const {
    singleStudent,
    isSingleStudentLoading,
    isSingleStudentError,
    isSingleStudentRefetching,
    refetchSingleStudent,
  } = useGetSingleStudent(studentId, selectedDate);
  const { deleteSessionMutation } = useDeleteSession();

  const onOpenEditAttendanceForm = () => {
    setIsOpen(true);
    setIsEdit(true);
  };

  const role = (user?.publicMetadata?.role as string) || "";

  const therapistMap = new Map(
    singleStudent?.therapists?.map((t) => [t.therapistId, t])
  );
  const matched =
    singleStudent?.sessions?.map((session) => ({
      ...session,
      therapist: therapistMap.get(session.therapistId!) || null,
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
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="w-full"
            disabled={isSingleStudentRefetching || isSingleStudentLoading}
          />
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
              singleStudent?.sessions &&
              singleStudent.sessions.length > 0 ? (
              singleStudent.sessions.map((session) => (
                <TileCardWrapper key={session.id}>
                  <div className="p-4 md:px-5 md:py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 items-center justify-center">
                        <h2 className="text-xl font-semibold">Duration</h2>
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
                            onClick={() => deleteSessionMutation(session.id!)}
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardContent className="px-4 py-4 md:px-5 md:py-2 space-y-4">
                    {/* Top row: duration + therapist (unchanged layout) */}
                    <div className="flex items-end justify-between">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold mr-2">
                          {session.sessionDuration}
                        </span>
                        <span className="text-gray-600">
                          {session.sessionDuration === 1 ? "hour" : "hours"}{" "}
                          with{" "}
                          <span className="font-semibold">
                            {singleStudent.firstName} {singleStudent.lastName}
                          </span>
                        </span>
                      </div>

                      {role === "admin" &&
                        matched
                          ?.filter((a) => a.id === session.id)
                          .map((a) => (
                            <div
                              key={a.id}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <User className="h-4 w-4" />
                              {a.therapist?.therapistName ??
                                "Unknown therapist"}
                            </div>
                          ))}
                    </div>

                    {/* Session notes */}
                    {session.sessionNotes?.trim() ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <div className="cursor-pointer rounded-xl border bg-muted/30 p-3 md:p-4 hover:bg-muted/50 transition">
                            <div className="flex items-start gap-3">
                              <FileText className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 text-sm font-medium">
                                  Session notes
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {session.sessionNotes}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>
                              Notes — {singleStudent.firstName}{" "}
                              {singleStudent.lastName}
                            </DialogTitle>
                          </DialogHeader>
                          <ScrollArea className="max-h-[60vh] pr-4">
                            <p className="whitespace-pre-wrap text-sm leading-6">
                              {session.sessionNotes}
                            </p>
                          </ScrollArea>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="rounded-xl border bg-muted/20 p-3 md:p-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          No session notes added.
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <SessionForm
                    studentId={studentId}
                    studentName={`${singleStudent.firstName} ${singleStudent.lastName}`}
                    formData={session}
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
