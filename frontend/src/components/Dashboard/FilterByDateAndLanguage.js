import React from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { FilterList } from '@mui/icons-material';
import FilterByModificationDate from './FilterByModificationDate';
import FilterByLanguage from './FilterByLanguage';

// Komponent do filtrowania notatek według daty modyfikacji oraz języka
const FilterByDateAndLanguage = ({ startDate, endDate, setStartDate, setEndDate, selectedLanguage, setSelectedLanguage, languages }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

// Funkcja otwierająca menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

// Funkcja zamykająca menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterList />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Box width={320} display="flex" flexDirection="column">
            <FilterByModificationDate
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Box>
        </MenuItem>
        <MenuItem>
          <Box width={325} display="flex" flexDirection="column" mt={2}>
            <FilterByLanguage
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              languages={languages}
            />
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterByDateAndLanguage;
