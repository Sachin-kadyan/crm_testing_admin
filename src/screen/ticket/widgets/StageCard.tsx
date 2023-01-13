import { Box, Step, StepLabel, Stepper } from '@mui/material';

type Props = {};

const steps = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5'];

const StageCard = (props: Props) => {
  return (
    <Box>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StageCard;
