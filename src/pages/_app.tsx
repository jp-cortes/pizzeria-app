import type { AppProps } from 'next/app';
import { Josefin_Sans } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import '@/styles/globals.css';

const grandStander = Josefin_Sans({ 
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={grandStander.className}>
          <Component {...pageProps} />
      </main>
    </Provider>
  );
}
