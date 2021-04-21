import { useEffect, useState } from 'react';
import useContract from '@features/useContract';

const useBankEvents = () => {
  const [events, setEvents] = useState<any[]>([]);

  const contract = useContract();

  useEffect(() => {
    if (!contract) return;

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
