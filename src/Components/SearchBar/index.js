import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBar = (props) => {

    const {plants, search, handleSearch} = props;
    
    return (
      <Autocomplete
        disablePortal
        value={search}
        onChange={handleSearch} 
        id="searchBar"
        options={plants}
        getOptionLabel={(option)=>(option.name ? option.name : '')}
        sx={{ width: 350 }}
        renderInput={(params) => <TextField {...params} label="Tapez votre recherche ..."/>}
      />
    )
}

export default SearchBar