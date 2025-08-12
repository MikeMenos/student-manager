import { BASE_URL } from "@/lib/utils";
import { AttendanceT } from "@/types/attendance.type";
import axios from "axios";

export async function createAttendance(formData: AttendanceT) {
  const response = (await axios.post(
    `${BASE_URL}/api/attendance`,
    formData
  )) as {
    data: { data: AttendanceT; message: string };
  };
  return response;
}

export async function deleteAttendance(id: string) {
  return await axios.delete(`${BASE_URL}/api/attendance`, {
    params: { id },
  });
}
