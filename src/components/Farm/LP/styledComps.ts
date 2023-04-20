import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 516px;
  margin-top: 54px;
  max-width: 1200px;
  width: 100%;
  border-radius: 20px;
  border: 2px solid #000;
  background: #fff;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin-top: 100px;
  `};
`;

export const Bg = styled.img`
  position: absolute;
  top: -232px;
  right: 0;
  width: 438px;
  z-index: -1;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 196px;
    right: auto;
    left: 0px;
    top: -80px;
  `};
`;

export const Header = styled.div`
  height: 114px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: unset;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px 16px 12px 16px;
  `};
`;

export const Logo = styled.img`
  width: 234px;
`;

export const Items = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 625px;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    margin-top: 12px;
  `};
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 50%;
  `};
`;

export const ItemTitle = styled.div`
  font-size: 13px;
  line-height: 150%;
  font-weight: 400;
  color: rgba(18, 19, 24, 0.6);
`;

export const ItemValue = styled.div`
  font-size: 20px;
  line-height: 150%;
  color: #121318;
  font-weight: 500;
`;

export const APRValue = styled(ItemValue)`
  color: #FFB51F;
`;

export const TipImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  cursor: pointer;
`;

export const Staking = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 158px;
  background: #f6f6f6;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: unset;
    padding: 0;
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 16px;
    background: #F8F9FB;
  `};
`;

export const Addons = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  font-weight: 500;
`;

export const Addon = styled.a`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 150%;
  color: #FFAD06;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:last-of-type {
    margin-top: 20px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    &:last-of-type {
      margin-top: 8px;
    }
  `};
`;

export const AddonImg = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 4px;
`;

interface FarmingProps {
  hasStake: boolean,
}

export const Farming = styled.div`
  max-width: ${(props: FarmingProps) => props.hasStake ? 'unset' : ' unset'};
  width: 100%;
`;

export const FarmingTitle = styled.div`
  font-size: 13px;
  line-height: 150%;
  font-weight: 400;
  color: rgba(18, 19, 24, 0.6);
`;

export const FarmingButton = styled.button`
  width: 100%;
  margin-top: 12px;
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
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-bottom: 12px;
  `};
`;

