// app/api/students/[id]/route.ts
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role as string | undefined;

  const id = req.nextUrl.pathname.split("/").pop();
  const { searchParams } = new URL(req.url);
  const sessionDate = searchParams.get("sessionDate");

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        parentInfo: true,
        attendances: {
          where: {
            ...(sessionDate ? { sessionDate } : {}),
            ...(role !== "admin" ? { therapistId: userId } : {}), // Filter by current therapist if not admin
          },
        },
        therapists:
          role === "admin" ? true : { where: { therapistId: userId } }, // Limit therapists array too if needed
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ student });
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch student" },
      { status: 500 }
    );
  }
}
