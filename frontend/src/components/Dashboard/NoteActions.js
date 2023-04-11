import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Komponent NoteActions pokazuje przycisk dodawania nowej notatki
const NoteActions = ({ addNote }) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={addNote}
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default NoteActions;
