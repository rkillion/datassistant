import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
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

  function runChange(value) {
    dispatch(editOptionSelections({selection: value.id,index: positionIndex}));
    if (value.set) {
      let keys = Object.keys(value.set);
      keys.forEach(key=>{
        dispatch(changeConfig({key: key,value: value.set[key]}))
      });
    }
    if (value.setToValue) {
      let keys = Object.keys(value.setToValue);
      keys.forEach(key=>{
        dispatch(changeConfig({key: key,value: value.display[value.setToValue[key]]}))
      });
    }
    if (value.command) {
      dispatch(editCommandString({command: value.command,index: positionIndex}))
    }
  }

  useEffect(()=>{
    if (theseOptions.length>0) {
      let startValue = theseOptions[commands.optionSelections[positionIndex]]||theseOptions[0];
      runChange(startValue)
    }
  },[])

  useEffect(()=>{
    if (theseOptions.length>0) {
      let startValue = theseOptions[commands.optionSelections[positionIndex]]||theseOptions[0];
      runChange(startValue)
    }
  },[display])

  const [inputValue, setInputValue] = useState('');

  if (theseOptions.length<=0) {return null}
  return (
    <Autocomplete
      disablePortal
      disableClearable
      size="small"
      id={`test`}
      options={theseOptions}
      getOptionLabel={(option) => option.display[thisDisplayField]}
      sx={{ 
        width: "200px",
        color: "white",
        '& input': {
          color: "white",
      }, 
      }}
      value={theseOptions[commands.optionSelections[positionIndex]]||theseOptions[0]}
      onChange={(e,newValue)=>{
        runChange(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} sx={{
        color: "white"
      }}/>}
    />
  );
}