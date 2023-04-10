import React from 'react';
import {
  Title, Slogan, Des, Actions, Action,
  ActionArrow
} from './styledComps';
import ActionArrowSvg from './action-arrow.svg';

export default function Banner() {
  return (
    <React.Fragment>
      <Title>Farms</Title>
      <Slogan>Stake LP tokens to earn.</Slogan>
      <Des>Go to the community for discussion.</Des>
      <Actions>
        <Action>International <ActionArrow src={ActionArrowSvg} /></Action>
        <Action>English <ActionArrow src={ActionArrowSvg} /></Action>
        <Action>Chinese <ActionArrow src={ActionArrowSvg} /></Action>
      </Actions>  
    </React.Fragment>
  );
}