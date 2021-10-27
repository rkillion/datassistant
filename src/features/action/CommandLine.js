import styled from 'styled-components';
import Button from '@mui/material/Button';
import CommandStatement from './CommandStatement';
import { useDispatch, useSelector } from 'react-redux';
import { postAdd, postAssignment, postNew, postNote } from './commandsSlice';
import { addCurrentInstance, addCurrentSubtype, addInstanceToAllFetchedTypes, replaceFetchedTypes } from '../type/typesSlice';
import { addInstance, addSubtype } from '../datassistant/datassistantsSlice';
import { addElementToActiveSelectionField, setActiveSelection } from '../view/displaySlice';
import { themeColors } from '../style/styleConst';

export default function CommandLine() {
    const config = useSelector(state=>state.commands.config)
    const assistant = useSelector(state=>state.datassistants.current)
    const type = useSelector(state=>state.types.current)
    const typesState = useSelector(state=>state.types)
    const activeSelection = useSelector(state=>state.display.activeSelection)
    const dispatch = useDispatch()

    function handleClick() {
        //you must add the current datassistant_id to the config before dispatch the fetch
        let thisConfig = JSON.parse(JSON.stringify(config));
        thisConfig.datassistant_id = assistant.id;
        if (config.make) {
            dispatch(postNew(thisConfig))
            .then(data=>{
                let newObject = data.payload;
                if (newObject.name) {
                    dispatch(addInstance(newObject));
                    dispatch(addInstanceToAllFetchedTypes(newObject));
                }
                if (newObject.parent_path.length===0&&newObject.title_singular) {
                    dispatch(addSubtype(newObject));
                } else {
                    if (newObject.parent_path[newObject.parent_path.length-1].id===type.id) {
                        if (newObject.name) {
                            dispatch(addCurrentInstance(newObject));
                        } else {
                            dispatch(addCurrentSubtype(newObject));
                        }
                    }
                }
            })
        } else if (config.isNote) {
            thisConfig.action_entry = "note";
            let valid = true;
            switch (activeSelection.type) {
                case "baseType" : 
                    thisConfig.reference = "base_type";
                    thisConfig.base_type_a_id = activeSelection.selection.id;
                    break;
                case "type" : 
                    thisConfig.reference = "type";
                    thisConfig.type_a_id = activeSelection.selection.id;
                    break;
                case "instance" : 
                    thisConfig.reference = "instance";
                    thisConfig.instance_a_id = activeSelection.selection.id;
                    break;
                default :
                    valid = false;
            }
            if (valid) {
                console.log(thisConfig);
                dispatch(postNote(thisConfig))
                .then(data=>{
                    let log = data.payload;
                    if(log.reference===activeSelection.type||(log.reference==="base_type"&&activeSelection.type==="baseType")) {
                        if (activeSelection.selection.id===log[`${log.reference}_a_id`]) {
                            dispatch(addElementToActiveSelectionField({field: "log_entries",element: log}));
                        }
                    }
                })
            }
        } else if (config.action_title==="grants one"||config.action_title==="grants many") {
            dispatch(postAssignment(thisConfig))
            .then(data=>{
                dispatch(replaceFetchedTypes(data.payload));
            });
        } else if (config.action_title==="has") {
            dispatch(postAdd(thisConfig))
            .then(data=>{
                if (activeSelection.selection.id===data.payload.id&&activeSelection.type==="instance") {
                    dispatch(setActiveSelection({type: "instance",selection: data.payload}));
                }
            })
        }
    }
    return (
        <CommandLineContainer>
            <CommandStatement />
             <Button variant="contained" sx={{
                margin: "5px",
                background: themeColors.lightAccent,
                width: "20%",
                border: `3px solid ${themeColors.lightPurple}`,
                "&:hover": {
                    background: `${themeColors.lightPurple}`
                },
                "&:focus": {
                    background: `${themeColors.lightPurple}`
                }
            }} onClick={handleClick}>
                Log
            </Button>
        </CommandLineContainer>
    )
}

const CommandLineContainer = styled.div`
  width: 96%;
  padding: 2%;
  min-height: 60px;
  background: ${themeColors.darkAccent};
  color: white;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`