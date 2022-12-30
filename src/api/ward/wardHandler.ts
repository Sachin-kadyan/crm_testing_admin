import useServiceStore from '../../store/serviceStore';
import { getWards } from './ward';

export const getWardsHandler = async () => {
  const { setWards } = useServiceStore.getState();
  const wards = await getWards();
  setWards(wards);
};
