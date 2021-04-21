import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import useContract from '@features/useContract';

type Payee = { address: string; shares: number; released: number };

const usePayees = () => {
  const [payees, setPayees] = useState<Payee[]>([]);
  const contract = useContract();
  useEffect(() => {
    if (!contract) return;

    contract.payees().then(async payees => {
      const _payees: Payee[] = [];
      for (const address of payees) {
        const shares = (await contract.shares(address)).toNumber();
        const released = parseFloat(
          utils.formatEther(await contract.released(address))
        );
        _payees.push({ address, shares, released });
      }
      setPayees(_payees);
    });
  }, []);
  return payees;
};

export default usePayees;
