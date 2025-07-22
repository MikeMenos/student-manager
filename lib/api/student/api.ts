import { BASE_URL } from "@/lib/utils";
import { Student, StudentDto } from "@/types/student";
import axios from "axios";

export async function createStudent(formData: Student) {
  const response = (await axios.post(`${BASE_URL}/api/student`, formData)) as {
    data: { data: StudentDto; message: string };
  };
  return response;
}
