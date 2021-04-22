import React, { FunctionComponent } from 'react';
import factoryConfig from 'factory.config';
import Head from '@components/Head';
import BankBalance from '@components/BankBalance';
import BankPayees from '@components/BankPayees';
import BankEvents from '@components/BankEvents';

const Index: FunctionComponent = () => {
  return (
    <>
      <Head title={factoryConfig.name} />

      <div className="section">
        <BankBalance />
      </div>

      <div className="section">
        <BankPayees />
      </div>

      <div className="section">
        <BankEvents />
      </div>

      <style jsx>{`
        .section {
          margin-bottom: 40px;
        }
      `}</style>
    </>
  );
};

export default Index;
