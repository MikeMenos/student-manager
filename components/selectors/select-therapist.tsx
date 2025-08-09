import React from "react";
import { MultiSelect, Option } from "../ui/multi-select";

export default function SelectTherapist({
  onTherapistSelect,
  value,
  options,
}: {
  onTherapistSelect: (therapists: Option[]) => void;
  hasAllTherapistsOption?: boolean;
  value: Option[];
  options: Option[];
}) {
  return (
    <MultiSelect
      options={options}
      selected={value}
      onChange={onTherapistSelect}
      placeholder="Select therapists..."
    />
  );
}
