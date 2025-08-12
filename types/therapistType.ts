import { AttendanceT, SessionType } from "./attendance.type";
import { StudentT } from "./student.type";

export type TherapistCreationResponseT = {
  id: string;
  therapistId: string;
  center: TherapyCenters;
  therapistName: string;
  email: string;
  phone: string;
  therapistRole: SessionType;
  attendances?: AttendanceT[];
  students?: StudentT[];
};

export type TherapyCenters = "Patras" | "Amaliada" | "Aigio";
