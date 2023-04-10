import React from "react";
import { StakesWrapper, StakeItem, StakeAmount, ItemLabel, ItemAmount,
  ItemUnit, Addons, Addon, HarvestButton
} from './styledComps';

export default function Stakes() {
  return (
    <StakesWrapper>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>STAKED</ItemLabel>
          <ItemAmount>123.45</ItemAmount>
          <ItemUnit>≈ $ 100</ItemUnit>
        </StakeAmount>
        <Addons>
          <Addon>-</Addon>
          <Addon>+</Addon>
        </Addons>
      </StakeItem>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>FILEDOGE Earned</ItemLabel>
          <ItemAmount>0.00000</ItemAmount>
          <ItemUnit>≈ $ 0.00</ItemUnit>
        </StakeAmount>
        <HarvestButton>Harvest</HarvestButton>
      </StakeItem>
    </StakesWrapper>
  );
}