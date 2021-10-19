import styled from 'styled-components';
import BasicBreadcrumbs from './Breadcrumbs';
import ProfileMenu from './ProfileMenu';


export default function InterfaceHeader() {
    return (
        <InterfaceHeaderContainer>
            <BasicBreadcrumbs />
            <ProfileMenu />
        </InterfaceHeaderContainer>
    )
}

const InterfaceHeaderContainer = styled.div`
  width: 100%;
  background: lightblue;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`