import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { changeConfig, editCommandString, editOptionSelections } from './commandsSlice';

export default function AutocompleteField({ positionIndex, options }) {
  const dispatch = useDispatch();
  let thisDisplayField = "name";
  const type = useSelector(state=>state.types.current);
  const display = useSelector(state=>state.display);
  const commands = useSelector(state=>state.commands);
  const assistant = useSelector(state=>state.datassistants.current)

  const theseOptions = [];
  
  options.forEach(option=>{
    let returnOption = JSON.parse(JSON.stringify(option))
    if (option.choose==="custom") {
      if (option.displayVariants&&option.displayVariants[display.path[display.path.length-1].id]) {
        theseOptions.push(returnOption.displayVariants[display.path[display.path.length-1].id])
      } else {
        theseOptions.push(returnOption);
      }
    } else if (option.choose==="type_singular") {
      thisDisplayField = "title_singular";
      switch (display.path[display.path.length-1].id) {
        case "assistant" :
          break;
        case "myData" :
          break;
        default :
          returnOption.display = type;
          theseOptions.push(returnOption);
      }
    }
  })

  const [inputValue, setInputValue] = useState('');

  return (
    <Autocomplete
      disablePortal
      size="small"
      id={`test`}
      options={theseOptions}
      getOptionLabel={(option) => option.display[thisDisplayField]}
      sx={{ width: "200px" }}
      value={theseOptions[commands.optionSelections[positionIndex]]}
      onChange={(e,newValue)=>{
        console.log(newValue);
        dispatch(editOptionSelections({selection: newValue.id,index: positionIndex}));
        if (newValue.set) {
          let keys = Object.keys(newValue.set);
          keys.forEach(key=>{
            dispatch(changeConfig({key: key,value: newValue.set[key]}))
          });
        }
        if (newValue.setToValue) {
          let keys = Object.keys(newValue.setToValue);
          keys.forEach(key=>{
            dispatch(changeConfig({key: key,value: newValue.display[newValue.setToValue[key]]}))
          });
        }
        if (newValue.command) {
          dispatch(editCommandString({command: newValue.command,index: positionIndex}))
        }
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}