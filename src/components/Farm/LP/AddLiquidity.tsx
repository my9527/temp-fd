import React, { useCallback, useState } from 'react';
import { Farming, FarmingTitle, FarmingButton } from './styledComps';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { useActiveWeb3React } from '../../../hooks';
import StakeDialog from './StakeDialog';
import StakeInfo from './StakeInfo';
import { Pair, TokenAmount, Fraction } from 'my-uniswap-sdk';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { Link as HistoryLink } from 'react-router-dom'
import TransactionConfirmationModal from '../../TransactionConfirmationModal';

type FarmingProp = {
  lp: Pair | null
  stakeInfo: {
    rewardDebt: string | undefined,
    stakeAmount: string,
  }
  allowance?: TokenAmount,
  pid: number | string
  fileDogePrice: Fraction | string | undefined | null
  lpPrice: Fraction | number | string | undefined | null
}

type PendingTransaction = {
  attemptingTxn: boolean
  txhash: string | undefined
}

export default function Farmings({ lp, stakeInfo, pid, lpPrice, fileDogePrice }: FarmingProp) {
  const [openStake, setOpenStake] = useState("");
  const toggleWalletModal = useWalletModalToggle();
  const { account } = useActiveWeb3React();
  const [hasStake] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState({
    attemptingTxn: false,
    txhash: "undefined",
  } as PendingTransaction)

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
              lpPrice={lpPrice}
              fileDogePrice={fileDogePrice}
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
              lpPrice={lpPrice}
              fileDogePrice={fileDogePrice}
              onDismiss={() => setOpenStake("")}
              lp={lp}
              setPendingTransaction={(pending: PendingTransaction) => setPendingTransaction(pending)}
            />
            <TransactionConfirmationModal
               isOpen={false}
               onDismiss={() => setOpenStake("")}
               attemptingTxn={pendingTransaction.attemptingTxn}
               hash={pendingTransaction.txhash}
               content={() => <div>confirmationContent</div>}
               pendingText={"pendingText"}
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
                    <HistoryLink to="/pool">
                      <FarmingButton>
                        Add Liquidity
                      </FarmingButton>
                    </HistoryLink>
                  )
              }
            </React.Fragment>
          )
      }

    </Farming>
  );
}

