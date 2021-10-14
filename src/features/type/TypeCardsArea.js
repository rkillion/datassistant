import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import TypeCard from './TypeCard';

export default function TypeCardsArea() {
    const display = useSelector(state=>state.display.current)
    const assistant = useSelector(state=>state.datassistants.current)
    const subTypes = display==="base" ? assistant.sub_types : [];
    const baseTypes = useSelector(state=>state.types.baseTypes);

    return (
        <TypeCardsAreaContainer>
            {display!=="base" ? null : baseTypes.map(type=>{
                return <TypeCard key={type.id} type={type}/>
            })}
            {subTypes.length>0 ? subTypes.map(type=>{
                return (
                    <TypeCard key={type.id} type={type} />
                )
            }) : <Typography variant="overline">
                {`No sub types`}
            </Typography>}
        </TypeCardsAreaContainer>
    )
}

const TypeCardsAreaContainer = styled.div`
  width: 95%;
  background: lightblue;
  padding: 5px;
  border-top: 1px dotted black;
  border-bottom: 1px dotted black;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`