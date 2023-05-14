import React from "react";

import { FARM_CONFIG } from "./constant";

import LpItem from "./LpItem";
import { useActiveWeb3React } from "../../../hooks";
import { ChainId } from "my-uniswap-sdk";


export default function LP() {

  const { chainId } = useActiveWeb3React()  
  return (
    <React.Fragment>
      {
        FARM_CONFIG[chainId === ChainId.FILE ? ChainId.FILE : ChainId.FILEH].lpsTokens.map(lp => {
            return <LpItem chainId={chainId || ChainId.FILE} key={`${lp.pair[0].address}_${lp.pair[1].address}`} pair={lp.pair} pid={lp.pid} />
        })
      }
    </React.Fragment>
  );
}