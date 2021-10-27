import styled from 'styled-components';
import { themeColors } from '../style/styleConst';
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
  background: ${themeColors.background};
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`