import {
  Box,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import useServiceStore from '../../../store/serviceStore';
import { iStage, iSubStage } from '../../../types/store/service';
import { iTicket } from '../../../types/store/ticket';
import { updateTicketData } from '../../../api/ticket/ticket';

type Props = {
  currentTicket: iTicket | undefined;
  setTicketUpdateFlag: any;
};

function getTotalDaysFromDate(date: Date) {
  if(!date) return 0
  const today = new Date();
  const timeDiff = Math.abs(today.getTime() - date.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return totalDays;
}

const StageCard = (props: Props) => {
  const { stages, subStages } = useServiceStore();
  const [validStageList, setValidStageList] = useState<iStage[] | []>([]);
  const [validSubStageList, setValidSubStageList] = useState<iSubStage[] | []>(
    []
  );
  const { currentTicket, setTicketUpdateFlag } = props;

  const [lastModifiedDate, setLastModifiedDate] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<any>({});
  const [changeStageName, setChangeStageName] = useState<string>('');
  const [progressCount, setProgressCount] = useState<number>(0);
  const [nextStage, setNextStage] = useState<string>('');
  // const getCurrentStage = () => {
  //   const index = stages.findIndex(
  //     (stage) => stage._id === currentTicket?.stage
  //   );
  //   console.log(index);
  //   setCurrentStageIndex(index);
  // };

  // useEffect(()=>{
  //   getCurrentStage();
  // },[])

  useEffect(() => {
    if (currentTicket && stages.length > 0 && subStages.length > 0) {
      const stageDetail: any = stages?.find(
        ({ _id }) => currentTicket.stage === _id
      );
      setValidStageList(stages?.slice(stageDetail?.code - 1));
      setValidSubStageList(
        stageDetail?.child?.map((id) => subStages[id - 1]) || []
      );
      const stageName = stageDetail?.name || '';
      setChangeStageName(stageName);
      setCurrentStage(stageDetail);
      setProgressCount(stageDetail?.code * 20 || 0);
      setNextStage('');
      console.log("currentTicket?.modifiedDate",currentTicket)
      setLastModifiedDate(currentTicket?.modifiedDate ? getTotalDaysFromDate(new Date (currentTicket?.modifiedDate)) : 0);
      if (
        currentTicket?.subStageCode?.code === stageDetail?.child?.length &&
        stageDetail?.code <= 5
      ) {
        const nextStageIndex = stageDetail?.code;
        setNextStage(stages[nextStageIndex]?.name || '');
      }
    }
  }, [currentTicket, stages, subStages, changeStageName]);

  const handleStages = (e: any) => {
    console.log('selected', e.target.value);
    setChangeStageName(e.target.value);
    const payload = {
      stageCode: currentStage?.code + 1,
      subStageCode: {
        active: true,
        code: 1
      },
      ticket: currentTicket?._id
    };
    updateTicketData(payload);

    setTimeout(() => setTicketUpdateFlag(payload), 800);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography fontSize={'13px'} variant="body2" color="black">
        {`Last update ${lastModifiedDate} days ago`}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progressCount}
            sx={{
              height: '10px',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#3949AC'
              }
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="black">
            {progressCount}%
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '7px',
          marginTop: '3px'
        }}
      >
        <Typography
          marginRight={'12px'}
          variant="body2"
          color="black"
          fontSize={15}
          fontWeight={500}
        >
          Current Stage -:{' '}
        </Typography>
        <FormControl variant="standard">
          <Select
            size="small"
            name="stages"
            onChange={handleStages}
            value={changeStageName || ''}
            sx={{ height: '16px', outline: 'none' }}
          >
            {validStageList?.map(({ name, parent, code }: iStage, index) => {
              return (
                parent === null && (
                  <MenuItem
                    value={name}
                    disabled={![changeStageName, nextStage].includes(name)}
                  >
                    {name}
                  </MenuItem>
                )
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Stepper
        activeStep={currentTicket?.subStageCode?.code || 0}
        alternativeLabel
        sx={{ height: '50px', marginTop: '10px' }}
      >
        {validSubStageList?.map((label: iSubStage, index) => (
          <Step key={label._id}>
            <StepLabel>{label.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StageCard;
