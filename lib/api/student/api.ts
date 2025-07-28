import { BASE_URL } from "@/lib/utils";
import { Student, StudentDto } from "@/types/student";
import axios from "axios";

export async function getAllStudents(filter: string) {
  const response = await axios.get(`${BASE_URL}/api/students`, {
    params: filter ? { filter } : {},
  });
  const data = response.data.students as StudentDto[];

  return data;
}

export async function getSingleStudent(id: string) {
  const response = await axios.get(`${BASE_URL}/api/students/${id}`);
  const data = response.data.student as StudentDto;

  return data;
}

export async function createStudent(formData: Student) {
  const response = (await axios.post(`${BASE_URL}/api/students`, formData)) as {
    data: { data: StudentDto; message: string };
  };
  return response;
}
