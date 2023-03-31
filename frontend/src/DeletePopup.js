import {Dialog,DialogTitle,DialogActions,Button,} from '@mui/material';
// Komponent Popup reprezentuje okno dialogowe
const DeletePopup = ({open, handleClose,}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
            <text>Czy na pewno chcesz usunąć notatkę?</text>
            </DialogTitle>

            <DialogActions>
                <Button id = 'cancelButton' onClick={handleClose} color="primary">
                    TAK
                </Button>
                <Button id = 'saveButton' onClick={handleClose} color="primary">
                    NIE
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default DeletePopup;
