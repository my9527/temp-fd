import React from 'react';
import { Currency } from "my-uniswap-sdk";
import { useSwapState } from '../state/swap/hooks';
import { useCurrency } from '../hooks/Tokens'
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
  const symbol = pair ? `${pair?.token0.symbol}/${pair?.token1.symbol}`.replace('WFIL', 'FIL') : `${currencyA?.symbol}/${currencyB?.symbol}`;
  const lqaddress = pair?.liquidityToken.address || FILEDOGE_FIL;
  const address = pair?.token0.address || FILEDOGE.address
  const liquidity =`${formatNumber(pair?.reserve0.toFixed(2)) || '-'}/${formatNumber(pair?.reserve1.toFixed(2)) || '-'}` ;
  return React.useMemo(() => {
    return {
      symbol,
      lqaddress,
      address,
      pair: [pair?.token0.address, pair?.token1.address],
      liquidity
    }
  }, [pair, symbol, lqaddress, address, liquidity])
}