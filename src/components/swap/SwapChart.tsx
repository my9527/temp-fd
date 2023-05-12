import React, { useEffect } from "react"
import { SwapChartWrapper } from './styleds';
import SwapChartChart from "./SwapChartChart";
import SwapChartHeader from "./SwapChartHeader";
import useSwapAddress from "../../hooks/useSwapAddress";

export default function SwapChart() {
  const { symbol, address, lqaddress, pair, liquidity } = useSwapAddress();

  return (
    <SwapChartWrapper>
      <SwapChartHeader liquidity={liquidity} pair={pair} symbol={symbol} address={address} lqaddress={lqaddress} />
      <SwapChartChart lqaddress={lqaddress} />
    </SwapChartWrapper>
  )
}