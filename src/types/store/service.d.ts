export interface iDepartment {
  name: string;
  parent?: string;
  _id?: string;
}

export interface IWard {
  _id?: string;
  name: string;
  type: number;
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
export type createTag = Omit<iServiceTag, '_id'>;

export interface iServiceTag {
  name: string;
  _id: string;
}

export interface iEstimate {
  type: number;
  isEmergency: boolean;
  wardDays: number;
  icuDays: number;
  icuType: string;
  paymentType: number;
  insuranceCompany: string;
  insurancePolicyNumber: string;
  insurancePolicyAmount: number;
  service: serviceAdded[];
  investigation: string[];
  procedure: string[];
  investigationAmount: number;
  procedureAmount: number;
  medicineAmount: number;
  equipmentAmount: number;
  bloodAmount: number;
  additionalAmount: number;
  prescription: string;
  ticket: string;
}

export type serviceAdded = {
  id: string | undefined;
  isSameSite: boolean;
};

export interface iService {
  _id?: string;
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

export interface iStage {
  _id: string;
  name: string;
  code: number;
  description: string;
  parent: null | string;
}

export interface iScript {
  text: string;
  service: string;
  stage: string;
}

export interface iServiceStore {
  departments: iDepartment[];
  setDepartments: (departments: iDepartment[]) => void;
  serviceTags: iServiceTag[];
  setServiceTags: (tag: iServiceTag[]) => void;
  doctors: iDoctor[];
  setDoctors: (doctors: iDoctor[]) => void;
  services: iService[];
  setServices: (services: iService[]) => void;
  wards: IWard[];
  setWards: (wards: IWard[]) => void;
  stages: iStage[];
  setStages: (stages: iStage[]) => void;
  scripts: iScript[];
  setScripts: (scripts: iScript[]) => void;
}
