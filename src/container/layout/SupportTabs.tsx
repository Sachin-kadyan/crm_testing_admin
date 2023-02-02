import {
  Search,
  PersonAddOutlined,
  HomeOutlined,
  QuestionAnswerOutlined
} from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

type Props = {};

const SupportTabs = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Outlet />
      <BottomNavigation
        style={{ position: 'absolute', bottom: 0, width: '100vw' }}
        showLabels
        color="red"
      >
        <BottomNavigationAction
          onClick={() => navigate('/')}
          label="Home"
          icon={<HomeOutlined />}
        />
        <BottomNavigationAction
          onClick={() => navigate('/register')}
          label="Register"
          icon={<PersonAddOutlined />}
        />
        <BottomNavigationAction
          onClick={() => navigate('/search')}
          label="Search"
          icon={<Search />}
        />
        <BottomNavigationAction
          onClick={() => navigate('/')}
          label="Query"
          icon={<QuestionAnswerOutlined />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default SupportTabs;
