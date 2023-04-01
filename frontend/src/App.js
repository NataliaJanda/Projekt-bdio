import React, { useState} from 'react';
import NoteActions from './NoteActions';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import SortSelector from './SortSelector';
import {Box} from '@mui/material';
import DeletePopup from "./DeletePopup";



const App = () => {
  // Stan dla wybranego języka
  const [language, setLanguage] = useState('Standardowy');
  // Stan dla notatek
  const [notes, setNotes] = useState([]);
  // Stan sprawdzający, czy edytor jest otwarty
  const [editorOpen, setEditorOpen] = useState(false);
  // Stan dla edytowanej notatki
  const [editingNote, setEditingNote] = useState(null);
  // Stan dla sortowania notatek
  const [sortBy, setSortBy] = useState('modified');
  // Stan dla okna i id notatki
  const [popupOpen, setPopupOpen] = useState({
    show: false,
    id: null,
  });

  // Funkcja do dodawania notatki
  const addNote = () => {
  
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
      language,
    };
    openEditor(newNote);
    setNotes([...notes, newNote]);
        
  };

  //funkcja ustawiająca id notatki do usunięcia
  const popupOpenl = (id) => {
    setPopupOpen({
      show: true,
      id,
    });
  };

  //funkcja usuwająca notatkę
  const handleDeleteTrue = () => {
    if (popupOpen.show && popupOpen.id) {
      setNotes(notes.filter((note) => note.id !== popupOpen.id));
      setPopupOpen({
        show: false,
        id: null,
      });
    }
  };


  // Funkcja do aktualizacji notatki
  const updateNote = (id, title, content) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      )
    );
  };


  // Funkcja do otwierania edytora notatek
  const openEditor = (note) => {
    setEditingNote(note);
    setEditorOpen(true);
  };


  // Funkcja do zamykania edytora notatek
  const closeEditor = () => {
    setEditorOpen(false);
    setEditingNote(null);
  };

  //zamykanie popupu usuwającego
  const closePopup = () => {
    setPopupOpen(false);
  };


  return (
    <>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={1}
      >
        <Box flexGrow={1} flexShrink={1}>
          <NoteActions addNote={addNote}/>
          </Box>
        <Box marginRight={1} marginTop={1}>
          <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
        </Box>
      </Box>
      <NoteList
        notes={notes}
        deleteNote={popupOpenl}
        updateNote={updateNote}
        openEditor={openEditor}
      />
      {editingNote && (
        <NoteEditor

          open={editorOpen}
          note={editingNote}
          handleClose={closeEditor}
          updateNote={updateNote}
          language={language}
          setLanguage={setLanguage}
        />
      )}

      {popupOpen.show &&(<DeletePopup
              open={popupOpenl}
              handleClose={closePopup}
              doIt ={handleDeleteTrue}
      />)
      }
    </>
    

    
  );
};

export default App;
