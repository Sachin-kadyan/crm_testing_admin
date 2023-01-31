import { Box, Step, StepLabel, Stepper } from '@mui/material';
import { useEffect, useState } from 'react';
import useServiceStore from '../../../store/serviceStore';
import { iStage } from '../../../types/store/service';

type Props = {
  stage: string | undefined;
};

const StageCard = (props: Props) => {
  const { stages } = useServiceStore();
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);

  const getCurrentStage = () => {
    const index = stages.findIndex((stage) => stage._id === props.stage);
    console.log(index);
    setCurrentStageIndex(index);
  };
  useEffect(() => {
    getCurrentStage();
  }, [props.stage]);

  return (
    <Box>
      <Stepper activeStep={currentStageIndex} alternativeLabel>
        {stages.map(
          (label: iStage, index) =>
            label.parent === null && (
              <Step key={label._id}>
                <StepLabel>{label.name}</StepLabel>
              </Step>
            )
        )}
      </Stepper>
    </Box>
  );
};

export default StageCard;
