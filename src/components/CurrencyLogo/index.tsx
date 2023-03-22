import { Currency, ETHER, Token } from 'my-uniswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

// import EthereumLogo from '../../assets/images/ethereum-logo.png'
import EthereumLogo from '../../assets/svg/file.svg'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

// const getTokenLogoURL = (address: string) =>
//   `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const isFileCoin = (address: string) => {
  if(!address) return false;
  return [
    // "0x608f45818e53032bEBFe30c629f02966FaB69e96",//weth
    "0x4055867e43E27Dd0d8e12CE4c2dBD313286B011a",
    "0xCE3DF008810e8d41aB3275f6EcEa1989b07a2f57", //tdg
    "0x2646bb363851d31dca3de045e0eb63d0afeb427d"
  ].some(v => v.toLowerCase()===address.toLowerCase())
}

const getTokenLogoURL = (address: string) => {
  if(isFileCoin(address)) {
    return  `/images/logos/${address.toLowerCase()}/logo.svg`;
  }
  return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`
}


const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  // console.log("WrappedTokenInfo", currency instanceof Token, currency instanceof WrappedTokenInfo, currency, uriLocations)
  const srcs: string[] = useMemo(() => {
    if (currency === ETHER) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }

      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations])

  if (currency === ETHER) {
    return <StyledEthereumLogo src={EthereumLogo} size={size} style={style} />
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
