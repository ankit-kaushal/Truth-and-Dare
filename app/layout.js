import "./globals.css";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Truth or Dare - Fun Party Game",
  description:
    "Play the ultimate Truth or Dare game with friends! Create custom games, add your own truth questions and dare challenges. Perfect for parties and gatherings.",
  keywords:
    "truth or dare, party games, social games, fun games, custom game modes",
  openGraph: {
    title: "Truth or Dare - Fun Party Game",
    description: "Create and play custom Truth or Dare games with friends",
    type: "website",
    url: "https://spin.ankitkaushal.in/",
    images: [
      {
        url: "https://spin.ankitkaushal.in/image.png",
        width: 1200,
        height: 630,
        alt: "Truth or Dare Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Truth or Dare - Fun Party Game",
    description: "Create and play custom Truth or Dare games with friends",
    images: ["https://spin.ankitkaushal.in/image.png"],
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: "index, follow",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://spin.ankitkaushal.in/" />
        <meta name="application-name" content="Truth or Dare" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="google-site-verification"
          content="9RvH3NU-pxDwBitccJDCYleAFM29mqfFgGqQMhlkNdc"
        />
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
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
