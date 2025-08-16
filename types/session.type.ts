export type SessionType =
  | "Psychological"
  | "Occupational"
  | "Speech"
  | "Behavioral";

export type SessionT = {
  id?: string;
  sessionDate: Date | string;
  studentId?: string;
  therapistId?: string;
  sessionType: SessionType;
  sessionDuration: number;
  sessionNotes: string;
};
