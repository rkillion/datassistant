import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import NewDatassistantDialog from '../datassistant/NewDatassistantDialog';

export default function FormDialog({ formOpen, setFormOpen, item }) {

    const handleClose = () => {
        setFormOpen(false);
    }

    return (
        <Dialog open={formOpen} onClose={handleClose}>
            <DialogTitle>{`New ${item[0].toUpperCase()+item.slice(1)}`}</DialogTitle>
            {item==="datassistant" ? <NewDatassistantDialog handleClose={handleClose}/> : null}
        </Dialog>
    )
}