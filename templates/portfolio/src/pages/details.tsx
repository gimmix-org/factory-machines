import { useRouter } from 'next/dist/client/router';
import React, { FunctionComponent } from 'react';
import useNFT from '@features/useNFT';
import getOpenSeaLink from '@features/getOpenSeaLink';
import Loading from '@components/Loading';

const Details: FunctionComponent = () => {
  const { query } = useRouter();
  const { id }: { id?: number } = query;
  const nft = useNFT(id);
  if (!nft) return <Loading />;
  return (
    <div className="details">
      <div className="image">
        <img src={nft.image} alt={nft.name} />
      </div>
      <div className="meta">
        <h1>{nft.name}</h1>
        <div className="description">{nft.description}</div>
        <div className="links">
          <a href={getOpenSeaLink(id)} target="_blank">
            OpenSea
          </a>
        </div>
      </div>
      <style jsx>{`
        .details {
          display: flex;
        }
        .meta {
          padding: 20px;
        }
        h1 {
          margin-bottom: 5px;
        }
        .description {
          opacity: 0.7;
          margin-bottom: 20px;
        }
        .links {
        }
      `}</style>
    </div>
  );
};

export default Details;
