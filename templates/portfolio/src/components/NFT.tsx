import React from 'react';
import factoryConfig from '../../factory.config';
import useNFT from '../features/useNFT';

const NFT = ({ tokenId }: { tokenId: number }) => {
  const nft = useNFT(tokenId);
  if (!nft) return null;
  return (
    <div className="nft">
      <img src={nft.image.replace('ipfs://', factoryConfig.ipfsBase)} />
      <div className="title">{nft.name}</div>
      <div className="description">{nft.description}</div>
      <style jsx>{`
        .nft {
          border: 1px solid black;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default NFT;
