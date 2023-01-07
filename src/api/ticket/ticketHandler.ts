import useTicketStore from '../../store/ticketStore';
import { getTicket } from './ticket';

export const getTicketHandler = async () => {
  const { setTickets } = useTicketStore.getState();
  const tickets = await getTicket();
  setTickets(tickets);
};
