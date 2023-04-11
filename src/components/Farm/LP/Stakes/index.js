import React, { useState, useCallback, useEffect } from "react";
import { StakesWrapper, StakeItem, StakeAmount, ItemLabel, ItemAmount,
  ItemUnit, Addons, Addon, HarvestButton
} from './styledComps';
import { useFarmContract } from '../../../../hooks/useContract';
import { useActiveWeb3React } from '../../../../hooks';

export default function Stakes({ lpTokens, pairToken }) {
  const farmContract = useFarmContract();
  const [pendingCakes, setPendingCakes] = useState('');
  const { account } = useActiveWeb3React();

  useEffect(() => {
    async function main() {
      const data = await farmContract.pendingFileDoge(0, account);
      setPendingCakes(data.toString());
    }
    main();
  }, []);

  const harvest = useCallback(() => {

  }, []);
  

  return (
    <StakesWrapper>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>STAKED</ItemLabel>
          <ItemAmount>{lpTokens?.toSignificant(6)}</ItemAmount>
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
          <ItemAmount>{pendingCakes}</ItemAmount>
          <ItemUnit>≈ $ 0.00</ItemUnit>
        </StakeAmount>
        <HarvestButton onClick={harvest}>Harvest</HarvestButton>
      </StakeItem>
    </StakesWrapper>
  );
}