import React, {useEffect, useState } from 'react';
import {Drawer,IconButton,List,ListItem,ListItemIcon,ListItemText,} from '@mui/material';
import { Menu, Settings, AccountCircle, Logout,Star, Help} from '@mui/icons-material';
import {Link} from 'react-router-dom'

// Komponent menu bocznego
const SideMenu = ({ onDrawerToggle }) => {
  // Stan przechowujący informację, czy menu jest zwinięte
  const [collapsed, setCollapsed] = useState(false);
  
  // Funkcja zmieniająca stan menu
  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
    if (onDrawerToggle) {
      onDrawerToggle();
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    window.location.href = '/';
  };


  const drawerContent = (
    <List style={{display: 'flex',flexDirection: 'column',height: '100%',width: collapsed ? '55px' : '240px',}}>
      <ListItem style={{ paddingLeft: 8 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia konta" />}
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia" />}
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Plan Premium" />}
      </ListItem>

      <ListItem button onClick={handleLogout} component={Link} to="/components/login" >
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Wyloguj się" />}
      </ListItem>

      <ListItem style={{ flexGrow: 1 }} />
      <ListItem button>
        <ListItemIcon>
          <Help />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Pomoc" />}
      </ListItem>
    </List>
  );

  return (
    <>
    <Drawer variant="permanent" anchor="left">
      {drawerContent}
    </Drawer>
    </>
  );
};

export default SideMenu;
