import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import FormDialog from '../forms/FormDialog';
import Button from '@mui/material/Button';
import DatassistantCard from './DatassistantCard';

export default function DatassistantsPage() {
    const datassistants = useSelector(state=>state.datassistants.all);
    const [newDFormOpen,setNewDFormOpen] = useState(false);

    return (
        <DisplayBox>
            <CardArea>
                {!datassistants.length>0 ? null : 
                    datassistants.map(datassistant=><DatassistantCard key={datassistant.id} datassistant={datassistant}/>)
                }
            </CardArea>
            <Button 
                variant="contained"
                sx={{ 
                    position: 'absolute', 
                    bottom: 50, 
                    right: 100
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
    padding: 60px;
    flex-direction: column;
    align-items: stretch;
`

const CardArea = styled.div`
    display: flex;
    padding-top: 30px;
    padding-bottom: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
`