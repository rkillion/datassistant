import { useParams } from "react-router";
import styled from 'styled-components';
import InformationArea from "../information/InformationArea";
import LogArea from "../log/LogArea";
import ObjectActionArea from "./ObjectActionArea";

export default function Interface() {
    const params = useParams();

    return (
        <InterfaceWindow >
            {/* need: viewarea, */}
            <InformationArea />
            <ObjectActionArea />
            <LogArea />
            {/* {`Showing interface for assistant ${params.id}`} */}
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