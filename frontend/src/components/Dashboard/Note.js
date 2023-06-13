import React, { useState } from 'react';
import {Card,CardContent,Typography,CardActions,IconButton} from "@mui/material";
import {Edit, Delete, FileCopy, Share} from "@mui/icons-material";
import StarButton from "./handleStar";
import Sharing from '../Sharing/Sharing';
import useApi from "./useApi";
// Komponent Note reprezentuje pojedynczą notatkę
const Note = ({ note, deleteNote, openEditor, updateNote }) => {
  const [starred, setStarred] = useState(note.favorite);
  const [sharePopup,setSharePopup] = useState(false);
  const {user,copyNoteApi } = useApi();
  const loggedIn = localStorage.getItem("isLoggedIn");

  const handleStarClick = () => {
    setStarred(!starred);
    updateNote(note.id, note.title, note.content, note.category.name, note.modificationDate, !starred, note.tags,note.url_address);
  };

  const handleAlertOpen = (message) => {
    setAlertMessage(message);
    setOpenAlert(true);
  };

  // Funkcja do kopiowania treści notatki do schowka
  const handleCopyToClipboard = () => {
    copyNoteApi(note.id);
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
        {user && (
          <IconButton onClick={handleCopyToClipboard}>
            <FileCopy />
          </IconButton>
        )}
        {loggedIn && (<IconButton onClick={handleShare}>
          <Share />
        </IconButton>)}
      </CardActions>
    </Card>
    {sharePopup.show && (
          <Sharing open={sharePopup.show} handleClose={closePopupShare} note={note}/>)}
    </>
  );
};

export default Note;