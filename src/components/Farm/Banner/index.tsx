import React from 'react';
import {
  Title, Slogan, Des, Actions, Action,
  ActionArrow
} from './styledComps';
import ActionArrowSvg from './action-arrow.svg';
import { ExternalLink } from '../../../theme';

export default function Banner() {
  return (
    <React.Fragment>
      <Title>Farms</Title>
      <Slogan>Stake LP tokens to earn.</Slogan>
      <Des>Go to the community for discussion</Des>
      <Actions>
        <ExternalLink href='http://discord.gg/filedoge'>
          <Action>Discord <ActionArrow src={ActionArrowSvg} /></Action>
        </ExternalLink>
        <ExternalLink href='https://t.me/filedogetoken'>
          <Action>Telegram <ActionArrow src={ActionArrowSvg} /></Action>
        </ExternalLink>

      </Actions>
    </React.Fragment>
  );
}