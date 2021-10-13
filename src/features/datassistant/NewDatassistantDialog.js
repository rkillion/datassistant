import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from "react-redux";
import { postDatassistant } from "./datassistantsSlice";

export default function NewDatassistantDialog({ handleClose }) {
    const dispatch = useDispatch();
    const datassistants = useSelector(state=>state.datassistants.all);
    const [error,setError] = useState("");
    const [formData,setFormData] = useState({
        title: ""
    })

    function handleChange(e) {
        if (datassistants.find(d=>d.title===e.target.value)) {
            setError("Datassistant already exists.")
        } else {
            setError("")
        }
        let newData = {...formData};
        newData[e.target.name] = e.target.value;
        setFormData(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postDatassistant(formData))
        .then(()=>{
            handleClose();
        })
    }

    return (
        <>
            <DialogContent>
                <DialogContentText>
                    {`Enter a title for your new Datassistant.`}
                </DialogContentText>
                {error ? 
                    <TextField
                        error
                        autoFocus
                        margin="dense"
                        id="title-error"
                        label={`Title`}
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        name="title"
                        value={formData.title}
                        helperText={error}
                /> : 
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label={`Title`}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                    name="title"
                    value={formData.title}
                />
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </>
    )
}