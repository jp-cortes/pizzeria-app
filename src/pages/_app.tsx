import type { AppProps } from 'next/app';
import { Grandstander } from 'next/font/google'
import Layout from '@/components/Layout';
import store from '@/redux/store';
import { Provider } from 'react-redux';
import '@/styles/globals.css';

const grandStander = Grandstander({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
