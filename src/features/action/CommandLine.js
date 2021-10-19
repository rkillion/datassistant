import styled from 'styled-components';
import Button from '@mui/material/Button';
import CommandStatement from './CommandStatement';

export default function CommandLine() {

    function handleClick() {
        console.log("Log Button!")
    }
    return (
        <CommandLineContainer>
            <CommandStatement />
             <Button variant="contained" sx={{
                margin: "5px",
                background: `green`,
                width: "20%"
            }} onClick={handleClick}>
                Log
            </Button>
        </CommandLineContainer>
    )
}

const CommandLineContainer = styled.div`
  width: 100%;
  min-height: 60px;
  background: orange;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`