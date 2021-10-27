import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FormDialog from '../forms/FormDialog';
import Button from '@mui/material/Button';
import DatassistantCard from './DatassistantCard';
import Appbar from '../navigation/Appbar';
import { themeColors } from '../style/styleConst';

export default function DatassistantsPage() {
    const datassistants = useSelector(state=>state.datassistants.all);
    const [newDFormOpen,setNewDFormOpen] = useState(false);

    return (
        <DisplayBox>
            <Appbar />
            <CardArea>
                {!datassistants.length>0 ? null : 
                    datassistants.map(datassistant=><DatassistantCard key={datassistant.id} datassistant={datassistant}/>)
                }
            </CardArea>
            <Button 
                variant="contained"
                sx={{ 
                    position: 'absolute', 
                    width: "200px",
                    bottom: 50, 
                    right: 100,
                    background: themeColors.lightAccent,
                    border: `2px solid ${themeColors.lightPurple}`,
                    "&:hover": {
                        background: `${themeColors.lightPurple}`
                    },
                    "&:focus": {
                        background: `${themeColors.lightPurple}`
                    }
                }}
                onClick={()=>setNewDFormOpen(true)}
            >
                New
            </Button>
            <FormDialog 
                formOpen={newDFormOpen}
                setFormOpen={setNewDFormOpen}
                item="datassistant"
            />
        </DisplayBox>
    )
}

const DisplayBox = styled.div`
    display: flex;
    width: auto;
    background: ${themeColors.background};
    padding: 60px;
    flex-direction: column;
    align-items: stretch;
`

const CardArea = styled.div`
    display: flex;
    background: ${themeColors.background};
    padding-top: 30px;
    padding-bottom: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`