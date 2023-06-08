import React, { useState, useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MuiAlert from "../AlertMUI/MuiAlert";

// Komponent NoteActions pozwalajacy na dodawanie notatek
const NoteActions = ({ addNote, notes }) => {
  // Limit notatek
  const [limit, setLimit] = useState(null);
  // Ostrzeżenia o limicie notatek
  const [limitWarning, setLimitWarning] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };
  
  const handleAlertClose = () => {
    setAlertMessage('');
    setOpenAlert(false);
  };

  useEffect(() => {
    // Pobranie typu konta z localStorage
    const accountType = localStorage.getItem("typeAccount");
    if (accountType === "Standardowy") {
      setLimit(50);
    } else if (accountType === "Premium") {
      setLimit(null);
    } else {
      setLimit(25);
    }
  }, []);

  const handleAddNote = () => {
    if (limit && notes.length >= limit) {
      handleAlertOpen("Osiągnięto limit notatek. Nie można dodać więcej.");
      setLimitWarning(true);
    } else {
      addNote();
    }
  };

  return (
    <>
      {limitWarning}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddNote}
        style={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
      >
        <AddIcon />
      </Fab>
      <MuiAlert
        open={openAlert}
        onClose={handleAlertClose}
        severity='error'
        message={alertMessage}
      />
    </>
  );
};

export default NoteActions;
