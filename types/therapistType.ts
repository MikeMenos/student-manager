import { SessionT, SessionType } from "./session.type";
import { StudentT } from "./student.type";

export type TherapistCreationResponseT = {
  id: string;
  therapistId: string;
  center: TherapyCenters;
  therapistName: string;
  email: string;
  phone: string;
  therapistRole: SessionType;
  sessions?: SessionT[];
  students?: StudentT[];
};

export type TherapyCenters = "Patras" | "Amaliada" | "Aigio";
