import prisma from "@/lib/prisma";
import { AttendanceT } from "@/types/attendance.type";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData: AttendanceT = await req.json();

    if (!formData.studentId) {
      return NextResponse.json(
        { message: "Student ID is required" },
        { status: 400 }
      );
    }

    const therapist = await prisma.therapist.findFirst({
      where: { therapistId: userId },
    });

    if (!therapist) {
      return NextResponse.json(
        { message: "Therapist not found" },
        { status: 404 }
      );
    }

    const studentExists = await prisma.student.findUnique({
      where: { id: formData.studentId },
    });
    if (!studentExists) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    if (formData.id) {
      await prisma.attendance.delete({
        where: { id: formData.id },
      });
    }

    const attendance = await prisma.attendance.create({
      data: {
        sessionDate: formData.sessionDate! as string,
        studentId: formData.studentId,
        therapistId: therapist.therapistId,
        sessionType: formData.sessionType!,
        sessionDuration: formData.sessionDuration,
      },
      include: { student: true, therapist: true },
    });

    return NextResponse.json(
      { data: attendance, message: "Attendance added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Attendance POST error:", error);
    return NextResponse.json(
      { message: "Failed to add attendance" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")!;

    await prisma.attendance.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Attendance deleted" });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete attendance" },
      { status: 500 }
    );
  }
}
