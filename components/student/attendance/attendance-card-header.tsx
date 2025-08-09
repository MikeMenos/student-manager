import AttendanceForm from "@/components/forms/attendance-form";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";

type AttendanceCardHeaderProps = {
  studentName: string;
  studentId: string;
};

export const initialSessionFormState: AttendanceT = {
  sessionDate: new Date(),
  sessionType: "Occupational",
  sessionDuration: 1,
  therapistId: "",
};

export default function AttendanceCardHeader({
  studentName,
  studentId,
}: AttendanceCardHeaderProps) {
  return (
    <CardHeader className="flex items-center justify-between">
      <div>
        <CardTitle>Attendance for {studentName}</CardTitle>
        <CardDescription>
          Select a date to view session details.
        </CardDescription>
      </div>
      <AttendanceForm studentName={studentName} studentId={studentId} />
    </CardHeader>
  );
}
