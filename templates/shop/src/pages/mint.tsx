import { useWallet } from '@gimmixfactory/use-wallet';
import Router from 'next/dist/client/router';
import React, { FormEventHandler, FunctionComponent, useState } from 'react';
import factoryConfig from 'factory.config';
import Head from '@components/Head';
import getWalletProviderOptions from '@features/getWalletProviderOptions';
import useContract from '@features/useContract';

const Mint: FunctionComponent = () => {
  const { provider, network, account, connect } = useWallet();
  const contract = useContract();

  const [file, setFile] = useState<File>();
  const [fileIPFSHash, setFileIPFSHash] = useState<string>();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>();

  const onUploadSubmit: FormEventHandler = async e => {
    e.preventDefault();
    if (!provider || !network || !contract || !file) return;
    const formData = new FormData();
    formData.append('files', file);
    const { hash } = await fetch(factoryConfig.ipfsUploadFile, {
      method: 'POST',
      body: formData
    }).then(res => res.json());
    setFileIPFSHash(hash);
  };

  const onMintSubmit: FormEventHandler = async e => {
    e.preventDefault();
    if (!provider || !network || !contract || !fileIPFSHash) return;
    try {
      const metadata = {
        name: title,
        description,
        image: `ipfs://${fileIPFSHash}`
      };
      const { hash: metadataHash } = await fetch(factoryConfig.ipfsUploadJson, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(metadata)
      }).then(res => res.json());
      const tx = await contract.mint(
        factoryConfig.creatorAddress,
        `ipfs://${metadataHash}`
      );
      console.log(tx);
      await tx.wait(4);
      Router.push('/');
    } catch (err) {
      console.log({ err });
      setError(`${err}`);
    }
  };

  return (
    <>
      <Head title={factoryConfig.name} />
      <div className="mint">
        {!account ? (
          <button onClick={() => connect(getWalletProviderOptions())}>
            Connect Wallet
          </button>
        ) : account.toLowerCase() !=
          factoryConfig.creatorAddress.toLowerCase() ? (
          <>You don't have minting permissions on this site.</>
        ) : (
          <>
            {!fileIPFSHash && (
              <form onSubmit={onUploadSubmit}>
                <input
                  type="file"
                  onChange={e => setFile(e.target.files?.[0])}
                />
                <button type="submit">Upload</button>
              </form>
            )}
            {!!fileIPFSHash && (
              <form onSubmit={onMintSubmit}>
                <div className="form-item">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-item">
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <button onClick={onMintSubmit}>Mint</button>
              </form>
            )}
            {error && <div className="error">{error}</div>}
          </>
        )}
      </div>
      <style jsx>{`
        .mint {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          align-items: center;
        }

        form {
          width: 500px;
        }
        .form-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default Mint;
