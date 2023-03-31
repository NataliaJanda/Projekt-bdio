import React, { useState } from "react";
import {Card,CardContent,Typography,CardActions,IconButton} from "@mui/material";
import { Edit, Delete, FileCopy, Star, StarBorder } from "@mui/icons-material";



// Komponent Note reprezentuje pojedynczą notatkę
const Note = ({ note, deleteNote, openEditor}) => {
  // Stan przechowujący informację, czy notatka jest oznaczona gwiazdką
  const [starred, setStarred] = useState(false);
  // Funkcja zmieniająca stan gwiazdki
  const handleStarClick = () => {
    setStarred(!starred);
  };

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
        <IconButton
          edge="end"
          color="default"
          onClick={(e) => {
            e.stopPropagation();
            handleStarClick();
          }}
          style={{
            position: 'absolute',
            top: '-3px',
            right: '10px',
            zIndex: 1,
          }}
        >
          {starred ? <Star /> : <StarBorder />}
        </IconButton>
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
