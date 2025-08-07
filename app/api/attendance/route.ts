import prisma from "@/lib/prisma";
import { AttendanceT } from "@/types/attendance.type";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData: AttendanceT = await req.json();

    const attendance = await prisma.attendance.create({
      data: {
        sessionDate: formData.sessionDate as string,
        studentId: formData.studentId!,
        therapistId: formData.therapistId!,
        sessionType: formData.sessionType,
        sessionDuration: formData.sessionDuration,
      },
    });

    return NextResponse.json(
      {
        data: attendance,
        message: "Attendance created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Attendance POST error:", error);
    return NextResponse.json(
      { message: "Failed to create attendance" },
      { status: 500 }
    );
  }
}
