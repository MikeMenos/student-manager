export interface ParentInfo {
  id?: string;
  parentName: string;
  relation: string;
  phone: string;
  email?: string;
}

export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
  homeAddress: string;
  school: string;
  parentInfo: ParentInfo[];
}
