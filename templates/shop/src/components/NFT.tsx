import React from 'react';
import useNFT from '@features/useNFT';
import Link from '@components/Link';

const NFT = ({ tokenId }: { tokenId: number }) => {
  const nft = useNFT(tokenId);
  if (!nft) return null;
  return (
    <div className="nft">
      <Link href={`/details?id=${tokenId}`}>
        <a>
          <img alt={nft.name} src={nft.image} />
        </a>
      </Link>
      <div className="meta">
        <div className="title">
          <Link href={`/details?id=${tokenId}`}>
            <a>{nft.name}</a>
          </Link>
        </div>
        <div className="description">{nft.description}</div>
      </div>

      <style jsx>{`
        .nft {
          background-color: #f1f1f1;
          border-radius: 3px;
          overflow: hidden;
        }
        img {
          width: 100%;
          height: auto;
        }
        .meta {
          padding: 10px;
        }
        .title {
          font-weight: 500;
          margin-bottom: 3px;
        }
        .description {
          font-size: 12px;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default React.memo(NFT);
