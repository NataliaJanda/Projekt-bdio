import React, { useState } from 'react';
import { Chip, TextField } from '@mui/material';

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
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  // Funkcja obsługująca usuwanie tagów
  const handleTagDelete = (tagToDelete) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
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
