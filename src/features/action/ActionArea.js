import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CommandLine from './CommandLine';
import { themeColors } from '../style/styleConst';

export default function ActionArea() {
    const assistant = useSelector(state=>state.datassistants.current);
    const display = useSelector(state=>state.display.path);
    const currentType = useSelector(state=>state.types.current);

    return (
        <ActionAreaContainer>
            <CommandLine />
        </ActionAreaContainer>
    )
}

const ActionAreaContainer = styled.div`
  width: 100%;
  background: ${themeColors.darkAccent};
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: center;
`