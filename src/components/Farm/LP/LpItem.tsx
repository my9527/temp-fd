import React from "react";
import { Wrapper, Header, Logo, Items, Item, ItemTitle, ItemValue,
  TipImg, APRValue, Staking, Addons, Addon, AddonImg, Bg } from './styledComps';
import CommingSoon from '../CommingSoon';
import LPLogo from '../assets/lp-logo.svg';
import TipIcon from '../assets/tip-icon.svg';
import AddonIcon from '../assets/addon-icon.svg';
import LPBg from '../assets/bg.png';
import AddLiquidity from './AddLiquidity';
import { usePair } from "../../../data/Reserves";
import { ChainId, Token } from "my-uniswap-sdk";
import { useActiveWeb3React } from "../../../hooks";
import { useFarmContract } from "../../../hooks/useContract";
import { toCurrencyAmount, useFilPerToken, useToSignificant, useUSD } from "./constant";
import { useSingleCallResult } from "../../../state/multicall/hooks";
// import { usePair } from "../../../data/Reserves";
// import { useTradeExactIn } from "../../../hooks/Trades";
// import { BigNumber } from "ethers";
// import { tryParseAmount } from "../../../state/swap/hooks";
// import { formatEther } from "@ethersproject/units";
import { useTotalSupply } from "../../../data/TotalSupply";
import { useFilUSDPrice } from "../../../hooks/price";
import { useLPPrice } from "./constant";
import { ExternalLink } from "../../../theme";
import { getEtherscanLink } from "../../../utils"; 
import { Link as HistoryLink } from 'react-router-dom'
import { MouseoverTooltip } from "../../Tooltip";

type LPProps = {
  pair: Token[]
  pid: string | number
  chainId: ChainId | undefined
}

// type PoolInfo = {
//   allocPoint?: BigNumber
//   totalBoostedShare?: BigNumber
// }


export default function LpItem({ pair, pid, chainId }: LPProps) {

  
  const [, lp] = usePair(pair[0], pair[1]);
  const { account } = useActiveWeb3React();


  const filPrice = useFilUSDPrice();

  const farmContract =  useFarmContract();

  const { result: _userInfo } = useSingleCallResult(farmContract??undefined, "userInfo", [pid, account??undefined]);
  const { result: poolInfo }  = useSingleCallResult(farmContract??undefined, "poolInfo", [pid])
  let rewardDebt = _userInfo && _userInfo?.rewardDebt?.toString() || '0'
  let stakeAmount = _userInfo && _userInfo?.amount.toString() || '0'

  const lpTotal = useTotalSupply(lp?.liquidityToken);

  const fileDogePrice = useFilPerToken(pair[0], chainId || ChainId.FILE)

  const lpPrice = useLPPrice(lp, lpTotal, filPrice);


  const totalStaked = poolInfo?.totalBoostedShare && toCurrencyAmount(poolInfo?.totalBoostedShare?.toString() || '0');

  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <Logo src={LPLogo} />
          <Items>
            <Item>
              <ItemTitle>APR</ItemTitle>
              <APRValue>30.00%</APRValue>
            </Item>
            <Item>
              <ItemTitle>Earned(Filedoge)</ItemTitle>
              <ItemValue>{+useToSignificant(rewardDebt, 6) || '-'}</ItemValue>
              {/* <div>≈ $ {fileDogePrice && rewardDebt ? formatEther(fileDogePrice?.multiply(rewardDebt?.toString()).toSignificant(6) || '0') : '0'}</div> */}
              <div>≈ $ {useUSD(+(fileDogePrice?.toSignificant(8) || '0'), rewardDebt?.toString())}</div>
            </Item>
            <Item>
              <ItemTitle>Liquidity(LP)</ItemTitle>
              <ItemValue>{ totalStaked?.toFixed(2) || '-'}</ItemValue>
              <div>≈ $ {useUSD(lpPrice, totalStaked?.toSignificant(6) || '0')}</div>
            </Item>
            <Item>
              <ItemTitle>Multiplier</ItemTitle>
              <ItemValue>
                {poolInfo?.allocPoint?.toNumber()}x
                <MouseoverTooltip placement="top" text="The Multiplier represents the proportion of FILEDOGE rewards each farm receives, as a proportion of the FILEDOGE produced each block.
For example, if a 1x farm received 1 FILEDOGE per block, a 40x farm would receive 40 FILEDOGE per block.">
                  <TipImg src={TipIcon} />
                </MouseoverTooltip>
              </ItemValue>
            </Item>
          </Items>
        </Header>
        <Staking>
          <Addons>
            <HistoryLink style={{ textDecoration: "none"}} to="/pool">
              <Addon>
                Add FILEDOGE-FILE LP
                <AddonImg src={AddonIcon} />
              </Addon>
            </HistoryLink>
            
            <Addon>
              <ExternalLink href={getEtherscanLink(chainId || ChainId.FILE, lp?.liquidityToken.address || '', 'address')}>
                View Contract
              </ExternalLink>
              <AddonImg src={AddonIcon} />
            </Addon>
          </Addons>
          <AddLiquidity lpPrice={lpPrice} fileDogePrice={fileDogePrice}  pid={pid} lp={lp} stakeInfo={{ stakeAmount, rewardDebt}} />
        </Staking>
        <CommingSoon />
        <Bg src={LPBg} />
      </Wrapper>
    </React.Fragment>
  );
}