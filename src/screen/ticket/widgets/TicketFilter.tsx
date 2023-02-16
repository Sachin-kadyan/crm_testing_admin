import { ClearAll, Difference, FilterList } from '@mui/icons-material';
import {
  Badge,
  BadgeProps,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  styled,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { getDepartmentsHandler } from '../../../api/department/departmentHandler';
import { getDoctorsHandler } from '../../../api/doctor/doctorHandler';
import useTicketStore from '../../../store/ticketStore';

type Props = {
  filterLength: number;
};

const drawerWidth = 450;

const TicketFilter = ({ filterLength }: Props) => {
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  }));

  const { setFilterTickets } = useTicketStore();

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [admissionType, setAdmissionType] = React.useState<string[]>(() => []);
  const [diagnosticsType, setDiagnosticsType] = React.useState<string[]>(
    () => []
  );
  const [departmentsList, setDepartmentsList] = React.useState<string[]>(
    () => []
  );
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();

  const handleDepartmentsList = (
    e: React.ChangeEvent<HTMLInputElement>,
    index
  ) => {
    if (!departmentsList.includes(e.target.value)) {
      setDepartmentsList((prev) => [...departmentsList, e.target.value]);
    } else {
      setDepartmentsList(
        departmentsList.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleAdmissionType = (
    event: React.MouseEvent<HTMLElement>,
    newAdmission: string[]
  ) => {
    setAdmissionType(newAdmission);
  };
  const handleDiagnosticsType = (
    event: React.MouseEvent<HTMLElement>,
    newDiagnostics: string[]
  ) => {
    setDiagnosticsType(newDiagnostics);
  };

  const handleFilterOpen = () => {
    setIsFilterOpen(true);
  };

  const departments = [
    {
      label: 'General and Laparoscopic',
      id: '63ce58474dca242deb6a4d41'
    },
    {
      label: 'Surgical oncology ',
      id: '63ce59964dca242deb6a4d4c'
    },
    {
      label: 'GI surgery',
      id: '63de1ab09c1af160749af88d'
    },
    { label: 'Neurology', id: '63ce59314dca242deb6a4d48' }
  ];

  React.useEffect(() => {
    (async function () {
      getDepartmentsHandler();
      getDoctorsHandler();
    })();
  });

  const handleApplyFilter = () => {
    console.log(startDate, 'Start');
    console.log(endDate, 'End');

    console.log(dayjs(endDate).diff(dayjs(startDate), 'days'), Difference);

    setFilterTickets({
      departments: departmentsList,
      admissionType: admissionType,
      diagnosticType: diagnosticsType,
      startDate: startDate ? dayjs(startDate).unix() * 1000 : NaN,
      endDate: endDate ? dayjs(endDate).unix() * 1000 + 2000000 : NaN
    });
    setIsFilterOpen(false);
  };

  const handleClearFilter = () => {
    setFilterTickets({
      departments: [],
      admissionType: [],
      diagnosticType: [],
      startDate: 0,
      endDate: 0
    });
    setDepartmentsList((prev) => []);
    setAdmissionType((prev) => []);
    setDiagnosticsType((prev) => []);
    setStartDate((prev) => '');
    setEndDate((prev) => '');
  };

  return (
    <Box>
      <IconButton onClick={handleFilterOpen}>
        <StyledBadge
          invisible={filterLength <= 0}
          badgeContent={filterLength}
          color="primary"
        >
          <FilterList />
        </StyledBadge>
      </IconButton>

      <Drawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
      >
        <Box>
          <Box
            p={2}
            borderBottom={1}
            borderColor="#f3f3f3"
            display="flex"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <FilterList />
              <Typography variant="h6">Add Filter </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={handleApplyFilter}
                variant="contained"
                sx={{ borderRadius: '3rem' }}
              >
                Apply
              </Button>
              {filterLength > 0 && (
                <Button onClick={handleClearFilter} endIcon={<ClearAll />}>
                  Clear Filters
                </Button>
              )}
            </Stack>
          </Box>
          <Box p={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Select Departments
            </Typography>
            <FormGroup>
              {departments.map((department, index: number) => (
                <FormControlLabel
                  key={department.id}
                  control={
                    <Checkbox
                      checked={departmentsList.includes(department.id)}
                      value={department.id}
                      onChange={(e) => handleDepartmentsList(e, index)}
                    />
                  }
                  label={department.label}
                />
              ))}
            </FormGroup>
          </Box>
          <Box p={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Admission Type
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={admissionType}
              onChange={handleAdmissionType}
            >
              <ToggleButton value="Surgery">Surgery</ToggleButton>
              <ToggleButton value="MM">MM</ToggleButton>
              <ToggleButton value="Radiation">Radiation</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box p={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Diagnotics Type
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={diagnosticsType}
              onChange={handleDiagnosticsType}
            >
              <ToggleButton value="MRI">MRI</ToggleButton>
              <ToggleButton value="PET-CT">PET-CT</ToggleButton>
              <ToggleButton value="CT-Scan">CT-Scan</ToggleButton>
              <ToggleButton value="Lab">Lab</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Box p={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Select Date Range
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box>
                <Typography variant="caption">Start Date</Typography>
                <TextField
                  fullWidth
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  type="date"
                />
              </Box>
              <Box>
                <Typography variant="caption">End Date</Typography>
                <TextField
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TicketFilter;
