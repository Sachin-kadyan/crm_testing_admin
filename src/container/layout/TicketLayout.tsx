import {
  Box,
  Button,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import { getTicketHandler } from '../../api/ticket/ticketHandler';
import useTicketStore from '../../store/ticketStore';
import TicketCard from '../../screen/ticket/widgets/TicketCard';
import { iTicket } from '../../types/store/ticket';
import { getDoctorsHandler } from '../../api/doctor/doctorHandler';
import { getDepartmentsHandler } from '../../api/department/departmentHandler';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import DefaultScreen from '../../components/DefaultScreen';
import { ArrowBack } from '@mui/icons-material';
import TicketFilter from '../../screen/ticket/widgets/TicketFilter';
import DownloadAllTickets from '../../screen/ticket/widgets/DownloadAllTickets';

const Ticket = () => {
  const { tickets, filterTickets } = useTicketStore();
  const [filteredTickets, setFilteredTickets] = useState<iTicket[]>([]);

  const filterLength =
    filterTickets.departments.length +
    filterTickets.admissionType.length +
    filterTickets.diagnosticType.length;

  const handleFilterTickets = () => {
    if (filterLength > 0) {
      const filterData = tickets.map((ticket) => {
        if (
          ticket.prescription[0].department.includes(
            filterTickets.departments
          ) && ticket.prescription[0].admission
            ? ticket.prescription[0].admission.includes(
                filterTickets.admissionType
              )
            : null &&
              ticket.prescription[0].diagnostics.includes(
                filterTickets.diagnosticType
              )
        ) {
          console.log('Hello');
        }
      });
    }
  };

  const navigate = useNavigate();

  const currentRoute = useMatch('/ticket');

  const redirectTicket = () => {
    navigate('/ticket');
  };
  window.onload = redirectTicket;

  useEffect(() => {
    (async function () {
      await getTicketHandler();
      await getDoctorsHandler();
      await getDepartmentsHandler();
      if (filterLength > 0) {
        handleFilterTickets();
      }
    })();
  }, [filterLength]);

  return (
    <Box height={'100vh'} display="flex" position="fixed" width="100%">
      <Box width="25%" position="sticky" top={0}>
        <Box p={1} height={'13vh'} borderBottom={0.5} borderColor="#f0f0f0">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={() => navigate('/')}
              color="inherit"
              startIcon={<ArrowBack />}
              sx={{ mb: 1 }}
            >
              Go Back To Dashboard
            </Button>
            <DownloadAllTickets />
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              sx={{ bgcolor: '#f5f7f5', p: 1, borderRadius: 1 }}
              size="small"
              fullWidth
              placeholder="Search Leads"
              id="outlined-start-adornment"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <TicketFilter filterLength={filterLength} />
          </Stack>
        </Box>
        <Box
          position="relative"
          p={1}
          height={'87vh'}
          sx={{
            overflowY: 'scroll',
            '&::-webkit-scrollbar ': {
              display: 'none'
            }
          }}
        >
          {tickets
            ? tickets.length > 0
              ? tickets.map((item: iTicket) => (
                  <TicketCard key={item._id} patientData={item} />
                ))
              : [0, 1, 2, 3, 4, 5].map((_) => (
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: 2, my: 1 }}
                    width="100%"
                    height="20%"
                  />
                ))
            : 'Loading'}
        </Box>
      </Box>
      <Box bgcolor="#E2ECFB" width="75%">
        {currentRoute ? <DefaultScreen /> : <Outlet />}
      </Box>
    </Box>
  );
};

export default Ticket;
