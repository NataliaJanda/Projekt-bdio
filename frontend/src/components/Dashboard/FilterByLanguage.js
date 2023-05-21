import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Komponent do filtrowania notatek według języka
const FilterByLanguage = ({ selectedLanguage, setSelectedLanguage, languages }) => {
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="language-select-label">Język</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        label="Language" 
      >
        {languages.map((language) => (
          <MenuItem key={language.value} value={language.value}>
            {language.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterByLanguage;
