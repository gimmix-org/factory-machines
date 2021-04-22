import React from 'react';
import { BankPayee as BankPayeeType } from '@features/useBankPayees';

const BankPayee = ({ payee }: { payee: BankPayeeType }) => {
  return (
    <div className="bank-payee">
      <div className="address">{payee.address}</div>
      <div className="shares">
        {payee.shares} ({payee.percent}%)
      </div>
      <div className="released">{payee.released} ETH</div>
      <div className="balance">{payee.balance} ETH</div>
      <style jsx>{`
        .bank-payee {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 1fr;
          border-bottom: 1px solid black;
          padding: 10px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
        }
        .address {
        }
        .shares,
        .released,
        .balance {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default BankPayee;
