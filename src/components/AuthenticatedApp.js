import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import DatassistantsPage from '../features/datassistant/DatassistantsPage';
import { fetchDatassistants } from '../features/datassistant/datassistantsSlice';
import Interface from '../features/interface/Interface';
import Appbar from '../features/navigation/Appbar';

export default function AuthenticatedApp() {
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchDatassistants());
    }, [])
    
    return (
        <AuthenticatedAppWindow>
            {/* <Appbar /> */}
            <Switch >
                <Route exact path="/datassistants">
                    <DatassistantsPage />
                </Route>
                <Route exact path="/datassistants/:id">
                    <Interface />
                </Route>
                <Redirect to="/datassistants" />
            </Switch>
        </AuthenticatedAppWindow>
    )
}

const AuthenticatedAppWindow = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`