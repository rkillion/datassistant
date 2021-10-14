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

export default function Interface() {
    const params = useParams();
    const dispatch = useDispatch();
    const assistant = useSelector(state=>state.datassistants.current)

    console.log("Assistant:",assistant)

    useEffect(()=>{
        dispatch(fetchBaseTypes())
        .then(
            dispatch(fetchDatassistant(params.id))
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
  height: ${window.innerHeight-64}px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: stretch;
`
const TestDiv = styled.div`

`