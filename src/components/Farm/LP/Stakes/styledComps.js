import styled from 'styled-components';

export const StakesWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const StakeItem = styled.div`
  max-width: 432px;
  padding: 0 20px;
  width: 100%;
  height: 110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 12px;
  &:last-of-type {
    margin-left: 24px;
  }
`;

export const StakeAmount = styled.div``;

export const ItemLabel = styled.label`
  font-size: 13px;
  line-height: 150%;
  color: rgba(18, 19, 24, 0.6);
`;

export const ItemAmount = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #000000;
`;

export const ItemUnit = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  color: #000000;
  opacity: 0.4;
`;

export const Addons = styled.div`
  display: flex;
`;

export const Addon = styled.button`
  width: 40px;
  height: 40px;
  font-size: 20px;
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
  &:last-of-type {
    margin-left: 24px;
  }
`;

export const HarvestButton = styled.button`
  width: 115px;
  height: 40px;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  color: ${props => props.disabled ? 'rgba(0, 0, 0, 0.24)' : '#fff'};
  opacity: 0.9;
  background: ${props => props.disabled ? '#EEF0F2' : '#FFAD06'};
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    opacity: 0.8;
  }
`;