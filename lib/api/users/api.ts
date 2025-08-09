import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import { TherapistCreationResponse } from "@/types/therapistType";

export async function getAllTherapists(filter?: string) {
  const response = await axios.get(`${BASE_URL}/api/therapists`, {
    params: filter ? { filter } : {},
  });
  const data = response.data.clients as TherapistCreationResponse[];

  return data;
}
