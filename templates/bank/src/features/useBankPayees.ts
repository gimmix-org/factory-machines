import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import useContract from '@features/useContract';

export type BankPayee = {
  address: string;
  shares: number;
  percent: number;
  released: number;
  balance: number;
};

const useBankPayees = () => {
  const [payees, setPayees] = useState<BankPayee[]>([]);
  const contract = useContract();
  useEffect(() => {
    if (!contract) return;

    contract.payees().then(async payees => {
      const _payees: BankPayee[] = [];
      const totalShares = (await contract.totalShares()).toNumber();
      for (const address of payees) {
        const shares = (await contract.shares(address)).toNumber();
        const percent =
          (100 * Math.round((10000 * shares) / totalShares)) / 10000;
        const released = parseFloat(
          utils.formatEther(await contract.released(address))
        );
        const balance = parseFloat(
          utils.formatEther(await contract.balance(address))
        );
        _payees.push({ address, shares, percent, released, balance });
      }
      setPayees(_payees);
    });
  }, []);
  return payees;
};

export default useBankPayees;
