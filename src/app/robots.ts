import type { MetadataRoute } from 'next';
import { env } from '@/config/env';

export default function robots(): MetadataRoute.Robots {
  const isProduction = env.APP_ENV === 'production';
  return {
    rules: isProduction
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${env.SITE_URL}/sitemap.xml`
  };
}
