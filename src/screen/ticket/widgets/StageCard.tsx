import { Box, Step, StepLabel, Stepper } from '@mui/material';
import useServiceStore from '../../../store/serviceStore';
import { iStage } from '../../../types/store/service';

type Props = {};

const StageCard = (props: Props) => {
  const { stages } = useServiceStore();

  return (
    <Box>
      <Stepper activeStep={0} alternativeLabel>
        {stages.map(
          (label: iStage, index) =>
            label.parent === null && (
              <Step key={index}>
                <StepLabel>{label.name}</StepLabel>
              </Step>
            )
        )}
      </Stepper>
    </Box>
  );
};

export default StageCard;
