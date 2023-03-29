import React from "react";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

const languages = [
  { value: "Standardowy", label: "Standardowy" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "Java", label: "Java" },
  { value: "C++", label: "C++" },
  { value: "C#", label: "C#" },
  { value: "PHP", label: "PHP" },
];

// Funkcja obsługująca zmianę języka
const LanguageSelector = ({ language, setLanguage }) => {
  const handleChange = (event) => {
    // Aktualizacja języka 
    setLanguage(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <FormControl fullWidth={false} variant="outlined" style={{ minWidth: "200px" }}>
        <InputLabel htmlFor="sort-by-label">Wybór języka</InputLabel>
        <Select
          labelId="sort-by-label"
          size="small"
          value={language}
          onChange={handleChange}
          label="Sortuj według"
        >
          {languages.map((languages) => (
            <MenuItem key={languages.value} value={languages.value}>
              {languages.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;