import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterCategory = (props) => {

  const { categories, category, handleCategoryChange } = props;

  if (!categories) return null;

  return (
    <Box sx={{ width: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Catégories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Catégorie"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">Toutes les catégories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
          ))};
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterCategory;