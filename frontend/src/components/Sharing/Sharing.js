import {Typography,Box, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Checkbox } from '@mui/material';
import { useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;
const urlObject = new URL(apiUrl);
const baseUrl = urlObject.origin + "/components/share/";

const Sharing = ({ open, handleClose, not }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [urlValue, setUrlValue] = useState(not.url_address);
  const accountNameLocal = localStorage.getItem('loginName');


  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleUrlChange = (event) => {
    setUrlValue(event.target.value);
  };

  const currentDate = new Date().toISOString();
  const data = {
    id: not.id,
    title: not.title,
    content: not.content,
    modificationDate: currentDate,
    accountId: null,
    accountName: accountNameLocal,
    tags: not.tags,
    url_address: urlValue,
    favorite: not.favorite,
    category: {
      category_id: 1,
      name: not.selectedLanguage || 'plaintext',
    }
  };
  
  const handleShare = () => {
    fetch(apiUrl + "/v2/Notes", {
      method: 'POST',
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
      if (response.status === 400) {
        return response.json().then(data => {
          throw new Error("Bad request");
        });
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
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Udostępnij Notatkę
      </DialogTitle>
      <DialogContent>
        <Typography>URL</Typography>
        Przykładowy link<br/>
        {baseUrl}<Typography sx={{ color: 'red', display: 'inline' }}>zmieniony-link</Typography>
      </DialogContent>
      <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography>{baseUrl}</Typography>
        <TextField
          label="Pole edycji adresu"
          value={urlValue}
          onChange={handleUrlChange}
          disabled={!isEditable}
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
};