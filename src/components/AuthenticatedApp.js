import styled from 'styled-components';
import Appbar from '../features/navigation/Appbar';

export default function AuthenticatedApp() {
    return (
        <AuthenticatedAppWindow>
            <Appbar />
        </AuthenticatedAppWindow>
    )
}

const AuthenticatedAppWindow = styled.div`
  height: 100%;
  width: 100%
`