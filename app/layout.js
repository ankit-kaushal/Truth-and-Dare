import "./globals.css";
import { Inter } from "next/font/google";
import styles from "./layout.module.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Truth or Dare Online - Free Party Game | Play Now",
  description:
    "Play Truth or Dare online for free! The best multiplayer party game with custom questions, dares, and challenges. Perfect for friends, parties, and virtual hangouts. Try our free demo now!",
  keywords:
    "truth or dare online, truth or dare game, party games online, truth or dare questions, truth or dare app, virtual party games, free online games, multiplayer games, fun party games, social games",
  openGraph: {
    title: "Truth or Dare Online - Free Party Game | Play Now",
    description:
      "Play Truth or Dare online with friends! Create custom games, add your own questions and challenges. Perfect for virtual parties and gatherings.",
    type: "website",
    url: "https://spin.ankitkaushal.in/",
    siteName: "Truth or Dare Online",
    images: [
      {
        url: "https://spin.ankitkaushal.in/image.png",
        width: 1200,
        height: 630,
        alt: "Truth or Dare Online Game",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Truth or Dare Online",
              "applicationCategory": "Game",
              "operatingSystem": "Web Browser",
              "url": "https://spin.ankitkaushal.in",
              "description": "Free online Truth or Dare game perfect for virtual parties and gatherings. Play with friends, create custom games, and enjoy endless fun!",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "150"
              }
            }`,
          }}
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
