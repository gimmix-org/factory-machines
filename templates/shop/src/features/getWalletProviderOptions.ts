import { ICoreOptions } from 'web3modal';

const getWalletProviderOptions = (): Partial<ICoreOptions> => {
  return {
    cacheProvider: true,
    providerOptions: {}
  };
};

export default getWalletProviderOptions;
