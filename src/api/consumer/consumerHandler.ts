import useConsumerStore from '../../store/consumerStore';
import { getConsumerTickets, searchConsumer } from './consumer';

export const searchConsumerHandler = async (search: string) => {
  const { setSearchResults } = useConsumerStore.getState();
  const consumers = await searchConsumer(search);
  setSearchResults(consumers);
};

export const getConsumerTicketsHandler = async (consumerId: string) => {
  const { setConsumerHistory } = useConsumerStore.getState();
  const tickets = await getConsumerTickets(consumerId);
  setConsumerHistory(tickets);
};
