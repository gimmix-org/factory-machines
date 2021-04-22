import React, { FunctionComponent } from 'react';
import useBankBalance from '@features/useBankBalance';
import factoryConfig from 'factory.config';

const BankBalance: FunctionComponent = () => {
  const bankBalance = useBankBalance();
  return (
    <div className="bank-balance">
      <div className="header">
        <div className="title">{factoryConfig.name} Balance</div>
        <div className="bank-address">
          Bank Address:{' '}
          <a
            href={`https://rinkeby.etherscan.io/address/${factoryConfig.contractAddress}`}
            target="_blank"
          >
            {factoryConfig.contractAddress}
          </a>
        </div>
      </div>
      <div className="balance">
        {bankBalance != undefined ? `${bankBalance} ETH` : '...'}
      </div>
      <style jsx>{`
        .bank-balance {
          background-color: #f1f1f1;
          padding: 20px;
        }
        .header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }
        .title {
          font-weight: 500;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .balance {
          font-size: 18px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
        }
        .bank-address {
          font-size: 12px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default BankBalance;
