import { apiClient } from '../apiClient';

export const uploadServiceMaster = async (parsedData: object[]) => {
  const { data } = await apiClient.post('/service', parsedData);
  return data;
};
