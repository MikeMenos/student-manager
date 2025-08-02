import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { centerOptions } from "@/lib/utils";

export default function SelectCenter({
  onSelectCenter,
  hasAllCenterOption = true,
}: {
  onSelectCenter: (grade: string) => void;
  hasAllCenterOption?: boolean;
}) {
  return (
    <Select
      defaultValue={hasAllCenterOption ? "all" : undefined}
      onValueChange={onSelectCenter as never}
      required
    >
      <SelectTrigger>
        <SelectValue placeholder="Select center" />
      </SelectTrigger>
      <SelectContent>
        {hasAllCenterOption && <SelectItem value="all">All Centers</SelectItem>}
        {centerOptions.map((grade) => (
          <SelectItem key={grade.value} value={grade.value}>
            {grade.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
