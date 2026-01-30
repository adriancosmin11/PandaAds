// frontend/components/FacebookPixel.jsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { FB_PIXEL_ID, pageview } from '../utils/fpixel';

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Inițializare Pixel la prima încărcare
    if (!loaded) {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init(FB_PIXEL_ID); // Inițializează cu ID-ul tău
          ReactPixel.pageView();        // Trimite primul PageView
          setLoaded(true);
        });
    }
  }, [loaded]);

  useEffect(() => {
    // 2. Trimite PageView la fiecare schimbare de pagină (navigare)
    if (loaded) {
      pageview();
    }
  }, [pathname, searchParams, loaded]);

  return null; // Nu afișează nimic vizual
}