import { ChainId } from "my-uniswap-sdk"
import { ETHERSCAN_PREFIXES } from "../constants"

function dec2hex(i: number) {
    return (i+0x10000).toString(16).substr(-4).toUpperCase();
  }

export const switchNetwork = async (targetChainId: number) => {
    const targetChainIdHex = `0x${dec2hex(targetChainId).replace(/^0+/ig, '')}`;
    try {
        

        await (window?.ethereum as any).request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetChainIdHex }],
        })
    } catch(switchError) {
        const isMain = targetChainId === ChainId.FILE
        if(switchError?.code === 4902){
            await (window?.ethereum as any).request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: targetChainIdHex,
                  // https://api.hyperspace.node.glif.io/rpc/v1
                  rpcUrls: [isMain ? "https://rpc.ankr.com/filecoin" : "https://rpc.ankr.com/filecoin_testnet"],
                  chainName: isMain ? 'FileCoin Mainnet' : 'Hyperspace',
                  nativeCurrency: { name: isMain ? 'FILE' : 'Test FILE', decimals: 18, symbol: isMain? "FIL": "tFIL" },
                  blockExplorerUrls: [ETHERSCAN_PREFIXES[targetChainId as ChainId]],
                  iconUrls: ['/favicon.svg'],
                }],
              })
        }
    }
}