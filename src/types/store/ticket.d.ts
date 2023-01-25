import { iEstimate, iService } from './service';

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

export interface iPrescription {
  _id: string;
  admission: null | string;
  service?: iService;
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
  prescription: iPrescription[];
  estimate: iEstimate[];
  creator: string;
  assigned: string;
  stage: string;
}

export interface iTicketStore {
  tickets: iTicket[];
  setTickets: (tickets: iTicket[]) => void;
}
