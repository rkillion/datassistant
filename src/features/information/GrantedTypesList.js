import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchType } from '../type/typesSlice';
import OwnedInstanceListItem from './OwnedInstanceList';

export default function GrantedTypesList({ type, parentType, leftPadding }) {
    const typesLoaded = useSelector(state=>state.types.allFetched);
    const activeSelection = useSelector(state=>state.display.activeSelection);
    const [open, setOpen] = useState(false);
    const [infoLoading, setInfoLoading] = useState(true);
    const [typeFullInfo, setTypeFullInfo] = useState({})
    const dispatch = useDispatch()

    let assignedAs = parentType.log_entries.find(entry=>(entry.action==="grants many"||entry.action==="grants one")&&entry.type_b_id===type.id).action
    let displayTitle;
    if (assignedAs==="grants many") {
        displayTitle = type.title_plural
    }
    if (assignedAs==="grants one") {
        displayTitle = type.title_singular
    }

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
        <ListItemButton onClick={handleClick} sx={{ pl: leftPadding }}>
            {open ? <ExpandLess /> : <ExpandMore />}
            <ListItemText primary={displayTitle} />
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {activeSelection.type!=="instance" ? null : activeSelection.selection.instances_owned.map(instanceOwned=>{
                    if (instanceOwned.type_id===type.id){
                        return <OwnedInstanceListItem key={instanceOwned.id} instanceInfo={instanceOwned} leftPadding={leftPadding*2} />
                    }
                    })}
            </List>
        </Collapse>
        </>
    )
}