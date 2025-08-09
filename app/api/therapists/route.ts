import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");

    const data = await prisma.therapist.findMany({
      where: filter
        ? {
            OR: [
              { therapistName: { contains: filter, mode: "insensitive" } },
              { email: { contains: filter, mode: "insensitive" } },
            ],
          }
        : undefined,
    });

    return NextResponse.json({ clients: data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerkUserId")!;
    const dbUserId = searchParams.get("dbUserId")!;

    await prisma.therapist.delete({
      where: {
        id: dbUserId,
      },
    });
    await axios.delete(`https://api.clerk.com/v1/users/${clerkUserId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json({ message: "Client deleted." });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
