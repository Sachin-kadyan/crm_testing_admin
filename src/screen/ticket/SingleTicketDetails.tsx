import {
  Add,
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
  Button,
  Chip,
  Fab,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
import NotesWidget from './widgets/NotesWidget';
import { iDepartment, iDoctor, iScript } from '../../types/store/service';
import QueryResolutionWidget from './widgets/QueryResolutionWidget';
import { getSingleScript } from '../../api/script/script';
import PrescriptionTabsWidget from './widgets/PrescriptionTabsWidget';

dayjs.extend(relativeTime);

type Props = {};

const SingleTicketDetails = (props: Props) => {
  const { ticketID } = useParams();
  const { tickets } = useTicketStore();
  const { doctors, departments } = useServiceStore();
  const [currentTicket, setCurrentTicket] = useState<iTicket>();
  const [value, setValue] = useState('2');
  const [script, setScript] = useState<iScript>();
  const [isScript, setIsScript] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getTicketInfo = (ticketID: string | undefined) => {
    const fetchTicket = tickets.find((element) => ticketID === element._id);
    setCurrentTicket(fetchTicket);
  };

  useEffect(() => {
    (async function () {
      getTicketInfo(ticketID);
      await getDoctorsHandler();
      await getStagesHandler();
      if (currentTicket) {
        const script = await getSingleScript(
          currentTicket?.prescription[0].service._id,
          currentTicket?.stage
        );
        setScript(script);
      }
    })();
  }, [ticketID, currentTicket]);

  console.log(script);

  const doctorSetter = (id: string) => {
    return doctors.find((doctor: iDoctor) => doctor._id === id)?.name;
  };

  const departmentSetter = (id: string) => {
    return departments.find((department: iDepartment) => department._id === id)
      ?.name;
  };

  // @date : string <TimeStamp>
  const daysDiffernceFromNow = (date: string) => {
    const d = dayjs(date);
    const today = dayjs(new Date());
    return today.diff(d, 'days');
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
            <a href={`tel:${currentTicket?.consumer[0].phone}`}>
              <IconButton sx={{ bgcolor: 'green', color: 'white' }}>
                <Call />
              </IconButton>
            </a>
            <Chip
              label={`${daysDiffernceFromNow(currentTicket?.createdAt!)}
              days`}
            />
          </Box>
        </Box>
        <Stack bgcolor="#F1F5F7" height="90vh" direction="column">
          <Box p={1} height="15%">
            <Box bgcolor={'white'} p={2} borderRadius={2}>
              <StageCard stage={currentTicket && currentTicket?.stage} />
            </Box>
          </Box>
          <Box p={1} height="82.5%" position="relative" bgcolor="#F1F5F7">
            <TabContext value={value}>
              <Box
                sx={{ borderBottom: 1, borderColor: 'divider' }}
                bgcolor="white"
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Whatsapp Message" value="1" />
                  <Tab label="Notes" value="2" />
                  <Tab label="Query Resolution" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <MessagingWidget />
              </TabPanel>
              <TabPanel sx={{ p: 0, height: '100%' }} value="2">
                <NotesWidget />
              </TabPanel>
              <TabPanel sx={{ p: 0, height: '100%' }} value="3">
                <QueryResolutionWidget />
              </TabPanel>
            </TabContext>
          </Box>
        </Stack>
      </Box>
      <Box width="40%" height="100vh" position="relative">
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

        {isScript ? (
          <Box bgcolor="white" height="90vh">
            <Stack p={1}>
              <Typography variant="h6" fontWeight={500}>
                Script Name
              </Typography>
              <Box
                sx={{
                  overflowY: 'scroll',
                  '&::-webkit-scrollbar ': {
                    display: 'none'
                  },
                  height: '100%'
                }}
              >
                <Typography>
                  {script ? script.text : 'Script Not Available'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Box>
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
                  <Typography>
                    {currentTicket?.prescription[0].symptoms}
                  </Typography>
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
              {currentTicket ? (
                <PrescriptionTabsWidget currentTicket={currentTicket} />
              ) : (
                <Typography>Loading...</Typography>
              )}
            </Stack>
          </Box>
        )}

        {/* Lead View  */}

        <Box
          height="7vh"
          p={1}
          width="100%"
          position="absolute"
          bottom={0}
          bgcolor="white"
          borderTop={0.5}
          borderLeft={0.5}
          borderColor="#F0F0F0"
          display="flex"
          justifyContent="space-between"
        >
          <Button onClick={() => setIsScript((prev) => !prev)}>
            {!isScript ? 'View Agent Script' : 'Close Script '}
          </Button>
          <Fab size="small" color="primary" variant="extended">
            <Add sx={{ mr: 1 }} />
            Add New Task
          </Fab>
        </Box>
      </Box>
    </Stack>
  );
};

export default SingleTicketDetails;
