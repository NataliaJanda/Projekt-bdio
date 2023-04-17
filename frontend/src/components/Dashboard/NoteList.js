import React, { useState } from "react";
import Note from "./Note";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import SideMenu from "./SideMenu";

// Wyświetla listę notatek
const NoteList = ({ notes, deleteNote, updateNote, copyNote, openEditor, sortBy, noteLanguages }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Funkcja zmieniająca stan SideMenu
  const handleDrawerToggle = () => {
    setCollapsed(!collapsed);
  };

  // Funkcja sortująca notatki
  const sortNotes = () => {
    return notes.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'language') {
        const noteALanguage = noteLanguages[a.id] || a.language;
        const noteBLanguage = noteLanguages[b.id] || b.language;
        return noteALanguage.localeCompare(noteBLanguage);
      }
      return b.id - a.id;
    });
  };
  const sortedNotes = sortNotes();

  return (
    <>
      <SideMenu onDrawerToggle={handleDrawerToggle} />
      <Box ml={collapsed ? 3 : "240px"}>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="flex" width="auto" height="auto">
              <Grid container spacing={3}>
                {sortedNotes.map((note) => (
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
