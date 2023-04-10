import React from 'react';
import styled from 'styled-components';
import Banner from '../../components/Farm/Banner';
import LP from '../../components/Farm/LP';

const PageWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
`;

export default function Farm() {
  return (
    <PageWrapper>
      <Banner />        
      <LP />
    </PageWrapper>
  );
}