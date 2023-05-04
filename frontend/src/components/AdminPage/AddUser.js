import React, { useEffect, useState } from "react";
import "./styles.css";
import {Grid, TextField, Button, Typography,Container, Box, Select, MenuItem } from '@mui/material';
import { useNavigate,useLocation } from "react-router-dom";
import FaderEmail from "../Fader/FaderEmail";
import FaderName from "../Fader/FaderName";
import AdminSideMenu from "./AdminSideMenu";



export default function AddUser() {
    const [collapsed, setCollapsed] = useState(false);
  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    
    <>
    <Grid container direction="column" alignItems="center" justifyContent="center">
    <AdminSideMenu onDrawerToggle={handleDrawerToggle} />
    <Box ml={collapsed ? 3 : "240px"}>
        <Container maxWidth="xl">
            <AddForm />
        </Container>
    </Box>
    </Grid>
    </>
  );
}

const AddForm = () => {
  const [passValue,setPassValue] = useState("");
  const [emailValue,setEmailValue] = useState("");
  const [userNameValue,setUserNameValue] = useState("");
  const navigate = useNavigate();
  const [userNameError, setUserNameError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [passTouched, setPassTouched] = useState(false);
  const [confirmPassValue, setConfirmPassValue] = useState('');
  const [err,setErr] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [nameExists,setNameExists] = useState(false);
  const location = useLocation();
  const [option, setOption] = useState('');
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
    accountTypeName:option
  };
  
  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);   
  };


  const handleSubmit = (event) => {
    setConfirmPassValue(event.target.value);
  };

  const handleCancel = () => {
    navigate("/components/AdminPage")
  }

  const handleSave = () => {
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
    
    fetch(apiUrl + "/admin/accounts/add", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Accept": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken")
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
      if (data) {
        navigate("/components/adminpage");
        alert("Pomyślnie zapisano");
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
    });
    
    }

    const handleAccoountTypeName = (event) => {
        setOption(event.target.value);
    };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" marginTop="50%">
        <Typography variant="h5" color="primary">
            Dodaj użytkownika
        </Typography>
        <TextField
            variant="outlined"
            label="Nazwa użytkownika"
            fullWidth
            inputProps={{
            style: { height: 30, width: 600 }
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
            style={{ marginBottom: "1em" }}
            value={confirmPassValue}
            type="password"
            onChange={handleSubmit}
      />
    <Select value={option}  fullWidth style={{ marginBottom: "1em" }} onChange={handleAccoountTypeName}>
      <MenuItem value="Standardowy">Standardowy</MenuItem>
      <MenuItem value="Premium">Premium</MenuItem>
    </Select>

      <Box>
      <Button size="large" variant="contained" color="primary" onClick={handleSave} style={{ width: "70px", marginRight:"10px" }}>
        Zapisz
      </Button>
      <Button size="large" variant="contained" color="error" onClick={handleCancel} style={{ width: "70px"}}>
        Anuluj
      </Button>
      </Box>
      {emailExists && <FaderEmail />}
      {nameExists && <FaderName />}
    </Grid>
  );
  }