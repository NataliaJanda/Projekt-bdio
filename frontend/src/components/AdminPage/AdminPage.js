import React, { useState} from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DarkModeToggle from "../Dashboard/DarkModeToggle";
import { Box } from '@mui/material';
import Accounts from "./Accounts";

const AdminPage = () => {
  const [darkMode, setDarkMode] = useState(false);


  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2196f3",
      },
      secondary: {
        main: "#f50057",
      },
    },
    components: {
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#121212" : "#fff", 
            borderRadius: 4, 
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: darkMode ? "#fff" : "#000",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            color: darkMode ? "#fff" : "#000",
          },
        },
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          bgcolor={darkMode ? "grey.900" : "grey.100"}
        >
          <Box marginRight={1} marginTop={1}>
            <DarkModeToggle 
              darkMode={darkMode} 
              handleDarkModeChange={handleDarkModeChange} 
            />
          </Box>
          <Box >
          <Accounts/>
          </Box>

        </Box>
      </ThemeProvider>
    </>
  );
};

export default AdminPage;