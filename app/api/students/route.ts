import { NextResponse } from "next/server";
import { Student } from "@/types/student";
import prisma from "@/lib/prisma";
import { capitalizeFirstLetter } from "@/lib/helpers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter");

  try {
    const students = await prisma.student.findMany({
      where: filter
        ? {
            OR: [
              { firstName: { contains: filter, mode: "insensitive" } },
              { lastName: { contains: filter, mode: "insensitive" } },
              { grade: { contains: filter, mode: "insensitive" } },
              { age: { contains: filter, mode: "insensitive" } },
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
            ],
          }
        : undefined,
      include: {
        parentInfo: true,
      },
    });

    return NextResponse.json({ students });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(req: Request) {
  try {
    const formData: Student = await req.json();

    const isUpdate = !!formData.id;

    const data = {
      firstName: capitalizeFirstLetter(formData.firstName),
      lastName: capitalizeFirstLetter(formData.lastName),
      age: formData.age,
      grade: formData.grade,
      homeAddress: formData.homeAddress,
      school: formData.school,
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
        },
        include: { parentInfo: true },
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
        },
        include: { parentInfo: true },
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
    console.error("Student create/update error:", error);
    return NextResponse.json(
      {
        message: "Failed to process student",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")!;

    await prisma.student.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Student deleted" });
  } catch {
    return NextResponse.json(
      { message: "Failed to delete student" },
      { status: 500 }
    );
  }
}
