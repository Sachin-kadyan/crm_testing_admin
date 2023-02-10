import { FilterList } from '@mui/icons-material';
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
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { check } from 'prettier';
import React from 'react';
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

  const handleDepartmentsList = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      setDepartmentsList((prev) => [...departmentsList, e.target.value]);
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
    setFilterTickets({
      departments: departmentsList,
      admissionType: admissionType,
      diagnosticType: diagnosticsType
    });
    setIsFilterOpen(false);
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
            <Button
              onClick={handleApplyFilter}
              variant="contained"
              sx={{ borderRadius: '3rem' }}
            >
              Apply
            </Button>
          </Box>
          <Box p={2}>
            <Typography variant="subtitle1" fontWeight={500}>
              Select Departments
            </Typography>
            <FormGroup>
              {departments.map((department) => (
                <FormControlLabel
                  key={department.id}
                  control={
                    <Checkbox
                      value={department.id}
                      onChange={handleDepartmentsList}
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
              <ToggleButton value="none">None</ToggleButton>
              <ToggleButton value="surgery">Surgery</ToggleButton>
              <ToggleButton value="mm">MM</ToggleButton>
              <ToggleButton value="null">Radiation</ToggleButton>
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
              <ToggleButton value="none">None</ToggleButton>
              <ToggleButton value="mri">MRI</ToggleButton>
              <ToggleButton value="pet-ct">PET-CT</ToggleButton>
              <ToggleButton value="lab">Lab</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TicketFilter;
