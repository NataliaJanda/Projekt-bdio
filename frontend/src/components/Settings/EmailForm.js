import React from "react";
import "./styles.css";
import { Grid, TextField, Button } from '@mui/material';
import MuiAlert from "../AlertMUI/MuiAlert";
import { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export default function ChangeEmail() {
  return (
    <Grid
      container
      direction="column"
      style={{ minHeight: "80%"  }}
      spacing={5}
    >
      <Grid item>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <EmailForm />
      </Grid>
    </Grid>
  );
}


const EmailForm= () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [save,setSave] = useState(false);
  const emailRegex =  /^[^@\s]+@[^\s@]+\.[^\s@]{1,}$/;
  
  
  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };
  
  const handleAlertClose = () => {
    setAlertMessage('');
    setOpenAlert(false);
  };

  const data = {
    nameUser: username,
    email: email
  }

  const handleEmailChange = () => {
    if (!emailRegex.test(email)) {
      handleAlertOpen('Niepoprawny email!');
      return;
    }
    fetch(apiUrl + '/v2/accounts/changeEmail', {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken")
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 403) {
          throw new Error("Access forbidden");
        }
        if (response.status === 400) {
          throw new Error("Email already exists");
        }
        if (response.status === 200) {
          setSave(true);
          throw new Error("Success");
        }
        return response.json();
      })
      .catch(error => {
        if (error.message === "Access forbidden") {
          setSave(false);
          handleAlertOpen("Coś poszło nie tak!");
        } else if (error.message === "Email already exists") {
          setSave(false);
          handleAlertOpen("Email jest już zajęty");
        }
        else if( error.message === "Success"){
          handleAlertOpen("Zmieniono adres E-mail.")
        }
      });
  };

    
  return (    
    <Grid container direction="column" alignItems="center" justifyContent="center" >
      <TextField
        variant="outlined"
        label="Wpisz tutaj nazwę użytkownika"
        fullWidth
        style={{ marginBottom: "1em" }}
        inputProps={{
          style: { height: 30, width: 400 }
        }}
        value ={username}
        onChange = {(event) => setUsername(event.target.value)}
      />
      <TextField
        variant="outlined"
        label="Wpisz tutaj nowy email"
        fullWidth
        style={{ marginBottom: "1em" }}
        inputProps={{
          style: { height: 30, width: 400 }
        }}
        value={email}
        onChange = {(event) => setEmail(event.target.value)}
      />
      <Button size="large" variant="contained" color="primary" onClick={()=>{handleEmailChange()}}>
        ZMiEŃ
      </Button>
      <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity={save ? "success" : "error"}
        message={alertMessage}
      />
    </Grid>
  );
};
