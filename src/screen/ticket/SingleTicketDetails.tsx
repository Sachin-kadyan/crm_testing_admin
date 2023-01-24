import {
  Call,
  CoronavirusOutlined,
  Female,
  Male,
  MedicalServicesOutlined,
  ReceiptLongOutlined,
  Transgender
} from '@mui/icons-material';
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTicketStore from '../../store/ticketStore';
import { iTicket } from '../../types/store/ticket';
import StageCard from './widgets/StageCard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ageSetter } from '../../utils/ageReturn';
import Estimate from './widgets/Estimate';
import useServiceStore from '../../store/serviceStore';
import { getDoctorsHandler } from '../../api/doctor/doctorHandler';
import { getStagesHandler } from '../../api/stages/stagesHandler';
import Rx from '../../assets/Rx.svg';
import MessagingWidget from './widgets/MessagingWidget';

dayjs.extend(relativeTime);

type Props = {};

const SingleTicketDetails = (props: Props) => {
  let { ticketID } = useParams();
  const { tickets } = useTicketStore();
  const { doctors, departments } = useServiceStore();
  const [currentTicket, setCurrentTicket] = useState<iTicket>();

  const getTicketInfo = (ticketID: string | undefined) => {
    const fetchTicket = tickets.find((element) => ticketID === element._id);
    setCurrentTicket(fetchTicket);
  };

  useEffect(() => {
    getTicketInfo(ticketID);
    getDoctorsHandler();
    getStagesHandler();
  }, [ticketID]);

  const doctorSetter = (id: string) => {
    return doctors.find((element) => element._id === id)?.name;
  };

  const departmentSetter = (id: string) => {
    return departments.find((element) => element._id === id)?.name;
  };

  return (
    <Stack height={'100vh'} direction="row">
      <Box width="60%">
        <Box
          height="10vh"
          p={1}
          borderBottom={0.5}
          borderLeft={0.5}
          borderColor="#F0F0F0"
          display="flex"
          bgcolor="white"
          alignItems="center"
        >
          <Box width="60%">
            <Suspense fallback="Loading...">
              <Typography
                textTransform="capitalize"
                fontSize={20}
                fontWeight={500}
              >
                {currentTicket?.consumer[0].firstName}{' '}
                {currentTicket?.consumer[0].lastName}
              </Typography>
            </Suspense>
            <Box
              display="grid"
              gridTemplateColumns="repeat(5, 1fr)"
              columnGap={2}
            >
              <Box display="grid" gridTemplateColumns="repeat(2,1fr)">
                {currentTicket?.consumer[0].gender === 'M' ? (
                  <Box display="flex" alignItems="center">
                    <Male fontSize="inherit" /> <Typography>Male</Typography>{' '}
                  </Box>
                ) : currentTicket?.consumer[0].gender === 'F' ? (
                  <Box display="flex" alignItems="center">
                    <Female fontSize="inherit" />{' '}
                    <Typography>Female</Typography>{' '}
                  </Box>
                ) : (
                  <Transgender />
                )}
              </Box>
              <Typography variant="body1">
                {ageSetter(currentTicket?.consumer[0].dob!)}
              </Typography>
              <Typography variant="body1">
                #{currentTicket?.consumer[0].uid}
              </Typography>
            </Box>
          </Box>
          <Box
            width="40%"
            display={'flex '}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <IconButton sx={{ bgcolor: 'green', color: 'white' }}>
              <Call />
            </IconButton>
            <Chip label="5 Days" />
          </Box>
        </Box>
        <Box p={1} height="15vh" bgcolor="#F1F5F7">
          <Box bgcolor={'white'} p={2} borderRadius={2}>
            <StageCard />
          </Box>
        </Box>
        <Box position="relative" height="75vh" bgcolor="#F1F5F7">
          <MessagingWidget />
        </Box>
      </Box>
      <Box width="40%">
        <Box
          height="10vh"
          p={1}
          bgcolor="white"
          borderBottom={0.5}
          borderLeft={0.5}
          borderColor="#F0F0F0"
          display="flex"
          alignItems="center"
        >
          <Estimate />
        </Box>
        <Stack
          direction="row"
          spacing={2}
          p={1}
          sx={{
            overflowX: 'scroll',
            '&::-webkit-scrollbar ': {
              display: 'none'
            }
          }}
        >
          <Chip label="Tasks" variant="outlined" color="info" />
          <Chip label="Appointments" variant="outlined" color="info" />
          <Chip label="Documents" variant="outlined" color="info" />
          <Chip label="Estimates" variant="outlined" color="info" />
          <Chip label="Prescriptsions" variant="outlined" color="info" />
        </Stack>
        {/* Lead View  */}

        <Stack borderRadius={2} m={1} bgcolor="white">
          <Box p={1} borderBottom={1} borderColor="#f5f5f5">
            <Typography
              textTransform="uppercase"
              variant="subtitle1"
              fontWeight={500}
            >
              Lead Details
            </Typography>
          </Box>
          <Box p={1}>
            <Stack direction="row" spacing={3} my={1}>
              <MedicalServicesOutlined htmlColor="gray" />
              <Typography textTransform={'capitalize'}>
                {doctorSetter(currentTicket?.prescription[0].doctor!)}(
                {departmentSetter(
                  currentTicket?.prescription[0].departments[0]!
                )}
                )
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3} my={1}>
              <CoronavirusOutlined htmlColor="gray" />
              <Typography>{currentTicket?.prescription[0].symptoms}</Typography>
            </Stack>
            <Stack direction="row" spacing={3} my={1}>
              <img src={Rx} alt="prescriptionIcon" />
              <Typography color="primary">View Prescription</Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack borderRadius={2} m={1} bgcolor="white">
          <Box
            p={1}
            borderBottom={1}
            borderColor="#f5f5f5"
            display="flex"
            justifyContent="space-between"
          >
            <Typography
              variant="subtitle1"
              fontWeight={500}
              textTransform="uppercase"
            >
              Value and Payment Mode
            </Typography>
            <Stack direction="row" spacing={2}>
              <ReceiptLongOutlined color="primary" />
              <Typography color="primary">View Estimate</Typography>
            </Stack>
          </Box>
          <Box p={1}>
            <Stack direction="row" spacing={2}>
              <Chip
                color="error"
                label={`₹${currentTicket?.estimate[0]?.total}`}
                variant="outlined"
                size="medium"
                sx={{
                  fontSize: '1rem'
                }}
              />
              <Chip
                color="info"
                label={
                  currentTicket?.estimate[0]?.paymentType === 0
                    ? 'Cash'
                    : currentTicket?.estimate[0]?.paymentType === 1
                    ? 'Insurance'
                    : 'CGHS/ECHS'
                }
                variant="filled"
                size="medium"
                sx={{
                  fontSize: '1rem'
                }}
              />
            </Stack>
          </Box>
        </Stack>
        <Stack borderRadius={2} m={1} bgcolor="white">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs aria-label="basic tabs example">
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SingleTicketDetails;
