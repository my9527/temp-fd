import React from "react";
import { Wrapper, Header, Logo, Items, Item, ItemTitle, ItemValue,
  TipImg, APRValue, Staking, Addons, Addon, AddonImg, Bg } from './styledComps';
import CommingSoon from '../CommingSoon';
import LPLogo from './lp-logo.svg';
import TipIcon from './tip-icon.svg';
import AddonIcon from './addon-icon.svg';
import LPBg from './bg.png';
import AddLiquidity from './AddLiquidity';

export default function LP() {
  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <Logo src={LPLogo} />
          <Items>
            <Item>
              <ItemTitle>APR</ItemTitle>
              <APRValue>200%</APRValue>
            </Item>
            <Item>
              <ItemTitle>Earned</ItemTitle>
              <ItemValue>343413</ItemValue>
            </Item>
            <Item>
              <ItemTitle>Liquidity</ItemTitle>
              <ItemValue>$ 313413</ItemValue>
            </Item>
            <Item>
              <ItemTitle>Multiplier</ItemTitle>
              <ItemValue>
                112x
                <TipImg src={TipIcon} />
              </ItemValue>
            </Item>
          </Items>
        </Header>
        <Staking>
          <Addons>
            <Addon>
              Add FILEDOGE-FILE LP
              <AddonImg src={AddonIcon} />
            </Addon>
            <Addon>
              View Contract
              <AddonImg src={AddonIcon} />
            </Addon>
          </Addons>
          <AddLiquidity />
        </Staking>
        <CommingSoon />
        <Bg src={LPBg} />
      </Wrapper>
    </React.Fragment>
  );
}