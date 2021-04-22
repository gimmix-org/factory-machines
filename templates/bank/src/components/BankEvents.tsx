import useBankEvents, { BankEvent } from '@features/useBankEvents';
import { utils } from 'ethers';
import React, { FunctionComponent } from 'react';

const BankEvents: FunctionComponent = () => {
  const bankEvents: BankEvent[] = useBankEvents();
  return (
    <div className="bank-events">
      <div className="title">Bank Events</div>
      {bankEvents.map(bankEvent => (
        <div
          className="event"
          key={bankEvent.transactionHash}
          style={{
            background:
              bankEvent.event == 'PaymentReleased'
                ? 'hsl(0, 80%, 95%)'
                : 'hsl(150, 80%, 95%)'
          }}
        >
          {bankEvent.event == 'PaymentReceived' && (
            <div className="received">
              {bankEvent.args[0]} deposited{' '}
              {parseFloat(utils.formatEther(bankEvent.args[1]))} ETH
            </div>
          )}
          {bankEvent.event == 'PaymentReleased' && (
            <div className="released">
              {bankEvent.args[0]} withdrew{' '}
              {parseFloat(utils.formatEther(bankEvent.args[1]))} ETH
            </div>
          )}

          <div className="link">
            <a
              href={`https://rinkeby.etherscan.io/tx/${bankEvent.transactionHash}`}
              target="_blank"
            >
              View →
            </a>
          </div>
        </div>
      ))}
      <style jsx>{`
        .bank-events {
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          padding: 10px;
        }
        .event {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          padding: 10px;
          border-bottom: 1px solid black;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default BankEvents;
