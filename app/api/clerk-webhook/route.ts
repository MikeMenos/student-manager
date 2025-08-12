import { NextRequest } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { SessionType } from "@/types/attendance.type";
import { TherapyCenters } from "@/types/therapistType";

export async function POST(req: NextRequest) {
  const payload: WebhookEvent = await req.json();
  if (payload.type !== "user.created")
    return new Response("Ignored", { status: 200 });

  const { id, first_name, last_name, email_addresses, public_metadata } =
    payload.data;
  await prisma.therapist.create({
    data: {
      therapistName: `${first_name!} ${last_name!}`,
      center: public_metadata.center as TherapyCenters,
      email: email_addresses[0]?.email_address,
      phone: public_metadata.phone as string,
      therapistId: id,
      therapistRole: public_metadata.therapistRole as SessionType,
    },
  });

  return Response.json({ message: "Therapist Created" });
}
