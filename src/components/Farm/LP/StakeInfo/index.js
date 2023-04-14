import React, { useCallback } from "react";
import {
  StakesWrapper, StakeItem, StakeAmount, ItemLabel, ItemAmount,
  ItemUnit, Addons, Addon, HarvestButton
} from './styledComps';
import { useFarmContract } from "../../../../hooks/useContract";
import { useSingleCallResult } from "../../../../state/multicall/hooks";
import { useToSignificant } from "../constant";
import { useTransactionAdder } from "../../../../state/transactions/hooks"; 

export default function StakeInfo({ staked, openStakeModal, account, pid }) {

  const farmContract = useFarmContract(true);
  const addTransaction = useTransactionAdder();
  

  const { error, result} = useSingleCallResult(farmContract??undefined, "pendingFileDoge", [pid, account]);
  const pendingRewards = result && result[0] || "0";
  // console.log("pendingRewards", pendingRewards)
  const pendingRd = useToSignificant(pendingRewards || '0');

  const harvest = useCallback(() => {
    async function _init(){
       farmContract.unstake(pid, 0)
       .then(reponse => {
          addTransaction(reponse);
       });
    }
    _init();
  }, []);

  return (
    <StakesWrapper>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>STAKED</ItemLabel>
          <ItemAmount>{staked?.stakeAmount || '-'}</ItemAmount>
          <ItemUnit>≈ $ 100</ItemUnit>
        </StakeAmount>
        <Addons>
          <Addon onClick={() => openStakeModal("less")}>-</Addon>
          <Addon onClick={() => openStakeModal("more")}>+</Addon>
        </Addons>
      </StakeItem>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>FILEDOGE Earned</ItemLabel>
          <ItemAmount>{pendingRd}</ItemAmount>
          <ItemUnit>≈ $ 0.00</ItemUnit>
        </StakeAmount>
        <HarvestButton onClick={harvest}>Harvest</HarvestButton>
      </StakeItem>
    </StakesWrapper>
  );
}