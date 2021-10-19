import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { fetchBaseType, fetchType } from './typesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setDisplay } from '../view/displaySlice';
import { assistantPathObject, myDataPathObject, setDisplayPath } from "../view/displaySlice";

export default function TypeCard({ type }) {
    const color = type.value_type ? "purple" : "blue";
    const dispatch = useDispatch();
    const assistant = useSelector(state=>state.datassistants.current)

    //when editing this function you may need to change a similar function in BreadcrumbLink
    function handleClick() {
        let assistantPath = {...assistantPathObject}
        assistantPath.title_plural = assistant.title; 
        assistantPath.title_singular = assistant.title;
        if (type.value_type) {
            dispatch(fetchBaseType({id: type.id,datassistant_id: assistant.id}))
            .then(data=>{
                dispatch(setDisplayPath([
                    assistantPath,
                    ...data.payload.parent_path,
                    type
                ]));
            })
        } else {
            switch (type.id) {
                case "myData" :
                    dispatch(setDisplayPath([
                        assistantPath,
                        {...myDataPathObject} 
                    ]));
                    break;
                default :
                    dispatch(fetchType(type.id))
                    .then(data=>{
                        dispatch(setDisplayPath([
                            assistantPath,
                            {...myDataPathObject},
                            ...data.payload.parent_path,
                            type
                        ]));
                    });
            }
        }
    }

    return (
        <Button variant="contained" sx={{
            margin: "5px",
            background: `${color}`
        }} onClick={handleClick}>
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

