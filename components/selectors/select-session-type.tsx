import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sessionTypeOptions } from "@/lib/utils";
import { SessionType } from "@/types/attendance.type";

export default function SelectSessionType({
  onSelectSessionType,
  value,
}: {
  onSelectSessionType: (sessionType: SessionType) => void;
  hasAllGradesOption?: boolean;
  value?: string;
}) {
  return (
    <Select onValueChange={onSelectSessionType as never} required value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select therapist role" />
      </SelectTrigger>
      <SelectContent>
        {sessionTypeOptions.map((sessionType) => (
          <SelectItem key={sessionType.value} value={sessionType.value}>
            {sessionType.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
