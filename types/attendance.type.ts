export type SessionType =
  | "Psychological"
  | "Occupational"
  | "Speech"
  | "Behavioral"
  | undefined;

export type AttendanceT = {
  id?: string;
  sessionDate: Date | string;
  studentId?: string;
  therapistId?: string;
  sessionType: SessionType;
  sessionDuration: number;
};
