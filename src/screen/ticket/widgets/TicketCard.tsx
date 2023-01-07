import { Box, Chip, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import { iTicket } from '../../../types/store/ticket';
import useServiceStore from '../../../store/serviceStore';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Props = {
  patientData: iTicket;
};

const TicketCard = (props: Props) => {
  const { doctors, departments } = useServiceStore();

  const doctorSetter = (id: string) => {
    return doctors.find((element) => element._id === id)?.name;
  };

  const departmentSetter = (id: string) => {
    return departments.find((element) => element._id === id)?.name;
  };

  const ageSetter = (age: string) => {
    return dayjs().from(dayjs(age), true);
  };

  return (
    <Box
      p={2}
      bgcolor="#f1f5f7"
      borderRadius={2}
      my={1}
      sx={{
        bgcolor: '#f1f5f7',
        '&:hover': {
          bgcolor: '#E2ECFB'
        }
      }}
    >
      <Box
        display="flex"
        width={'100%'}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" justifyContent="space-between" minWidth="80%">
          <Typography
            variant="subtitle1"
            textTransform={'capitalize'}
            fontWeight={500}
          >
            {props.patientData.consumer[0].firstName}{' '}
            {props.patientData.consumer[0].lastName}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2">
              {ageSetter(props.patientData.consumer[0].dob)}
            </Typography>
            {props.patientData.consumer[0].gender === 'M' ? (
              <MaleIcon fontSize="inherit" />
            ) : props.patientData.consumer[0].gender === 'F' ? (
              <FemaleIcon />
            ) : (
              <TransgenderIcon />
            )}
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">
            #{props.patientData.consumer[0].uid}
          </Typography>
        </Box>
      </Box>
      <Typography variant="inherit" textTransform="capitalize">
        {doctorSetter(props.patientData.prescription[0].doctor)}(
        {departmentSetter(props.patientData.prescription[0].departments[0])})
      </Typography>
      <Typography variant="inherit" textTransform="capitalize">
        {props.patientData.prescription[0].symptoms}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 2fr)',
          columnGap: 2,
          placeContent: 'start'
        }}
      >
        <Typography fontWeight={500}>$5,000</Typography>
        <Chip label="Insurance" />
        <Chip label="High" color="secondary" />
      </Box>
      <Typography variant="caption" color="blue">
        4 Task Pending
      </Typography>
    </Box>
  );
};

export default TicketCard;
