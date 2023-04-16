import React, { useCallback, useMemo, useState } from 'react';
import { 
  Modal, ModalContent, Header, Title, CloseIcon, DesArea,
  Logo, Des, StakeLabel, StakeInput, InputInner, AddonAfter,
  BalanceArea, BalanceLabel, BalanceTotal, Total, TotalAmount, TotalUnit,
  // Amounts, Amount, 
  StakeButton, AddonWrapper, Addon, AddonImg
} from './styledComps';
import CloseImg from './close-icon.svg';
import LogoSvg from './logo.svg';
import DesBg from './des-bg.svg';
import AddonIcon from '../../assets/addon-icon.svg';
import { useFarmContract } from '../../../../hooks/useContract';
import { useTransactionAdder } from '../../../../state/transactions/hooks';
import { Fraction, Token, TokenAmount, Pair } from 'my-uniswap-sdk';
import { utils } from 'ethers';
import { useTokenAllowance } from '../../../../data/Allowances';
import { toCurrencyAmount } from '../constant';
import { parseEther, formatEther } from '@ethersproject/units';
import { useApproveCallback, ApprovalState } from '../../../../hooks/useApproveCallback';
import { Link as HistoryLink } from 'react-router-dom';




enum StakeType {
  MORE = "more",
  LESS = "less",
}

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
  type?: StakeType | string;
  staked: string;
  lpBalance: TokenAmount | undefined;
  lpToken: Token | undefined;
  account?: null | string; 
  pid: number |string
  lpPrice: Fraction | number | string | undefined | null
  fileDogePrice: Fraction | string | undefined | null
  lp: Pair | null
}

export default function StakeDialog({ pid, isOpen, onDismiss, type, staked, lpBalance, lpToken, account, lpPrice, lp }: ModalProps) {

  const farmContract = useFarmContract(true);
  const addTransaction = useTransactionAdder();
  const [ inputAmount, setInputAmount ] = useState('')

  const isStake = type === StakeType.MORE;

  const allowance = useTokenAllowance(lpToken, account??undefined, farmContract?.address);

  const [approvalLp, approveACallback] = useApproveCallback( 
    new TokenAmount(lpToken as any as Token, 
    parseEther(inputAmount || '0').toString()) , 
    farmContract?.address);

  const closeModal = useCallback(() => {
    setInputAmount("");
    onDismiss();
  }, []);
  
  const handleClick = useCallback(() => {
    async function _init() {
      const methodName = type === StakeType.LESS ? 'unstake':'stake';
      if(!farmContract || !inputAmount) {
        return;
      }
      // const parsedAmount = tryParseAmount(inputAmount, WETH[chainId])
      // console.log('parsedAmount', utils.parseEther(parsedAmount?.toExact() || '0'));
      farmContract[methodName](pid, utils.parseEther(inputAmount || '0').toString()).then((response:any) => {
        addTransaction(response);
        closeModal();
      });
    }
    _init()
  }, [type, inputAmount]);

  const setMax = useCallback(() => {
    // console.log('lpBalance?.toExact()', staked, lpBalance?.toExact());
    setInputAmount(type === StakeType.LESS ? utils.formatEther(staked) : (lpBalance?.toExact() || ''));
  }, [type, lpBalance, staked]);

  const UsrButton = useMemo(() => {

    // return;
    const _stake = toCurrencyAmount(parseEther(staked.toString()).toString());
    const _input = toCurrencyAmount(parseEther((inputAmount || "0").toString()).toString());

    if(!inputAmount) {
      return <StakeButton disabled>Enter an amount</StakeButton>
    }
    if(+inputAmount === 0) {
      return <StakeButton disabled>Insufficient amount</StakeButton>
    }
    //
    if(type === StakeType.LESS){
      return  !_stake.lessThan(_input) ? <StakeButton onClick={handleClick}>unstake</StakeButton> : <StakeButton disabled>Insufficient  balance</StakeButton>
    } else {
      const isLessThanBalance = lpBalance?.greaterThan(_input) || lpBalance?.equalTo(_input);
      const isApproved = approvalLp === ApprovalState.APPROVED;

      if(approvalLp === ApprovalState.PENDING) {
        return <StakeButton>approving</StakeButton>
      }

      if(isLessThanBalance && isApproved) {
          return <StakeButton onClick={handleClick}>stake</StakeButton>
      } else if(isLessThanBalance && !isApproved) {
        return <StakeButton onClick={approveACallback}>approve</StakeButton>
      } else  {
        return <StakeButton disabled>Insufficient LP balance</StakeButton>
      }

    }

    

  }, [allowance, lpBalance, lpToken, inputAmount, type, approvalLp, handleClick, approveACallback]);
  

  

  const balanceNum = isStake ? lpBalance?.toSignificant(2) : new Number(formatEther(staked)).toFixed(2);

  return (
    <Modal isOpen={isOpen} onDismiss={closeModal}>
      <ModalContent>
        <Header>
          <Title>{ isStake ? 'Stake FILEDOGE-FILE LP tokens' : 'Unstake FILEDOGE-FILE LP tokens' }</Title>
          <CloseIcon src={CloseImg} onClick={onDismiss} />
        </Header> 
        <DesArea>
          <Logo src={LogoSvg} />
          <Des style={{ backgroundImage: `url(${DesBg})`, backgroundSize:'cover' }}>
            {isStake ? 'When you farm, you can not only earn the original rewards for adding liquidity, but also additional rewards for farming':
            'You may add or remove liquidity on the position detail page without unstake'}
          </Des>    
        </DesArea>
        <StakeLabel>{isStake ? 'Want Stake' : 'Want Unstake'}</StakeLabel>
        <StakeInput>
          <InputInner onUserInput={setInputAmount} value={inputAmount} />
          <AddonAfter onClick={setMax}>MAX</AddonAfter>
        </StakeInput>
        <BalanceArea>
          <BalanceLabel>Balance</BalanceLabel>         
          <BalanceTotal>
            <Total>
              <TotalAmount>{balanceNum}</TotalAmount>
              <TotalUnit>≈ $ { new Number(+(lpPrice || 0) * +(balanceNum || 0)).toFixed(2) }</TotalUnit>
            </Total>
            {/* <Amounts>
              <Amount>3.07 FILEDOGE</Amount>
              <Amount>0.03 FILE</Amount>
            </Amounts> */}
          </BalanceTotal>
        </BalanceArea>
        {/* <WalletApprove>
          <ApproveAmountArea>
            <ApproveLabel>Wallet Approved</ApproveLabel>
            <ApprovedAmountLine>
              <ApprovedAmount>12000</ApprovedAmount>
              <ApproveNeedAmount>&nbsp;/ 10000</ApproveNeedAmount>
            </ApprovedAmountLine>
          </ApproveAmountArea>
          <ApproveButton>Approve</ApproveButton>
        </WalletApprove> */}
        {/* <StakeButton onClick={handleClick}>{ type === StakeType.LESS ? 'unstake' : 'stake'}</StakeButton> */}
        {UsrButton}
        <AddonWrapper>
          {isStake ? 
          <HistoryLink to="/pool" style={{ textDecoration: 'none' }}>
               <Addon>
            ADD FILEDOGE-FILE LP
            <AddonImg src={AddonIcon} />
          </Addon>
          </HistoryLink>
          : <span style={{ fontSize: '12px', color:"rgba(18,19,24,0.6)" }}>unstake will also automatically harvest any earnings that you haven't collected yet,and send them to you wallet</span>}
        </AddonWrapper>
      </ModalContent>
    </Modal>
  );
}