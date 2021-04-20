import { useEffect, useState } from 'react';
import useContract from '@features/useContract';

const useNFTCount = () => {
  const contract = useContract();
  const [count, setCount] = useState<number>();
  useEffect(() => {
    if (contract)
      contract.totalSupply().then(_count => {
        setCount(_count.toNumber());
      });
  }, [contract]);
  return count;
};

export default useNFTCount;
