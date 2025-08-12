import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    await axios.post("https://api.clerk.com/v1/invitations", body, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({
      message:
        "The therapist has received their invitation and has 7 days to accept it.",
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
