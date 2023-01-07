import { Box, Chip, IconButton, Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import CallIcon from '@mui/icons-material/Call';
import React from 'react';

type Props = {};

const SingleTicketDetails = (props: Props) => {
  return (
    <>
      <Box
        height={'10vh'}
        p={1}
        display="flex"
        justifyContent={'space-between'}
        alignItems="center"
        borderBottom={0.5}
        borderLeft={0.5}
        borderColor="#f0f0f0"
      >
        <Box minWidth={'25%'}>
          <Typography variant="h6">Himanshu </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 2fr)',
              columnGap: 2,
              placeContent: 'start'
            }}
          >
            <Box display={'flex'} alignItems="center">
              <MaleIcon color="primary" />
              <Typography color={'primary'}>Male</Typography>
            </Box>
            <Box>
              <Typography color="primary">23</Typography>
            </Box>
            <Box>
              <Typography color="primary">#0001</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={'flex'}
          justifyContent="space-between"
          alignItems="center"
          minWidth={'20%'}
        >
          <IconButton size="medium" sx={{ bgcolor: 'green' }}>
            <CallIcon htmlColor="white" />
          </IconButton>
          <Chip color="primary" label="5 Days" />
        </Box>
      </Box>
      <Box bgcolor={'#f1f5f7'} height={'90vh'} p={1}>
        <Box bgcolor="white" borderRadius={2} p={2}>
          Hello ji
        </Box>
      </Box>
    </>
  );
};

export default SingleTicketDetails;
