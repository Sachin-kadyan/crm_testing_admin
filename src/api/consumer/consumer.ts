import { apiClient } from '../apiClient';

export const searchConsumer = async (search: string) => {
  const { data } = await apiClient.get(`/consumer/search?search=${search}`);
  return data;
};

export const getConsumerTickets = async (consumerId: string) => {
  const { data } = await apiClient.get(`/ticket/${consumerId}`);
  return data;
};
