import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import BreadcrumbLink from './BreadcrumbLink';

export default function BasicBreadcrumbs() {
  const displayPath = useSelector(state=>state.display.path)

  return (
    <BreadcrumbContainer role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {displayPath.slice(0,-1).map(pathObject=>
          <BreadcrumbLink key={pathObject.id} pathObject={pathObject}/>
        )}
        <Typography color="text.primary">{displayPath[displayPath.length-1].title_plural}</Typography>
      </Breadcrumbs>
    </BreadcrumbContainer>
  );
}

const BreadcrumbContainer = styled.div`
  background: lightblue;
  padding-left: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`