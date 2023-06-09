import {IconButton,Typography,Box, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox } from '@mui/material';
import { useState } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from '@mui/icons-material/Close'
import MuiAlert from "../AlertMUI/MuiAlert";


const apiUrl = process.env.REACT_APP_API_URL;
const urlObject = new URL(apiUrl);
const baseUrl = urlObject.origin + "/components/share/";

function unsecuredCopyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}

const copyToClipboard = (content) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(content);
  } else {
    unsecuredCopyToClipboard(content);
  }
};

const Sharing = ({ open, handleClose, note }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [urlValue, setUrlValue] = useState(note.url_address);
  const [nameOccupied,setNameOccupied] = useState(false);
  const accountNameLocal = localStorage.getItem('loginName');
  const nameRegex = /^[^\s!@#$%^&*()_+=]+$/;
  const [errorName, setErrorName] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };
  
  const handleAlertClose = () => {
    setAlertMessage('');
    setOpenAlert(false);
  };

  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleUrlChange = (event) => {
    setUrlValue(event.target.value);
  };

  const currentDate = new Date().toISOString();
  const data = {
    id: note.id,
    title: note.title,
    content: note.content,
    modificationDate: currentDate,
    accountId: null,
    accountName: accountNameLocal,
    tags: note.tags,
    url_address: urlValue,
    favorite: note.favorite,
    category: {
      category_id: 1,
      name: note.selectedLanguage || 'plaintext',
    }
  };

  const handleShare = () => {
    if (nameRegex.test(urlValue)) {
      setErrorName(false);
    } else {
      handleAlertOpen("Niepoprawna nazwa URL!");
      setErrorName(true);
      return;
    }
  
    fetch(apiUrl + "/v2/Notes", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 403) {
          throw new Error("Access forbidden");
        }
        if (response.status === 200) {
          const newUrl = baseUrl + urlValue;
          copyToClipboard(newUrl);          
          setTimeout(() => {
            window.open(newUrl, '_blank')
            handleClose();
            window.location.href = '/dashboard';
          }, 1500);
          throw new Error("Success");
        }
        if (response.status === 400) {
          setNameOccupied(true);
          handleAlertOpen("Link jest już zajęty!");
        }
        return response.json();
      })
      .then(responseData => {
        const NoteResponse = responseData;
        exportNoteResponse(NoteResponse);
      })
      .catch(error => {
        if(error.message === "Success") {
          handleAlertOpen("Link jest już aktywny.")
        }
        if(error.message === "Access forbidden") {
          handleAlertOpen("Coś poszło nie tak.")
        }
      });
  };;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
       <DialogTitle style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
       <div style={{ display: "flex", alignItems: "center" }}>
        <IosShareIcon />
        <span style={{ marginLeft: "0.5em" }}>Udostępnij Notatkę</span>
      </div>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
      <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{baseUrl}</Typography>
        <TextField
          label="Pole edycji adresu"
          value={urlValue}
          onChange={handleUrlChange}
          disabled={!isEditable}
          error={nameOccupied || errorName}
        />
        <FormControl>
          <Checkbox
            checked={isEditable}
            onChange={handleToggleEdit}
          />
          <Typography>Edytuj</Typography>
        </FormControl>
      </DialogContent>
      <Box display="flex" justifyContent="center" width="100%">
      <DialogActions>
        <Button size="large" variant="contained" onClick={handleShare} color="primary">
          Udostępnij
        </Button>
      </DialogActions>
      </Box>
      <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity={nameOccupied ? 'error':'success'}
        message={alertMessage}
      />
    </Dialog>
  );
};

export default Sharing;
export const exportNoteResponse = (NoteResponse) => {
  return;
};
