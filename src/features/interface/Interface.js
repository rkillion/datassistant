import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from 'styled-components';
import { fetchDatassistant } from "../datassistant/datassistantsSlice";
import { fetchBaseTypes } from "../type/typesSlice"
import InformationArea from "../information/InformationArea";
import LogArea from "../log/LogArea";
import ObjectActionArea from "./ObjectActionArea";
import { assistantPathObject, myDataPathObject, setDisplayPath } from "../view/displaySlice";

export default function Interface() {
    const params = useParams();
    const dispatch = useDispatch();
    const assistant = useSelector(state=>state.datassistants.current)

    useEffect(()=>{
        dispatch(fetchBaseTypes())
        .then(
            dispatch(fetchDatassistant(params.id))
            .then(data=>{
                let assistant = data.payload;
                let assistantPath = {...assistantPathObject}
                assistantPath.title_plural = assistant.title; 
                assistantPath.title_singular = assistant.title;
                dispatch(setDisplayPath([
                    assistantPath,
                    {...myDataPathObject} 
                ])) 
            })
        )  
    }, [])

    if (!assistant.id) {return null}
    return (
        <InterfaceWindow >
            <InformationArea />
            <ObjectActionArea />
            <LogArea />
        </InterfaceWindow>
    )
}

const InterfaceWindow = styled.div`
  height: ${window.innerHeight}px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: stretch;
`
const TestDiv = styled.div`

`