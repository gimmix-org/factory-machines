import { useEffect, useState } from 'react';
import useContract from '@features/useContract';

export type BankEvent = {
  blockNumber: number;
  transactionHash: string;
  event: string;
  args: any[];
};

const useBankEvents = () => {
  const [events, setEvents] = useState<any[]>([]);

  const contract = useContract();

  useEffect(() => {
    if (!contract) return;
    setEvents([]);

    const receivedFilter = contract.filters.PaymentReceived(null, null);
    contract.queryFilter(receivedFilter).then(events => {
      setEvents(_events =>
        [..._events, ...events].sort((a, b) => b.blockNumber - a.blockNumber)
      );
    });

    const releasedFilter = contract.filters.PaymentReleased(null, null);
    contract.queryFilter(releasedFilter).then(events => {
      setEvents(_events =>
        [..._events, ...events].sort((a, b) => b.blockNumber - a.blockNumber)
      );
    });
  }, []);

  return events;
};

export default useBankEvents;
