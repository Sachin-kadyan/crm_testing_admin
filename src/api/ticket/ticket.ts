import { iNote } from '../../types/store/ticket';
import { apiClient } from '../apiClient';

export const getTicket = async () => {
  const { data } = await apiClient.get('/ticket');
  return data;
};

export const createTicket = async (prescription: any) => {
  const { data } = await apiClient.post('/ticket', prescription, {
    /* @ts-ignore */
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  console.log(data);
};
export const sendTextMessage = async () => {};

export const getAllNotes = async (ticketId: string) => {
  const { data } = await apiClient.get(`ticket/note/${ticketId}`);
  return data;
};

export const createNewNote = async (note: iNote) => {
  const { data } = await apiClient.post('/ticket/note', note);
  return data;
};
