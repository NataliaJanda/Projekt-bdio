import React, {useEffect, useState } from 'react';
import {Drawer,IconButton,List,ListItem,ListItemIcon,ListItemText,} from '@mui/material';
import {Menu, Settings, AccountCircle, Logout,Star, Help,Login} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

// Komponent menu bocznego
const SideMenu = ({ onDrawerToggle }) => {
  // Stan przechowujący informację, czy menu jest zwinięte
  const [collapsed, setCollapsed] = useState(false);
  const loggedIn = localStorage.getItem("isLoggedIn");
  const [buttonVisible, setButtonVisible] = useState(false);
  const navigate = useNavigate();

  
  // Funkcja zmieniająca stan menu
  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
    if (onDrawerToggle) {
      onDrawerToggle();
    }
  };

  //funkcja służąca do wylogowywania.
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("typeAccount");
    localStorage.removeItem("loginName");
    window.location.href = '/';
  };

    const buttonAdmin = () => {
      navigate("/components/AdminPage");
    }

  useEffect(() => {
    if (!loggedIn) {
      setButtonVisible(true);
    }
  }, [loggedIn]);

  const drawerContent = (
    <List style={{display: 'flex',flexDirection: 'column',height: '100%',width: collapsed ? '55px' : '240px',}}>
      <ListItem style={{ paddingLeft: 8 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </ListItem>
      
      {!buttonVisible && (<ListItem button>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia konta" />}
      </ListItem>
      )}

      {!buttonVisible && (<ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia" />}
      </ListItem>)}

      {!buttonVisible && (<ListItem button>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Plan Premium" />}
      </ListItem>)}
      
      {!buttonVisible && (<ListItem button onClick={() => buttonAdmin()}>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Panel administratora" />}
      </ListItem>)}


      <ListItem button onClick={loggedIn ? handleLogout : () => {}} component={Link} to="/components/login" >
        <ListItemIcon>
          {loggedIn ? <Logout />:<Login/>}
        </ListItemIcon>
        {!collapsed && loggedIn ? <ListItemText primary="Wyloguj się" />:<ListItemText primary="Zaloguj się" />}
      </ListItem>

      {buttonVisible && (
        <ListItem button component={Link} to="/components/register">
          <ListItemIcon>
            <AppRegistrationIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Zarejestruj się" />}
        </ListItem>
  )}
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
