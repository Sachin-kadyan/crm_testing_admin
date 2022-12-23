export interface iDepartment {
  name: string;
  parent?: string;
  _id?: string;
  tags: string[];
}

export interface iDoctor {
  name: string;
  departments: string[];
  _id: string;
}

export interface iDepartmentTag {
  name: string;
  _id: string;
}

export interface iServiceStore {
  departments: iDepartment[];
  setDepartments: (departments: iDepartment[]) => void;
  departmentTags: iDepartmentTag[];
  setDepartmentTags: (departmentTags: iDepartmentTag[]) => void;
  doctors: iDoctor[];
  setDoctors: (doctors: iDoctor[]) => void;
}
