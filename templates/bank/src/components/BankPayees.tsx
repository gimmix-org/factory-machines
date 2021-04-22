import React from 'react';
import Payee from '@components/BankPayee';
import useBankPayees from '@features/useBankPayees';

const BankPayees = () => {
  const payees = useBankPayees();
  return (
    <>
      <div className="title">Accounts</div>
      <div className="header">
        <div className="address">Address</div>
        <div className="shares">Shares</div>
        <div className="released">Released</div>
        <div className="balance">Owed</div>
      </div>
      {payees.map(payee => (
        <Payee payee={payee} key={payee.address} />
      ))}
      <style jsx>{`
        .title {
          font-size: 18px;
          font-weight: 500;
          padding: 10px;
        }
        .header {
          display: grid;
          grid-template-columns: 3fr 1fr 1fr 1fr;
          border-bottom: 1px solid black;
          padding: 10px;
        }
        .shares,
        .released,
        .balance {
          text-align: right;
        }
      `}</style>
    </>
  );
};

export default BankPayees;
