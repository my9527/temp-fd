import React from "react";
import { Wrapper, Header, Logo, Items, Item, ItemTitle, ItemValue,
  TipImg, APRValue, Staking, Addons, Addon, AddonImg, Bg } from './styledComps';
import CommingSoon from '../CommingSoon';
import LPLogo from './assets/lp-logo.svg';
import TipIcon from './assets/tip-icon.svg';
import AddonIcon from './assets/addon-icon.svg';
import LPBg from './assets/bg.png';
import AddLiquidity from './AddLiquidity';
import { useToken } from '../../../hooks/Tokens';
import { useTotalSupply } from "../../../data/TotalSupply";

export default function LP() {
  const pairToken = useToken('0x2d34b45378DccC5683774Fc18F7569e34ADB4699');
  const totalSupply = useTotalSupply(pairToken);

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
              <ItemValue>{totalSupply?.toSignificant(6) || '-'}</ItemValue>
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
          <AddLiquidity pairToken={pairToken} />
        </Staking>
        <CommingSoon />
        <Bg src={LPBg} />
      </Wrapper>
    </React.Fragment>
  );
}