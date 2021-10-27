import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from '../grammar/grammar';
import { configs, editCommandString, editOptionSelections, setConfig } from './commandsSlice';
import { themeColors } from '../style/styleConst';

export default function ActionInput() {
    const commands = useSelector(state=>state.commands);
    const activeSelection = useSelector(state=>state.display.activeSelection);
    const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(editCommandString({command: event.target.value,index:0}));
    dispatch(setConfig(configs[event.target.value]))
    dispatch(editOptionSelections({selection: commands.actionOptions.indexOf(event.target.value),index: 0}))
  };

  let filteredActions = commands.actionOptions
  if (activeSelection.type==="assistant"||activeSelection.type==="myData"){
    filteredActions = commands.actionOptions.filter(option=>option!=="note");
  }
  if (activeSelection.type!=="type") {
    filteredActions = filteredActions.filter(option=>option!=="assign")
  }
  if (activeSelection.type!=="instance") {
    filteredActions = filteredActions.filter(option=>option!=="add")
  }

  return (
    <FormControl size="small" sx={{
        minWidth: "90px",
        color: "white"
    }}>
    {/* <InputLabel id="demo-simple-select-label">Action</InputLabel> */}
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      // label="Action"
      value={commands.commandStrings[0]}
      onChange={handleChange}
      sx={{
        color: "white",
      }}
    >
      {filteredActions.map(option=><MenuItem 
        key={option} 
        value={option}
        sx={{
          color: "black"
        }}
      >{capitalize(option)}</MenuItem>)}
    </Select>
  </FormControl>
  );
}


