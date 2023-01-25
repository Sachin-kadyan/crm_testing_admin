import { createTag, iService } from '../../types/store/service';
import { apiClient } from '../apiClient';

export const uploadServiceMaster = async (parsedData: iService[]) => {
  const { data } = await apiClient.post('/service', parsedData);
  return data;
};

export const getServiceTags = async () => {
  const { data } = await apiClient.get('/department/tag');
  return data;
};

export const getAllServices = async (pageNumber: number) => {
  const { data } = await apiClient.get(
    `service?pageLength=10&page=${pageNumber}`
  );
  return data;
};

export const createServiceTag = async (tag: createTag) => {
  const { data } = await apiClient.post('/department/tag', tag);
  return data;
};

export const searchService = async (serviceName: string, tagId?: string) => {
  const { data } = await apiClient.get(
    `/service/search?search=${serviceName}${tagId ? `&tag=${tagId}` : ''}`
  );

  return data;
};
