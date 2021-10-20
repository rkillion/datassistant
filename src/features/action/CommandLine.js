import styled from 'styled-components';
import Button from '@mui/material/Button';
import CommandStatement from './CommandStatement';
import { useDispatch, useSelector } from 'react-redux';
import { postNew } from './commandsSlice';

export default function CommandLine() {
    const config = useSelector(state=>state.commands.config)
    const assistant = useSelector(state=>state.datassistants.current)
    const type = useSelector(state=>state.types.current)
    const dispatch = useDispatch()

    function handleClick() {
        //you must add the current datassistant_id to the config before dispatch the fetch
        let thisConfig = JSON.parse(JSON.stringify(config));
        thisConfig.datassistant_id = assistant.id;
        if (config.make) {
            dispatch(postNew(thisConfig))
            .then(data=>{
                
            })
        }
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