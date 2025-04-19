import './globals.css'
import { Inter } from 'next/font/google'
import styles from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Truth and Dare - Fun Party Game',
  description: 'Play the ultimate Truth and Dare game with friends! Create custom games, add your own truth questions and dare challenges. Perfect for parties and gatherings.',
  keywords: 'truth or dare, party games, social games, fun games, custom game modes',
  openGraph: {
    title: 'Truth and Dare - Fun Party Game',
    description: 'Create and play custom Truth and Dare games with friends',
    type: 'website',
    url: 'https://game.ankitkaushal.in.net/',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: 'Truth and Dare Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Truth and Dare - Fun Party Game',
    description: 'Create and play custom Truth and Dare games with friends',
    images: ['/image.png'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: 'index, follow',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://game.ankitkaushal.in.net/" />
        <meta name="application-name" content="Truth and Dare" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <div className={styles.container}>
          <div className={styles.box}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <AuthProvider>
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
