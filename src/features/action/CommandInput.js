import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { changeConfig } from './commandsSlice';

export default function CommandInput({ buildObject }) {
    const dispatch = useDispatch();
    const config = useSelector(state=>state.commands.config) 

    function handleChange(e) {
        dispatch(changeConfig({key: buildObject.setAs,value: e.target.value}))
    }

    return <TextField 
        variant="filled"
        label={buildObject.label}
        value={config[buildObject.setAs]}
        onChange={handleChange}
        size="small"
    />
}