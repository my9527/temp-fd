import React, { useCallback, useMemo, useState } from 'react';
import { Modal, ModalContent, Header, Title, CloseIcon, DesArea,
  Logo, Des, StakeLabel, StakeInput, InputInner, AddonAfter,
  BalanceArea, BalanceLabel, BalanceTotal, Total, TotalAmount, TotalUnit,
  Amounts, Amount, StakeButton, AddonWrapper, Addon, AddonImg
} from './styledComps';
import CloseImg from './close-icon.svg';
import LogoSvg from './logo.svg';
import DesBg from './des-bg.svg';
import AddonIcon from '../../assets/addon-icon.svg';
import { useFarmContract } from '../../../../hooks/useContract';
import { useTransactionAdder } from '../../../../state/transactions/hooks';
import { Token, TokenAmount } from 'my-uniswap-sdk';
import { utils } from 'ethers';
import { useTokenAllowance } from '../../../../data/Allowances';
import { toCurrencyAmount } from '../constant';
import { parseEther } from '@ethersproject/units';
import { useApproveCallback, ApprovalState } from '../../../../hooks/useApproveCallback';




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
}

export default function StakeDialog({ pid, isOpen, onDismiss, type, staked, lpBalance, lpToken, account }: ModalProps) {

  const farmContract = useFarmContract(true);
  const addTransaction = useTransactionAdder();
  const [ inputAmount, setInputAmount ] = useState('')

  const allowance = useTokenAllowance(lpToken, account??undefined, farmContract?.address);

  const [approvalLp, approveACallback] = useApproveCallback( 
    new TokenAmount(lpToken as any as Token, 
    parseEther(inputAmount || '0').toString()) , 
    farmContract?.address)
  
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
        onDismiss();
      });
    }
    _init()
  }, [type, inputAmount]);

  const setMax = useCallback(() => {
    setInputAmount(type === StakeType.LESS ? staked : (lpBalance?.toExact() || ''));
  }, [type, lpBalance]);

  const UsrButton = useMemo(() => {

    // return;
    const _stake = toCurrencyAmount(parseEther(staked.toString()).toString());
    const _input = toCurrencyAmount(parseEther((inputAmount || "0").toString()).toString());

    if(!inputAmount) {
      return <StakeButton disabled>Enter an amount</StakeButton>
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
  

  const closeModal = useCallback(() => {
    setInputAmount("");
    onDismiss();
  }, []);

  return (
    <Modal isOpen={isOpen} onDismiss={closeModal}>
      <ModalContent>
        <Header>
          <Title>Stake FILEDOGE-FILE LP tokens</Title>
          <CloseIcon src={CloseImg} onClick={onDismiss} />
        </Header> 
        <DesArea>
          <Logo src={LogoSvg} />
          <Des style={{ backgroundImage: `url(${DesBg})` }}>
            When you farm, you can not only earn the original rewards for adding liquidity, but also additional rewards for farming
          </Des>    
        </DesArea>
        <StakeLabel>Want Stake</StakeLabel>
        <StakeInput>
          <InputInner onUserInput={setInputAmount} value={inputAmount} />
          <AddonAfter onClick={setMax}>MAX</AddonAfter>
        </StakeInput>
        <BalanceArea>
          <BalanceLabel>Balance</BalanceLabel>         
          <BalanceTotal>
            <Total>
              <TotalAmount>{lpBalance?.toSignificant(6)}</TotalAmount>
              <TotalUnit>≈ $ 0.24</TotalUnit>
            </Total>
            <Amounts>
              <Amount>3.07 FILEDOGE</Amount>
              <Amount>0.03 FILE</Amount>
            </Amounts>
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
          <Addon>
            ADD FILEDOGE-FILE LP
            <AddonImg src={AddonIcon} />
          </Addon>
        </AddonWrapper>
      </ModalContent>
    </Modal>
  );
}