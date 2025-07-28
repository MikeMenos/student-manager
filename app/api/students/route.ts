import { NextResponse } from "next/server";
import { Student, StudentDto } from "@/types/student";
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

    const newStudent = await prisma.student.create({
      data: {
        firstName: capitalizeFirstLetter(formData.firstName),
        lastName: capitalizeFirstLetter(formData.lastName),
        age: formData.age,
        grade: formData.grade,
        homeAddress: formData.homeAddress,
        school: formData.school,
        parentInfo: {
          create: formData.parentInfo.map((parent) => ({
            ...parent,
            phone: parent.phone!,
            parentName: capitalizeFirstLetter(parent.parentName),
          })),
        },
      },
      include: {
        parentInfo: true,
      },
    });

    return NextResponse.json(
      {
        data: newStudent,
        message: "Student created successfully",
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Failed to create student",
      },
      { status: 500 }
    );
  }
}
