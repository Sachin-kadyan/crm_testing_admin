import { Box, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box bgcolor="primary.main" p={2}>
        <TextField
          onClick={() => navigate('/search')}
          disabled
          color="error"
          label="Search Patient"
          fullWidth
        />
      </Box>
      <Grid container p={0.5}>
        {[
          {
            name: 'Register',
            description: 'register patient from here',
            icon: null,
            path: '/register'
          },
          {
            name: 'Query Resolution',
            description: 'register patient from here',
            icon: null,
            path: '/search'
          }
        ].map((item) => {
          return (
            <Grid item borderRadius={2} p={1} xs={6} bgcolor="primary.light">
              <Link to={item.path}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="subtitle1">{item.description}</Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Home;
