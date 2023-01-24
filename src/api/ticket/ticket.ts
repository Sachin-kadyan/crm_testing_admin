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
  return data;
};
