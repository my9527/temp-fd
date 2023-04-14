import React, { useCallback, useState } from 'react';
import { Farming, FarmingTitle, FarmingButton } from './styledComps';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { useActiveWeb3React } from '../../../hooks';
import StakeDialog from './StakeDialog';
import StakeInfo from './StakeInfo';
import { Pair, TokenAmount } from 'my-uniswap-sdk';
import { useTokenBalance } from '../../../state/wallet/hooks';


type FarmingProp = {
  lp: Pair | null
  stakeInfo: {
    rewardDebt: string,
    stakeAmount: string,
  }
  allowance?: TokenAmount,
  pid: number | string
}

export default function Farmings({ lp, stakeInfo, pid }: FarmingProp) {
  const [openStake, setOpenStake] = useState("");
  const toggleWalletModal = useWalletModalToggle();
  const { account } = useActiveWeb3React();
  const [hasStake] = useState(false);

  // const [ stakedInfo, setStaked ] = useState({ amount: '0', rewardDebt: '0' });
  // const farmContract = useFarmContract();

  const lpBalance = useTokenBalance(account ?? undefined, lp?.liquidityToken);
  // const {result: _user} = useSingleCallResult(farmContract, "userInfo", [0, account]);



  const showStakeModal = useCallback((moreOrless: string) => {
    setOpenStake(moreOrless);
  }, []);


  return (
    <Farming hasStake={hasStake}>
      {
        account && lpBalance
          ?
          <>
            <StakeInfo
              account={account}
              pid={pid}
              // lpToken={lp?.liquidityToken}
              staked={stakeInfo}
              openStakeModal={showStakeModal}
            />
            <StakeDialog
              pid={pid}
              lpToken={lp?.liquidityToken}
              lpBalance={lpBalance}
              staked={stakeInfo?.stakeAmount}
              isOpen={!!openStake}
              type={openStake}
              onDismiss={() => setOpenStake("")}
            />
          </>
          : (
            <React.Fragment>
              <FarmingTitle>
                {
                  !account ? 'START FARMING' : 'NO POSITION FOUND'
                }
              </FarmingTitle>
              {
                !account
                  ? (
                    <FarmingButton onClick={toggleWalletModal}>
                      Connect Wallet
                    </FarmingButton>
                  )
                  : (
                    <FarmingButton>
                      Add Liquidity
                    </FarmingButton>
                  )
              }
            </React.Fragment>
          )
      }

    </Farming>
  );
}

