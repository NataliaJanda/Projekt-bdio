import React, { useState } from 'react';
import {OutlinedInput,InputLabel,FormControl,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Menu,MenuItem,IconButton,} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import LanguageSelector from './LanguageSelector';
import Prism from 'prismjs';
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-java";
import './LanguageStyle.css';
import './NoteEditorStyle.css';
import Editor from 'react-simple-code-editor';

// Komponent NoteEditor reprezentuje okno edytora notatki
const NoteEditor = ({
  open,
  note,
  handleClose,
  updateNote,
  language,
  setLanguage,
}) => {
  // Tytułu i treści notatki
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  // Menu notatki
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  //Funkcja do zapisywania zmian w notatce
  const handleSave = () => {
    if(title)
    {
      
      updateNote(note.id, title, content);
      handleClose();
    }
    else
    {
      alert("Wpisz tytuł notatki!");
    }
  };

  // Funkcje do obsługi menu
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setContent(`${content}${text}`);
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        Edytuj notatkę
        <IconButton
          aria-label="Opcje notatki"
          aria-controls="note-options-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          edge="end"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="note-options-menu"
          anchorEl={menuAnchorEl}
          keepMounted
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Udostepnij</MenuItem>
          <MenuItem onClick={handlePaste}>Wklej</MenuItem>
          <MenuItem>
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </MenuItem>
        </Menu>
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            inputComponent={Editor}
            inputProps={{
              value: content,
              onValueChange: (value) => setContent(value),
              highlight: (code) =>
              Prism.highlight(
              code,
              Prism.languages[language || 'plaintext'],
              language || 'plaintext'
              ),
            style: { minHeight: '30rem', },
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button id="cancelButton" onClick={handleClose} color="primary">
          Anuluj
        </Button>
        <Button id="saveButton" onClick={handleSave} color="primary">
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NoteEditor;
