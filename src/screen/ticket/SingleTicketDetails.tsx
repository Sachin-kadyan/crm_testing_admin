import { Add, Call, Female, Male, Transgender } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
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

dayjs.extend(relativeTime);

type Props = {};

const SingleTicketDetails = (props: Props) => {
  let { ticketID } = useParams();
  const { tickets } = useTicketStore();
  const [currentTicket, setCurrentTicket] = useState<iTicket>();

  useEffect(() => {
    getTicketInfo();
  }, []);

  const getTicketInfo = () => {
    const fetchTicket = tickets.find((element) => ticketID === element._id);
    setCurrentTicket(fetchTicket);
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
        <Box p={1} height="90vh" bgcolor="#F1F5F7">
          <Box bgcolor={'white'} p={2} borderRadius={2}>
            <StageCard />
          </Box>
        </Box>
      </Box>
      <Box width="40%">
        <Box
          height="10vh"
          p={1}
          borderBottom={0.5}
          borderLeft={0.5}
          borderColor="#F0F0F0"
          display="flex"
          alignItems="center"
        >
          <Estimate />
        </Box>
      </Box>
    </Stack>
  );
};

export default SingleTicketDetails;
