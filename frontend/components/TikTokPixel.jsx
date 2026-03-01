'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TikTokPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];
        if (e && e.parentNode) {
            e.parentNode.insertBefore(n,e)
        } else {
            d.head.appendChild(n)
        }};
        ttq.load('D6IAM33C77U4C3682GQG');
        ttq.page();
      }(window, document, 'ttq');

      setLoaded(true);
    }
  }, [loaded]);

  useEffect(() => {
    // În Next.js App Router, se schimbă pathname și searchParams fără reîncărcare de pagină.
    // Trimitem din nou un eveniment de `page` la fiecare navigare.
    if (loaded && window.ttq) {
      window.ttq.page();
    }
  }, [pathname, searchParams, loaded]);

  return null;
}
