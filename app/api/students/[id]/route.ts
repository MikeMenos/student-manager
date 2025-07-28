// app/api/student/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        parentInfo: true,
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
