import React, { useEffect, useState } from "react";
import clsx from 'clsx';
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { Interface } from '@ethersproject/abi'
import { GetInfo } from '../../data/SwapCandles';
import Copy from './Copy';
import {
  SwapChartHeader, LeftPart, RightPart, SymbolName, PriceLine, Price, 
  ChangeRate, PartLine, ValuePart, PartValue, PartLabel, 
  PartValueAddress
} from './styleds';
import parsePrice from '../../utils/parsePrice';
import formatAddress from '../../utils/formatAddress';
import { useCurrency } from "../../hooks/Tokens";
import { FILEDOGE } from "../../constants";
import CurrencyLogo from "../CurrencyLogo";
import styled from "styled-components";
import { isMobile } from "react-device-detect";

const LogoWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`

interface HeaderProps {
  address: string;
  lqaddress: string;
  symbol: string;
  pair: (string | undefined)[];
  liquidity: string | undefined;
}

const symbolCheck=(sym: string | undefined)=> {
  if(sym && sym.toLowerCase() === 'wfil') {
    return 'FIL'
  }
  return sym;
}

const formatPrice = (price: any) => {
  if(price === undefined) {
    return '-'
  }
  return new Intl.NumberFormat('en-US', {
    //@ts-ignore
    notation: "compact",
    maximumSignificantDigits: 4 
  }).format(price)
};

export default function SwapChartHeaderRoot({ pair, symbol, address, lqaddress, liquidity }: HeaderProps) {
  const [data, setData] = useState<any>({});

  const getData = (_lpaddress:string) => {
    GetInfo(_lpaddress).then((Resp: any) => {
      setData(Resp.data.data);
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getData(lqaddress);
    }, 60 * 1000)
    return () => {
      clearInterval(timer);
    }
  }, [lqaddress]);

  useEffect(() => {
    getData(lqaddress);
  }, [lqaddress]);

  const base = useCurrency(pair[0] || undefined);
  const quote = useCurrency(pair[1] || undefined)

  return (
    <SwapChartHeader style={{ flexWrap: isMobile ? 'wrap' : 'unset' }}>
      <LeftPart>
        <SymbolName style={{ display: 'inline-flex', alignItems: "center"}}>
        {/* <LogoWrapper><CurrencyLogo currency={base || undefined} size={'24px'} /> <CurrencyLogo style={{    transform: "translateX(-6px)" }} currency={quote || undefined} size={'24px'} /></LogoWrapper> {symbolCheck(base?.symbol)} / {symbolCheck(quote?.symbol)} */}
        <LogoWrapper><CurrencyLogo currency={base || undefined} size={'24px'} /> <CurrencyLogo style={{    transform: "translateX(-6px)" }} currency={quote || undefined} size={'24px'} /></LogoWrapper> {symbol}
        </SymbolName>
        <PriceLine>
          <Price>{parsePrice(data?.latestprice) || 0}</Price>
          <ChangeRate className={clsx({ dec: +data?.change < 0 })}>{+data?.change < 0 ? '-' : '+'}{Math.abs((data?.changeRate * 100 || 0)).toFixed(2) || '-'}%</ChangeRate>
        </PriceLine>
        {/* <Time>Apr5, 2023, 12:00 PM(UTC)</Time> */}
      </LeftPart>
      <RightPart style={{ width: isMobile ? '100%' : '50%' }}>
        <PartLine>
          <ValuePart>
            <PartLabel>Address</PartLabel>
            <Copy toCopy={address}>
              <PartValueAddress>
                {formatAddress(address)}
              </PartValueAddress>
            </Copy>
          </ValuePart>
          <ValuePart>
            <PartLabel>Pair</PartLabel>
            <Copy toCopy={lqaddress}>
              <PartValueAddress>{formatAddress(lqaddress)}</PartValueAddress>
            </Copy>
          </ValuePart>
        </PartLine>
        <PartLine>
          {/* <ValuePart>
            <PartLabel>Holders</PartLabel>
            <PartValue>52912</PartValue>
          </ValuePart> */}
          <ValuePart>
            <PartLabel>Liquidity</PartLabel>
            <PartValue>{liquidity || '-'}</PartValue>
          </ValuePart>
          <ValuePart>
            <PartLabel>24h Volume</PartLabel>
            <PartValue>{(data?.vol24) * 2 || '-'}</PartValue>
          </ValuePart>
          <ValuePart>
            <PartLabel>24h Amount</PartLabel>
            <PartValue>{formatPrice(data?.amount24) || '-'}</PartValue>
          </ValuePart>
        </PartLine>
      </RightPart>
    </SwapChartHeader>
  );
}