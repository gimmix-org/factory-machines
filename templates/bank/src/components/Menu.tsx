import React, { FunctionComponent } from 'react';
import { useWallet } from '@gimmixfactory/use-wallet';
import Link from '@components/Link';
import factoryConfig from 'factory.config';
import getWalletProviderOptions from '@features/getWalletProviderOptions';

const Menu: FunctionComponent = () => {
  const { connect, account, network } = useWallet();
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
            Connect Wallet
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
        .mint {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default React.memo(Menu);
