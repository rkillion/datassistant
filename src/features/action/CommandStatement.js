import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { themeColors } from '../style/styleConst';
import { nameDisplayField } from '../view/displaySlice';
import ActionInput from './ActionInput';
import AddStatement from './AddStatement';
import AssignStatement from './AssignStatement';
import AutocompleteField from './AutocompleteField';
import CommandInput from './CommandInput';
import { nextCommand, resetConfig } from './commandsSlice';

export default function CommandStatement() {
    const commands = useSelector(state=>state.commands);
    const datassistant = useSelector(state=>state.datassistants.current);
    const activeSelection = useSelector(state=>state.display.activeSelection);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(resetConfig());
    },[datassistant.id])

    return (
        <CommandStatementContainer>
            <ActionInput />
            {commands.commandStrings.map((command,positionIndex)=>{
                let buildObjects = nextCommand[command];
                return buildObjects.map((buildObject,itemIndex)=>{
                    if (buildObject.select) {
                        return buildObject.select === "autocomplete" ? <AutocompleteField key={`${positionIndex}-${itemIndex}`} positionIndex={positionIndex+1} options={buildObject.options}/> : "selectOptions"
                    } else if (buildObject.text) {
                        return <TextInsert>{buildObject.text}</TextInsert>
                    } else if (buildObject.input) {
                        return <CommandInput key={`${positionIndex}-${itemIndex}`} buildObject={buildObject}/>
                    } else if (buildObject.activeSelection) {
                        if (buildObject.activeSelection==="display") {
                            return activeSelection.selection[nameDisplayField[activeSelection.type]]
                        }
                    }
                })
            })}
            {commands.commandStrings[0]==="assign" ? <AssignStatement /> : null}
            {commands.commandStrings[0]==="add" ? <AddStatement /> : null}
        </CommandStatementContainer>
    )
}

const CommandStatementContainer = styled.div`
  height: 100%;
  width: 75%;
  background: ${themeColors.darkAccent};
  color: white;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`

const TextInsert = styled.p`
  color: white;
  margin: 2px;
  padding: 2px;
`