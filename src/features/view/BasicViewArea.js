import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import TypeCardsArea from '../type/TypeCardsArea';

export default function BasicViewArea() {
    const assistant = useSelector(state=>state.datassistants.current)

    return (
        <BasicViewAreaContainer>
            <Typography variant="h4" component="div" gutterBottom>
                {assistant.title}
            </Typography>
            <TypeCardsArea />
        </BasicViewAreaContainer>
    )
}

const BasicViewAreaContainer = styled.div`
  height: 70%;
  width: 100%;
  background: lightblue;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`