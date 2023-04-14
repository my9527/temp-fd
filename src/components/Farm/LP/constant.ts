
import { FILEDOGEH, FILEDOGE } from "../../../constants"; 
import { CurrencyAmount, WETH, BigintIsh } from "my-uniswap-sdk";
// import { Currency } from "my-uniswap-sdk";
import { ChainId } from "my-uniswap-sdk"; 
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
        farmAddress: "0x4f94D4A62DC619943f5cBC4D47382107660e2492" 
    },
    [ChainId.FILEH]: {
        lpsTokens: [
            {
                pid: 0,
                pair: [FILEDOGEH, WETH[ChainId.FILEH]]
            }    
        ] ,
        farmAddress: "0x4f94D4A62DC619943f5cBC4D47382107660e2492" 
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