import { useEffect, useState } from 'react';
import factoryConfig from '../../factory.config';
import useContract from './useContract';

export type NFT = {
  name: string;
  description: string;
  external_url: string;
  image: string;
};

const useNFT = (tokenId: number) => {
  const [nft, setNFT] = useState<NFT>();
  const contract = useContract();
  useEffect(() => {
    contract.tokenURI(tokenId).then(async _uri => {
      const uri = _uri.replace('ipfs://', factoryConfig.ipfsBase);
      try {
        const _nft = await fetch(uri).then(res => res.json());
        setNFT(_nft);
      } catch (err) {
        console.log(err);
      }
    });
  }, [tokenId]);
  return nft;
};

export default useNFT;
