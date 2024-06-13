'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";
import { store } from './store';
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.className} flex items-center justify-center w-full h-full`}>
          <Provider store={store}>
            <div className='flex items-center justify-center w-full h-full'>
              <NavigationBar />
              {children}
            </div>
          </Provider>
        </body>
    </html>
  );
}
