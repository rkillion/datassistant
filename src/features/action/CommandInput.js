import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { changeConfig } from './commandsSlice';

export default function CommandInput({ buildObject }) {
    const dispatch = useDispatch();

    function handleChange(e) {
        dispatch(changeConfig({key: buildObject.setAs,value: e.target.value}))
    }

    return <TextField 
        variant="filled"
        label={buildObject.label}
        onChange={handleChange}
        size="small"
    />
}