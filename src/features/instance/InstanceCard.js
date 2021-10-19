import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

export default function InstanceCard({ instance }) {
    const dispatch = useDispatch();
    const assistant = useSelector(state=>state.datassistants.current)

    function handleClick() {
        console.log(instance);
    }

    return (
        <Button variant="contained" sx={{
            margin: "5px",
            background: `red`
        }} onClick={handleClick}>
            {instance.name}
        </Button>
    )
}

