import React from "react";
import { MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

const languages = [
  { value: "plaintext", label: "Standardowy" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "csharp", label: "C#" },
  { value: "java", label: "Java" },
  { value: "markup", label: "HTML" },
];

// Funkcja obsługująca zmianę języka
const LanguageSelector = ({ language, onLanguageChange }) => {
  const handleChange = (event) => {
    onLanguageChange(event.target.value);
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