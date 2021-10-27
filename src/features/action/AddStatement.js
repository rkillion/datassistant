import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchType } from "../type/typesSlice";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { changeConfig, configs, setConfig } from "./commandsSlice";

export default function AddStatement() {
    const activeSelection = useSelector(state=>state.display.activeSelection);
    const typesFetched = useSelector(state=>state.types.allFetched);
    const config = useSelector(state=>state.commands.config);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [instanceValue, setInstanceValue] = useState('');
    const [instanceOptionStatus, setInstanceOptionStatus] = useState("not ready");

    let receiverDisplayName;

    if (activeSelection.type!=="instance") {
        receiverDisplayName = "";
    } else {
        receiverDisplayName = activeSelection.selection.name;
    }
    
    useEffect(()=>{
        activeSelection.selection.parent_path.map(type=>{
            let typeFullInfo = typesFetched.find(typeFetched=>type.id===typeFetched.id);
            if (!typeFullInfo) {
                dispatch(fetchType(type.id));
            }
        })
    }, [])

    let options = [];
    activeSelection.selection.parent_path.forEach(type=>{
        let typeFullInfo = typesFetched.find(typeFetched=>type.id===typeFetched.id);
        if (typeFullInfo) {
            let typesWithParents = typeFullInfo.granted_types.length===0 ? [] : typeFullInfo.granted_types.map(grantedType=>{
                let adjustedGrantedType = JSON.parse(JSON.stringify(grantedType));
                adjustedGrantedType.parent_id = type.id;
                return adjustedGrantedType;
            });
            options = [...options,...typesWithParents];
        }
    })

    // console.log("Options are:",options)

    function runAssignmentTypeChange(newValue) {
        setInstanceOptionStatus("not ready");
        let newConfig = {...configs.add};
        newConfig.type_a_id = newValue.parent_id;
        newConfig.type_b_id = newValue.id;
        newConfig.instance_a_id = activeSelection.selection.id;
        dispatch(setConfig(newConfig));
        let selectedType = typesFetched.find(type=>type.id===newValue.id);
        if (selectedType) {
            if (selectedType.instances.length>0){
                setInstanceOptionStatus("ready");
            } else {
                setInstanceOptionStatus("none")
            }
        } else {
            dispatch(fetchType(newValue.id))
            .then(data=>{
                if (data.payload.instances.length>0){
                    setInstanceOptionStatus("ready");
                } else {
                    setInstanceOptionStatus("none")
                }
            })
        }
    }

    function runInstanceChange(newInstance) {
        dispatch(changeConfig({key: "instance_b_id",value: newInstance.id}));
    }

    return (
        <>
        {`to ${receiverDisplayName}'s `}
        <Autocomplete
            disablePortal
            disableClearable
            size="small"
            options={options}
            getOptionLabel={(option) => option.title_plural}
            sx={{ 
                width: "200px",
                "& input": {
                    color: "white"
                },
                "& label": {
                    color: "white"
                }  
             }}
            // value={options[0]}
            onChange={(e,newValue)=>{
                runAssignmentTypeChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Select Field"/>}
         />
         :
         {instanceOptionStatus==="none" ? "No instances" : null}
         {instanceOptionStatus==="not ready"||instanceOptionStatus==="none" ? null : <Autocomplete
            disablePortal
            disableClearable
            size="small"
            options={typesFetched.find(type=>type.id===config.type_b_id).instances}
            getOptionLabel={(option) => option.name}
            sx={{ 
                width: "200px",
                "& input": {
                    color: "white"
                },
                "& label": {
                    color: "white"
                }  
            }}
            // value={options[0]}
            onChange={(e,newValue)=>{
                runInstanceChange(newValue);
            }}
            inputValue={instanceValue}
            onInputChange={(event, newInputValue) => {
                setInstanceValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Select Instance"/>}
         />}
        </>
    )
}