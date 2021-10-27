import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function OwnedInstanceListItem({ instanceInfo, leftPadding }) {
    return (
        <ListItemButton sx={{ pl: leftPadding }}>
            <ListItemText primary={instanceInfo.name} />
        </ListItemButton>
    )
}