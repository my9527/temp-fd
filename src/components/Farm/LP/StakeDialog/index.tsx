import React, { useEffect, useCallback } from 'react';
import { Modal, ModalContent, Header, Title, CloseIcon, DesArea,
  Logo, Des, StakeLabel, StakeInput, InputInner, AddonAfter,
  BalanceArea, BalanceLabel, BalanceTotal, Total, TotalAmount, TotalUnit,
  Amounts, Amount, StakeButton, AddonWrapper, Addon, AddonImg, WalletApprove,
  ApproveAmountArea, ApproveLabel, ApprovedAmountLine, ApprovedAmount, ApproveNeedAmount,
  ApproveButton
} from './styledComps';
import CloseImg from '../assets/close-icon.svg';
import LogoSvg from '../assets/logo.svg';
import DesBg from '../assets/des-bg.svg';
import AddonIcon from '../assets/addon-icon.svg';
import { useLPTokenContract, useFarmContract } from '../../../../hooks/useContract';
import { FARM_ADDRESS } from '../../../../constants';

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
}

export default function Stake({ isOpen, onDismiss }: ModalProps) {
  const lpContract = useLPTokenContract();
  const farmContract = useFarmContract();

  // useEffect(() => {
  //   async function main() {
  //     const data = await lpContract?.approve(FARM_ADDRESS, 100);
  //   }
  //   main();
  // }, []);

  const stake = useCallback(async () => {
    const data = await farmContract?.stake(0, (20 * 1e18).toString());
  }, []);

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
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
          <InputInner />
          <AddonAfter>MAX</AddonAfter>
        </StakeInput>
        <BalanceArea>
          <BalanceLabel>Balance</BalanceLabel>         
          <BalanceTotal>
            <Total>
              <TotalAmount>123.35</TotalAmount>
              <TotalUnit>≈ $ 0.24</TotalUnit>
            </Total>
            <Amounts>
              <Amount>3.07 FILEDOGE</Amount>
              <Amount>0.03 FILE</Amount>
            </Amounts>
          </BalanceTotal>
        </BalanceArea>
        <WalletApprove>
          <ApproveAmountArea>
            <ApproveLabel>Wallet Approved</ApproveLabel>
            <ApprovedAmountLine>
              <ApprovedAmount>12000</ApprovedAmount>
              <ApproveNeedAmount>&nbsp;/ 10000</ApproveNeedAmount>
            </ApprovedAmountLine>
          </ApproveAmountArea>
          <ApproveButton>Approve</ApproveButton>
        </WalletApprove>
        <StakeButton onClick={stake}>Stake</StakeButton>
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