export interface iDepartment {
  name: string;
  parent?: string;
  _id?: string;
}

export interface IWard {
  name: string;
  type: string;
  code: string;
  roomRent: string;
  consultation: string;
  emergencyConsultation: string;
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

export interface iService {
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
  services: iService[{}];
  setServices: (services: iService[]) => void;
  wards: IWard[];
  setWards: (wards: IWard[]) => void;
}
