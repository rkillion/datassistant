import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import TypeCard from './TypeCard';
import { myDataPathObject } from '../view/displaySlice';
import { themeColors } from '../style/styleConst';

export default function TypeCardsArea() {
    const display = useSelector(state=>state.display.current)
    const displayPath = useSelector(state=>state.display.path)
    const assistant = useSelector(state=>state.datassistants.current)
    const currentType = useSelector(state=>state.types.current)
    let subTypes; 
    const baseTypes = useSelector(state=>state.types.baseTypes);

    switch (displayPath[displayPath.length-1].id) {
        case "assistant" :
            subTypes = [...baseTypes,{...myDataPathObject}];
            break;
        case "myData" :
            subTypes = assistant.sub_types;
            break;
        default :
            subTypes = currentType.sub_types;
    }

    return (
        <TypeCardsAreaContainer>
            {subTypes.length>0 ? subTypes.map(type=>{
                return (
                    <TypeCard key={type.id} type={type} />
                )
            }) : <Typography variant="overline" sx={{
                color: "white"
            }}>
                {`No sub types`}
            </Typography>}
        </TypeCardsAreaContainer>
    )
}

const TypeCardsAreaContainer = styled.div`
  width: 95%;
  background: ${themeColors.background};
  padding: 5px;
  border-top: 1px dotted black;
  border-bottom: 1px dotted black;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`