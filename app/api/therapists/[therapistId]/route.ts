import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { therapistId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { therapistId } = params;

  try {
    const therapist = await prisma.therapist.findUnique({
      where: { therapistId },
      include: { attendances: true, students: true },
    });

    if (!therapist) {
      return NextResponse.json(
        { message: "Therapist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ therapist });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch your information" },
      { status: 500 }
    );
  }
}
