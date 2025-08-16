import { BASE_URL } from "@/lib/utils";
import { SessionT } from "@/types/session.type";
import axios from "axios";

export async function createSession(formData: SessionT) {
  const response = (await axios.post(`${BASE_URL}/api/session`, formData)) as {
    data: { data: SessionT; message: string };
  };
  return response;
}

export async function deleteSession(id: string) {
  return await axios.delete(`${BASE_URL}/api/session`, {
    params: { id },
  });
}
