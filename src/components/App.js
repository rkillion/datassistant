import styled from 'styled-components';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../features/auth/userSlice';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const dispatch = useDispatch();
  const authChecked = useSelector((state)=>state.user.authChecked)
  const user = useSelector((state)=>state.user.current)

  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  if(!authChecked) { return <div></div>}
  return (
    <AppWindow className="App">
      {user.id ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp 
        />
      )}
    </AppWindow>
  );
}

const AppWindow = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

export default App;
