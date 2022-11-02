import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterRegion = (props) => {

  const { regions, region, handleRegionChange } = props;

  if (!regions) return null;

  return (
    <Box sx={{ width: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Régions</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region}
          label="Région"
          onChange={handleRegionChange}
        >
          <MenuItem value="">Toutes les régions</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region.id} value={region.id}>{region.name}</MenuItem>
          ))};
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterRegion;