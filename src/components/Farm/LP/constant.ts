
import { FILEDOGEH, FILEDOGE } from "../../../constants"; 
import { CurrencyAmount, WETH, BigintIsh, TokenAmount, Pair , Token} from "my-uniswap-sdk";
// import { Currency } from "my-uniswap-sdk";
import { ChainId } from "my-uniswap-sdk"; 
import { useMemo } from "react";
import { useTradeExactIn } from "../../../hooks/Trades";
import { tryParseAmount } from "../../../state/swap/hooks";
import { useFilUSDPrice } from "../../../hooks/price";
// 当前支持的lp tokens 

// export const lpsTokens: Token[][]  = [
//     [FILEDOGEH, WETH[3141]]    
// ] 




// export const FARM_ADDRESS = "0x68a4DB861568987DeA651d58E93Ba9b119fFD316";

export const FARM_CONFIG = {
    [ChainId.FILE]: {
        lpsTokens: [
            {
                pid: 0,
                pair: [FILEDOGE, WETH[ChainId.FILE]]
            }    
        ] ,
        farmAddress: "0x7B7fACBEF91AF1E111892A74af185793A4CFbdEF" 
    },
    [ChainId.FILEH]: {
        lpsTokens: [
            {
                pid: 0,
                pair: [FILEDOGEH, WETH[ChainId.FILEH]]
            }    
        ] ,
        farmAddress: "0xaD7925777F97DE6A1B4662d14c18d0c6382b652A" 
    },
    [ChainId.MAINNET]: {
        lpsTokens: [],
        farmAddress: "0x68a4DB861568987DeA651d58E93Ba9b119fFD316" 
    }
}

export const useToSignificant = (amount: BigintIsh, sign = 6, decimal = 18) => {
    // const currenctAmount = new CurrencyAmount(new Currency(decimal), amount);
    
    // return currenctAmount.toSignificant(sign);
    return CurrencyAmount.ether(amount).toSignificant(sign);

}


export const toCurrencyAmount = (amount: BigintIsh) => {

    return CurrencyAmount.ether(amount);

}


export const useLPPrice = (lp: Pair | null, lpTotal: TokenAmount | undefined, filPrice: number) => {
    return useMemo(() => {
        if(!lpTotal) return 0;
        // const _filPrice = Math.floor(filPrice * 100).toFixed(0)
        // return lp?.reserve1.multiply('2').multiply(_filPrice).divide('100').divide(lpTotal?.toExact() || '1') || 0
        return (+(lp?.reserve1.toExact() || 0) * (+(filPrice || 0)) * 2) / +(lpTotal?.toExact() || 1)
    }, [lp, filPrice, lpTotal]);
}


export const useFilPerToken = (token: Token | undefined, chainId: ChainId) => {
    const bs = useTradeExactIn(tryParseAmount("1", token)??undefined, WETH[chainId])
    const filPerToken = bs?.executionPrice.toSignificant(8)
    const filPrice = useFilUSDPrice()
    if(!filPrice || !filPerToken) return null;
    const result = tryParseAmount(filPerToken, WETH[chainId]??undefined)?.multiply(Math.floor(+(filPrice || 0) * 100).toFixed(0)).divide("100");
    return result;

}


export const useUSD = (unitPrice: string | number, amount: string | number) => {
    return new Number((+unitPrice || 0) * (+amount || 0)).toFixed(2);
}