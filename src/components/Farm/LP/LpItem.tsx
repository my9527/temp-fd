import React, { useMemo } from "react";
import { Wrapper, Header, Logo, Items, Item, ItemTitle, ItemValue,
   APRValue, Staking, Addons, Addon, AddonImg, Bg } from './styledComps';
import CommingSoon from '../CommingSoon';
import LPLogo from '../assets/lp-logo.svg';
// import TipIcon from '../assets/tip-icon.svg';
import AddonIcon from '../assets/addon-icon.svg';
import LPBg from '../assets/bg.png';
import AddLiquidity from './AddLiquidity';
import { usePair } from "../../../data/Reserves";
import { ChainId, Token } from "my-uniswap-sdk";
import { useActiveWeb3React } from "../../../hooks";
import { useFarmContract } from "../../../hooks/useContract";
import { toCurrencyAmount, useFilPerToken, useUSD } from "./constant";
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
// import { MouseoverTooltip } from "../../Tooltip";
import { parseEther } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import QuestionHelper from "../../QuestionHelper";
// import { BigNumber } from "ethers";
// import { parseEther } from "@ethersproject/units";

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
  const { result: filedogePerBlock} = useSingleCallResult(farmContract??undefined, "filedogePerBlock", ['true']);
  let rewardDebt = _userInfo && _userInfo?.rewardDebt?.toString() || '0'
  let stakeAmount = _userInfo && _userInfo?.amount.toString() || '0'

  const lpTotal = useTotalSupply(lp?.liquidityToken);

  const fileDogePrice = useFilPerToken(pair[0], chainId || ChainId.FILE)

  const lpPrice = useLPPrice(lp, lpTotal, filPrice);

  const totalStaked = poolInfo?.totalBoostedShare && toCurrencyAmount(poolInfo?.totalBoostedShare?.toString() || '0');

  // 以fil 来计算
  //  出块数 * 单块奖励 * filPerToken(单价) * 2880(每日出块数) * 365 / (lp price *  lp staked)
  const calAPR = useMemo(() => {

    

    const _lpPrice = parseEther(lpPrice?.toFixed(18) || '0'); // wei fil
    let totalStakedVal = _lpPrice?.mul(totalStaked?.toFixed(0) || '0');// 个数 
    let _totalStake = new BigNumber(totalStakedVal.toString());
    if(_totalStake.eq('0')){
      _totalStake = new BigNumber('10000000000000000000');
    }
    const _aa = toCurrencyAmount(filedogePerBlock?.amount.toString() || '0'); // 单块数
    const _perblock =  new BigNumber(_aa?.toFixed(0));
    const _filedogePrice = parseEther(fileDogePrice?.toFixed(18) || '0').toString()

    if(!lpPrice || !totalStaked || !filedogePerBlock || !fileDogePrice) {
      return '0';
    }

    const _arp = _perblock.multipliedBy(_filedogePrice).multipliedBy(105120000).dividedBy(_totalStake.toString() || new BigNumber('10000000000000000000'))

    // const _arp = _perblock.mul(_filedogePrice).mul(BigNumber.from('105120000')).div(totalStakedVal.toString() || BigNumber.from('10000000000000000000'));
    // if(_arp.lt(BigNumber.from("1"))) {
    //   return "0";
    // }

    // const _testr = new BigNumber("10")

    const _apy = _arp.div(100).div(10).plus(1).exponentiatedBy(10);  
    return _apy.multipliedBy(100).plus(30).toFixed(2);
  // return fileDogePrice?.multiply(perBlock).multiply('2880').multiply('365').divide(_total || '1').divide(lpPrice?.toFixed(8) || '1').divide('10000')
  }, [totalStaked, fileDogePrice, lpPrice, filedogePerBlock]);


  return (
    <React.Fragment>
      <Wrapper>
        <Header>
          <Logo src={LPLogo} />
          <Items>
            <Item>
              <ItemTitle>APY</ItemTitle>
              <APRValue>{calAPR}%</APRValue>
            </Item>
            <Item>
              <ItemTitle>History(FILEDOGE)</ItemTitle>
              <ItemValue>{toCurrencyAmount(rewardDebt).toFixed(2) || '0.00'}</ItemValue>
              {/* <div>≈ $ {fileDogePrice && rewardDebt ? formatEther(fileDogePrice?.multiply(rewardDebt?.toString()).toSignificant(6) || '0') : '0'}</div> */}
              {/* <div>≈ $ {useUSD(+(fileDogePrice?.toSignificant(8) || '0'), rewardDebt?.toString())}</div> */}
            </Item>
            <Item>
              <ItemTitle>Liquidity(LP)</ItemTitle>
              <ItemValue>$ {useUSD(lpPrice, totalStaked ? totalStaked?.toFixed(2) : 0)}</ItemValue>
              {/* <ItemValue>{ totalStaked?.toFixed(2) || '-'}</ItemValue> */}
              {/* <div>≈ $ {useUSD(lpPrice, totalStaked?.toFixed(2) || '0.00')}</div> */}
            </Item>
            <Item>
              <ItemTitle>Multiplier</ItemTitle>
              <ItemValue>
                {poolInfo?.allocPoint?.toNumber()}x
                <QuestionHelper  text="The Multiplier represents the proportion of FILEDOGE rewards each farm receives, as a proportion of the FILEDOGE produced each block.
For example, if a 1x farm received 1 FILEDOGE per block, a 40x farm would receive 40 FILEDOGE per block." />
                
              </ItemValue>
            </Item>
          </Items>
        </Header>
        <Staking>
          <Addons>
            <HistoryLink target="_blank" style={{ textDecoration: "none"}} to="/pool">
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