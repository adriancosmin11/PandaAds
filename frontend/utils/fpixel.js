// Luăm ID-ul din .env
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ;

export const pageview = () => {
  if (typeof window !== 'undefined') {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.pageView();
      });
  }
};

// Funcție pentru evenimente specifice (Lead, Purchase, etc.)
export const event = (name, options = {}) => {
  if (typeof window !== 'undefined') {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.track(name, options);
      });
  }
};