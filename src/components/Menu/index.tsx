import React, { useRef } from 'react'
import { Info, Code, MessageCircle, Twitter } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'

import { ExternalLink } from '../../theme'
// import Telegram from '../Icons/telegram'
import TelegramSvg from '../../assets/svg/telegram.svg'


const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  // background-color: ${({ theme }) => theme.bg3};
  background-color: #DDE6F5;

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  // background-color: ${({ theme }) => theme.bg3};
  background-color: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const CODE_LINK = 'https://github.com/Filedoge/Dex-Interface'

export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)

  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <MenuItem rel='nofollow' id="link" href="https://www.filedoge.io/">
            <Info size={14} />
            About
          </MenuItem>
          <MenuItem rel='nofollow' id="link" href={CODE_LINK} target={'_blank'}>
            <Code size={14} />
            Code
          </MenuItem>
          <MenuItem rel='nofollow' id="link" href="https://discord.gg/filedoge">
            <MessageCircle size={14} />
            Discord
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/Filedogetoken">
            <Twitter size={14} />
            Twitter
          </MenuItem>
          <MenuItem id="link" href="https://t.me/filedogetoken">
            <img src={TelegramSvg} style={{ display: "inline", width: "14px", height: "14px", marginRight: "8px" , transform: "translateY(1px)"}} />
            Telegram
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
