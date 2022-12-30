import {
  Box,
  Button,
  Drawer,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';

type Props = {};

const AddServiceManually = (props: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerWidth = 600;
  return (
    <Stack>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        color="success"
        fullWidth
        variant="contained"
      >
        <AddIcon />
        Add Services Manually
      </Button>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth
          }
        }}
      >
        <Box p={3}>
          <Typography fontWeight={500} fontSize="1.5rem">
            Add Services
          </Typography>
          <Box
            marginY={2}
            width="100%"
            display="flex"
            justifyContent="space-between"
          >
            <TextField
              id="outlined-service-name"
              label="Enter Service Name"
              variant="outlined"
            />
            <TextField
              id="outlined-service-id"
              label="Enter Service ID"
              variant="outlined"
            />
          </Box>
        </Box>
      </Drawer>
    </Stack>
  );
};

export default AddServiceManually;
