import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { gradeOptions } from "@/lib/utils";

export default function SelectGrade({
  onSelectGrade,
  hasAllGradesOption = true,
}: {
  onSelectGrade: (grade: string) => void;
  hasAllGradesOption?: boolean;
}) {
  return (
    <Select
      defaultValue={hasAllGradesOption ? "all" : undefined}
      onValueChange={onSelectGrade as never}
      required
    >
      <SelectTrigger>
        <SelectValue placeholder="Select grade" />
      </SelectTrigger>
      <SelectContent>
        {hasAllGradesOption && <SelectItem value="all">All Grades</SelectItem>}
        {gradeOptions.map((grade) => (
          <SelectItem key={grade.value} value={grade.value}>
            {grade.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
