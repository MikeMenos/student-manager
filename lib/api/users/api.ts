import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import { TherapistCreationResponse } from "@/types/therapistType";

export async function getAllTherapists(filter?: string) {
  const response = await axios.get(`${BASE_URL}/api/therapists`, {
    params: filter ? { filter } : {},
  });
  const data = response.data.therapists as TherapistCreationResponse[];

  return data;
}

export async function deleteUserFromClerkAndDb({
  clerkUserId,
  dbUserId,
}: {
  clerkUserId: string;
  dbUserId: string;
}) {
  return await axios.delete(`${BASE_URL}/api/therapists`, {
    params: { clerkUserId, dbUserId },
  });
}
