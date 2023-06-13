import React, { useState } from 'react';
import { Chip, TextField, IconButton, InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';  // Ikona dla przycisku "plus"

// Komponent TagInput reprezentuje pole do wprowadzania tagów
const TagInput = ({ tags, setTags }) => {
  // Stan lokalny dla wartości pola wprowadzania
  const [inputValue, setInputValue] = useState('');

  // Funkcja obsługująca zmianę wartości pola wprowadzania
  const handleTagChange = (e) => {
    setInputValue(e.target.value);
  };

  // Funkcja obsługująca wciśnięcie klawisza w polu wprowadzania
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Funkcja do dodawania tagów
  const addTag = () => {
    const newTag = inputValue.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setInputValue('');
  };

  // Funkcja obsługująca usuwanie tagów
  const handleTagDelete = (tagToDelete) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyDown = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <TextField
        label="Tagi"
        value={inputValue}
        onChange={handleTagChange}
        onKeyPress={handleTagKeyPress}
        fullWidth
        margin="normal"
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={addTag}>
                <AddCircleOutlineIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={handleTagDelete(tag)}
            style={{ marginRight: '4px', marginBottom: '4px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagInput;
