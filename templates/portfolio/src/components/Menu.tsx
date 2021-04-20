import React, { FunctionComponent } from 'react';
import { useWallet } from '@gimmixfactory/use-wallet';
import Link from 'next/link';
import factoryConfig from '../../factory.config';

const Menu: FunctionComponent = () => {
  const { connect, account, network } = useWallet();
  return (
    <div className="menu">
      <div className="top">
        <h1 className="name">
          <Link href="./index.html">
            <a>{factoryConfig.name}</a>
          </Link>
        </h1>
        <div className="description">{factoryConfig.description}</div>
      </div>

      <div className="bottom">
        {!!network ? (
          <>
            <div className="account">
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </div>
            <div className="network">{network.name}</div>
          </>
        ) : (
          <button onClick={() => connect({})}>Connect Wallet</button>
        )}
      </div>

      <style jsx>{`
        .menu {
          padding: 20px;
        }
        .name {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .description {
          color: #555;
          line-height: 1.4em;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default React.memo(Menu);
