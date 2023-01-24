export interface iConsumer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'M' | 'F' | 'O';
  uid: string;
  address: {
    house: string;
    city: string;
    state: string;
    postalCode: string;
  };
  uhid: string;
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
  creator?: string;
  total?: number;
  createdAt?: Date;
}

export interface iPrescrition {
  _id: string;
  admission: null;
  condition: string;
  consumer: string;
  departments: string[];
  diagnostics: null;
  medicines: string[];
  doctor: string;
  followUp: string;
  image: string;
  symptoms: string;
}

export interface iTicket {
  _id: string;
  consumer: iConsumer[];
  prescription: iPrescrition[];
  estimate: iEstimate[];
  creator: string;
  assigned: string;
  stage: string;
}

export interface iTicketStore {
  tickets: iTicket[];
  setTickets: (tickets: iTicket[]) => void;
}

