import { useState, useEffect } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
const useApi = () => {
  // Zainicjowanie stanów dla notatek, języków notatek, użytkownika i tymczasowych notatek
  const [notes, setNotes] = useState([]);
  const [noteLanguages, setNoteLanguages] = useState({});
  const [user, setUser] = useState(null);
  const [tempNotes, setTempNotes] = useState([]);
  const [tempNoteLanguages, setTempNoteLanguages] = useState({});

  // Sprawdzanie czy użytkownik jest zalogowany oraz obsługa tymczasowych notatek
  useEffect(() => {
    const loggedInUserToken = localStorage.getItem("authToken");
    if (loggedInUserToken) {
      setUser({ authToken: loggedInUserToken });
      console.log(loggedInUserToken);
    } else {
      setNotes(tempNotes);
      setNoteLanguages(tempNoteLanguages);
    }
  }, [tempNotes, tempNoteLanguages]);
  
  // Funkcja odświeżająca notatki
  const refreshNotes = () => {
    const accountNameLocal = localStorage.getItem("loginName");
    fetch(apiUrl + `/v2/${accountNameLocal}/Notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        const newNoteLanguages = data.reduce((acc, note) => {
          acc[note.id] = note.category.name;
          return acc;
        }, {});
        setNoteLanguages(newNoteLanguages);
      })
      .catch((error) => console.error(error));
  };

  // Odświeżanie notatek po zalogowaniu użytkownika
  useEffect(() => {if (user) {refreshNotes();}}, [user]);

  // Funkcja aktualizująca notatki
  const updateNoteApi = (noteToUpdate) => {
    if (!user) {
      setTempNotes((prevNotes) => {
        const index = prevNotes.findIndex((note) => note.id === noteToUpdate.id);
        if (index !== -1) {
          prevNotes[index] = noteToUpdate;
        }
        return prevNotes;
      });
      return;
    }
    fetch(apiUrl + "/v2/Notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.authToken,
      },
      body: JSON.stringify(noteToUpdate),
    })
      .then((response) => response.json())
      .then(() => {
        refreshNotes();
      })
      .catch((error) => console.error(error));
  };

  // Funkcja dodająca notatki
  const addNoteApi = (note) => {
    if (!user) {
      const newNote = {
        ...note,
        modificationDate: new Date().toISOString(),
      };
      setTempNotes((prevNotes) => [...prevNotes, newNote]);
      setTempNoteLanguages((prevNoteLanguages) => {
        return { ...prevNoteLanguages, [newNote.id]: newNote.category.name };
      });
      return;
    }
    fetch(apiUrl + "/v2/Notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.authToken,
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then(() => {
        refreshNotes();
      })
      .catch((error) => console.error(error));
  };
  
  // Funkcja usuwająca notatki
  const deleteNoteApi = (id) => {
    if (!user) {
        setTempNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        return;
      }
    fetch(apiUrl + "/v2/Notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.authToken,
      },
      body: JSON.stringify({ id }),
    })
      .then(() => {
        refreshNotes();
      })
      .catch((error) => console.error(error));
  };
  // Zwracanie obiektu z funkcjami i wartościami do wykorzystania w innych komponentach
  return { notes, noteLanguages, refreshNotes, updateNoteApi, addNoteApi, deleteNoteApi, setNotes, setNoteLanguages, tempNotes ,user};
};

export default useApi;
