import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOptions({ options }) {

  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <FormControl size="small" sx={{
        minWidth: "90px"
    }}>
    <InputLabel id="demo-simple-select-label">Select</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      label="Select One"
      onChange={handleChange}
    >
      {options.map(option=><MenuItem key={option} value={option}>{option}</MenuItem>)}
    </Select>
  </FormControl>
  );
}