import React, { FunctionComponent, useState } from 'react';
import { useWallet } from '@gimmixfactory/use-wallet';
import Link from '@components/Link';
import factoryConfig from 'factory.config';
import getWalletProviderOptions from '@features/getWalletProviderOptions';
import useBankPayees from '@features/useBankPayees';
import useContract from '@features/useContract';

const Menu: FunctionComponent = () => {
  const { connect, account, network } = useWallet();
  const contract = useContract();
  const payees = useBankPayees();

  const [withdrawalTx, setWithdrawalTx] = useState<string>();
  const [withdrawn, setWithdrawn] = useState(false);
  const withdraw = async () => {
    if (!contract || !account) return;
    const tx = await contract.release(account);
    setWithdrawalTx(tx.hash);
    await tx.wait(1);
    setWithdrawn(true);
  };

  return (
    <div className="menu">
      <div>
        <h1 className="name">
          <Link href="/">
            <a>{factoryConfig.name}</a>
          </Link>
        </h1>
      </div>
      <div className="spacer" />
      <div>
        {!!network ? (
          <>
            {account && payees.find(p => p.address == account)?.balance ? (
              <>
                {!withdrawalTx ? (
                  <button className="withdraw" onClick={withdraw}>
                    Withdraw Funds
                  </button>
                ) : !withdrawn ? (
                  <div className="withdraw">Withdrawing...</div>
                ) : (
                  <div className="withdraw">Done!</div>
                )}
              </>
            ) : payees.find(p => p.address == account) ? (
              <div className="withdraw">Your balance is 0.</div>
            ) : (
              <div className="no-account">No account in this Bank.</div>
            )}
            <div className="account">
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </div>
            <div className="network">{network.name}</div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => connect(getWalletProviderOptions())}
          >
            Connect Wallet to Withdraw
          </button>
        )}
      </div>

      <style jsx>{`
        .menu {
          background-color: #f1f1f1;
          padding: 20px;
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          height: 100%;
        }
        .spacer {
          flex: 1 1 auto;
        }
        .name {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .name a {
          text-decoration: none;
        }
        .description {
          color: #555;
          line-height: 1.4em;
          font-size: 14px;
        }
        .withdraw {
          margin-bottom: 20px;
        }
        .no-account {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default React.memo(Menu);
