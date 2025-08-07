import { AttendanceT, SessionType } from "./attendance.type";

export type ParentInfoT = {
  id?: string;
  parentName: string;
  relation: string;
  phone: string;
  email?: string;
};

export type StudentT = {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
  homeAddress: string;
  school: string;
  center: string;
  attendances?: AttendanceT[];
  parentInfo: ParentInfoT[];
  therapists?: TherapistT[];
};

export type TherapistT = {
  id: string;
  therapistRole: SessionType;
  therapistName: string;
  students?: StudentT[];
  attendances?: AttendanceT[];
};
