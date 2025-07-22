export interface ParentInfo {
  parentName: string;
  relation: string;
  phone: number | null;
  email: string;
}

export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
  homeAddress: string;
  parentInfo: ParentInfo[];
}

export interface StudentDto {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
  homeAddress: string;
  parentInfo: ParentInfo[];
}
