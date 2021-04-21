import React, { FunctionComponent } from 'react';
import factoryConfig from 'factory.config';
import Head from '@components/Head';
import usePayees from '@features/usePayees';
import useBankBalance from '@features/useBankBalance';
import useUserBalance from '@features/useUserBalance';
import useBankEvents from '@features/useBankEvents';

const Index: FunctionComponent = () => {
  const payees = usePayees();
  const bankBalance = useBankBalance();
  const events = useBankEvents();
  const { userBalance, releaseBalance } = useUserBalance();
  return (
    <>
      <Head title={factoryConfig.name} />

      <div className="contract-address">{factoryConfig.contractAddress}</div>

      <pre>{JSON.stringify({ payees }, null, 2)}</pre>

      <pre>{JSON.stringify({ bankBalance }, null, 2)}</pre>

      <pre>{JSON.stringify({ events }, null, 2)}</pre>
      {userBalance && (
        <div className="user-balance">
          {userBalance}
          <button onClick={releaseBalance}>Withdraw</button>
        </div>
      )}

      <style jsx>{``}</style>
    </>
  );
};

export default Index;
