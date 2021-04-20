import { useEffect, useState } from 'react';
import factoryConfig from 'factory.config';
import useContract from '@features/useContract';

export type NFT = {
  name: string;
  description: string;
  external_url: string;
  image: string;
};

const useNFT = (tokenId?: number) => {
  const [nft, setNFT] = useState<NFT>();
  const contract = useContract();
  useEffect(() => {
    if (tokenId == undefined || !contract) return;
    contract.tokenURI(tokenId).then(async _metadataUri => {
      const metadataUri = _metadataUri.replace(
        'ipfs://',
        factoryConfig.ipfsBase
      );
      try {
        const _nft: NFT = await fetch(metadataUri).then(res => res.json());
        _nft.image = _nft.image.replace('ipfs://', factoryConfig.ipfsBase);
        setNFT(_nft);
      } catch (err) {
        console.log(err);
      }
    });
  }, [tokenId]);
  return nft;
};

export default useNFT;
