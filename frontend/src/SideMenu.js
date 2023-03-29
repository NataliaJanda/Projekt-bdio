import React, { useState } from 'react';
import {Drawer,IconButton,List,ListItem,ListItemIcon,ListItemText,} from '@mui/material';
import { Menu, Settings, AccountCircle, Star, Help } from '@mui/icons-material';

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

  const drawerContent = (
    <List style={{display: 'flex',flexDirection: 'column',height: '100%',overflow: 'hidden', width: collapsed ? '55px' : '240px',}}>
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
    <Drawer variant="permanent" anchor="left">
      {drawerContent}
    </Drawer>
  );
};

export default SideMenu;
