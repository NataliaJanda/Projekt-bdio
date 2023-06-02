import React, { useState } from 'react';
import {Card,CardContent,Typography,CardActions,IconButton} from "@mui/material";
import {Edit, Delete, FileCopy, Share} from "@mui/icons-material";
import StarButton from "./handleStar";
import Sharing from '../Sharing/Sharing';

// Komponent Note reprezentuje pojedynczą notatkę
const Note = ({ note, deleteNote, openEditor, updateNote }) => {
  const [starred, setStarred] = useState(note.favorite);
  const [sharePopup,setSharePopup] = useState(false);

  const handleStarClick = () => {
    setStarred(!starred);
    updateNote(note.id, note.title, note.content, note.category.name, note.modificationDate, !starred, note.tags);
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




  const handleShare = () => {
    setSharePopup({show: true});
  }
  const closePopupShare = () => {
    setSharePopup({show: false});
  }

  return (
    <>
    <Card>
      <CardContent style={{ minHeight: '150px', position: 'relative' }}>
          <StarButton starred={starred} handleStarClick={handleStarClick} />
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
        <IconButton onClick={handleShare}>
          <Share />
        </IconButton>
      </CardActions>
    </Card>
    {sharePopup.show && (
          <Sharing open={sharePopup.show} handleClose={closePopupShare} note={note} updateNote={updateNote} />)}
    </>
  );
};

export default Note;
