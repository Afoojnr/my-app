import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

// The image people see when they share a link to the site (generated at build time)
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    // Only inline styles and flexbox work here: this is turned into an image, not a web page
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 80,
        background: '#0a0a0a',
        color: '#fafafa'
      }}
    >
      <div style={{ display: 'flex', fontSize: 32, color: '#a3a3a3' }}>
        Next.js starter
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', fontSize: 88 }}>{siteConfig.name}</div>
        <div style={{ display: 'flex', fontSize: 36, color: '#d4d4d4' }}>
          {siteConfig.description}
        </div>
      </div>
    </div>,
    size
  );
}
