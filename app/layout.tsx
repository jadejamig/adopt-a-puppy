'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";
import { store } from './store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐶</text></svg>"
          />
          <title>Adopt a Puppy</title>
        </head>
        <Toaster position="top-center" richColors />
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
