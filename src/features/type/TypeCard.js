import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

export default function TypeCard({ type }) {
    const color = type.value_type ? "purple" : "blue";

    return (
        <Button variant="contained" sx={{
            margin: "5px",
            background: `${color}`
        }}>
            {type.title_plural}
        </Button>
        // <TypeCardBox>
        //     <Typography variant="body1" sx={{color: "white",textShadow: "2px 2px 5px black"}}>
        //         {type.title_plural}
        //     </Typography>
        // </TypeCardBox>
    )
}

const TypeCardBox = styled.div`
  background: blue;
  min-width: 100px;
  min-height: 40px;
  padding: 2px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

