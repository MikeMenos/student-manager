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
  school: string;
  parentInfo: ParentInfo[];
}

export interface ParentInfoDto {
  id: string;
  parentName: string;
  relation: string;
  phone: number | null;
  email: string;
}
export interface StudentDto {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  grade: string;
  homeAddress: string;
  parentInfo: ParentInfoDto[];
}
