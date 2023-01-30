import { Forum, PersonAdd } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const inputStyles = {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '5px',
    outline: 'none',
    padding: '12px'
  };
  return (
    <Box>
      <Box bgcolor="primary.main" p={2}>
        <Stack
          justifyContent="centers"
          onClick={() => navigate('/search')}
          style={inputStyles}
        >
          <Typography color="GrayText">Search Patient</Typography>
        </Stack>
      </Box>
      <Box p={1}>
        <Grid container>
          {[
            {
              name: 'Register Patient',
              description:
                "Register patient on the platform after doctor's visit and upload the prescription.",
              icon: <PersonAdd fontSize="large" color="primary" />,
              path: '/register'
            },
            {
              name: 'Query Resolution',
              description:
                'Resolve queries of the patient, platform representatives will be chatting on behalf of patients.',
              icon: <Forum fontSize="large" color="primary" />,
              path: '/search'
            }
          ].map((item) => {
            return (
              <Grid
                item
                borderRadius={2}
                p={1.4}
                mx={0.2}
                xs={5.8}
                bgcolor="primary.light"
              >
                <Link to={item.path}>
                  <Stack spacing={1}>
                    {item.icon}
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="caption">
                      {item.description}
                    </Typography>
                  </Stack>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
