import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { loginUser } from "./userSlice";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login() {
    const dispatch = useDispatch();
    const [credentials,setCredentials] = useState({
        username: "",
        password: ""
    })

    function handleChange(e) {
        let newCredentials = {...credentials};
        newCredentials[e.target.name] = e.target.value;
        setCredentials(newCredentials);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loginUser(credentials))
        .then(()=>{
            window.location.reload();
        })
    }
    return (
        <FormControl sx={{
            margin: '50px'
        }}>
            <Typography>Datassistant</Typography>
            <Typography>Login</Typography>
            <TextField id="outlined-basic" label="Username" variant="outlined"
                sx={{margin: '10px'}}
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange} 
            />
            <TextField id="outlined-basic" label="Password" variant="outlined"
                sx={{margin: '10px'}}
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange} 
            />
            <Button variant="contained" onClick={handleSubmit}>Login</Button>
            <Typography><Link to="/signup">Sign up</Link></Typography>
      </FormControl>
    )
}