"use cleint";
import { APP_NAME } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    redirect("/dashboard");
  }

  return <div>Welcome to {APP_NAME}</div>;
}
