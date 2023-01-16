import { iEstimate } from '../../types/store/service';
import { apiClient } from '../apiClient';

export const createEstimate = async (estimate: iEstimate) => {
  console.log(estimate);
  const { data } = await apiClient.post('/ticket/estimate', estimate);
  return data;
};
