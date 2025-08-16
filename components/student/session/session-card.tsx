"use client";

import { Card } from "@/components/ui/card";
import SessionCardContent from "./session-card-content";
import SessionCardHeader from "./session-card-header";
import { useState } from "react";

type AttendanceContentProps = {
  studentName: string;
  studentId: string;
};

export function SessionsContent({
  studentName,
  studentId,
}: AttendanceContentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  return (
    <Card>
      <SessionCardHeader
        studentName={studentName}
        studentId={studentId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedDate={selectedDate}
      />
      <SessionCardContent
        studentId={studentId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Card>
  );
}
