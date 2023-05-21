import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeToggle from './DarkModeToggle';
import NoteActions from './NoteActions';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import SortSelector from './SortSelector';
import { Box } from '@mui/material';
import DeletePopup from './DeletePopup';
import useApi from "./useApi";
import FilterByTag from './FilterByTag';
import FilterByDateAndLanguage from './FilterByDateAndLanguage';

const App = () => {
  const { notes, noteLanguages,user,updateNoteApi, addNoteApi, deleteNoteApi, setNotes, setNoteLanguages } = useApi();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [sortBy, setSortBy] = useState('modified');
  const [popupOpen, setPopupOpen] = useState({show: false,id: null,});
  const [darkMode, setDarkMode] = useState(false); 
  const [isNewNote, setIsNewNote] = useState(false);
  const [sfavorite] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const getUniqueTags = () => {
    const allTags = notes.flatMap((note) => note.tags);
    return [...new Set(allTags)];
  };

//Funkcja przełącza między trybem ciemnym i jasnym
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

//Funkcja dodaje nową notatkę
  const addNote = (note) => {
    addNoteApi(note);
    setNotes([note, ...notes]);
  };

//Funkcja usuwa notatkę po potwierdzeniu w popupie
  const handleDeleteTrue = (id) => {
    if (popupOpen.show && popupOpen.id) {
    deleteNoteApi(popupOpen.id);
    setNotes(notes.filter((note) => note.id !== popupOpen.id));
    setPopupOpen({
      show: false,
      id: null,
      });
    }
  };

//Funkcja aktualizuje notatkę po jej edycji
  const updateNote = (id, title, content, language,modificationDate,favorite,tags) => {
    const noteToUpdate = {
      id,
      title,
      content,
      tags,
      accountId: null,
      accountName:"test4321",
      modificationDate,
      url_address: `http://example.com/example-note-${id}`,
      favorite,
      category: {
        category_id: 1,
        name: language || "plaintext",
      },
      
    };
    console.log("noteToUpdate:", noteToUpdate);
    updateNoteApi(noteToUpdate);
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content, tags, favorite } : note)));

    if (language) {
      setNoteLanguages({ ...noteLanguages, [id]: language });
    }
  };
  
//Funkcja otwiera edytor notatek
  const openEditor = (note, isNew = false) => {
    setIsNewNote(isNew);
    setEditingNote(note);
    setEditorOpen(true);
  };

//Funkcja zamyka edytor notatek
  const closeEditor = () => {
    setEditorOpen(false);
    setEditingNote(null);
  };

//Funkcja otwiera popup do potwierdzenia usunięcia notatki
  const popupOpenl = (id) => {
    setPopupOpen({
      show: true,
      id: id,
    });
  };

//Funkcja zamyka popup do potwierdzenia usunięcia notatki
    const closePopup = () => {
    setPopupOpen({
    show: false,
    id: null,
    });
    };

// Konfiguracja motywu dla trybu jasnego i ciemnego
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2196f3",
      },
      secondary: {
         main: "#f50057",
       },
     },
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#121212" : "#fff", 
            borderRadius: 4, 
           },
        },
      },
       MuiInputLabel: {
         styleOverrides: {
           root: {
             color: darkMode ? "#fff" : "#000",
           },
         },
      },
      MuiSelect: {
         styleOverrides: {
           icon: {
             color: darkMode ? "#fff" : "#000",
           },
         },
       },
    },
  });

  const languages = [
    { value: 'All', label: 'Wszystkie' },
    { value: 'plaintext', label: 'Standardowy' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'csharp', label: 'C#' },
    { value: 'markup', label: 'Markup' },
    { value: 'java', label: 'Java' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        bgcolor={darkMode ? "grey.900" : "grey.100"}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={1}>
          <Box flexGrow={1} flexShrink={1}>
            <NoteActions addNote={() => openEditor({}, true)} notes={notes} />
          </Box>
          <Box marginRight={1} marginTop={1}>
            <FilterByDateAndLanguage
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              languages={languages}
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
            />
          </Box>
          <Box marginRight={1} marginTop={1}>
            <FilterByTag
              tags={getUniqueTags()}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </Box>
          <Box marginRight={1} marginTop={1}>
            <DarkModeToggle 
              darkMode={darkMode} 
              handleDarkModeChange={handleDarkModeChange} 
            />
          </Box>
          <Box marginRight={1} marginTop={1}>
            <SortSelector 
              sortBy={sortBy} 
              setSortBy={setSortBy} 
            />
          </Box>
        </Box>
        <NoteList
          notes={notes}
          sortBy={sortBy}
          noteLanguages={noteLanguages}
          deleteNote={popupOpenl}
          updateNote={updateNote}
          openEditor={openEditor}
          selectedTags={selectedTags} 
          selectedLanguage={selectedLanguage}
          startDate={startDate}
          endDate={endDate}
          showFavoritesOnly={showFavoritesOnly}
        />
        {editingNote && (
          <NoteEditor
            user={user}
            favorite={sfavorite}
            open={editorOpen}
            note={editingNote}
            handleClose={closeEditor}
            updateNote={updateNote}
            language={noteLanguages[editingNote.id] || "plaintext"}
            isNewNote={isNewNote}
            addNote={addNote}
          />
        )}
        {popupOpen.show && (
          <DeletePopup open={popupOpen.show} handleClose={closePopup} doIt={handleDeleteTrue} />
        )}
      </Box>
    </ThemeProvider>
  );
};
    
export default App;