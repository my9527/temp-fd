import React, { useState } from 'react';
import { Farming, FarmingTitle, FarmingButton } from './styledComps';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { useActiveWeb3React } from '../../../hooks';
import StakeDialog from './StakeDialog';
import Stakes from './Stakes';

export default function Farmings() {
  const [openStake, setOpenStake] = useState(false);
  const toggleWalletModal = useWalletModalToggle();
  const { account } = useActiveWeb3React();
  const [hasStake] = useState(false);

  return (
    <Farming hasStake={hasStake}>
      {
        hasStake
        ? <Stakes />
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
                    <FarmingButton onClick={() => setOpenStake(true)}>
                      Add Liquidity
                    </FarmingButton>
                  )
              }
              <StakeDialog isOpen={openStake} onDismiss={() => setOpenStake(false)} />      
          </React.Fragment>
        )
      }
      
    </Farming>
  );
}

