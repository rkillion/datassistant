import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CommandLine from './CommandLine';

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
  height: 40%;
  width: 100%;
  background: lightblue;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
`