import { apiClient } from '../apiClient';

export const getWards = async () => {
  const { data } = await apiClient.get(`/department/ward`);
  return data;
};
