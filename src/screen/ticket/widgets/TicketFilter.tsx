import { FilterList } from '@mui/icons-material';
import {
  Badge,
  BadgeProps,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { getDepartmentsHandler } from '../../../api/department/departmentHandler';
import { getDoctorsHandler } from '../../../api/doctor/doctorHandler';

type Props = {};

const drawerWidth = 600;

const TicketFilter = (props: Props) => {
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  }));

  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleFilterOpen = () => {
    setIsFilterOpen(true);
  };

  React.useEffect(() => {
    (async function () {
      getDepartmentsHandler();
      getDoctorsHandler();
    })();
  });

  return (
    <Box>
      <IconButton onClick={handleFilterOpen}>
        <StyledBadge badgeContent={4} color="primary">
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
          <Stack
            direction="row"
            spacing={1}
            p={1}
            borderBottom={1}
            borderColor="#f3f3f3"
          >
            <FilterList />
            <Typography variant="h6">Add Filter </Typography>
          </Stack>
          <Box></Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default TicketFilter;
