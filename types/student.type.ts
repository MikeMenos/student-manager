import { SessionT } from "./session.type";
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
  sessions?: SessionT[];
  parentInfo: ParentInfoT[];
  therapists?: TherapistCreationResponseT[];
};
