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
