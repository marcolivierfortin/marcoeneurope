import React from 'react';
import Site from '../data/site.json';
import Timeline from '../components/Timeline';
import striptags from 'striptags';
import { Metadata, Viewport } from 'next';
import { SiteInterface, TripInterface } from '../interfaces';

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  // Site.
  title: Site.title,
  description: striptags(Site.trips[Site.trips.length - 1].description[0]),

  // Author.
  authors: {
    url: new URL(Site.author.link.path),
    name: Site.author.title,
  },

  // Generator.
  generator: 'Next.js on Vercel',

  // Apple web app.
  appleWebApp: true,
  applicationName: Site.title,

  // Icons.
  icons: [
    {
      rel: 'shortcut icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      url: '/icons/iphone.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      url: '/icons/iphone-retina.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      url: '/icons/ipad.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      url: '/icons/ipad-retina.png',
    },
  ],

  // Open Graph.
  metadataBase: new URL(process.env.HOST as string),
  openGraph: {
    type: 'website',
    siteName: Site.title,
    title: Site.title,
    description: striptags(Site.trips[Site.trips.length - 1].description[0]),
    locale: 'fr_CA',
    countryName: 'Canada',
    images: '/images/share.png',
  },

  // Format.
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  // Theme color.
  themeColor: '#222222',

  // Format.
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 2.0,
  userScalable: true,
};

/**
 * Render the front page.
 *
 * @return {React.JSX.Element}
 */
export default function Page(): React.JSX.Element {
  const site: SiteInterface = Site;

  const currentTrip: TripInterface = site.trips[site.trips.length - 1];

  return (
    <div className={ 'page' }>
      <Timeline
        site={ site }
        currentTrip={ currentTrip }
      />
    </div>
  );
}
