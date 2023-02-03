import {
  Search,
  PersonAddOutlined,
  HomeOutlined,
  QuestionAnswerOutlined
} from '@mui/icons-material';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper
} from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const SupportTabs = (props: Props) => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100vw'
          }}
          showLabels
          color="red"
        >
          <BottomNavigationAction
            onClick={() => navigate('/')}
            label="Home"
            value="home"
            icon={<HomeOutlined />}
          />
          <BottomNavigationAction
            onClick={() => navigate('/register')}
            label="Register"
            value="register"
            icon={<PersonAddOutlined />}
          />
          <BottomNavigationAction
            onClick={() => navigate('/search')}
            label="Search"
            value="search"
            icon={<Search />}
          />
          <BottomNavigationAction
            onClick={() => navigate('/query')}
            label="Query"
            value="query"
            icon={<QuestionAnswerOutlined />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default SupportTabs;
