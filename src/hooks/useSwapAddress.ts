import React from 'react';
import { Currency, Token, WETH } from "my-uniswap-sdk";
import { useSwapState } from '../state/swap/hooks';
import { useCurrency, useToken } from '../hooks/Tokens'
import { usePair } from '../data/Reserves'
import { FILEDOGE, FILEDOGE_FIL } from "../constants";


const formatNumber = (number: any) => {
  if(number === undefined) {
    return '-'
  }
  return new Intl.NumberFormat('en-US', {
    //@ts-ignore
    notation: "compact",
    maximumSignificantDigits: 4 
  }).format(number);
}

export default function useSwapAddress() {
  const { INPUT, OUTPUT } = useSwapState();
  const currencyA = useCurrency(INPUT.currencyId);
  const currencyB = useCurrency(OUTPUT.currencyId);
  const [__, pair] = usePair(currencyA as Currency, currencyB as Currency);
  // const symbol = pair ? `${pair?.token0.symbol}/${pair?.token1.symbol}`.replace('WFIL', 'FIL') : `${currencyA?.symbol}/${currencyB?.symbol}`;
  const tokenA = useToken(INPUT.currencyId) || WETH[314];
  const tokenB = useToken(OUTPUT.currencyId) || WETH[314];
  const [token0, token1] = ((tokenA?.address || '').toLowerCase() < (tokenB?.address || '').toLowerCase()) ? [tokenA, tokenB] : [tokenB, tokenA];
  const symbol = (tokenA.symbol != tokenB.symbol ) ? `${token0?.symbol}/${token1?.symbol}`.replace('WFIL', 'FIL') : 'WFIL/FIL';

  const lqaddress = pair?.liquidityToken.address || '';

  const address = token0?.address || '';
  const liquidity =`${formatNumber(pair?.reserve0.toFixed(2)) || '-'}/${formatNumber(pair?.reserve1.toFixed(2)) || '-'}` ;
  return React.useMemo(() => {
    return {
      symbol,
      lqaddress,
      address,
      pair: [token0?.address, token1?.address],
      tokens: [token0, token1],
      liquidity
    }
  }, [pair, symbol, lqaddress, address, liquidity])
}