import React from "react";
import {Card,CardContent,Typography,CardActions,IconButton} from "@mui/material";
import {Edit, Delete, FileCopy} from "@mui/icons-material";
import StarButton from "./handleStar";


// Komponent Note reprezentuje pojedynczą notatkę
const Note = ({ note, deleteNote, openEditor}) => {

  // Funkcja do kopiowania treści notatki do schowka
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(note.content);
      console.log("Notatka skopiowana do schowka.");
    } catch (err) {
      console.error("Błąd podczas kopiowania notatki do schowka:", err);
    }
  };



  return (
    <Card>
      <CardContent style={{ minHeight: '150px', position: 'relative' }}>
          <StarButton />
        <Typography variant="h6" gutterBottom>
          {note.title}
        </Typography>
        <Typography
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            backgroundColor:''
          }}
        >
          {note.content}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>

        <IconButton onClick={() => openEditor(note)}>
          <Edit />
        </IconButton>

        <IconButton onClick={() => deleteNote(note.id)}>
          <Delete />
        </IconButton>

        <IconButton onClick={handleCopyToClipboard}>
          <FileCopy />
        </IconButton>
      </CardActions>
    </Card>
  );
};



export default Note;
