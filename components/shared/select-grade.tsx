import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectGrade({
  onSelectGrade,
  hasAllGradesOption = true,
}: {
  onSelectGrade: (grade: string) => void;
  hasAllGradesOption: boolean;
}) {
  return (
    <Select
      defaultValue={hasAllGradesOption ? "all" : undefined}
      onValueChange={onSelectGrade as never}
      required
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {hasAllGradesOption && <SelectItem value="all">All Grades</SelectItem>}
        <SelectItem value="k">Kindergarten</SelectItem>
        <SelectItem value="1">1st Grade</SelectItem>
        <SelectItem value="2">2nd Grade</SelectItem>
        <SelectItem value="3">3rd Grade</SelectItem>
        <SelectItem value="4">4th Grade</SelectItem>
        <SelectItem value="5">5th Grade</SelectItem>
        <SelectItem value="6">6th Grade</SelectItem>
      </SelectContent>
    </Select>
  );
}
