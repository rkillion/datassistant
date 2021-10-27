import * as React from 'react';
import Link from '@mui/material/Link';
import { assistantPathObject, myDataPathObject, setActiveSelection, setDisplayPath } from "../view/displaySlice";
import { setCommandStrings } from "../action/commandsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaseType, fetchType, setCurrentType } from '../type/typesSlice';


export default function BreadcrumbLink({ pathObject }) {
    const assistant = useSelector(state=>state.datassistants.current)
    const dispatch = useDispatch();

    //when editing this function you may need to change a similar function in TypeCard
    function handleClick(e) {
        let assistantPath = {...assistantPathObject}
        assistantPath.title_plural = assistant.title; 
        assistantPath.title_singular = assistant.title;
        let commandStarter = pathObject.id === "assistant"||pathObject.id === "myData" ? ["new"] : ["note"];
        dispatch(setCommandStrings(commandStarter));
        if (pathObject.value_type) {
            dispatch(fetchBaseType({id: pathObject.id,datassistant_id: assistant.id}))
            .then(data=>{
                dispatch(setDisplayPath([
                    assistantPath,
                    ...data.payload.parent_path,
                    pathObject
                ]));
                dispatch(setActiveSelection({type: "baseType",selection: data.payload}))
            })
        } else {
            switch (pathObject.id) {
                case "assistant" :
                    dispatch(setDisplayPath([
                        assistantPath
                    ]));
                    dispatch(setActiveSelection({type: "assistant",selection: {}}));
                    break;
                case "myData" :
                    dispatch(setDisplayPath([
                        assistantPath,
                        {...myDataPathObject} 
                    ]));
                    dispatch(setActiveSelection({type: "myData",selection: {}}))
                    break;
                default :
                    dispatch(fetchType(pathObject.id))
                    .then(data=>{
                        dispatch(setCurrentType(data.payload));
                        dispatch(setDisplayPath([
                            assistantPath,
                            {...myDataPathObject},
                            ...data.payload.parent_path,
                            pathObject
                        ]));
                        dispatch(setActiveSelection({type: "type",selection: data.payload}))
                    });
            }
        }
    }

    return (
        <Link 
            underline="hover" 
            color="inherit"
            sx={{
                cursor: "pointer"
            }} 
            onClick={handleClick}
        >
          {pathObject.title_plural}
        </Link>
    )
}