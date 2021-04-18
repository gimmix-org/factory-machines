import { ERC721BasicPortfolio__factory } from '@gimmixfactory/contracts/dist/typechain';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useWallet } from '@gimmixfactory/use-wallet';
import factoryConfig from '../../factory.config';

const useContract = () => {
  const { provider, network } = useWallet();
  const contract = ERC721BasicPortfolio__factory.connect(
    factoryConfig.contractAddress,
    !!provider && network?.chainId == factoryConfig.chainId
      ? provider.getSigner()
      : new JsonRpcProvider(factoryConfig.rpcUrl)
  );

  return contract;
};

export default useContract;
