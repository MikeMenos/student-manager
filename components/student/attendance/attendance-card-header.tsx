import AttendanceForm from "@/components/forms/attendance-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceT } from "@/types/attendance.type";

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
