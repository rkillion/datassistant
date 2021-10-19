import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../auth/userSlice';
import { useHistory } from 'react-router';

export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useSelector((state)=>state.user.current)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logoutUser())
        .then(()=>{
            window.location.reload();
        })
        }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user.id) {return null}
    return (
        <div>
            <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            >
            <AccountCircle />
            </IconButton>
            <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            <MenuItem onClick={()=>{history.push("/datassistants");handleClose()}}>My Datassistants</MenuItem>
            <MenuItem onClick={handleLogout} style={{color: "red"}}>Logout</MenuItem>
            </Menu>
        </div>
    )
}