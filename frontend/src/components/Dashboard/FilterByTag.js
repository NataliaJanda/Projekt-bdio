import React, { useState } from 'react';
import {Autocomplete, Checkbox,ListItemText,TextField,IconButton,Menu,MenuItem,Box,} from '@mui/material';
import { Tag } from '@mui/icons-material'; 

// Komponent do filtrowania notatek według tagów
const FilterByTag = ({ tags, selectedTags, setSelectedTags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

// Funkcja obsługująca zmianę wyszukiwanego terminu
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

// Funkcja obsługująca zmianę wybranych tagów
  const handleSelectedTagsChange = (event, values) => {
    setSelectedTags(values);
  };

// Funkcja obsługująca kliknięcie ikony Tag  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

// Funkcja zamykająca menu  
  const handleClose = () => {
    setAnchorEl(null);
  };

// Filtruje listę tagów na podstawie bieżącego wyszukiwanego terminu  
const filteredTags = tags ? tags.filter((tag) =>
tag && tag.includes(searchTerm)
) : [];

/*const filteredTags = tags.filter((tag) =>
    tag.includes(searchTerm)
  );*/

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Tag />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Box width={200}>
            <Autocomplete
              multiple
              value={selectedTags}
              onChange={handleSelectedTagsChange}
              options={filteredTags}
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option} />
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search tags"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  autoFocus
                />
              )}
            />
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FilterByTag;
