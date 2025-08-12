import { format, parse } from "date-fns";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function updateFormField<T>(form: T, path: string, value: any): T {
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");
  const updated = { ...form };
  let current: any = updated;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key])
      ? [...current[key]]
      : { ...current[key] };
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;

  return updated;
}

export function capitalizeFirstLetter(str: string) {
  return str
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatToDDMMYYYY(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const parseDDMMYYYYToDate = (s?: string): Date | null => {
  if (!s) return null;
  const d = parse(s, "dd-MM-yyyy", new Date());
  return isNaN(d.getTime()) ? null : d;
};

// Date -> "yyyy-MM-dd" (for <input type="date">)
export const toInputDateString = (d?: Date | null): string => {
  if (!d || isNaN(d.getTime())) return "";
  return format(d, "yyyy-MM-dd");
};

// "yyyy-MM-dd" (from input) -> Date
export const parseInputDateString = (s: string): Date | null => {
  if (!s) return null;
  const d = parse(s, "yyyy-MM-dd", new Date());
  return isNaN(d.getTime()) ? null : d;
};
