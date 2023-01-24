import fs from 'fs';
import useTicketStore from '../../store/ticketStore';
import { createTicket, getTicket } from './ticket';

export const getTicketHandler = async () => {
  const { setTickets } = useTicketStore.getState();
  const tickets = await getTicket();
  setTickets(tickets);
};

export type iCreateTicket = {
  departments: string[];
  doctor: string;
  admission: string;
  symptoms: string | null;
  condition: string | null;
  medicines: string[];
  followUp: Date | number;
  image: string | null;
  consumer: string;
};

export const createTicketHandler = async (prescription: iCreateTicket) => {
  const prescriptionData = new FormData();
  prescriptionData.append('consumer', prescription.consumer);
  prescriptionData.append(
    'departments',
    JSON.stringify(prescription.departments)
  );
  prescriptionData.append('admission', prescription.admission);
  prescriptionData.append('doctor', prescription.doctor);
  prescriptionData.append('symptoms', prescription.symptoms!);
  prescription.condition &&
    prescriptionData.append('condition', prescription.condition);
  prescriptionData.append('medicines', JSON.stringify(prescription.medicines));
  prescriptionData.append('followUp', JSON.stringify(prescription.followUp));
  /* @ts-ignore */
  const blob = await (await fetch(prescription.image)).blob();
  prescriptionData.append('image', blob);

  return await createTicket(prescriptionData);
};
