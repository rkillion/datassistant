import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setConfig, editOptionSelections, editCommandString } from '../action/commandsSlice';
import { setActiveSelection } from '../view/displaySlice';
import { fetchInstance } from './instanceSlice';
import { configs } from '../action/commandsSlice';
import { themeColors } from '../style/styleConst';

export default function InstanceCard({ instance }) {
    const dispatch = useDispatch();
    const commands = useSelector(state=>state.commands)

    function handleClick() {
        dispatch(fetchInstance(instance.id))
        .then(data=>{
            dispatch(editCommandString({command: "note",index:0}));
            dispatch(setConfig(configs["note"]))
            dispatch(editOptionSelections({selection: commands.actionOptions.indexOf("note"),index: 0}))
            dispatch(setActiveSelection({type: "instance",selection: data.payload}));
        })
    }

    return (
        <Button variant="contained" sx={{
            margin: "5px",
            background: themeColors.lightAccent,
            border: "2px solid red",
            "&:hover": {
                background: "red"
            },
            "&:focus": {
                background: "red"
            }
        }} onClick={handleClick}>
            {instance.name}
        </Button>
    )
}

