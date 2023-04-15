import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/Farm/Banner';
import LP from '../../components/Farm/LP';
import { SwapPoolTabs, SwapPoolTabsNew } from '../../components/NavigationTabs'

const PageWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: -120px;
  `};
`;

export default function Farm() {
  return (
    <PageWrapper>
      <SwapPoolTabs position='form' active={'farm'} />
      <SwapPoolTabsNew type={'farm'} />
      <Banner />        
      <LP />
    </PageWrapper>
  );
}