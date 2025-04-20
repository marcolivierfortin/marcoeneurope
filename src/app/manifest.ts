import Site from '../data/site.json';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: Site.title,
    short_name: Site.title,
    description: 'Next.js App',
    start_url: '/',
    display: 'standalone',
    background_color: '#222222',
    theme_color: '#0052b4',
    icons: [
      {
        type: 'image/x-icon',
        sizes: 'any',
        src: '/favicon.ico',
      },
      {
        type: 'image/png',
        sizes: '57x57',
        src: '/icons/iphone.png',
      },
      {
        type: 'image/png',
        sizes: '114x114',
        src: '/icons/iphone-retina.png',
      },
      {
        type: 'image/png',
        sizes: '72x72',
        src: '/icons/ipad.png',
      },
      {
        type: 'image/png',
        sizes: '144x144',
        src: '/icons/ipad-retina.png',
      },
    ],
  };
}
