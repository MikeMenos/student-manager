import { AttendanceT, SessionType } from "./attendance.type";
import { StudentT } from "./student.type";

export type TherapistCreationResponse = {
  id: string;
  therapistName: string;
  email: string;
  therapistRole: SessionType;
};

export type TherapistT = {
  id: string;
  therapistRole: SessionType;
  therapistName: string;
  students?: StudentT[];
  attendances?: AttendanceT[];
};
