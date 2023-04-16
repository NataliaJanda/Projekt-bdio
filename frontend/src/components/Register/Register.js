import React, { useState } from "react";
import "./styles.css";
import { Radio,Grid, TextField, Button, Typography, FormControl,FormLabel,RadioGroup,FormControlLabel } from '@mui/material';
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
      <Grid item>
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
  const [userNameError, setUserNameError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  const [confirmPassValue, setConfirmPassValue] = useState('');
  const [err,setErr] = useState(false);

  const emailRegex =  /^[^@\s]+@[^\s@]+\.[^\s@]{1,}$/;

  const handlePassChange = (event) => {
    setPassValue(event.target.value);
    setPassTouched(true);
  };

  const handleBlur = () => {
    setPassTouched(true);
  };

  const data = {
    user_name:userNameValue,
    email:emailValue,
    password:passValue
  };
  
  const handleChange =(event) => {
    setTypeOfAccount(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    
  };


  const handleSubmit = (event) => {
    setConfirmPassValue(event.target.value);
  };

  const handleRegister = () => {
    if (passValue !== confirmPassValue) {
      alert('Hasła nie są takie same');
    }

    if (emailRegex.test(emailValue)) {
      setErr(false);
    } else {
      alert("Niepoprawny email!")
      setErr(true);
      return;
    }

    if (!userNameValue || /\s/g.test(userNameValue)) {
      setUserNameError(true);
      return
    }

    if (!passValue || passValue.length < 8) {
      setPassError(true);
      return;
    } else {
      setPassError(false);
    }
    
      fetch('http://localhost:8090/api/v1/auth/register', {
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
        return response.json();
      })
      .then(data => {
        if (data?.token) {
          navigate('/components/login');
          
        }
      })
      .catch(error => {
        if(error.message === "Access forbidden") {
          alert("Nazwa użytkownika lub E-mail jest zajęta.");
        }
      });
    }

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
           <TextField
        variant="outlined"
        label="Nazwa użytkownika"
        fullWidth
        inputProps={{
          style: { height: 30, width: 400 }
        }}
        style={{ marginBottom: "1em" }}
        value = {userNameValue}
        onChange = {(event) => setUserNameValue(event.target.value)}
        error={userNameError}
        helperText={userNameError ? "Pole nie może być puste oraz zawierać białych znaków" : ""}
      />
      <TextField
        variant="outlined"
        label="Email"
        fullWidth
        inputProps={{
          style: { height: 30, width: 400 },
          pattern: "^[^@\\s]+@[^\\s@]+\\.[^\\s@]{1,}$"
        }}
        style={{ marginBottom: "1em" }}
        value={emailValue}
        onChange={handleEmailChange}
        error = {err}
        
      />
      <TextField
        variant="outlined"
        label="Hasło"
        fullWidth
        inputProps={{
          style: { height: 30, width: 400 }
        }}
        style={{ marginBottom: "1em" }}
        type="password"
        value={passValue}
        onChange={handlePassChange}
        onBlur={handleBlur}
        error={passError}
        helperText={passTouched && passValue.length < 8 &&  (
          <Typography color="error">
            Hasło musi mieć co najmniej 8 znaków
          </Typography>
        )}
      />
      <TextField
        variant="outlined"
        label="Potwierdź hasło"
        fullWidth
        inputProps={{
          style: { height: 30, width: 400 }
        }}
        style={{ marginBottom: "1em" }}
        type="password"
        value={confirmPassValue}
        onChange={handleSubmit}
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