import React from "react";
import "./styles.css";
import { Grid, TextField, Button, Typography,IconButton } from '@mui/material';
import MuiAlert from "../AlertMUI/MuiAlert";
import { useState } from "react";
import {Link} from 'react-router-dom'
import {Home} from '@mui/icons-material';
import jwt_decode from "jwt-decode";
const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginPage() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh"  }}
      spacing={5}
    >
    <IconButton component={Link} to="/" style={{ position: 'absolute', top: 10, right: 10 }}>
      <Home />
    </IconButton>
      <Grid item>
        <Typography variant="h5" color="primary" className="fade-in-out">
            Logowanie
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}


const LoginForm = () => {
  const [emailValue,setEmailValue] = useState("");
  const [passValue,setPassValue] = useState("");
  const [err, setErr] = useState(false)
  const [userNotFound,setUserNotFound] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };
  
  const handleAlertClose = () => {
    setAlertMessage('');
    setOpenAlert(false);
  };

  const data = {
    email:emailValue,
    password:passValue
  };

  const handleLogin = ()=> {
      fetch(apiUrl + '/v1/auth/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if(response.status === 403) {
          throw new Error("Access forbidden");
        }
        if(response.status === 404) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then(data => {
        if (data?.token) {
          const decodedToken = jwt_decode(data.token);
          const tokenEmail = decodedToken.sub;
    
          if (tokenEmail === emailValue) {
            window.location.href = '/dashboard';
            localStorage.setItem("authToken",data.token);
            localStorage.setItem("isLoggedIn","true")  
            localStorage.setItem("loginName",data.userName);
            localStorage.setItem("typeAccount",data.accountTypeName);
            localStorage.setItem("role",data.role);
          } else {
            throw new Error("Access forbidden");
          }
        }
      })
      .catch(error => {
        if(error.message === "Access forbidden") {
          handleAlertOpen("Nieprawidłowy login lub hasło!");
          setErr(true);
        }if(error.message === "User not found") {
          handleAlertOpen("Użytkownik nie istnieje!")
          setUserNotFound(true);     
        }
      });
     
};


  return (
    
    <Grid container direction="column" alignItems="center" justifyContent="center" className="fade-in-out">
      <TextField
        variant="outlined"
        label="Email"
        fullWidth
        style={{ marginBottom: "1em" }}
        inputProps={{
          style: { height: 30, width: 400 },
          onKeyDown: handleKeyDown 

        }}
        value={emailValue}
        onChange = {(event) => setEmailValue(event.target.value)}
        error={err}
      />
      <TextField
        variant="outlined"
        label="Hasło"
        fullWidth
        style={{ marginBottom: "1em" }}
        inputProps={{
          style: { height: 30, width: 400 },
          onKeyDown: handleKeyDown 

        }}
        type="password"
        value={passValue}
        onChange = {(event) => setPassValue(event.target.value)}
        error={err}
      />
      <Button size="large" variant="contained" color="primary" onClick={handleLogin}>
        ZALOGUJ SIĘ
      </Button>
      {userNotFound && <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity="error"
        message={alertMessage}
      />}
      {err && <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity="error"
        message={alertMessage}
      />}
    </Grid>
  );
};
