"use client";

import { Badge } from "@/components/ui/badge";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateAttendance } from "@/hooks/use-attendance";
import { formatToDDMMYYYY, updateFormField } from "@/lib/helpers";
import { AttendanceT } from "@/types/attendance.type";
import { useUser } from "@clerk/nextjs";
import { CalendarIcon, Edit2, FileText, Plus } from "lucide-react";
import { FormEvent, useState } from "react";

export const initialSessionFormState: AttendanceT = {
  sessionDate: new Date(),
  sessionType: "Occupational",
  sessionDuration: 1,
  therapistId: "",
};

type AttendanceContentProps = {
  studentName: string;
  studentId: string;
};

export function AttendanceContent({
  studentName,
  studentId,
}: AttendanceContentProps) {
  const [form, setForm] = useState<AttendanceT>(initialSessionFormState);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const { user } = useUser();
  const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
  const { createAttendanceMutation, isCreateAttendanceLoading } =
    useCreateAttendance();

  const getStatusBadge = (status: string) => {
    const variants = {
      present: "bg-green-100 text-green-800",
      absent: "bg-red-100 text-red-800",
      cancelled: "bg-gray-100 text-gray-800",
      rescheduled: "bg-yellow-100 text-yellow-800",
    };
    return (
      variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"
    );
  };

  const handleOnCloseAttendanceForm = () => {
    setForm(initialSessionFormState);
    setIsAddSessionOpen(false);
  };

  const handleCreateStudent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAttendanceMutation(
      {
        ...form,
        studentId,
        sessionDate: formatToDDMMYYYY(form.sessionDate),
        therapistId: user?.id,
      },
      { onSuccess: handleOnCloseAttendanceForm }
    );
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Attendance for {studentName}</CardTitle>
          <CardDescription>
            Select a date to view or add session details.
          </CardDescription>
        </div>
        <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-1" /> Add Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <form onSubmit={(e) => handleCreateStudent(e)}>
              <DialogHeader>
                <DialogTitle>Add New Session</DialogTitle>
                <DialogDescription>
                  Add a new therapy session for {studentName}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sessionDate">Date</Label>
                    <Input
                      id="sessionDate"
                      type="date"
                      value={
                        form?.sessionDate
                          ? form.sessionDate instanceof Date
                            ? form.sessionDate.toISOString().split("T")[0]
                            : new Date(form.sessionDate)
                                .toISOString()
                                .split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setForm(
                          updateFormField(
                            form,
                            "sessionDate",
                            new Date(e.currentTarget.value)
                          )
                        )
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sessionType">Session Type</Label>
                    <Input
                      id="sessionType"
                      value={form?.sessionType}
                      disabled
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sessionDuration">Duration (h)</Label>
                    <Input
                      id="sessionDuration"
                      type="number"
                      value={form?.sessionDuration}
                      min={0}
                      onChange={(e) =>
                        setForm(
                          updateFormField(
                            form,
                            "sessionDuration",
                            Number(e.currentTarget.value)
                          )
                        )
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="therapist">Therapist</Label>
                    <Input
                      id="therapist"
                      placeholder="Therapist name"
                      value={user?.fullName ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleOnCloseAttendanceForm}>
                  Cancel
                </Button>
                <Button disabled={isCreateAttendanceLoading} type="submit">
                  Add Session
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
          <Card className="h-fit">
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
                className="rounded-md border shadow"
              />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
