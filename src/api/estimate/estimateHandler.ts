import { iEstimate } from '../../types/store/service';
import { createEstimate } from './estimate';

export const createEstimateHandler = async (estimate: iEstimate) => {
  const createdEstimate = await createEstimate(estimate);
  console.log(createdEstimate);
};
