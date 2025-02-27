import { Helmet } from 'react-helmet-async';
import { env } from '../lib/env';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
}

export function SEO({ title, description, image, path = '' }: SEOProps) {
  const siteTitle = 'Fieldsy';
  const fullTitle = `${title} | ${siteTitle}`;
  const defaultImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef';
  const url = `${env.VITE_SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      <meta name="twitter:domain" content={env.VITE_SITE_URL} />
    </Helmet>
  );
}