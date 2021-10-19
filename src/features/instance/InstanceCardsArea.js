import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import InstanceCard from './InstanceCard';

export default function InstanceCardsArea() {
    const displayPath = useSelector(state=>state.display.path)
    const assistant = useSelector(state=>state.datassistants.current)
    const currentType = useSelector(state=>state.types.current)
    let instances; 
    const baseTypes = useSelector(state=>state.types.baseTypes);

    switch (displayPath[displayPath.length-1].id) {
        case "assistant" :
            instances = assistant.instances;
            break;
        case "myData" :
            instances = assistant.instances;
            break;
        default :
            instances = currentType.instances;
    }

    return (
        <InstanceCardsAreaContainer>
            {instances.length>0 ? instances.map(instance=>{
                return (
                    <InstanceCard key={instance.id} instance={instance} />
                )
            }) : <Typography variant="overline">
                {`No instances`}
            </Typography>}
        </InstanceCardsAreaContainer>
    )
}

const InstanceCardsAreaContainer = styled.div`
  width: 95%;
  background: lightblue;
  padding: 5px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`