"use client";

import { Card } from "@/components/ui/card";
import AttendanceCardContent from "./attendance-card-content";
import AttendanceCardHeader from "./attendance-card-header";
import { useState } from "react";

type AttendanceContentProps = {
  studentName: string;
  studentId: string;
};

export function AttendanceContent({
  studentName,
  studentId,
}: AttendanceContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <AttendanceCardHeader
        studentName={studentName}
        studentId={studentId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <AttendanceCardContent
        studentId={studentId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </Card>
  );
}
