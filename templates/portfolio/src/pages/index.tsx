import React, { FunctionComponent } from 'react';
import factoryConfig from 'factory.config';
import Head from '@components/Head';
import NFT from '@components/NFT';
import useNFTCount from '@features/useNFTCount';
import Loading from '@components/Loading';

const Index: FunctionComponent = () => {
  const count = useNFTCount();

  return (
    <>
      <Head title={factoryConfig.name} />

      {count == undefined ? (
        <Loading />
      ) : (
        <>
          {count == 0 ? (
            <div className="welcome">
              There's nothing here yet. If this is your site, connect your
              wallet to start adding things!
            </div>
          ) : (
            <div className="grid">
              {new Array(count).fill(null).map((_, i) => (
                <NFT tokenId={count - i - 1} key={i} />
              ))}
            </div>
          )}
        </>
      )}

      <style jsx>{`
        .welcome {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .grid {
          display: grid;
          align-items: center;
          grid-template-columns: repeat(
            auto-fill,
            minmax(min(10rem, 100%), 1fr)
          );
          grid-gap: 1rem;
        }
      `}</style>
    </>
  );
};

export default Index;
