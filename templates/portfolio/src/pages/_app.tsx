import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

const FactoryApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default FactoryApp;
