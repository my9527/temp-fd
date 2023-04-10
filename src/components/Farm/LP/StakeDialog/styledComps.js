import CusModal from '../../../Modal';
import styled from 'styled-components';

export const Modal = styled(CusModal)`
  max-width: 450px !important;
  max-height: unset !important;
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 20px;
  line-height: 23px;
  font-weight: 500;
  color: #000;
`;

export const CloseIcon = styled.img`
  width: 34px;
  height: 34px;
  cursor: pointer;
`;

export const DesArea = styled.div`
  margin-top: 30px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 62px;
`;

export const Des = styled.div`
  max-width: 316px;
  font-size: 13px;
  line-height: 150%;
  padding: 12px 12px 12px 24px;
  letter-spacing: -0.5px;
  color: #000000;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

export const StakeLabel = styled.label`
  font-size: 14px;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.6);
`;

export const StakeInput = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px; 
`;

export const InputInner = styled.input`
  text-indent: 16px;
  flex: 1;
  height: 100%;
  background: transparent;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  outline: none;
  border: none;
`;

export const AddonAfter = styled.div`
  font-size: 16px;
  line-height: 150%;
  font-weight: 500;
  color: #FFAD06;
  cursor: pointer;
`;

export const BalanceArea = styled.div`
  margin-top: 24px;
`;

export const BalanceLabel = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.6);
`;

export const BalanceTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Total = styled.div`
  display: flex;
`;

export const TotalAmount = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  line-height: 150%;
`;

export const TotalUnit = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4px;
  font-size: 13px;
  font-weight: 400;
  color: #000;
  opacity: 0.4;
`;

export const Amounts = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: 400;
  color: #000;
  opacity: 0.4;
`;

export const Amount = styled.div`
  margin-left: 12px;
`;

export const WalletApprove = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
`;

export const ApproveAmountArea = styled.div``;

export const ApproveLabel = styled.label`
  font-size: 14px;
  line-height: 150%;
  color: rgba(0, 0, 0, 0.6);
`;

export const ApprovedAmountLine = styled.div`
  margin-top: 4px;
  display: flex;
  font-weight: 500;
`;

export const ApprovedAmount = styled.div`
  color: #FFB51F;
`;

export const ApproveNeedAmount = styled.div`
  color: #000;
`;

export const ApproveButton = styled.button`
  padding: 6px 24px;
  height: 32px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: #fff;
  opacity: 0.9;
  background: #FFAD06;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
`;


export const StakeButton = styled.button`
  width: 100%;
  margin-top: 24px;
  height: 48px;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  color: #fff;
  opacity: 0.9;
  background: #FFAD06;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
`;

export const AddonWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

export const Addon = styled.a`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 150%;
  font-weight: 500;
  color: #FFAD06;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const AddonImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
`;