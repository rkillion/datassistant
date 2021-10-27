import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux';
import TypeCardsArea from '../type/TypeCardsArea';
import InterfaceHeader from '../navigation/InterfaceHeader';
import InstanceCardsArea from '../instance/InstanceCardsArea';
import { themeColors } from '../style/styleConst';

export default function BasicViewArea() {
    const assistant = useSelector(state=>state.datassistants.current);
    const display = useSelector(state=>state.display.path);
    const currentType = useSelector(state=>state.types.current);

    return (
        <BasicViewAreaContainer>
            <InterfaceHeader />
            <Typography variant="h4" component="div" gutterBottom sx={{
                color: "white"
            }}>
                {display[display.length-1].title_plural}
            </Typography>
            <TypeCardsArea />
            <InstanceCardsArea />
        </BasicViewAreaContainer>
    )
}

const BasicViewAreaContainer = styled.div`
  height: 70%;
  width: 100%;
  background: ${themeColors.background};
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`