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

interface HeaderProps {
  address: string;
  lqaddress: string;
  symbol: string;
  pair: (string | undefined)[];
  liquidity: string | undefined;
}

export default function SwapChartHeaderRoot({ pair, symbol, address, lqaddress, liquidity }: HeaderProps) {
  const [data, setData] = useState<any>({});

  const getData = () => {
    GetInfo(lqaddress).then((Resp: any) => {
      setData(Resp.data.data);
    });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      getData();
    }, 60 * 1000)
    return () => {
      clearInterval(timer);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [lqaddress]);

  return (
    <SwapChartHeader>
      <LeftPart>
        <SymbolName>{symbol || 'FILEDOGE/FIL'}</SymbolName>
        <PriceLine>
          <Price>{parsePrice(data.latestprice) || 0}</Price>
          <ChangeRate className={clsx({ dec: data.change < 0 })}>{data.change < 0 ? '-' : '+'}{data.change}({(data.changeRate * 100).toFixed(2)}%)</ChangeRate>
        </PriceLine>
        {/* <Time>Apr5, 2023, 12:00 PM(UTC)</Time> */}
      </LeftPart>
      <RightPart>
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
            <PartValue>{liquidity || 0}</PartValue>
          </ValuePart>
          <ValuePart>
            <PartLabel>24h Volume</PartLabel>
            <PartValue>{data.vol24}</PartValue>
          </ValuePart>
          <ValuePart>
            <PartLabel>24h Amount</PartLabel>
            <PartValue>{data.amount24}</PartValue>
          </ValuePart>
        </PartLine>
      </RightPart>
    </SwapChartHeader>
  );
}