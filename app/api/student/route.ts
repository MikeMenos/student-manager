import { NextResponse } from "next/server";
import { Student, StudentDto } from "@/types/student";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData: Student = await req.json();

    const newStudent = (await prisma.student.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.grade,
        grade: formData.grade,
        homeAddress: formData.homeAddress,
        parentInfo: {
          create: formData.parentInfo.map((parent) => ({
            ...parent,
            phone: parent.phone === null ? 0 : parent.phone,
          })),
        },
      },
    })) as StudentDto;

    return NextResponse.json(
      {
        data: newStudent,
        message: "Student created successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Failed to create student",
        error: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
