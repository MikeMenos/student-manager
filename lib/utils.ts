import { SessionType } from "@/types/attendance.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PROD_URL = "https://www.strengthnation.gr";
export const DEV_URL = "https://strength-nation-development.up.railway.app";
export const BASE_URL =
  process.env.NEXT_PUBLIC_RAILWAY_ENVIRONMENT_NAME === "production"
    ? PROD_URL
    : process.env.NEXT_PUBLIC_RAILWAY_ENVIRONMENT_NAME === "development"
    ? DEV_URL
    : "http://localhost:3000";
export const SIGN_UP_PATH = "/sign-up";
export const SIGN_IN_PATH = "/sign-in";

export const STUDENTS_QUERY_KEY = "students";
export const STUDENT_QUERY_KEY = "student";

export const gradeOptions = [
  { label: "Kindergarten", value: "Kindergarten" },
  { label: "1st Grade", value: "1st Grade" },
  { label: "2nd Grade", value: "2nd Grade" },
  { label: "3rd Grade", value: "3rd Grade" },
  { label: "4th Grade", value: "4th Grade" },
  { label: "5th Grade", value: "5th Grade" },
  { label: "6th Grade", value: "6th Grade" },
];

export const centerOptions = [
  { label: "Patras", value: "Patras" },
  { label: "Amaliada", value: "Amaliada" },
  { label: "Aigio", value: "Aigio" },
];

export const sessionTypeOptions = [
  { label: "Occupational", value: "Occupational" },
  { label: "Speech", value: "Speech" },
  { label: "Psychological", value: "Psychological" },
  { label: "Behavioral", value: "Behavioral" },
];
