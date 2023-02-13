import { Box, Chip, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import { iTicket } from '../../../types/store/ticket';
import useServiceStore from '../../../store/serviceStore';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
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

  const { ticketID } = useParams();

  return (
    <Box
      p={2}
      bgcolor={ticketID === props.patientData._id ? '#E2ECFB' : '#f1f5f7'}
      borderRadius={2}
      my={1}
      sx={{
        '&:hover': {
          bgcolor: '#E2ECFB',
          cursor: 'pointer'
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
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          minWidth="70%"
        >
          <Typography
            variant="subtitle1"
            textTransform={'capitalize'}
            fontWeight={500}
          >
            {props.patientData.consumer[0].firstName}{' '}
            {props.patientData.consumer[0].lastName &&
              props.patientData.consumer[0].lastName}
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
            UHID{props.patientData.consumer[0].uid}
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
        {props.patientData.prescription[0].admission && (
          <Chip
            label={props.patientData.prescription[0].admission}
            color="primary"
            size="small"
          />
        )}

        {props.patientData.prescription[0].diagnostics.length > 0 && (
          <Chip label="Diagnostics" color="primary" size="small" />
        )}
        <Chip
          size="small"
          disabled={props.patientData.estimate.length === 0 ? true : false}
          label={
            props.patientData.estimate[0]?.paymentType === 0
              ? 'Cash'
              : props.patientData.estimate[0]?.paymentType === 1
              ? 'Insurance'
              : props.patientData.estimate[0]?.paymentType === 2
              ? 'CGHS| ECHS'
              : 'Payment Type Not Available'
          }
        />
        <Chip
          sx={{
            display: props.patientData.estimate.length === 0 ? 'none' : ''
          }}
          size="small"
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
        Created At:
        {dayjs(props.patientData.createdAt).format('DD/MMM/YYYY , HHMM')}hrs
      </Typography>
    </Box>
  );
};

export default TicketCard;
