import React, { useEffect, useState } from "react";
import { Wrapper, Header, Logo, Items, Item, ItemTitle, ItemValue,
  TipImg, APRValue, Staking, Addons, Addon, AddonImg, Bg } from './styledComps';
import CommingSoon from '../CommingSoon';
import LPLogo from '../assets/lp-logo.svg';
import TipIcon from '../assets/tip-icon.svg';
import AddonIcon from '../assets/addon-icon.svg';
import LPBg from '../assets/bg.png';
import AddLiquidity from './AddLiquidity';
import { usePair } from "../../../data/Reserves";
import { Token } from "my-uniswap-sdk";
import { useActiveWeb3React } from "../../../hooks";
import { useFarmContract } from "../../../hooks/useContract";
import { toCurrencyAmount, useToSignificant } from "./constant";
import { useSingleCallResult } from "../../../state/multicall/hooks";

import { BigNumber } from "ethers";

type LPProps = {
  pair: Token[]
  pid: string | number
}

type PoolInfo = {
  allocPoint?: BigNumber
  totalBoostedShare?: BigNumber
}


export default function LpItem({ pair, pid }: LPProps) {

  const [, lp] = usePair(pair[0], pair[1]);
  const { account } = useActiveWeb3React();
  // const [earned, setEarned] = useState("");
  const [poolInfo, setPoolInfo] = useState({
    // allocPoint: '-',
    // totalBoostedShare: '-'
  } as PoolInfo);

  const farmContract =  useFarmContract();

  const { result: _userInfo } = useSingleCallResult(farmContract??undefined, "userInfo", [pid, account??undefined]);
  let rewardDebt = useToSignificant(_userInfo && _userInfo?.rewardDebt.toString() || '0')
  let stakeAmount = useToSignificant(_userInfo && _userInfo?.amount.toString() || '0')

  useEffect(() => {
    async function _init() {
      const result = await farmContract?.poolInfo(pid)
      console.log("result", result.allocPoint.toNumber() / 10);
      setPoolInfo(result)
    }
    if(account) {
      _init();
    }

  }, [account, pid]);

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
              <ItemTitle>Earned(Filedoge)</ItemTitle>
              <ItemValue>{rewardDebt || '-'}</ItemValue>
            </Item>
            <Item>
              <ItemTitle>Liquidity(LP)</ItemTitle>
              <ItemValue>{poolInfo.totalBoostedShare && toCurrencyAmount(poolInfo.totalBoostedShare?.toString()).toSignificant(6) || '-'}</ItemValue>
            </Item>
            <Item>
              <ItemTitle>Multiplier</ItemTitle>
              <ItemValue>
                {poolInfo.allocPoint?.toNumber()}x
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
          <AddLiquidity pid={pid} lp={lp} stakeInfo={{ stakeAmount, rewardDebt}} />
        </Staking>
        <CommingSoon />
        <Bg src={LPBg} />
      </Wrapper>
    </React.Fragment>
  );
}