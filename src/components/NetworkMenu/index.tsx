import { ChainId } from 'my-uniswap-sdk'
import React, { useCallback, useRef } from 'react'
import { Check } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import useToggle from '../../hooks/useToggle'
// import { useActiveWeb3React } from '../../hooks'
import { useActiveWeb3React } from '../../hooks'
import { LinkStyledButton } from '../../theme'
import { ETHERSCAN_PREFIXES, NETWORK_LABELS } from '../../constants'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  background-color: transparent;
  margin: 0;
  margin-right: 1rem;
  font-weight: 500;
  // background-color: ${({ theme }) => theme.bg3};
  background-color: #DDE6F5;

  // padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;

  padding: 0 16px;

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
  width: 296px;
  // background-color: ${({ theme }) => theme.bg3};
  background-color: #FFFFFF;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0.5rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  
  position: absolute;
  top: 3rem;
  right: 0rem;
  z-index: 100;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 11.5rem;
    padding: 0.5rem;
    font-size: 1rem;
  `}
`

const MenuFlyoutTitle = styled.span`
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #000000;
  padding: 0 16px;
`

const MenuItem = styled(LinkStyledButton)`
  flex: 1;
  padding: 0.5rem 16px;
  color: ${({ theme }) => theme.text2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
    background-color: #F7F8FA;
  }
  > svg {
    margin-right: 8px;
  }
`

function dec2hex(i: number) {
  return (i + 0x10000).toString(16).substr(-4).toUpperCase();
}

export default function Menu({ network, chainId }: { network: string | null, chainId: number | string }) {
  const node = useRef<HTMLDivElement>()
  const [open, toggle] = useToggle(false)

  const { library, account } = useActiveWeb3React()

  // const { chainId: cc, connector } = useActiveWeb3React()

  useOnClickOutside(node, open ? toggle : undefined)

  // const changeNetwork = useCallback(async (curId, toChainId) => {
  //   if(cc === toChainId) {
  //     return
  //   }
  //   try {
  //     console.log(dec2hex(toChainId));
  //     // await connector?.activate(`0x${dec2hex(toChainId).replace(/^0+/ig, '')}`)
  //     await connector?.activate()
  //     // eslint-disable-next-line
  //     // const result = await window?.ethereum?.send('wallet_switchEthereumChain', [{ chainId: `0x63564C40` }]) // tslint:disable-line
  //     // console.log(result);
  //   }catch(e) {
  //     console.log(e);
  //   }
  // }, []);


  const changeNetwork = useCallback(async (curId, toChainId) => {
    if (curId === toChainId) {
      return
    }
    const targetChainId = `0x${dec2hex(toChainId).replace(/^0+/ig, '')}`;
    try {
      // console.log(dec2hex(toChainId))

      // `0x${dec2hex(toChainId).replace(/^0+/ig, '')}`
      // const result = (window.ethereum as any).send('wallet_switchEthereumChain', [{ chainId: targetChainId }]).catch((e:any) => {
      //   console.log(e);
      // })
      await (library?.provider as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      })
      // await (window.ethereum as any).request({
      //   method: 'wallet_switchEthereumChain',
      //   params: [{ chainId: targetChainId }],
      // });
      // // eslint-disable-next-line
      // const result = await window?.ethereum?.send('wallet_switchEthereumChain', [{ chainId: `0x63564C40` }]) // tslint:disable-line
    } catch (switchError) {
      if (switchError?.code === 4902) {
        const isMain = toChainId === ChainId.FILE

        await (window?.ethereum as any).request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: targetChainId,
            // https://api.hyperspace.node.glif.io/rpc/v1
            rpcUrls: [isMain ? "https://rpc.ankr.com/filecoin" : "https://rpc.ankr.com/filecoin_testnet"],
            chainName: isMain ? 'File Mainnet' : 'Hyperspace',
            nativeCurrency: { name: isMain ? 'FILE' : 'Test FILE', decimals: 18, symbol: isMain ? "FIL" : "tFIL" },
            blockExplorerUrls: [ETHERSCAN_PREFIXES[toChainId as ChainId]],
            iconUrls: ['/favicon.svg'],
          }],
        })
      }
    }
  }, []);

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      {account && <StyledMenuButton onClick={toggle}>
        {network || <StyledMenuIcon />}
      </StyledMenuButton>}
      {open && (
        <MenuFlyout>
          <MenuFlyoutTitle>
            Network
          </MenuFlyoutTitle>
          <MenuItem id="link" onClick={() => changeNetwork(chainId, ChainId.FILE)} >

            <span>{NETWORK_LABELS[314]}</span> {chainId === ChainId.FILE && <Check color='#6CC029' size={24} />}
          </MenuItem>
          <MenuItem id="link" onClick={() => changeNetwork(chainId, ChainId.FILEH)}>
            <span>{NETWORK_LABELS[3141]}</span> {chainId === ChainId.FILEH && <Check color='#6CC029' size={24} />}
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
