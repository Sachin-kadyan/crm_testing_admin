import {
  Box,
  Button,
  InputAdornment,
  Skeleton,
  Stack,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useEffect, useState } from 'react';
import { getTicketHandler } from '../../api/ticket/ticketHandler';
import useTicketStore from '../../store/ticketStore';
import TicketCard from '../../screen/ticket/widgets/TicketCard';
import { iTicket } from '../../types/store/ticket';
import { getDoctorsHandler } from '../../api/doctor/doctorHandler';
import { getDepartmentsHandler } from '../../api/department/departmentHandler';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
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

  const filterFn = () => {
    setFilteredTickets(
      tickets.filter(
        (item: iTicket) =>
          departmentFilterRule(item.prescription[0].departments[0]) &&
          admissionFilterRule(item.prescription[0].admission) &&
          diagnosticsFilterRule(item.prescription[0].diagnostics)
      )
    );
  };

  const departmentFilterRule = (department: string) => {
    return filterTickets.departments.length > 0
      ? filterTickets.departments.includes(department)
      : true;
  };

  const admissionFilterRule = (admission: string) => {
    return filterTickets.admissionType.length > 0
      ? filterTickets.admissionType.includes(admission)
      : true;
  };

  const diagnosticsFilterRule = (diagnostics: string[]) => {
    if (filterTickets.diagnosticType.length > 0) {
      let diagnosticsResult =
        diagnostics.length > 0
          ? diagnostics.every((item) =>
              filterTickets.diagnosticType.includes(item)
            )
          : false;

      return diagnosticsResult;
    } else return true;
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
        filterFn();
      }
    })();
  }, [filterLength, filterTickets]);

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
          {filterLength > 0
            ? filteredTickets.length > 0
              ? filteredTickets.map((item: iTicket) => (
                  <TicketCard key={item._id} patientData={item} />
                ))
              : 'No Match Found'
            : tickets.length > 0
            ? tickets.map((item: iTicket) => (
                <TicketCard key={item._id} patientData={item} />
              ))
            : [0, 1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  sx={{ borderRadius: 2, my: 1 }}
                  width="100%"
                  height="20%"
                />
              ))}
        </Box>
      </Box>
      <Box bgcolor="#E2ECFB" width="75%">
        {currentRoute ? <DefaultScreen /> : <Outlet />}
      </Box>
    </Box>
  );
};

export default Ticket;
