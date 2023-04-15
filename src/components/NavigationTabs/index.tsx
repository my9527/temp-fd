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
import { MEDIA_WIDTHS } from '../../theme'

const FarmIcon = ({ width = "25", height = "24", fill = "black", ...other }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      {...other}
    >
      <g opacity="0.6">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 21.75a.75.75 0 0 0 0-1.5 8.25 8.25 0 1 1 7.481-11.733.75.75 0 0 0 1.36-.634A9.751 9.751 0 0 0 12.5 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75Zm3.75-3.5c0-.934.18-1.303.476-1.521.378-.279 1.15-.479 2.774-.479s2.396.2 2.774.479c.296.218.476.587.476 1.521 0 .934-.18 1.303-.476 1.521-.378.279-1.15.479-2.774.479s-2.396-.2-2.774-.479c-.296-.218-.476-.587-.476-1.521Zm3.25-3.5c-.444 0-.86.013-1.244.044.008-.36.023-.664.05-.925.043-.422.112-.663.185-.806a.401.401 0 0 1 .226-.21c.137-.058.371-.103.783-.103.412 0 .646.045.783.102a.401.401 0 0 1 .226.211c.073.143.142.384.186.806.026.26.041.566.049.925-.385-.03-.8-.044-1.244-.044Zm-3.664.771c.262-.193.567-.341.916-.454.005-.51.021-.96.061-1.35.05-.492.144-.954.346-1.343.217-.42.543-.724.98-.906.407-.17.873-.218 1.361-.218s.954.049 1.36.218c.438.182.764.487.981.906.202.39.295.85.346 1.342.04.391.056.842.061 1.35.348.114.654.262.916.455.891.657 1.086 1.663 1.086 2.729s-.195 2.072-1.086 2.729c-.81.596-2.038.771-3.664.771-1.626 0-2.854-.175-3.664-.771-.891-.657-1.086-1.663-1.086-2.729s.195-2.072 1.086-2.729Zm-2.099-6.173a1.75 1.75 0 0 0-2.474 0l-1.415 1.415a1.75 1.75 0 0 0 0 2.474l1.415 1.415a1.75 1.75 0 0 0 2.474 0l1.415-1.415a1.75 1.75 0 0 0 0-2.474l-1.415-1.415Zm-1.414 1.061a.25.25 0 0 1 .354 0l1.414 1.414a.25.25 0 0 1 0 .354l-1.414 1.414a.25.25 0 0 1-.354 0l-1.414-1.414a.25.25 0 0 1 0-.354l1.414-1.414Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

const PoolIcon = ({ width = "25", height = "24", ...other }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      {...other}
    >
      <g opacity="0.6" clipRule="evenodd">
        <path d="M12.5 21.75a.75.75 0 0 0 0-1.5 8.25 8.25 0 1 1 7.481-11.733.75.75 0 0 0 1.36-.634A9.751 9.751 0 0 0 12.5 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75Zm1.237-12.402a1.75 1.75 0 0 0-2.474 0l-1.415 1.415a1.75 1.75 0 0 0 0 2.474l1.415 1.415a1.75 1.75 0 0 0 2.474 0l1.415-1.415a1.75 1.75 0 0 0 0-2.474l-1.415-1.415Zm-1.414 1.061a.25.25 0 0 1 .354 0l1.414 1.414a.25.25 0 0 1 0 .354l-1.414 1.414a.25.25 0 0 1-.354 0l-1.414-1.414a.25.25 0 0 1 0-.354l1.414-1.414Z" />

        <path d="M20.97 11.47a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 0 1-.53 1.28h-7a.75.75 0 0 1 0-1.5h5.19l-1.22-1.22a.75.75 0 0 1 0-1.06Zm-5.663 5.743A.75.75 0 0 1 16 16.75h7a.75.75 0 0 1 0 1.5h-5.19l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1-.163-.817Z" />
      </g>
    </svg>
  );
};

