import { apiClient } from '../apiClient';

export const getStages = async () => {
  const { data } = await apiClient.get('/stage/');
  return data;
};
