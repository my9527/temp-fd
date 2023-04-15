import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 32px;
  line-height: 48px;
  color: #FFAD06;
  font-weight: 500;
  margin: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 20px;
  `};
`;

export const Slogan = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 150%;
  color: #000;
  margin: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 24px;
  `};
`;

export const Des = styled.p`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin: 0;
  opacity: 0.4;
`;

export const Actions = styled.div`
  display: flex;
  margin-top: 20px;
  font-size: 13px;
  font-weight: 400;
  color: #000;
  line-height: 150%;
`;

export const Action = styled.a`
  display: flex;
  align-items: center;
  height: 26px;
  background: #fff;
  margin-right: 20px;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const ActionArrow = styled.img`
  margin-left: 8px;
  width: 12px;
  height: 12px;
`;