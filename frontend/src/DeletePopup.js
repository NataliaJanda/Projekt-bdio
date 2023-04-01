import {Dialog,DialogTitle,DialogActions,Button,} from '@mui/material';


// Komponent Popup reprezentuje okno dialogowe
const DeletePopup = ({open, handleClose,doIt}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
            Czy na pewno chcesz usunąć notatkę?
            </DialogTitle>

            <DialogActions>
                <Button id = 'cancelButton' onClick={doIt} color="error">
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
