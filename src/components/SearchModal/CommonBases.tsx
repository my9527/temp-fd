import React from 'react'
import { Text } from 'rebass'
import { ChainId, Currency, currencyEquals, ETHER, Token } from 'my-uniswap-sdk'
import styled from 'styled-components'

import { SUGGESTED_BASES } from '../../constants'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import { FILEDOGE, FILEDOGEH } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { Plus } from 'react-feather'

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
  border-radius: 10px;
  display: flex;
  padding: 6px;

  align-items: center;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.bg2};
  }

  background-color: ${({ theme, disable }) => disable && theme.bg3};
  opacity: ${({ disable }) => disable && '0.4'};
`

const FlexRow = styled(AutoRow)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AddSpan = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.secondary1}

`

export default function CommonBases({
  chainId,
  onSelect,
  selectedCurrency
}: {
  chainId?: ChainId
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {

  const { library } = useActiveWeb3React();

  const addToMetaMask = async () => {
    const isMain = chainId === ChainId.FILE;
    const targetCoin = isMain ? FILEDOGE : FILEDOGEH;
    try{
      await (library?.provider as any).request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: targetCoin.address, // The address that the token is at.
            symbol: targetCoin.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: targetCoin.decimals, // The number of decimals in the token
            image: `./images/logos/${targetCoin.address}/logo.svg`, // A string url of the token logo
          },
        },
      });
    } catch(e) {
      console.log("add coin error");
    }
  
  }

  return (
    <AutoColumn gap="md">
      <FlexRow>
        <FlexRow flex={1} style={{ justifyContent: "flex-start" }}>
          <Text fontWeight={500} fontSize={14}>
            Common bases
          </Text>
          <QuestionHelper text="These tokens are commonly paired with other tokens." />
        </FlexRow>
        <AddSpan onClick={addToMetaMask}><Plus size={14}/>Add FILEDOGE</AddSpan>
      </FlexRow>
      <AutoRow gap="4px">
        <BaseWrapper
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER)
            }
          }}
          disable={selectedCurrency === ETHER}
        >
          <CurrencyLogo currency={ETHER} style={{ marginRight: 8 }} />
          <Text fontWeight={500} fontSize={16}>
            FIL
          </Text>
        </BaseWrapper>
        {(chainId ? SUGGESTED_BASES[chainId] : SUGGESTED_BASES[314]).map((token: Token) => {
          const selected = selectedCurrency instanceof Token && selectedCurrency.address === token.address
          return (
            <BaseWrapper onClick={() => !selected && onSelect(token)} disable={selected} key={token.address}>
              <CurrencyLogo currency={token} style={{ marginRight: 8 }} />
              <Text fontWeight={500} fontSize={16}>
                {token.symbol}
              </Text>
            </BaseWrapper>
          )
        })}
      </AutoRow>
    </AutoColumn>
  )
}
