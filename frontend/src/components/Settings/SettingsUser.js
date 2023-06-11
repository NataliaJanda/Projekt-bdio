import React,{useState} from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Tabs, Tab, Grid } from '@mui/material';
import ChangeEmail from './EmailForm';
import ChangePassword from './ChangePassword';
import CloseIcon from '@mui/icons-material/Close';

const SettingsUser = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            height: '30%',
          },
        }}
      >
        <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Ustawienia
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Zmień hasło" />
            <Tab label="Zmień E-mail" />
          </Tabs>
          {activeTab === 0 && (
            <ChangePassword />
          )}
          {activeTab === 1 && (
            <Grid>
             <ChangeEmail/>
             </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingsUser;
