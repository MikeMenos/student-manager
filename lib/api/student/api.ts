import { BASE_URL } from "@/lib/utils";
import { StudentT } from "@/types/student.type";
import axios from "axios";

export async function getAllStudents(filter: string) {
  const response = await axios.get(`${BASE_URL}/api/students`, {
    params: filter ? { filter } : {},
  });
  const data = response.data.students as StudentT[];

  return data;
}

export async function getSingleStudent(id: string) {
  const response = await axios.get(`${BASE_URL}/api/students/${id}`);
  const data = response.data.student as StudentT;

  return data;
}

export async function createStudent(formData: StudentT) {
  const response = (await axios.post(`${BASE_URL}/api/students`, formData)) as {
    data: { data: StudentT; message: string };
  };
  return response;
}

export async function deleteStudent(id: string) {
  return await axios.delete(`${BASE_URL}/api/students`, {
    params: { id },
  });
}
