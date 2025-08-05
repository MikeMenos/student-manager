// app/api/students/[id]/route.ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop(); // safely extract ID from the URL

  if (!id) {
    return NextResponse.json(
      { message: "Missing student ID" },
      { status: 400 }
    );
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        parentInfo: true,
        attendances: true,
      },
    });

    if (!student) {
      return NextResponse.json(
        { message: "StudentT not found" },
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
