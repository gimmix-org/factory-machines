import { useWallet } from '@gimmixfactory/use-wallet';
import { JsonRpcProvider } from '@ethersproject/providers';
import factoryConfig from 'factory.config';
import { useEffect, useState } from 'react';
import { utils } from 'ethers';

const useBankBalance = () => {
  const [balance, setBalance] = useState<number>();
  const { provider: _provider, network } = useWallet();

  useEffect(() => {
    const provider =
      !!_provider && network?.chainId == factoryConfig.chainId
        ? _provider.getSigner()
        : new JsonRpcProvider(factoryConfig.rpcUrl);
    provider.getBalance(factoryConfig.contractAddress).then(_balance => {
      setBalance(parseFloat(utils.formatEther(_balance)));
    });
  }, []);
  return balance;
};

export default useBankBalance;
