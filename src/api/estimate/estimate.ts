import { iEstimate } from '../../types/store/ticket';
import { apiClient } from '../apiClient';

export const createEstimate = async (estimate: iEstimate) => {
  const { data } = await apiClient.post('/ticket/estimate', estimate);
  return data;
};

export const uploadAndSendEstimate = async (estimate: File, ticket: string) => {
  const estimateUpload = new FormData();
  estimateUpload.append('estimate', estimate);
  const { data } = await apiClient.post(
    `/ticket/${ticket}/estimate/upload`,
    estimateUpload,
    {
      //  @ts-ignore
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return data;
};
