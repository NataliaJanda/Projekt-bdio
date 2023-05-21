import React from 'react';
import { TextField } from '@mui/material';

// Komponent do filtrowania notatek według daty modyfikacji
const FilterByModificationDate = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <TextField
        label="Od"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Do"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default FilterByModificationDate;