const SwapIcon = ({ width = "25", height = "24", ...other }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      {...other}
    >
      <path
        clipRule="evenodd"
        d="M20.31 8.25a.73.73 0 0 1-.027 0H16.5a.75.75 0 0 1 0-1.5h2.364A8.25 8.25 0 0 0 4.25 12a.75.75 0 0 1-1.5 0 9.75 9.75 0 0 1 9.75-9.75 9.726 9.726 0 0 1 7.25 3.23V3.5a.75.75 0 0 1 1.5 0v4a.75.75 0 0 1-.75.75h-.19Zm-14.174 9A8.25 8.25 0 0 0 20.75 12a.75.75 0 0 1 1.5 0 9.75 9.75 0 0 1-9.75 9.75 9.726 9.726 0 0 1-7.25-3.23v1.98a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H6.136Z"
      />
    </svg>
  );
};

const NftIcon = ({ width = "25", height = "24", ...other }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      {...other}
    >
      <g
        opacity="0.6"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.5 12.53c0 6.47-2 8.47-9 8.47s-9-2-9-9 2-9 9-9 9 2 9 9.53Z" />

        <path d="M4 16s1-4 3.5-4 3.281 5 5.5 5 2.5-2 4-2 3 3 3 3" />

        <circle cx="15.5" cy="9" r="2" />
      </g>
    </svg>
  );
};

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    border-radius: 0;
    justify-content: space-between;
    padding: 0 36px;
  `};
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

  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    font-size: 14px;
    &.${activeClassName} {
      font-weight: 500;
      color: #FFAD06;
    }
  `};
  
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
  display: ${({ position }) => position === 'nav' ? 'flex' : 'none'};
  ${({ theme, position }) => theme.mediaWidth.upToExtraSmall`
    display: ${position === 'nav' ? 'none' : 'flex'};
  `};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const MPcTabs = styled(Tabs) <{ position: 'nav' | 'form' }>`
  position: fixed;
  height: 72px;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${({ position }) => position === 'nav' ? 'flex' : 'none'};
  ${({ theme, position }) => theme.mediaWidth.upToExtraSmall`
    display: ${position === 'nav' ? 'none' : 'flex'};
  `};
  z-index: 1;
  background: #fff;
  border-top: 1px solid #EBECEE;
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



export function SwapPoolTabs({ active, position }: { active: 'swap' | 'pool' | 'farm', position: 'nav' | 'form' }) {
  const { t } = useTranslation()
  const location = useLocation()

  const curPath = location.pathname;

  const showMessge = () => {
    toast("Coming soon!")
  }

  const getFillColor = (current: string) => {
    return curPath === current ? '#FFAD06' : 'rgba(0, 0, 0, 0.6)';
  };

  if (window.innerWidth <= MEDIA_WIDTHS.upToSmall) {
    return (
      <MPcTabs position={position}>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => curPath === '/swap'}>
          <SwapIcon fill={getFillColor('/swap')}/>
          {t('swap')}
        </StyledNavLink>
        <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => curPath === '/pool'}>
          <PoolIcon fill={getFillColor('/pool')} />
          {t('pool')}
        </StyledNavLink>
        <StyledNavLink id={`farm-nav-link`} to={'/farm'} isActive={() => curPath === '/farm'}>
          <FarmIcon fill={getFillColor('/farm')} />
          {t('farm')}
        </StyledNavLink>
        <StyledNavLink onClick={showMessge} aria-disabled id={`nft-nav-link`} to={'/nft'} isActive={() => curPath === '/nft'}>
          <NftIcon fill={getFillColor('/nft')} />
          NFTs
        </StyledNavLink>
      </MPcTabs>
    );
  }

  return (
    <PcTabs position={position}>
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
      <StyledNavLink id={`farm-nav-link`} to={'/farm'} isActive={() => curPath === '/farm'}>
        {t('farm')}
      </StyledNavLink>
      <StyledNavLink onClick={showMessge}  aria-disabled id={`nft-nav-link`} to={'/nft'} isActive={() => curPath === '/nft'}>
        NFTs
      </StyledNavLink>
    </PcTabs>
  )
}

export function SwapPoolTabsNew({ type }: { type: 'swap' | 'pool' | 'farm' }) {
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
