import React from 'react';
import styled from 'styled-components';
import CommingLPIcon from './comming-lp.svg';

const CommingSoon = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CommingIcon = styled.img`
  width: 176px;
`;

const CommingText = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
  color: #000000;
  opacity: 0.4;
`;

export default function Comming() {
  return (
    <CommingSoon>
      <CommingIcon src={CommingLPIcon} />
      <CommingText>Comming Soon</CommingText>
    </CommingSoon>
  );
}