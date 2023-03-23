import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink, useLocation } from 'react-router-dom'
// import { ExternalLink } from '../../theme'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'

import Settings from '../Settings'
import { isMobile } from 'react-device-detect'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 18px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }


  & + & {
    margin-left: 3rem;
  }
`

const ActiveText = styled.h1`
  font-weight: 500;
  font-size: 20px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

// const StyledTitle = styled.span`
//   font-weight: 500;
//   font-size: 24px;
//   line-height: 150%;
// `
const StyledTitleH1 = styled.h1`
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;
`

const MobileTabs = styled(Tabs)`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const PcTabs = styled(Tabs) <{ position: 'nav' | 'form' }>`
  margin-bottom: 20px;
  display: ${({ position }) => position === 'nav' ? 'flex' : 'none'};
  ${({ theme, position }) => theme.mediaWidth.upToExtraSmall`
    display: ${position === 'nav' ? 'none' : 'flex'};
  `};
`

const toast = (msg: string) => {
  let target = document.createElement("div");
  target.innerHTML = `<div style=" color: white;padding: 12px 24px; border-radius: 4px">${msg}</div>`;
  target.classList.add("toast")
 
  document.body.append(target);
  setTimeout(() => {
    try{
      target && target.remove();
    } catch(e){
      console.log(e);
    }
  }, 1000)
}

// const StyledMenuButton = styled.button`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   border: none;
//   background-color: transparent;
//   margin: 0;
//   padding: 0;
//   height: 35px;
//   background-color: ${({ theme }) => theme.bg3};

//   padding: 0.15rem 0.5rem;
//   border-radius: 0.5rem;

//   :hover,
//   :focus {
//     cursor: pointer;
//     outline: none;
//     background-color: ${({ theme }) => theme.bg4};
//   }

//   svg {
//     margin-top: 2px;
//   }
// `
// const StyledMenuIcon = styled(Settings)`
//   height: 20px;
//   width: 20px;

//   > * {
//     stroke: ${({ theme }) => theme.text1};
//   }
// `

// const HomeLink = styled(ExternalLink)`
//   color: #888D9B;
//   font-size: 18px;
//   text-decoration: none;
//   font-weight: normal;
//   margin-right: 3rem;
//   outline: none;
//   cursor: pointer;
//   text-decoration: none;
//   :hover,
//   :focus {
//     color: ${({ theme }) => darken(0.1, theme.text1)};
//     text-decoration: none;
//   }
// `



export function SwapPoolTabs({ active, position }: { active: 'swap' | 'pool', position: 'nav' | 'form' }) {
  const { t } = useTranslation()
  const location = useLocation()

  const curPath = location.pathname;

  const showMessge = () => {
    toast("Coming soon!")
  }

  return (
    <PcTabs position={position} style={{ marginBottom: '20px' }}>
      <StyledNavLink onClick={(e) => {
        e.preventDefault(); 
        window.location.href="https://filedoge.io"
      }}  to={'/'} isActive={() => false}>
        Home
      </StyledNavLink>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'}  isActive={() => curPath === '/swap'}>
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => curPath === '/pool'}>
        {t('pool')}
      </StyledNavLink>
      <StyledNavLink onClick={showMessge}  aria-disabled id={`nft-nav-link`} to={'/nft'} isActive={() => curPath === '/nft'}>
        NFTs
      </StyledNavLink>
    </PcTabs>
  )
}

export function SwapPoolTabsNew({ type }: { type: 'swap' | 'pool' }) {
  return (
    <MobileTabs >
      <StyledTitleH1>{type === 'swap' ? 'Swap' : 'Pool'}</StyledTitleH1>
      {!isMobile && <Settings />}
    </MobileTabs>
  )
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </RowBetween>
    </Tabs>
  )
}
