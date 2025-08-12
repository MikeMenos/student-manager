import { AttendanceT } from "./attendance.type";
import { TherapistCreationResponseT } from "./therapistType";

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
  therapists?: TherapistCreationResponseT[];
};
