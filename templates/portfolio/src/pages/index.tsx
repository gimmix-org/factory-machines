import React, { FunctionComponent, useEffect, useState } from 'react';
import NFT from '../components/NFT';
import useContract from '../features/useContract';

const Index: FunctionComponent = () => {
  const contract = useContract();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (contract)
      contract.totalSupply().then(_count => setCount(_count.toNumber()));
  }, [contract]);
  return (
    <div className="index">
      {new Array(count).fill(null).map((_, i) => (
        <NFT tokenId={i} key={i} />
      ))}
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default Index;
