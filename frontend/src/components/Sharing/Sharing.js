import {Typography,Box, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox } from '@mui/material';
import { useState } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import FaderName from '../Fader/FaderName';
import useApi from '../Dashboard/useApi';

const apiUrl = process.env.REACT_APP_API_URL;
const urlObject = new URL(apiUrl);
const baseUrl = urlObject.origin + "/components/share/";

const styles = {
 Text: {
    fontSize: '21px',
  },
};


const Sharing = ({ open, handleClose, note,  setNotes, setNoteLanguages }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [urlValue, setUrlValue] = useState(note.url_address);
  const [nameOccupied,setNameOccupied] = useState(false);
  const accountNameLocal = localStorage.getItem('loginName');
  const { refreshNotes } = useApi();

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
      if(response.status === 200)
      {
        try {
          const newUrl = baseUrl + urlValue;
          navigator.clipboard.writeText(newUrl);
          console.log("Link skopiowany do schowka.");
        } catch (err) {
          console.error("Błąd podczas kopiowania notatki do schowka:", err);
        }
        handleClose();
        window.location.href = '/dashboard'
      }
      if (response.status === 400) {
          setNameOccupied(true);
      }
      return response.json();
    })
    .then(responseData => {
      const NoteResponse = responseData;
      exportNoteResponse(NoteResponse);
    })
    .catch(error => {
      console.error(error);
    });
    
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle  style={styles.Text}>
        <IosShareIcon/>Udostępnij Notatkę
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{baseUrl}</Typography>
        <TextField
          label="Pole edycji adresu"
          value={urlValue}
          onChange={handleUrlChange}
          disabled={!isEditable}
          error={nameOccupied}
        />
        <FormControl>
          <Checkbox
            checked={isEditable}
            onChange={handleToggleEdit}
          />
          <Typography>Edytuj</Typography>
        </FormControl>
      </DialogContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>
      {nameOccupied && <FaderName/>}
      </Box>
      <Box display="flex" justifyContent="center" width="100%">
      <DialogActions>
        <Button size="large" variant="contained" onClick={handleClose} color="error">
          Anuluj
        </Button>
        <Button size="large" variant="contained" onClick={handleShare} color="primary">
          Udostępnij
        </Button>
      </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Sharing;
export const exportNoteResponse = (NoteResponse) => {
  return;
};