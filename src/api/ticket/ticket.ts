import { apiClient } from '../apiClient';

export const getTicket = async () => {
  const { data } = await apiClient.get('/ticket');
  return data;
};
