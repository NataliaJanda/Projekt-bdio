import React from "react";
import "./styles.css";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { useState } from "react";

export default function Login() {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh"  }}
      spacing={5}
    >
      <Grid item>
        <Typography variant="h5" color="primary">
            Logowanie
        </Typography>
      </Grid>
      <Grid item style={{ border: "0.2px solid gray" }}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}



const LoginForm = () => {
  const [emailValue,setEmailValue] = useState("");
  const [passValue,setPassValue] = useState("");
  const data = {
    user_name:"mod",
    email:{emailValue},
    password:{passValue}
  };
  console.log(data)

  const handleLogin = () => {
 
    fetch('http://localhost:8090/api/v1/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
  
  }

  return (
    
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <TextField
        variant="outlined"
        label="Email"
        fullWidth
        style={{ marginBottom: "1em" }}
        value={emailValue}
        onChange = {(event) => setEmailValue(event.target.value)}
      />
      <TextField
        variant="outlined"
        label="Hasło"
        fullWidth
        style={{ marginBottom: "1em" }}
        type="password"
        value={passValue}
        onChange = {(event) => setPassValue(event.target.value)}
      />
      <Button size="large" variant="contained" color="primary" onClick={handleLogin}>
        ZALOGUJ SIĘ
      </Button>
    </Grid>
  );
};
