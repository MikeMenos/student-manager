import { NextResponse } from "next/server";
import { StudentT } from "@/types/student.type";
import prisma from "@/lib/prisma";
import { capitalizeFirstLetter } from "@/lib/helpers";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const role = user?.publicMetadata?.role as string | undefined;

  const { searchParams } = new URL(req.url);
  const filter = (searchParams.get("filter") ?? "").trim();

  const searchOr: Prisma.StudentWhereInput["OR"] = filter
    ? [
        { firstName: { contains: filter, mode: "insensitive" } },
        { lastName: { contains: filter, mode: "insensitive" } },
        { grade: { contains: filter, mode: "insensitive" } },
        { age: { contains: filter, mode: "insensitive" } },
        { center: { contains: filter, mode: "insensitive" } },
        {
          parentInfo: {
            some: {
              OR: [
                { parentName: { contains: filter, mode: "insensitive" } },
                { email: { contains: filter, mode: "insensitive" } },
              ],
            },
          },
        },
      ]
    : undefined;

  // If admin → return all students without altering sessions
  if (role === "admin") {
    const students = await prisma.student.findMany({
      where: searchOr ? { OR: searchOr } : undefined,
      include: {
        parentInfo: true,
        sessions: true,
        therapists: true,
      },
    });
    return NextResponse.json({ students });
  }

  // For non-admin → filter students and only include sessions related to this therapist
  const students = await prisma.student.findMany({
    where: {
      therapists: { some: { therapistId: userId } }, // Student has this therapist
      ...(searchOr ? { OR: searchOr } : {}),
    },
    include: {
      parentInfo: true,
      sessions: {
        where: { therapistId: userId }, // Direct filter using Clerk ID
      },
      therapists: {
        where: { therapistId: userId },
      },
    },
  });

  return NextResponse.json({ students });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData: StudentT = await req.json();

    const isUpdate = !!formData.id;

    const data = {
      firstName: capitalizeFirstLetter(formData.firstName),
      lastName: capitalizeFirstLetter(formData.lastName),
      age: formData.age,
      grade: formData.grade,
      homeAddress: formData.homeAddress,
      school: formData.school,
      center: formData.center,
    };

    let student;

    if (isUpdate) {
      // Delete existing parentInfo first to avoid duplicates
      await prisma.parentInfo.deleteMany({
        where: { studentId: formData.id },
      });

      student = await prisma.student.update({
        where: { id: formData.id },
        data: {
          ...data,
          parentInfo: {
            create: formData.parentInfo.map(
              ({ parentName, relation, phone, email }) => ({
                parentName: capitalizeFirstLetter(parentName),
                relation,
                phone: phone,
                email: email ?? undefined,
              })
            ),
          },
          therapists: {
            connect: formData.therapists?.map((t) => ({ id: t.id })),
          },
        },
        include: { parentInfo: true, therapists: true },
      });
    } else {
      student = await prisma.student.create({
        data: {
          ...data,
          parentInfo: {
            create: formData.parentInfo.map(
              ({ parentName, relation, phone, email }) => ({
                parentName: capitalizeFirstLetter(parentName),
                relation,
                phone: phone,
                email: email ?? undefined,
              })
            ),
          },
          therapists: {
            connect: formData.therapists?.map((t) => ({ id: t.id })),
          },
        },
        include: { parentInfo: true, therapists: true },
      });
    }

    return NextResponse.json(
      {
        data: student,
        message: isUpdate
          ? "Student updated successfully"
          : "Student created successfully",
      },
      { status: isUpdate ? 200 : 201 }
    );
  } catch (error) {
    console.error("StudentT create/update error:", error);
    return NextResponse.json(
      { message: "Failed to process student" },
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

    await prisma.student.delete({
      where: {
        id,
      },
      include: { parentInfo: true },
    });

    return NextResponse.json({ message: "Student deleted" });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete student" },
      { status: 500 }
    );
  }
}
