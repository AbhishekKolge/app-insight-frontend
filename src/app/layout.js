import { Inter } from 'next/font/google';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Toaster } from 'react-hot-toast';

import StoreProvider from '@/state/StoreProvider';

import Navbar from '@/components/layout/Navbar';

import './globals.css';

if (process.env.ENV !== 'development') {
  disableReactDevTools();
}

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'App Insight',
  description: 'App analytics for free',
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang='en'>
        <body className={`${inter.className} relative min-h-screen`}>
          <Toaster />
          <Navbar />
          <main className='w-screen min-h-screen pt-28 h-auto'>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
