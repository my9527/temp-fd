import React, { useEffect, useState } from 'react';
import { Farming, FarmingTitle, FarmingButton } from './styledComps';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { useActiveWeb3React } from '../../../hooks';
import StakeDialog from './StakeDialog';
import Stakes from './Stakes';
// import { useLPTokenContract } from '../../../hooks/useContract';
import { useTokenBalance } from '../../../state/wallet/hooks'
// import { usePair } from '../../../data/Reserves'

export default function Farmings({ pairToken }) {
  const [openStake, setOpenStake] = useState(false);
  const toggleWalletModal = useWalletModalToggle();
  const { account } = useActiveWeb3React();
  // const lpTokenContract = useLPTokenContract();
  // const pair = usePair();
  
  const lpTokens = useTokenBalance(account ?? '', pairToken);

  return (
    <Farming hasStake={lpTokens}>
      {
        lpTokens
          ? <Stakes lpTokens={lpTokens} pairToken={pairToken} />
        : (
          <React.Fragment>
              <FarmingTitle>
                {
                  !account
                    ? 'START FARMING'
                    : 'NO POSITION FOUND'
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
      <StakeDialog isOpen={openStake} onDismiss={() => setOpenStake(false)} />      
      <button onClick={() => setOpenStake(true)}>stake</button>      
    </Farming>
  );
}

