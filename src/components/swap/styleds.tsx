import { transparentize } from 'polished'
import React from 'react'
import { AlertTriangle } from 'react-feather'
import styled, { css } from 'styled-components'
import { Text } from 'rebass'
import { AutoColumn } from '../Column'

export const Wrapper = styled.div`
  position: relative;
`

export const ArrowWrapper = styled.div<{ clickable: boolean }>`
  padding: 2px;

  ${({ clickable }) =>
    clickable
      ? css`
          :hover {
            cursor: pointer;
            opacity: 0.8;
          }
        `
      : null}
`

export const SectionBreak = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.bg3};
`

export const BottomGrouping = styled.div`
  margin-top: 1rem;
`

export const ErrorText = styled(Text)<{ severity?: 0 | 1 | 2 | 3 | 4 }>`
  color: ${({ theme, severity }) =>
    severity === 3 || severity === 4
      ? theme.red1
      : severity === 2
      ? theme.yellow2
      : severity === 1
      ? theme.text1
      : theme.green1};
`

export const StyledBalanceMaxMini = styled.button`
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.bg2};
  border: none;
  border-radius: 50%;
  padding: 0.2rem;
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 0.4rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  :hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  :focus {
    background-color: ${({ theme }) => theme.bg3};
    outline: none;
  }
`

export const TruncatedText = styled(Text)`
  text-overflow: ellipsis;
  width: 220px;
  overflow: hidden;
`

// styles
export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

const SwapCallbackErrorInner = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.825rem;
  width: 100%;
  padding: 3rem 1.25rem 1rem 1rem;
  margin-top: -2rem;
  color: ${({ theme }) => theme.red1};
  z-index: -1;
  p {
    padding: 0;
    margin: 0;
    font-weight: 500;
  }
`

const SwapCallbackErrorInnerAlertTriangle = styled.div`
  background-color: ${({ theme }) => transparentize(0.9, theme.red1)};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 12px;
  min-width: 48px;
  height: 48px;
`

export function SwapCallbackError({ error }: { error: string }) {
  return (
    <SwapCallbackErrorInner>
      <SwapCallbackErrorInnerAlertTriangle>
        <AlertTriangle size={24} />
      </SwapCallbackErrorInnerAlertTriangle>
      <p>{error}</p>
    </SwapCallbackErrorInner>
  )
}

export const SwapShowAcceptChanges = styled(AutoColumn)`
  background-color: ${({ theme }) => transparentize(0.9, theme.primary1)};
  color: ${({ theme }) => theme.primary1};
  padding: 0.5rem;
  border-radius: 12px;
  margin-top: 8px;
`
export const SwapChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 678px;
  width: 100%;
  min-height: 420px;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: #FFFFFF;
`;

export const SwapChartHeader = styled.div`
  width: 100%;
  padding: 26px 24px 12px 24px;
  min-height: 120px;
  display: flex;
  justify-content: space-between;
`;

export const LeftPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const RightPart = styled(LeftPart)`
  width: 50%;
`;

export const SymbolName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
`;

export const PriceLine = styled.div`
  display: flex;
  align-items: center;
`;

export const Price = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: #000;
`;

export const ChangeRate = styled.div`
  margin-left: 9px;
  font-size: 14px;
  font-weight: 500;
  color: #36CE93;
  .dec {
    color: red;
  }
`;

export const Time = styled.div`
  font-size: 12px;
  color: #000000;
  opacity: 0.4;
`;

export const PartLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ValuePart = styled.div``;

export const PartLabel = styled.div`
  font-size: 12px;
  color: #000000;
  opacity: 0.4;
  line-height: 150%;
`;

export const PartValue = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  line-height: 150%;
`;

export const PartValueAddress = styled(PartValue)`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const SwapChartContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  background: #141c1c;
`;

export const SwapHistoryWrapper = styled.div`
  max-width: 1200px;
  padding: 32px;
  width: 100%;
  min-height: 667px;
  background: #FFFFFF;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 20px;
`;

export const Tabs = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

export const Tab = styled.div<any>`
  margin-right: 48px;
  font-size: 18px;
  color: ${props => props.selected ? '#000' : 'rgba(0, 0, 0, 0.6)'};
  font-weight: ${props => props.selected ? 500 : 400};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableHeader = styled.thead`
  tr {
    td {
      font-size: 12px;
      color: rgba(18, 19, 24, 0.6);
    }
  }
`;

export const Tr = styled.tr`
  
`;

export const Td = styled.td`
  padding: 17.5px 0;
  border-bottom: 1px solid #F6F7FB;
  font-size: 14px;
  color: #121318;
  &:last-of-type {
    text-align: right;
  }
  &.Buy {
    color: #36CE93;
  }
  &.Sell {
    color: #F23A00;
  }
`;

export const PaginationWrapper = styled.div`
  padding: 27px;
  display: flex;
  justify-content: center;
`;

export const Pagination = styled.div`
  display: flex;
`;

export const Page = styled.div`
  width: 32px;
  height: 32px;
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #121318;
  border: 1px solid #121318;
  border-radius: 6px;
  cursor: pointer;
  &.selected {
    font-weight: 500;
    border-color: #FFAD06;
    color: #FFAD06;
  }
  .gt {
    display: none;    
  }
  &:hover {
    opacity: 0.8;
   .gt {
      display: inline-block;    
    } 
    .dot {
      display: none;
    }
  }
`;

export const SwapChartChartWrapper = styled.div`
  position: relative;
  flex: 1;
  background: #141c1c;
`;

export const TimeBox = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  border: 1px solid #434651;
  border-radius: 8px;
  margin-bottom: 16px;
  max-width: max-content;
  padding: 2px;
  z-index: 10;
`;

export const TimeItem = styled.button`
  background-color: initial;
  color: #d1d4dc;
  border-radius: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  height: 34px;
  min-width: 34px;
  padding: 0 12px;
  margin-left: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  &.selected {
    background-color: #142e61;
    color: #bbd9fb;
  }
  &:hover {
    background-color: #2a2e39;
    color: #d1d4dc;
  }
  &:first-of-type {
    margin-left: 0;
  }
`;