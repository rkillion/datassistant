import * as React from 'react';
import Link from '@mui/material/Link';
import { assistantPathObject, myDataPathObject, setDisplayPath } from "../view/displaySlice";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBaseType, fetchType } from '../type/typesSlice';


export default function BreadcrumbLink({ pathObject }) {
    const assistant = useSelector(state=>state.datassistants.current)
    const dispatch = useDispatch();

    //when editing this function you may need to change a similar function in TypeCard
    function handleClick(e) {
        let assistantPath = {...assistantPathObject}
        assistantPath.title_plural = assistant.title; 
        assistantPath.title_singular = assistant.title;
        if (pathObject.value_type) {
            dispatch(fetchBaseType({id: pathObject.id,datassistant_id: assistant.id}))
            .then(data=>{
                dispatch(setDisplayPath([
                    assistantPath,
                    ...data.payload.parent_path,
                    pathObject
                ]));
            })
        } else {
            switch (pathObject.id) {
                case "assistant" :
                    dispatch(setDisplayPath([
                        assistantPath
                    ]));
                    break;
                case "myData" :
                    dispatch(setDisplayPath([
                        assistantPath,
                        {...myDataPathObject} 
                    ]));
                    break;
                default :
                    dispatch(fetchType(pathObject.id))
                    .then(data=>{
                        dispatch(setDisplayPath([
                            assistantPath,
                            {...myDataPathObject},
                            ...data.payload.parent_path,
                            pathObject
                        ]));
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