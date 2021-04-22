import { Shop__factory } from '@gimmixfactory/contracts/dist/typechain';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useWallet } from '@gimmixfactory/use-wallet';
import factoryConfig from 'factory.config';

const useContract = () => {
  const { provider, network } = useWallet();
  if (!provider && !factoryConfig.rpcUrl) return null;
  try {
    const contract = Shop__factory.connect(
      factoryConfig.contractAddress,
      !!provider && network?.chainId == factoryConfig.chainId
        ? provider.getSigner()
        : new JsonRpcProvider(factoryConfig.rpcUrl)
    );
    return contract;
  } catch (err) {
    return null;
  }
};

export default useContract;
