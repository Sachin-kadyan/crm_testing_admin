import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Collapse, Stack } from '@mui/material';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DataObjectOutlinedIcon from '@mui/icons-material/DataObjectOutlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupsIcon from '@mui/icons-material/Groups';

interface Props {
  window?: () => Window;
}

interface SideBarItem {
  title: string;
  icon: any;
  link: string;
  submenu: {
    title: string;
    icon: any;
    link: string;
  }[];
}

const drawerWidth = 240;

export default function ResponsiveDrawer(props: Props) {
  const sidebarMenu: SideBarItem[] = [
    {
      title: 'Department',
      icon: <DomainAddIcon />,
      link: '/department',
      submenu: [
        {
          title: 'Doctors',
          icon: <GroupsIcon />,
          link: '/department/doctors'
        },
        {
          title: 'Wards',
          icon: <LocalHospitalIcon />,
          link: '/department/wards'
        }
      ]
    },
    {
      title: 'Services',
      icon: <BackupTableIcon />,
      link: '/services',
      submenu: [
        {
          title: 'Tags',
          icon: <DataObjectOutlinedIcon />,
          link: '/department'
        }
      ]
    }
  ];
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box padding={3}>
        <img
          src="https://arete-octa.vercel.app/static/media/LOGO.caee52a55be9f79eaffe.png"
          alt="logo"
          width="70%"
        />
      </Box>
      <Divider />
      <List>
        {sidebarMenu.map((item, index: number) => (
          <SideBarItem key={index} item={item} />
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: 'white',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="black" variant="h6" noWrap component="div">
            Welcome Akhil Bisht
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: '#EFFAF5'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );

  function SideBarItem({ item }: { item: SideBarItem }): JSX.Element {
    const { icon, title, submenu, link } = item;
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
      <Stack>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText onClick={() => navigate(link)} primary={title} />

          {submenu?.length !== 0 && isOpen ? (
            <ExpandLess onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <ExpandMore onClick={() => setIsOpen(!isOpen)} />
          )}
        </ListItemButton>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {submenu &&
              submenu.map((menuItem, index: number) => {
                return (
                  <Link to={menuItem.link}>
                    <ListItemButton key={index} sx={{ pl: 4 }}>
                      <ListItemIcon>{menuItem.icon}</ListItemIcon>
                      <ListItemText primary={menuItem.title} />
                    </ListItemButton>
                  </Link>
                );
              })}
          </List>
        </Collapse>
      </Stack>
    );
  }
}
