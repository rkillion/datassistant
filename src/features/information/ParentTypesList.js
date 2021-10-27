import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { fetchType } from '../type/typesSlice';
import GrantedTypesList from './GrantedTypesList';
import { themeColors } from '../style/styleConst';

export default function ParentTypesList({ type }) {
    const activeSelection = useSelector(state=>state.display.activeSelection);
    const typesLoaded = useSelector(state=>state.types.allFetched);
    const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [infoLoading, setInfoLoading] = React.useState(true);
  const [typeFullInfo, setTypeFullInfo] = React.useState({})

  const handleClick = () => {
      setInfoLoading(true);
      setOpen(!open);
      let typeInfo = typesLoaded.find(loadedType=>type.id===loadedType.id);
      if (typeInfo) {
          setTypeFullInfo(typeInfo);
          setInfoLoading(false);
      } else {
          dispatch(fetchType(type.id))
          .then(data=>{
            setTypeFullInfo(data.payload);
            setInfoLoading(false);
          })
      }
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: themeColors.lightAccent, color: "white" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    //   subheader={
    //     <ListSubheader component="div" id="nested-list-subheader">
    //       Nested List Items
    //     </ListSubheader>
    //   }
    >
      <ListItemButton onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={activeSelection.type==="instance" ? type.title_singular : type.title_plural} />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {infoLoading ? "Loading..." : null}
          {infoLoading ? null : typeFullInfo.granted_types.map(grantedType=><GrantedTypesList key={grantedType.id} type={grantedType} parentType={typeFullInfo} leftPadding={4}/>)}
        </List>
      </Collapse>
    </List>
  );
}
