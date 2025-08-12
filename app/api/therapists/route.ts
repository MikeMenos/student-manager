import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { Prisma, TherapyCenters } from "@prisma/client";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const filterRaw = (searchParams.get("filter") ?? "").trim();

    const ors: Prisma.TherapistWhereInput[] = [
      { therapistName: { contains: filterRaw, mode: "insensitive" } },
      { email: { contains: filterRaw, mode: "insensitive" } },
    ];

    const matchedCenters = filterRaw
      ? (Object.values(TherapyCenters) as string[]).filter((c) =>
          c.toLowerCase().includes(filterRaw.toLowerCase())
        )
      : [];

    if (matchedCenters.length) {
      ors.push({ center: { in: matchedCenters as TherapyCenters[] } });
    }

    const data = await prisma.therapist.findMany({
      where: filterRaw ? { OR: ors } : undefined,
    });
    return NextResponse.json({ therapists: data });
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
