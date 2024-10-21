import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { AppRoutes } from '../const/const';

function NotFoundPage() {
  const Body = styled.div`
    width: 800px;
    height: 100px;
    margin: auto
  `;

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const Page = styled.p`
    color: red;
    font-size:36px;
    text-align: center;
  `;


  return (
    <Body data-testid='error-page'>
      <Wrapper>
        <Page>This page not found</Page>
        <Link style={{margin: 'auto'}} to={AppRoutes.Main}>Go to main page</Link>
      </Wrapper>
    </Body>
  );
}

export { NotFoundPage };
