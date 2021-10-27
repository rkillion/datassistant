import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { themeColors } from '../style/styleConst';
import { nameDisplayField } from '../view/displaySlice';
import { displayDate } from './logFormats';

export default function LogEntry({ entry }) {
    const activeSelection = useSelector(state=>state.display.activeSelection)
    const createDate = new Date(entry.created_at)

    function getLogSubject() {
        if (activeSelection.type==="type") {
            if (entry.relationship==="instance") {
                return activeSelection.selection.instances.find(instance=>instance.id===entry.instance_a_id)["name"]
            }
        }   
    }

    let qualifier;
    if (entry.action==="has") {
        let ownedInstance = activeSelection.selection.instances_owned.find(instance=>instance.id===entry.instance_b_id);
        if (ownedInstance) {
            qualifier = ownedInstance.name;
        }
    }
    if (entry.action==="grants many") {
        let ownedType = activeSelection.selection.granted_types.find(type=>type.id===entry.type_b_id);
        if (ownedType) {
            qualifier = ownedType.title_plural;
        }
    }
    if (entry.action==="grants one") {
        let ownedType = activeSelection.selection.granted_types.find(type=>type.id===entry.type_b_id);
        if (ownedType) {
            qualifier = ownedType.title_singular;
        }
    }

    return (
        <LogEntryContainer>
            <EntryItem style={{color: "green"}}>{displayDate(createDate)}</EntryItem>
            <EntryItem>{getLogSubject()}</EntryItem>
            <EntryItem style={{color: "yellow"}}>{entry.action}</EntryItem>
            {qualifier ? <EntryItem>{qualifier}</EntryItem> : null}
            <EntryItem>{entry.note}</EntryItem>
        </LogEntryContainer>
    )
}

const LogEntryContainer = styled.div`
  width: 100%;
  background: ${themeColors.lightAccent};
  display: flex;
  flex-flow: row wrap;
  padding: 2px;
`

const EntryItem = styled.p`
    margin-left: 2px;
    margin-right: 2px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding: 0px;
    color: white
`