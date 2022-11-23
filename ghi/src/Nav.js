import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Link } from "react-router-dom";
import { useToken, useAuthContext } from "./accounts/Auth";

const drawerWidth = 240;

const upper_data = [
  { name: "Explore", icon: <LocalFireDepartmentOutlinedIcon />, link: "/" },
  { name: "Search", icon: <SearchOutlinedIcon />, link: "/search" },
  { name: "Saved", icon: <TurnedInNotOutlinedIcon />, link: "/saved" },
  { name: "Portfolio", icon: <WorkOutlineOutlinedIcon />, link: "/portfolio" },
];

const lower_data = [
  { name: "Logout", icon: <LogoutOutlinedIcon />, link: "/login", click: true },
  { name: "About", icon: <HelpOutlineOutlinedIcon />, link: "/about" },
];



export default function HotStocksNav({ children }) {

  const [token, login, logout] = useToken();

  async function handleClick(e) {
    e.preventDefault();
    logout();
    console.log('logged out maybe?');
  }

  console.log(token);

  const getList = (data) => (
    <div style={{ width: 250 }}>
      {data.map((item, index) => (
        <ListItem button onClick={item.click ? handleClick : null} key={index} component={Link} to={item.link}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {getList(upper_data)}
          </List>
          <Divider />
          <List>
            {getList(lower_data)}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
}
