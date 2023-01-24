import { Box, Chip, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import { iTicket } from '../../../types/store/ticket';
import useServiceStore from '../../../store/serviceStore';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { useNavigate } from 'react-router-dom';
import { ageSetter } from '../../../utils/ageReturn';

type Props = {
  patientData: iTicket;
};

const TicketCard = (props: Props) => {
  const { doctors, departments, allServices } = useServiceStore();

  const doctorSetter = (id: string) => {
    return doctors.find((element) => element._id === id)?.name;
  };

  const departmentSetter = (id: string) => {
    return departments.find((element) => element._id === id)?.name;
  };

  const navigate = useNavigate();

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
      onClick={() => {
        navigate(`/ticket/${props.patientData._id}`);
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
        {props.patientData.estimate[0]?.service[0]?.name}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 2fr)',
          columnGap: 2,
          placeContent: 'start'
        }}
      >
        <Typography fontWeight={500}>₹5,000</Typography>
        <Chip
          label={
            props.patientData.estimate[0]?.paymentType === 0
              ? 'Cash'
              : props.patientData.estimate[0]?.paymentType === 1
              ? 'Insurance'
              : 'CGHS/ECHS'
          }
        />
        <Chip
          label={
            220 > 15000 ? 'High' : 220 < 4500 && 450 < 2220 ? 'Medium' : 'Low'
          }
          color={
            222 > 15000
              ? 'info'
              : 1500 < 4500 && 4500 < 22200
              ? 'warning'
              : 'secondary'
          }
        />
      </Box>
      <Typography variant="caption" color="blue">
        4 Task Pending
      </Typography>
    </Box>
  );
};

export default TicketCard;
