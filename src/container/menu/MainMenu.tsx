import { Apartment, Inbox, Mail } from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

interface Props {
  window?: () => Window;
}

const drawerWidth = 200;

const MainMenu = (props: Props) => {
  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
      open={false}
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box'
        }
      }}
    >
      <Box padding={2}>
        <img
          src="https://arete-octa.vercel.app/static/media/LOGO.caee52a55be9f79eaffe.png"
          alt="logo"
          width="50%"
        />
      </Box>
      <MenuList>
        {[{ name: 'Department', icon: <Apartment />, link: '/department' }].map(
          (item) => {
            return (
              <Link to={item.link}>
                <MenuItem>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <Typography>{item.name}</Typography>
                </MenuItem>
              </Link>
            );
          }
        )}
      </MenuList>
    </Drawer>
  );
};

export default MainMenu;
