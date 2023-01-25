import useTicketStore from '../../store/ticketStore';
import { iNote } from '../../types/store/ticket';
import { createNewNote, getAllNotes, getTicket } from './ticket';

export const getTicketHandler = async () => {
  const { setTickets } = useTicketStore.getState();
  const tickets = await getTicket();
  setTickets(tickets);
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
