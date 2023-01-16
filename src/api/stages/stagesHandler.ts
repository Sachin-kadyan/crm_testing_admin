import useServiceStore from '../../store/serviceStore';
import { iStage } from '../../types/store/service';
import { createStage, getStages } from './stages';

export const getStagesHandler = async () => {
  const { setStages } = useServiceStore.getState();
  const stages = await getStages();
  setStages(stages);
};

export const createStageHandler = async (stage: iStage) => {
  const { stages, setStages } = useServiceStore.getState();
  const stageAdded = await createStage(stage);
  setStages([...stages, stageAdded]);
};
