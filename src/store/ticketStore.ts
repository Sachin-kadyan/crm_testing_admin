import create from 'zustand';
import { iTicketStore } from '../types/store/ticket';

const useTicketStore = create<iTicketStore>((set, get) => ({
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
  notes: [],
  setNotes: (notes) => set({ notes })
}));

export default useTicketStore;
