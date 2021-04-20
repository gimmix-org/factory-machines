import factoryConfig from 'factory.config';

const getOpenSeaLink = (tokenId?: number) =>
  typeof tokenId != undefined
    ? `https://testnets.opensea.io/assets/${factoryConfig.contractAddress}/${tokenId}`
    : '#';

export default getOpenSeaLink;
