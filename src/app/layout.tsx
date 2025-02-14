import { Metadata } from 'next';
import { montserrat } from './fonts';
import './globals.css';
import ReactQueryProvider from '@/lib/Providers/ReactQueryProvider';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/shadcn/toaster';

export const metadata: Metadata = {
  title: 'Flower Shop',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <ReactQueryProvider>
          <CartProvider>
           {children}
           <Toaster />
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}