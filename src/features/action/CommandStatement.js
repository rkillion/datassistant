import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ActionInput from './ActionInput';
import AutocompleteField from './AutocompleteField';
import CommandInput from './CommandInput';
import { nextCommand } from './commandsSlice';
import SelectOptions from './SelectOptions';

export default function CommandStatement() {
    const commands = useSelector(state=>state.commands);

    return (
        <CommandStatementContainer>
            <ActionInput />
            {commands.commandStrings.map((command,positionIndex)=>{
                let buildObjects = nextCommand[command];
                return buildObjects.map((buildObject,itemIndex)=>{
                    if (buildObject.select) {
                        return buildObject.select === "autocomplete" ? <AutocompleteField key={`${positionIndex}-${itemIndex}`} positionIndex={positionIndex+1} options={buildObject.options}/> : "selectOptions"
                    } else if (buildObject.text) {
                        return buildObject.text
                    } else if (buildObject.input) {
                        return <CommandInput key={`${positionIndex}-${itemIndex}`} buildObject={buildObject}/>
                    }
                })
            })}
        </CommandStatementContainer>
    )
}

const CommandStatementContainer = styled.div`
  height: 100%;
  width: 75%;
  background: orange;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`