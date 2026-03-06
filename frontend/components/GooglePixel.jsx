'use client';

import Script from 'next/script';

export default function GooglePixel() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17995993778"
        strategy="afterInteractive"
      />
      <Script id="google-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17995993778');
        `}
      </Script>
    </>
  );
}
