import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';
import MainMenu from '../menu/MainMenu';
import Topbar from '../topbar/Topbar';

const drawerWidth = 240;

const Dashboard = () => {
  return (
    <Stack direction="row" height="100vh">
      <MainMenu />
      <Box width="100%">
        <Topbar drawerWidth={drawerWidth} />
        <Box component="main" sx={{ background: '#EFFAF5', p: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
