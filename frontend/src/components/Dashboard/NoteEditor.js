import React, { useState } from 'react';
import {OutlinedInput,InputLabel,FormControl,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Menu,MenuItem,IconButton,} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import LanguageSelector from './LanguageSelector';
import EditorWrapper from './EditorWrapper';
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

// Komponent NoteEditor reprezentuje okno edytora notatki
const NoteEditor = ({
  open,
  note,
  handleClose,
  updateNote,
  language,
  isNewNote, 
  addNote, 
  
}) => {
  function generateUniqueId() {
    return Math.floor(Math.random() * 1000000000);
  }
  // Tytułu i treści notatki
  const [title, setTitle] = useState(note.title || '');
  const [content, setContent] = useState(note.content || '');  
  // Menu notatki
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  //Funkcja do zapisywania zmian w notatce
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };
  
  const handleSave = () => {
    if (title) {
      const noteToUpdate = {
        id:1,
        title: title,
        content: content,
        accountId: null,
        modificationDate: "",
        url_address: `http://example.com/example-note-${generateUniqueId()}`,
        favorite: false,
        category: {
            category_id: 1,
            name: selectedLanguage || "plaintext",
        },
      };
      if (isNewNote) {
        addNote(noteToUpdate);
      } else {
        updateNote(note.id, title, content, selectedLanguage);
      }
      handleClose();
    } else {
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

  // Funkcje do obsługi jezyka
  const getPrismLanguage = (language) => {
    const lang = language || 'plaintext';
    return Prism.languages[lang] || Prism.languages.plaintext;
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
          <LanguageSelector language={selectedLanguage} noteId={note.id} onLanguageChange={handleLanguageChange} />

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
              inputComponent={EditorWrapper} 
              inputProps={{
                value: content,
                onValueChange: (value) => setContent(value),
                highlight: (code) =>
                Prism.highlight(
                  code || '',
                  getPrismLanguage(selectedLanguage),
                  selectedLanguage || 'plaintext'
                ),              
                style: { minHeight: '30rem' },
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