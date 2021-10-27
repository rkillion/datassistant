import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import { nameDisplayField } from '../view/displaySlice';
import ParentTypesList from './ParentTypesList';
import { themeColors } from '../style/styleConst';

export default function InformationArea() {
  const activeSelection = useSelector(state=>state.display.activeSelection)

    return (
        <InformationAreaContainer>
          <InfoHeader>
            <Typography variant="h5" component="div" sx={{
              color: "white"
            }}>
                  Information
            </Typography>
          </InfoHeader>
          <InfoHeader>
              <Typography variant="h6" component="div" gutterBottom sx={{
              color: "white"
            }}>
                  {activeSelection.selection[nameDisplayField[activeSelection.type]]}
              </Typography>
          </InfoHeader>
          {activeSelection.type==="assistant"||activeSelection.type==="myData" ? null : activeSelection.selection.parent_path.map(type=><ParentTypesList key={type.id} type={type}/>)}
          {activeSelection.type!=="type" ? null : <ParentTypesList key={activeSelection.selection.id} type={activeSelection.selection}/>}
        </InformationAreaContainer>
    )
}

const InformationAreaContainer = styled.div`
  height: 100%;
  width: 20%;
  background: ${themeColors.lightAccent};
`

const InfoHeader = styled.div`
  width: 100%;
  background: ${themeColors.lightAccent};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`