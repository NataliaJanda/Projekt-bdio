import React,{ useState } from "react";
import "./styles.css";
import { Grid, TextField, Button } from '@mui/material';
import MuiAlert from "../AlertMUI/MuiAlert";

const apiUrl = process.env.REACT_APP_API_URL;

export default function ChangePass() {
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
        <PassForm />
      </Grid>
    </Grid>
  );
}


const PassForm= () => {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState(""); 
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [save,setSave] = useState(false); 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-])[a-zA-Z\d!@#$%^&*()-]{8,}$/;
  const userName = localStorage.getItem("loginName");
  const [errorPass,setErrorPass] = useState(false); 

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };
  
  const handleAlertClose = () => {
    setAlertMessage('');
    setOpenAlert(false);
  };

  const data = {
    nameUser: userName,
    password: pass
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handlePassChange();
    }
  };

  const setPassHandle = (event) => {
    setPass(event.target.value);
  };

  const handlePassChange = () => {
      if (!passwordRegex.test(pass)) {
        setErrorPass(true);
        handleAlertOpen('Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną małą literę, jedną cyfrę oraz znak specjalny.');
        return;
      }
      if (pass !== confirmPass) {
        setErrorPass(true);
        handleAlertOpen('Hasła nie są takie same!');
        return;
      }

    fetch(apiUrl + '/v2/accounts/changePassword', {
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
        if (response.status === 200) {
          setSave(false);
          throw new Error("Success");
        }
        return response.json();
      })
      .catch(error => {
        if (error.message === "Access forbidden") {
          setSave(true);
          handleAlertOpen("Coś poszło nie tak!");
        }
        else if( error.message === "Success"){
          setSave(false);
          setErrorPass(false);
          handleAlertOpen("Hasło zostało zmienione.");
        }
      });
  };

  return (    
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <TextField
        variant="outlined"
        label="Wpisz tutaj nowe hasło"
        fullWidth
        style={{ marginBottom: "1em" }}
        inputProps={{
          style: { height: 30, width: 400 },
          onKeyDown: handleKeyDown
        }}
        value={pass}
        onChange={setPassHandle}
        type="password"
      />
      <TextField
        variant="outlined"
        label="Potwierdź hasło"
        fullWidth
        style={{ marginBottom: "1em" }}
        inputProps={{
          style: { height: 30, width: 400 },
          onKeyDown: handleKeyDown
        }}
        value={confirmPass}
        type="password"
        onChange={(event) => setConfirmPass(event.target.value)}
      />
      <Button size="large" variant="contained" color="primary" onClick={()=>{handlePassChange()}}>
        ZMiEŃ
      </Button>
      <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity={(save || errorPass) ? "error" : "success"}
        message={alertMessage}
      />
    </Grid>
  );
};

