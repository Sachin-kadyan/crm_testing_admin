import useServiceStore from '../../store/serviceStore';
import { getStages } from './stages';

export const getStagesHandler = async () => {
  const { setStages } = useServiceStore.getState();
  const stages = await getStages();
  setStages(stages);
};
