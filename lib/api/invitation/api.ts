import { BASE_URL, SIGN_UP_PATH } from "@/lib/utils";
import { SessionType } from "@/types/session.type";
import axios from "axios";

export async function addTherapist(
  email: string,
  therapistRole: SessionType,
  center: string,
  phone: string
) {
  const payload = {
    email_address: email,
    public_metadata: { therapistRole, center, phone },
    redirect_url: `${BASE_URL}${SIGN_UP_PATH}`,
    notify: true,
    ignore_existing: false,
    expires_in_days: 7,
    template_slug: "invitation",
  };

  const response = await axios.post(`${BASE_URL}/api/invitation`, payload);

  if (response.data.error)
    throw new Error("There is already a client with this email.");

  return response.data;
}
