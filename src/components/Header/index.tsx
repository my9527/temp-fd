import { ChainId } from 'my-uniswap-sdk'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { Text } from 'rebass'

import styled from 'styled-components'

import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/svg/logo_white.svg'
// import Wordmark from '../../assets/svg/wordmark.svg'
// import WordmarkDark from '../../assets/svg/wordmark_white.svg'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'

// import { YellowCard } from '../Card'
import Settings from '../Settings'
import Menu from '../Menu'
import NetworkMenu from '../NetworkMenu'

import Row, { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
// import VersionSwitch from './VersionSwitch'

import { SwapPoolTabs } from '../NavigationTabs'

const HeaderFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    padding: 12px 0 0 0;
    width: calc(100%);
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
`

// const ReactiveSetting = styled(Settings)`
//   display: block;
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//      display: none;
//   `};

// `

// const HeaderElementTabs = styled(HeaderElement)`
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//   display: none;
//   `};
// `

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 0.5rem;
`};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  text-decoration: none;

  :hover {
    cursor: pointer;
  }
`

const TitleText = styled(Row)`
  width: fit-content;
  white-space: nowrap;
  color: white;
  font-weight: 500;
  margin-left: 8px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;
`

// const NetworkCard = styled(YellowCard)`
//   width: fit-content;
//   margin-right: 10px;
//   border-radius: 12px;
//   padding: 8px 12px;
//   cursor: pointer;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 14px;
//   line-height: 150%;
//   letter-spacing: 0.2px;

//   color: #000000;


// `

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  img{ 
    width: 43.2px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    img { 
      width: 36px;
    }
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    align-items: flex-end;
  `};
`

const LeftControls = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: center;
`

// const LItem = styled.div`
//   font-style: normal;
//   font-weight: 400;
//   font-size: 18px;
//   line-height: 150%;
//   /* identical to box height, or 27px */

//   text-align: center;

//   color: #000000;

//   & + & {
//     margin-left: 62px;
//   }

// `

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NETWORK_LABELS: { [chainId in ChainId]: string | null } = {
  [ChainId.MAINNET]: null,
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FILE]: 'File Mainnet',
  [ChainId.FILEH]: 'Hyperspace',
}

export default function Header(props: any) {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [isDark] = useDarkModeManager()


  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }} padding="1rem 1rem 0 1rem">
        <HeaderElement style={{ width: "30%"}}>
          <Title href="https://www.filedoge.io">
            <UniIcon>
              <img src={isDark ? LogoDark : Logo} alt="logo" />
            </UniIcon>
            <TitleText>
              {/* <img style={{ marginLeft: '4px', marginTop: '4px' }} src={isDark ? WordmarkDark : Wordmark} alt="logo" /> */}
              <span style={{ color: isDark ? 'white' : 'black' }}>FILEDOGE</span>
            </TitleText>
          </Title>
        </HeaderElement>
        <HeaderElement style={{ flex: 1}}>
          <LeftControls>
            <SwapPoolTabs position="nav" active='swap'></SwapPoolTabs>
          </LeftControls>
        </HeaderElement>
        <HeaderControls style={{ width: "30%", justifyContent: 'flex-end'}}>
          <HeaderElement>
            <TestnetWrapper>
              {!isMobile && chainId && NETWORK_LABELS[chainId] && <NetworkMenu chainId={chainId} network={NETWORK_LABELS[chainId]}></NetworkMenu>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {account && userEthBalance && false ? (
                <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {chainId === 314 ? 'FIL' : 'TFIL'}
                </BalanceText>
              ) : null}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
          <HeaderElementWrap>
            {/* <VersionSwitch /> */}
            {isMobile && <Settings key="header-setting" />}
            <Menu />
          </HeaderElementWrap>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
