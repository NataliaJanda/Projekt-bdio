import React, { useState} from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeToggle from "../Dashboard/DarkModeToggle";
import { Box } from '@mui/material';
import Accounts from "./Accounts";

const AdminPage = () => {
    return (
    <>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"        >

          <Box >
          <Accounts/>
          </Box>

        </Box>
    </>
  );
};

export default AdminPage;