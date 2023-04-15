import type { AppProps } from 'next/app';
import { Grandstander } from 'next/font/google'
import Layout from '@/components/Layout';
import '@/styles/globals.css';

const grandStander = Grandstander({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <main className={grandStander.className}>
          <Component {...pageProps} />
        </main>
      </Layout>
  );
}
