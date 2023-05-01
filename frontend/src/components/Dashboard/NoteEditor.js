import React, { useState, useEffect } from 'react';
import {OutlinedInput,InputLabel,FormControl,Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,Menu,MenuItem,IconButton,LinearProgress,Box,Typography,} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import LanguageSelector from './LanguageSelector';
import EditorWrapper from './EditorWrapper';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-java';
import './LanguageStyle.css';
import './NoteEditorStyle.css';
import TagInput from './TagInput';


// Komponent NoteEditor reprezentuje okno edytora notatki
const NoteEditor = ({
  open,
  note,
  handleClose,
  updateNote,
  language,
  isNewNote,
  addNote,
  favorite,
  user,
}) => {
  // Funkcja do generowania unikalnych identyfikatorów
  function generateUniqueId() {
    return Math.floor(Math.random() * 1000000000);
  }
  // Tytułu notatki
  const [title, setTitle] = useState(note.title || '');
  // Treści notatki
  const [content, setContent] = useState(note.content || '');
  // Menu notatki
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  // Jezyk notatki
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  // Data modyyfikacji notatki
  const [modificationDate] = useState(note.modificationDate || '');
  // Tagi notatki
  const [tags, setTags] = useState(note.tags || []);
  // Limit znakow
  const [charLimit, setCharLimit] = useState(null);
  // Ostrzeżenia o limicie znaków
  const [charLimitWarning, setCharLimitWarning] = useState(false);
  // Pobranie nazwy uzytkownika z localStorage
  const accountNameLocal = localStorage.getItem('loginName');

  useEffect(() => {
    // Pobranie typu konta z localStorage
    const accountType = localStorage.getItem('typeAccount');
    if (accountType === 'Standardowy') {
      setCharLimit(500);
    } else if (accountType === 'Premium') {
      setCharLimit(null);
    } else {
      setCharLimit(250);
    }
    if (content.length > charLimit && charLimit !== null) {
      setCharLimitWarning(true);
    } else {
      setCharLimitWarning(false);
    }
  }, [content]);
  
  //Funkcja do zmiany jezyka
  const handleLanguageChange = (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };

  // Funkcja do zapisywania zmian w notatce
  const handleSave = () => {
if (charLimitWarning) {
      alert('Przekroczyłeś dozwoloną ilość znaków!');
      return;
    }
    if (title) {
      const currentDate = !user ? new Date().toISOString() : modificationDate;
      const noteToUpdate = {
        id: generateUniqueId(),
        title: title,
        content: content,
        modificationDate: currentDate,
        accountId: null,
        accountName: accountNameLocal,
        tags,
        url_address: `http://example.com/example-note-${generateUniqueId()}`,
        favorite: favorite,
        category: {
          category_id: 1,
          name: selectedLanguage || 'plaintext',
        },
      };
      if (isNewNote) {
        console.log("new:", noteToUpdate);
        addNote(noteToUpdate);
      } else {
        console.log("Update:", noteToUpdate);
        updateNote(note.id, title, content, selectedLanguage, currentDate, favorite, tags);
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
  
  // Funkcja do wklejania treści ze schowka
  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setContent(`${content}${text}`);
    });
  };
  
  // Funkcja do obsługi skladni jezyka
  const getPrismLanguage = (language) => {
  const lang = language || 'plaintext';
  return Prism.languages[lang] || Prism.languages.plaintext;
  };
  
  // Funkcja do obsługi limitu znakow 
  const progressValue = () => {
    if (charLimit === null) return 100;
    return (content.length / charLimit) * 100;
  };
  
  // Funkcja do zmiany koloru paska limitu
  const progressColor = () => {
    if (charLimit === null || content.length <= charLimit) {
      return 'primary';
    }
    return 'secondary';
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
          <MenuItem>
            <TagInput tags={tags} setTags={setTags} />
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Udostepnij</MenuItem>
          <MenuItem onClick={handlePaste}>Wklej</MenuItem>
          <MenuItem>
            <LanguageSelector
              language={selectedLanguage}
              noteId={note.id}
              onLanguageChange={handleLanguageChange}
            />
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
      <Box sx={{ width: '90%', padding: '10px' }}>
        <Box
          sx={{ width: '50%', margin: '0 auto' }}
        >
          <LinearProgress
            variant="determinate"
            value={progressValue()}
            color={progressColor()}
            style={{ height: '4px' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-30px',
          }}
        >
          <Typography>
            {content.length}/{charLimit || '∞'}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );  
};

export default NoteEditor;    
