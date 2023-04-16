import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/Farm/Banner';
import LP from '../../components/Farm/LP';
// import { SwapPoolTabsNew } from '../../components/NavigationTabs'
import { PriceProvider } from '../../hooks/price';

// import { isMobile } from 'react-device-detect'
const PageWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: -120px;
  `};
`;

export default function Farm() {
  return (
    <PriceProvider>
      <PageWrapper>
        {/* <SwapPoolTabs position='form' active={'farm'} /> */}
        {/* { isMobile &&  <SwapPoolTabsNew type={'farm'} /> } */}
       
        <Banner />        
        <LP />
      </PageWrapper>
    </PriceProvider>
  );
}