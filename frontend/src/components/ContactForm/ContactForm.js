import {OutlinedInput,InputLabel,FormControl,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField} from '@mui/material';
import { useState} from 'react';
import MuiAlert from "../AlertMUI/MuiAlert";
const apiUrl = process.env.REACT_APP_API_URL;

const ContactForm = ({open, handleClose}) => {
    const [topic,setTopic] = useState("")
    const [content, setContent] = useState("");
    const [emailValue,setEmailValue] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [messagee, setMessage] = useState(false);

    const handleAlertOpen = (message) => {
      setAlertMessage(message);
      setOpenAlert(true);
    };
    
    const handleAlertClose = () => {
      setAlertMessage('');
      setOpenAlert(false);
    };
  
    const data = {
      from:emailValue,
      subject:topic,
      message:content
    };
    
   
    const handleSend = () => {
        fetch(apiUrl + '/v1/send-email', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("authToken")
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          if(response.status === 403) {
            throw new Error("Access forbidden");
          }
          if(response.status === 200) {
            setContent("");
            setTopic("");
            setEmailValue("");
            throw "Success";
          }
          return response.json();
        })
        .catch(error => {
          if(error.message === "Access forbidden") {
            handleAlertOpen("Coś poszło nie tak.");
          }
          else if (error === "Success") {
            setMessage(true);
            handleAlertOpen("Pomyślnie wysłano wiadomość");
            setTimeout(() => {
              handleClose();
            }, 1000); 
          }});
      };
      
return (
  <>
  <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
            PaperProps={{
              style: {
                height: '80%',
              },
            }}
        >
      <DialogTitle>
        Formularz Kontaktowy
      </DialogTitle>
      <DialogContent>
      <TextField
          label="Email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Temat"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="editor">Treść</InputLabel>
          <OutlinedInput
            id="editor"
            label="Treść"
            multiline
            margin="none"
            fullWidth
            rows={20}
            onChange={(e) => setContent(e.target.value)}
            inputProps={{
              value: content,
              style: { minHeight: '50px' },
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button size="large" variant="contained" onClick={handleClose} color="error">
          Anuluj
        </Button>
        <Button size="large" variant="contained" onClick={handleSend} color="primary">
          Wyślij
        </Button>
      </DialogActions>
    </Dialog>
    <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity={messagee ? 'success' : 'error'}
        message={alertMessage}
      />
    </>
    );
};
export default ContactForm;
