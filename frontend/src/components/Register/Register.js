import React, { useState } from "react";
import "./styles.css";
import { Radio,Grid, TextField, Button, Typography, FormControl,FormLabel,RadioGroup,FormControlLabel } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FaderEmail from "../Fader/FaderEmail";
import FaderName from "../Fader/FaderName";
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "100vh"  }}
      spacing={5}
      className="fade-in-out"
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
  const [selectedValue, setSelectedValue] = useState('Standardowy');
  const navigate = useNavigate();
  const [userNameError, setUserNameError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  const [confirmPassValue, setConfirmPassValue] = useState('');
  const [err,setErr] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [nameExists,setNameExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const apiUrl = process.env.REACT_APP_API_URL;



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
    password:passValue,
    accountTypeName:selectedValue
  };
  
  const handleChange =(event) => {
    setSelectedValue(event.target.value)
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
      return;
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
      return;
    }

    if (!passValue || passValue.length < 8) {
      setPassError(true);
      return;
    } else {
      setPassError(false);
    }
    
    setIsLoading(true);

    fetch(apiUrl + '/v1/auth/register', {
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
      if(response.status === 400) {
        return response.json().then(data => {
          if(data.message.includes("Name already exists")) {
            throw new Error("Name already exists");
          }
          if(data.message.includes("Email already exists")) {
            throw new Error("Email already exists");
            
          }
          throw new Error("Bad request");
        });
      }
      return response.json();
    })
    .then(data => {
      if (data?.token) {
        setTimeout(() => {
          navigate('/components/RegisterSuccess');
        }, 1500);
      }
    })
    .catch(error => {
      if(error.message === "Access forbidden") {
        alert("Access forbidden");
      }
      if(error.message === "Name already exists") {
        setEmailExists(false);
        setNameExists(true);

        
      }
      if(error.message === "Email already exists") {
        setEmailExists(true);
        setNameExists(false);
      }
    })
    .finally(() => {
      setIsLoading(false);
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
        error={userNameError || nameExists}
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
        error = {err || emailExists }

        
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
          <span style={{ color: "red" }}>
              Hasło musi mieć co najmniej 8 znaków
          </span>
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

    <FormControl component="fieldset" style={{ marginBottom: "1em" }}>
      <FormLabel component="legend">Typ konta</FormLabel>
      <RadioGroup
        aria-label="account-type"
        name="account-type"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Standardowy"
          control={<Radio />}
          label="Standardowy"
        />
        <FormControlLabel
          value="Premium"
          control={<Radio />}
          label="Premium"
        />
      </RadioGroup>
    </FormControl>

    <Button size="large" variant="contained" color="primary" onClick={handleRegister}>
        ZAREJESTRUJ SIĘ
      </Button>
      {isLoading && <CircularProgress />}
      {emailExists && <FaderEmail />}
      {nameExists && <FaderName />}
    </Grid>
  );
  }