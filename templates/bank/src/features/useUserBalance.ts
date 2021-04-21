import { useWallet } from '@gimmixfactory/use-wallet';
import { useEffect, useState } from 'react';
import { utils } from 'ethers';
import useContract from '@features/useContract';

const useUserBalance = () => {
  const [userBalance, setBalance] = useState<number>();
  const { account } = useWallet();
  const contract = useContract();

  const releaseBalance = async () => {
    if (!contract || !userBalance || !account) return;
    const tx = await contract.release(account);
    console.log(tx);
  };

  useEffect(() => {
    if (!contract || !account) return;
    contract.balance(account).then(_balance => {
      console.log({ _balance });
      setBalance(parseFloat(utils.formatEther(_balance)));
    });
  }, [account]);

  return { userBalance, releaseBalance };
};

export default useUserBalance;
