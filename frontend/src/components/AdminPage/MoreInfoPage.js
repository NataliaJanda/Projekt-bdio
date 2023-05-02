import { Box, Container, Grid, TextField,Typography} from "@mui/material";
import React,{useEffect, useState} from "react";
import AdminSideMenu from "./AdminSideMenu";
import { useNavigate,useLocation } from "react-router-dom";


const MoreInfoPage = () => {

    const [id,setId] = useState("");
    const [userName,setUserName] = useState("");
    const [rolle, setRolle] = useState("");
    const [url_activationn, setUrl_Activation] = useState("");
    const [date, setDate] = useState("");
    const [emaill,setEmaill] = useState("");
    const [activation, setActivation] = useState("");
    const location = useLocation();
    const { accountId, nameUser, email, role,url_activation,register_date,activated } = location.state;

    useEffect(() => {
        setId(accountId);
        setEmaill(email);
        setUserName(nameUser);
        setRolle(role);
        setUrl_Activation(url_activation);
        setDate(register_date);
        setActivation(activated);
      }, [accountId, nameUser, email, role, url_activation, register_date, activated]);

    
    const [collapsed, setCollapsed] = useState(false);
    const handleDrawerToggle = () => {
      setCollapsed(!collapsed);
    };
  
    console.log(id,userName,rolle, url_activationn,date,emaill,activation)

    return (
    <>
      <Grid container direction="column"  justifyContent="center" >
      <AdminSideMenu onDrawerToggle={handleDrawerToggle} />
      <Box ml={collapsed ? 3 : "240px"}>
      <Typography variant="h5" color="primary" justifyContent="center" align="center">
            Informacje o koncie użytkownika
        </Typography>
          <Container maxWidth="xl">
          <Grid item>ID:</Grid>
                <Grid item><TextField
                    sx={{ borderRadius: '16px' }}
                    InputProps={{ readOnly: true }}
                    value={id}
                    fullWidth
                /></Grid>

            <Grid item>Nazwa:</Grid>
                <Grid item>
                <TextField
                    sx={{ borderRadius: '16px' }}
                    InputProps={{ readOnly: true }}
                    value={userName}
                    fullWidth
                />
                </Grid>

            <Grid item>Rola:</Grid>
                <Grid item><TextField
                    sx={{ borderRadius: '16px' }}
                    InputProps={{ readOnly: true }}
                    value={rolle}
                    fullWidth
                /></Grid>

            <Grid item>URL:</Grid>
                <Grid item><TextField
                    sx={{ borderRadius: '16px' }}
                    InputProps={{ readOnly: true }}
                    value={url_activation}
                    fullWidth
                /></Grid>

            <Grid item>Data:</Grid>
                <Grid item><TextField
                    sx={{ borderRadius: '16px'  }}
                    InputProps={{ readOnly: true }}
                    value={date}
                    fullWidth
                /></Grid>

            <Grid item>Email:</Grid>
                <Grid item><TextField
                    sx={{ borderRadius: '16px' }}
                    InputProps={{ readOnly: true }}
                    value={emaill}
                    fullWidth
                /></Grid>

            <Grid item>Stan aktywacji:</Grid>
                <Grid item><TextField
                    sx={{ borderRadius: '16px' }}
                    InputProps={{ readOnly: true }}
                    value={activation}
                    fullWidth
                /></Grid>
                    
          </Container>
      </Box>
    </Grid>
    </>
    );

};

export default MoreInfoPage;