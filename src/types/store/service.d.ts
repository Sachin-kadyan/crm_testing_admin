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

export interface iServiceTag {
  name: string;
  _id: string;
}

export interface iService {
  name: string;
  serviceId: string;
  department: string;
  departmentType: string;
  tag: string;
  opdCharge: number;
  ipdCharge: number;
  fourSharingRoomCharge: number;
  twinSharingRoomCharge: number;
  singleRoomCharge: number;
  deluxeRoomCharge: number;
  vipRoomCharge: number;
}

export interface iServiceStore {
  departments: iDepartment[];
  setDepartments: (departments: iDepartment[]) => void;
  serviceTags: iServiceTag[{}];
  setServiceTags: (tag: iServiceTag[]) => void;
  doctors: iDoctor[];
  setDoctors: (doctors: iDoctor[]) => void;
  services: iService[{}];
  setServices: (services: iService[]) => void;
  wards: IWard[];
  setWards: (wards: IWard[]) => void;
}
