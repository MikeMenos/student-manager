import { NextRequest } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { SessionType } from "@/types/attendance.type";

export async function POST(req: NextRequest) {
  const payload: WebhookEvent = await req.json();
  if (payload.type !== "user.created")
    return new Response("Ignored", { status: 200 });

  const {
    id: userId,
    first_name,
    last_name,
    email_addresses,
    public_metadata,
  } = payload.data;
  await prisma.therapist.create({
    data: {
      therapistName: `${first_name!} ${last_name!}`,
      email: email_addresses[0].email_address,
      id: userId,
      therapistRole: public_metadata.therapistRole as SessionType,
    },
  });

  return Response.json({ message: "Membership Created" });
}
