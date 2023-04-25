import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeToggle from './DarkModeToggle';
import NoteActions from './NoteActions';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';
import SortSelector from './SortSelector';
import { Box } from '@mui/material';
import DeletePopup from './DeletePopup';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteLanguages, setNoteLanguages] = useState({});
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [sortBy, setSortBy] = useState('modified');
  const [popupOpen, setPopupOpen] = useState({
    show: false,
    id: null,
  });
  const [darkMode, setDarkMode] = useState(false); // Stan dla trybu ciemnego
  const [isNewNote, setIsNewNote] = useState(false);
  const [user, setUser] = useState(null);

  // Pobieranie tokenu autoryzacji dla uzytkownika
useEffect(() => {
  const loggedInUserToken = localStorage.getItem("authToken");
  if (loggedInUserToken) {
    setUser({ authToken: loggedInUserToken });
    //console.log(loggedInUserToken); 
  }
}, []);

//Pobieranie notatek z bazy danych 
const refreshNotes = () => {
  fetch("http://localhost:8090/api/v2/Notes", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.authToken // Dodaj nagłówek z tokenem
    },
  })
    .then(response => response.json())
    .then(data => {
      setNotes(data);
      const newNoteLanguages = data.reduce((acc, note) => {
        acc[note.id] = note.category.name;
        return acc;
      }, {});
      setNoteLanguages(newNoteLanguages);
    })
    .catch(error => console.error(error));
};

//Odswiezanie notatki(API)
useEffect(() => {
  if (user) {
    refreshNotes();
  }
}, [user]);


//Funckja oblugi ciemnego i jasnego motywu
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };


//Funkcja dodawania nowych notatek
  const addNote = (note) => {
    fetch("http://localhost:8090/api/v2/Notes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.authToken,
      },
      body: JSON.stringify(note),
    })
      .then(response => response.json())
      .then(data => {
        refreshNotes();
        setNotes([...notes, data]);
      })
      .catch(error => console.error(error));
  };


  //Funkcja do usuwania notatki
  const handleDeleteTrue = (id) => {
    if (popupOpen.show && popupOpen.id) {
      fetch("http://localhost:8090/api/v2/Notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + user.authToken,
        },
        body: JSON.stringify({ id: popupOpen.id }),
      }).then(() => {
        refreshNotes();
        setNotes(notes.filter((note) => note.id !== popupOpen.id));
        setPopupOpen({
          show: false,
          id: null,
        });
      });
    }
  };
  //Funckcja do aktualizacji notatki
  const updateNote = (id, title, content, language) => {
    const noteToUpdate = {
      id,
      title,
      content,
      accountId: null,
      modificationDate: "",
      url_address: `http://example.com/example-note-${id}`,
      favorite: false,
      category: {
        category_id: 1,
        name: language || "plaintext",
      },
    };
    
    console.log("noteToUpdate:", noteToUpdate); 
    fetch("http://localhost:8090/api/v2/Notes", {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.authToken,
      },
      body: JSON.stringify(noteToUpdate),
    })
      .then(response => response.json())
      .then(() => {
        refreshNotes();
      })
      .catch(error => console.error(error));
      
    setNotes(notes.map((note) => (note.id === id ? { ...note, title, content} : note)));
    if (language) {
      setNoteLanguages({ ...noteLanguages, [id]: language });
    }
  };

  //Funkcja ootwierajaca pole edycyjne notatki
  const openEditor = (note, isNew = false) => {
    setIsNewNote(isNew);
    setEditingNote(note);
    setEditorOpen(true);
    
  };

  //Funkcja zamykajca pole edycyjne notatki
    const closeEditor = () => {
    setEditorOpen(false);
    setEditingNote(null);
    };

  //Popup open (usuwanie notatki)
  const popupOpenl = (id) => {
    setPopupOpen({
      show: true,
      id: id,
    });
  };

  //Popup close (usuwanie notatki)
    const closePopup = () => {
    setPopupOpen({
    show: false,
    id: null,
    });
    };
    

  // Kolory dla trybu jasnego i ciemnego wraz z komponentami
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
            backgroundColor: darkMode ? "#121212" : "#fff", //tło 
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
            <NoteActions addNote={() => openEditor({ id: Date.now(), title: '', content: '', language: 'plaintext' }, true)} />
          </Box>
          <Box marginRight={1} marginTop={1}>
            <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
          </Box>
          <DarkModeToggle darkMode={darkMode} handleDarkModeChange={handleDarkModeChange} />
        </Box>
        <NoteList
          notes={notes}
          sortBy={sortBy}
          noteLanguages={noteLanguages}
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