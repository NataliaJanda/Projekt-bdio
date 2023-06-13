import React, { useState } from "react";
import Note from "./Note";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SideMenu from "./SideMenu";


const NoteList = ({ notes, deleteNote, updateNote, copyNote, openEditor, sortBy, noteLanguages, selectedTags, startDate, endDate, selectedLanguage, showFavoritesOnly }) => {

  // Stan określający, czy menu boczne jest zwinięte
  const [collapsed, setCollapsed] = useState(false);

  // Funkcja do przełączania zwinięcia menu bocznego
  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
  };

  // Funkcja do sortowania notatek
  const sortNotes = () => {
    return notes.sort((a, b) => {
      if (sortBy === 'title') {
        return (a.title || "").localeCompare(b.title || "");
      }
      if (sortBy === 'language') {
        const noteALanguage = noteLanguages[a.id] || a.language;
        const noteBLanguage = noteLanguages[b.id] || b.language;
        return (noteALanguage || "").localeCompare(noteBLanguage || "");
      }
      return new Date(b.modificationDate) - new Date(a.modificationDate);
    });
  };

  // Posortowane notatki
  const sortedNotes = sortNotes();

  // Filtrowanie notatek na podstawie wybranych tagów, dat oraz języka
  const filteredNotes = notes.filter((note) => {
    if (showFavoritesOnly && !note.favorite) {
      return false;
    }
    if (selectedTags.length > 0 && !selectedTags.every((tag) => note.tags.includes(tag))) {
      return false;
    }
    const noteDate = new Date(note.modificationDate);
    if (startDate && noteDate < new Date(startDate)) {
      return false;
    }
    if (endDate) {
      const endDatePlusOneDay = new Date(endDate);
      endDatePlusOneDay.setDate(endDatePlusOneDay.getDate() + 1);
      if (noteDate >= endDatePlusOneDay) {
        return false;
      }
    }
    if (selectedLanguage && selectedLanguage !== 'All' && (noteLanguages[note.id] || note.language) !== selectedLanguage) {
      return false;
    }
    return true;
  });

  return (
    <> 
      <SideMenu onDrawerToggle={handleDrawerToggle} />
      <Box ml={collapsed ? 6 : "240px"}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="flex" width="auto" height="auto">
              <Grid container spacing={3}>
              {sortedNotes
                .filter((note) => filteredNotes.includes(note))
                .map((note) => (
                  <Grid item key={note.id} xs={12} sm={6} md={4} lg={2.4}>
                    <Note
                      note={note}
                      deleteNote={deleteNote}
                      updateNote={updateNote}
                      copyNote={copyNote}
                      openEditor={openEditor}
                    />
                  </Grid>
                ))}
              </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NoteList;
