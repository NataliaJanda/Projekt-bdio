import React, { useState } from "react";
import "./styles.css";
import { Radio,Grid, TextField, Button, Typography, FormControl,FormLabel,RadioGroup,FormControlLabel } from "@material-ui/core";
import { useNavigate } from "react-router-dom";



export default function Register() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh"  }}
      spacing={5}
    >
      <Grid item>
        <Typography variant="h5" color="primary">
            Stwórz swoje konto
        </Typography>
      </Grid>
      <Grid item style={{ border: "0.2px solid gray" }}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
}

const RegisterForm = () => {
  const [passValue,setPassValue] = useState("");
  const [emailValue,setEmailValue] = useState("");
  const [userNameValue,setUserNameValue] = useState("");
  const [typeOfAccount,setTypeOfAccount] = useState("");
  const navigate = useNavigate();
  
  const data = {
    user_name:userNameValue,
    email:emailValue,
    password:passValue
  };
  
  const handleChange =(event) => {
    setTypeOfAccount(event.target.value);
  }

  const handleRegister = () => {
        
      fetch('http://localhost:8090/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        if (data?.token) {
          navigate('/components/login');
          
        }
      })
      .catch(error => console.error(error))
    }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
           <TextField
        variant="outlined"
        label="Nazwa użytkownika"
        fullWidth
        style={{ marginBottom: "1em" }}
        value = {userNameValue}
        onChange = {(event) => setUserNameValue(event.target.value)}
      />
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
      <TextField
        variant="outlined"
        label="Potwierdź hasło"
        fullWidth
        style={{ marginBottom: "1em" }}
        type="password"
      />

    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rodzaj Konta</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Darmowe"
        name="radio-buttons-group"
      >
        <FormControlLabel value="0"  onChange={handleChange} control={<Radio />} label="Darmowe" />
        <FormControlLabel value="1"  onChange={handleChange} control={<Radio />} label="Premium" />
      </RadioGroup>
    </FormControl>

      <Button size="large" variant="contained" color="primary" onClick={handleRegister}>
        ZAREJESTRUJ SIĘ
      </Button>
    </Grid>
  );
  }