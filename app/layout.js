import './globals.css'
import { Inter } from 'next/font/google'
import styles from './layout.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Truth and Dare',
  description: 'A game for Saheliyan 💃🕺',
}

import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
