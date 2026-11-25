import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { env } from '@/config/env';
import { SiteHeader } from '@/components/layout/site-header';
import { siteConfig } from '@/config/site';
import { FavouritesProvider } from '@/features/notes';
import { Providers } from './providers';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const isProduction = env.APP_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: { type: 'website', siteName: siteConfig.name, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: isProduction, follow: isProduction }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-muted/30 antialiased`}
      >
        <Providers>
          {/* Lets keyboard users jump past the header, straight to the page content */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-2 focus:ring-ring"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="mx-auto max-w-5xl px-6 py-10">
            <FavouritesProvider>{children}</FavouritesProvider>
          </main>
        </Providers>
      </body>
    </html>
  );
}
