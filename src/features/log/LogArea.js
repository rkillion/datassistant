import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LogEntry from './LogEntry';
import Typography from '@mui/material/Typography'
import { nameDisplayField } from '../view/displaySlice';
import { themeColors } from '../style/styleConst';

export default function LogArea() {
  const activeSelection = useSelector(state=>state.display.activeSelection);

    return (
        <LogAreaContainer>
          <LogHeader>
            <Typography variant="h5" component="div" sx={{
              color: "white"
            }}>
                  Log
              </Typography>
          </LogHeader>
          <LogHeader>
              <Typography variant="h6" component="div" gutterBottom sx={{
              color: "white"
            }}>
                  {activeSelection.selection[nameDisplayField[activeSelection.type]]}
              </Typography>
          </LogHeader>
          {activeSelection.selection.log_entries&&activeSelection.selection.log_entries.map(entry=>{
            return <LogEntry 
              key={entry.id}
              entry={entry}
            />
          })}
        </LogAreaContainer>
    )
}

const LogAreaContainer = styled.div`
  height: 100%;
  width: 20%;
  background: ${themeColors.lightAccent};
  display: flex;
  flex-flow: column nowrap;
`

const LogHeader = styled.div`
  width: 100%;
  background: ${themeColors.lightAccent};
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`