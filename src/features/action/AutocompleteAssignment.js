import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTypes } from "../type/typesSlice";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { configs, setConfig } from "./commandsSlice";

export default function AutocompleteAssignment() {
    const dispatch = useDispatch();
    const assistant = useSelector(state=>state.datassistants.current);
    const types = useSelector(state=>state.types.all);
    const activeSelection = useSelector(state=>state.display.activeSelection);
    const config = useSelector(state=>state.commands.config);
    const [inputValue, setInputValue] = useState('');

    let options;
    
    useEffect(()=>{
        dispatch(fetchTypes(assistant.id));
    }, [])

    if (types.length===0) {
        options = [];
    } else {
        let singleTypes = types.map(type=>{
            let newType = JSON.parse(JSON.stringify(type));
            newType.singular = true;
            return newType
        });
        options = [...singleTypes,...types];
    }

    function runChange(newValue) {
        let newConfig = {...configs.assign};
        newConfig.type_a_id = activeSelection.selection.id;
        newConfig.action = newValue.singular ? "grants one" : "grants many";
        newConfig.type_b_id = newValue.id;
        dispatch(setConfig(newConfig));
    }

    // let fields = document.getElementsByClassName("MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd MuiAutocomplete-inputRoot css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root");
    // console.log(fields);

    return (
        <Autocomplete
            disablePortal
            disableClearable
            size="small"
            options={options}
            getOptionLabel={(option) => {
                if(option.singular) {
                    return option.title_singular
                } else {
                    return option.title_plural
                }
            }}
            style={{
                color: "white"
            }}
            sx={{ 
                '& input': {
                    color: "white",
                },
                '& label': {
                    color: "white"
                },
                width: "200px",
                // "& .MuiOutlinedInput-input": {color: "white"},
                // "& .MuiInputBase-root .MuiOutlinedInput-root": {color: "white"},
                // "&[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input:first-child": {color: "white"}
            }}
            // value={options[0]}
            onChange={(e,newValue)=>{
                runChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Select a Type" sx={{
                // "& .MuiInputBase-root .MuiOutlinedInput-root": {color: "white"},
                // "&[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input:first-child": {color: "white"}
            }}/>}
         />
    )
}