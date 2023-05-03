import React, { useState } from 'react';
import {Drawer,IconButton,List,ListItem,ListItemIcon,ListItemText,} from '@mui/material';
import {Menu, Settings,Logout,Login, PersonAddAlt} from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom'
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

// Komponent menu bocznego
const AdminSideMenu = ({ onDrawerToggle }) => {
  // Stan przechowujący informację, czy menu jest zwinięte
  const [collapsed, setCollapsed] = useState(false);
  const loggedIn = localStorage.getItem("isLoggedIn");
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
    localStorage.removeItem("role");
    window.location.href = '/';
  };

 const navToUsers = () =>{
  navigate("/components/AdminPage")
 };

 const navToAddUser = () =>{
  navigate("/components/AddUser")
 };

  const drawerContentAdmin = (
    <List style={{display: 'flex',flexDirection: 'column',height: '100%',width: collapsed ? '55px' : '240px',}}>
      <ListItem style={{ paddingLeft: 8 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Menu />
        </IconButton>
      </ListItem>
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <GridViewIcon  />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Pulpit" />}
      </ListItem>
      <ListItem button onClick={() => navToUsers()}>
        <ListItemIcon>
          <PeopleAltIcon />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Użytkownicy" />}
      </ListItem>
      <ListItem button onClick={() => navToAddUser()}>
        <ListItemIcon>
          <PersonAddAlt />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Dodaj użytkownika" />}
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        {!collapsed && <ListItemText primary="Ustawienia" />}
      </ListItem>

      <ListItem button onClick={loggedIn ? handleLogout : ""} component={Link} to="/components/login" >
        <ListItemIcon>
          {loggedIn ? <Logout />:<Login/>}
        </ListItemIcon>
        {!collapsed && loggedIn ? <ListItemText primary="Wyloguj się" />:<ListItemText primary="Zaloguj się" />}
      </ListItem>
    </List>
  );

  return (
    <>
    <Drawer variant="permanent" anchor="left">
      {drawerContentAdmin}
    </Drawer>
    </>
  );
};

export default AdminSideMenu;
