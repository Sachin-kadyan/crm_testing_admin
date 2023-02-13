import { create } from 'zustand';
import { iTicketStore } from '../types/store/ticket';

const useTicketStore = create<iTicketStore>((set, get) => ({
  tickets: [],
  setTickets: (tickets) => set({ tickets }),
  notes: [],
  setNotes: (notes) => set({ notes }),
  reminders: [],
  setReminders: (reminders) => set({ reminders }),
  filterTickets: {
    departments: [],
    doctors: [],
    admissionType: [],
    diagnosticType: [],
    startDate: 0,
    endDate: 0
  },
  setFilterTickets: (filterTickets) => set({ filterTickets })
}));

export default useTicketStore;
