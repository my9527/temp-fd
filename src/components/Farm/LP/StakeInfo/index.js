import React, { useCallback, useState } from "react";
import {
  StakesWrapper, StakeItem, StakeAmount, ItemLabel, ItemAmount,
  ItemUnit, Addons, Addon, HarvestButton
} from './styledComps';
import { useFarmContract } from "../../../../hooks/useContract";
import { useSingleCallResult } from "../../../../state/multicall/hooks";
import { useToSignificant, useUSD, toCurrencyAmount } from "../constant";
import { useTransactionAdder } from "../../../../state/transactions/hooks"; 

export default function StakeInfo({ staked, openStakeModal, account, pid, lpPrice, fileDogePrice }) {

  const farmContract = useFarmContract(true);
  const addTransaction = useTransactionAdder();
  const [isHavestLoading, setHavestLoading] = useState(false);
  

  const { error, result} = useSingleCallResult(farmContract??undefined, "pendingFileDoge", [pid, account]);
  const pendingRewards = result && result[0] || "0";
  // console.log("pendingRewards", pendingRewards)
  const pendingRd = useToSignificant(pendingRewards || '0');

  const harvest = useCallback(() => {
    async function _init(){
      console.log('harvest')
      if(!+pendingRd)return;
      setHavestLoading(true)
      try {
        await farmContract.harvest(pid).then(addTransaction);
        setHavestLoading(false)
      //  .then(reponse => {
      //     addTransaction(reponse);
      //     setHavestLoading(false)
      //  });
      } catch(e) {
        setHavestLoading(false)
      }
    }
    _init();
  }, [pendingRd]);

  return (
    <StakesWrapper>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>Staked</ItemLabel>
          <ItemAmount>{toCurrencyAmount(staked?.stakeAmount).toFixed(2) || '-'}</ItemAmount>
          {/* <ItemUnit>≈ $ {new Number(lpPrice * (useToSignificant(staked?.stakeAmount) || '0')).toFixed(2)}</ItemUnit> */}
          <ItemUnit>≈ $ {useUSD(lpPrice, useToSignificant(staked?.stakeAmount) || '0')}</ItemUnit>
        </StakeAmount>
        <Addons>
          <Addon onClick={() => openStakeModal("less")}>-</Addon>
          <Addon onClick={() => openStakeModal("more")}>+</Addon>
        </Addons>
      </StakeItem>
      <StakeItem>
        <StakeAmount>
          <ItemLabel>FILEDOGE Earned</ItemLabel>
          <ItemAmount>{toCurrencyAmount(pendingRewards || '0').toFixed(2)}</ItemAmount>
          {/* <ItemUnit>≈ $ {new Number((pendingRd || '0') * (fileDogePrice?.toSignificant(6) || '0')).toFixed(2)}</ItemUnit> */}
          <ItemUnit>≈ $ {useUSD(fileDogePrice?.toSignificant(6) || '0', pendingRd)}</ItemUnit>
        </StakeAmount>
        <HarvestButton disabled={isHavestLoading} onClick={harvest}>Harvest</HarvestButton>
      </StakeItem>
    </StakesWrapper>
  );
}