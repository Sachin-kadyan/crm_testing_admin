import useTicketStore from '../../store/ticketStore';
import { iNote } from '../../types/store/ticket';
import { createNewNote, getAllNotes, createTicket, getTicket } from './ticket';

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
  service?: { _id: string; label: string };
  diagnostics: string[];
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
  prescriptionData.append(
    'diagnostics',
    JSON.stringify(prescription.diagnostics)
  );
  prescription.service &&
    prescriptionData.append('service', prescription.service._id);

  /* @ts-ignore */
  const blob = await (await fetch(prescription.image)).blob();
  prescriptionData.append('image', blob);

  return await createTicket(prescriptionData);
};

export const getAllNotesHandler = async (ticketId: string) => {
  const { setNotes } = useTicketStore.getState();
  const notes = await getAllNotes(ticketId);
  setNotes(notes);
};

export const createNotesHandler = async (note: iNote) => {
  const { notes, setNotes } = useTicketStore.getState();
  const noteAdded = await createNewNote(note);
  setNotes([...notes, noteAdded]);
};
