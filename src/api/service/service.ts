import { apiClient } from '../apiClient';

export const uploadServiceMaster = async (parsedData: object[]) => {
  const { data } = await apiClient.post('/service', parsedData);
  return data;
};

export const getServiceTags = async () => {
  const { data } = await apiClient.get('/department/tag');
  return data;
};

export const getAllServices = async () => {
  const { data } = await apiClient.get('/service');
  return data;
};

export const createServiceTag = async (tag: object) => {
  const { data } = await apiClient.post('/department/tag', tag);
  return data;
};
