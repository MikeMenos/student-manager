import { formatToDDMMYYYY } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { SessionT } from "@/types/session.type";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData: SessionT = await req.json();

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

    const duration = Number(formData.sessionDuration);
    if (!formData.sessionDuration || isNaN(duration)) {
      return NextResponse.json(
        { message: "Duration duration must be a valid number" },
        { status: 400 }
      );
    }

    const sessionDate = formatToDDMMYYYY(formData.sessionDate as string | Date);

    let session;

    if (formData.id) {
      const existing = await prisma.session.findUnique({
        where: { id: formData.id },
      });
      if (!existing) {
        return NextResponse.json(
          { message: "Attendance not found" },
          { status: 404 }
        );
      }
      if (existing.therapistId !== therapist.therapistId) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      session = await prisma.session.update({
        where: { id: formData.id },
        data: {
          sessionDate,
          studentId: formData.studentId,
          therapistId: therapist.therapistId,
          sessionType: formData.sessionType!,
          sessionDuration: duration,
          sessionNotes: formData.sessionNotes,
        },
        include: { student: true, therapist: true },
      });

      return NextResponse.json(
        { data: session, message: "Attendance updated successfully" },
        { status: 200 }
      );
    } else {
      session = await prisma.session.create({
        data: {
          sessionDate,
          studentId: formData.studentId,
          therapistId: therapist.therapistId,
          sessionType: formData.sessionType!,
          sessionDuration: duration,
          sessionNotes: formData.sessionNotes,
        },
        include: { student: true, therapist: true },
      });

      return NextResponse.json(
        { data: session, message: "Attendance added successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Attendance POST error:", error);
    return NextResponse.json(
      { message: "Failed to save session" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    // Optional: Check ownership before deleting
    const existing = await prisma.session.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { message: "Session not found" },
        { status: 404 }
      );
    }
    if (existing.therapistId !== userId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await prisma.session.delete({ where: { id } });

    return NextResponse.json({ message: "Session deleted" });
  } catch (error) {
    console.error("Session DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete session" },
      { status: 500 }
    );
  }
}
