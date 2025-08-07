"use client";

import { Card } from "@/components/ui/card";
import AttendanceCardContent from "./attendance-card-content";
import AttendanceCardHeader from "./attendance-card-header";

type AttendanceContentProps = {
  studentName: string;
  studentId: string;
};

export function AttendanceContent({
  studentName,
  studentId,
}: AttendanceContentProps) {
  return (
    <Card>
      <AttendanceCardHeader studentName={studentName} studentId={studentId} />
      <AttendanceCardContent studentId={studentId} />
    </Card>
  );
}
