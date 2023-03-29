import React from "react";
import {MenuItem,Select,FormControl,InputLabel,Box,} from "@mui/material";

// Opcje sortowania
const options = [
  { value: "title", label: "Tytuł" },
  { value: "modified", label: "Data modyfikacji" },
  { value: "language", label: "Język programowania" },
];

// Służy do wyboru sortowania
const SortSelector = ({ sortBy, setSortBy }) => {
  // Funkcja obsługująca zmianę wartości sortowania
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center">
      <FormControl fullWidth={false} variant="outlined" style={{ minWidth: "200px" }}>
        <InputLabel htmlFor="sort-by-label">Sortuj według</InputLabel>
        <Select
          labelId="sort-by-label"
          size="small"
          value={sortBy}
          onChange={handleChange}
          label="Sortuj według"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortSelector;
