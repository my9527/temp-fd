import React from 'react';
import { Currency } from "my-uniswap-sdk";
import { useSwapState } from '../state/swap/hooks';
import { useCurrency } from '../hooks/Tokens'
import { usePair } from '../data/Reserves'
import { FILEDOGE, FILEDOGE_FIL } from "../constants";

export default function useSwapAddress() {
  const { INPUT, OUTPUT } = useSwapState();
  const currencyA = useCurrency(INPUT.currencyId);
  const currencyB = useCurrency(OUTPUT.currencyId);
  const [__, pair] = usePair(currencyA as Currency, currencyB as Currency);
  const symbol = pair ? `${pair?.token0.symbol}/${pair?.token1.symbol}`.replace('WFIL', 'FIL') : 'FILEDOGE/FIL';
  const lqaddress = pair?.liquidityToken.address || FILEDOGE_FIL;
  const address = pair?.token0.address || FILEDOGE.address
  const liquidity = pair?.reserve0.toSignificant();
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