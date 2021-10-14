import styled from 'styled-components';
import BasicViewArea from '../view/BasicViewArea';

export default function ObjectActionArea() {
    return (
        <ObjectActionContainer>
            <BasicViewArea />
        </ObjectActionContainer>
    )
}

const ObjectActionContainer = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  background: lightgray;
`