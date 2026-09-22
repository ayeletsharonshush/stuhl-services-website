import { RecommendSection } from '../types';

// Amazon Associates disclosure, shown near the top of /recommends.
export const AFFILIATE_DISCLOSURE =
  'As an Amazon Associate I earn from qualifying purchases.';

// Product recommendations, grouped by room. Each section renders as a
// horizontally scrollable row of cards, so adding a product is a data-only
// edit: append to the relevant section's `products` array (or add a new
// section). Each product: name, section, blurb, affiliate url, optional image
// path under public/products/ (a card renders cleanly with or without one).
export const RECOMMEND_SECTIONS: RecommendSection[] = [
  {
    title: 'Bathroom',
    products: [
      {
        name: 'Retrofit Bathroom Fan',
        section: 'Bathroom',
        blurb:
          'The quiet fan I install when a bathroom fan is too weak or too loud: the Panasonic WhisperFit FV-0511VFC1. Built-in moisture sensor, so it runs itself when the air gets humid. Fits the existing ceiling opening in most retrofits, so the job stays small.',
        url: 'https://link.amazon/B025O6XIp',
        image: '/products/fan-fv0511vfc1.png',
      },
      {
        name: 'Shower Hair Catcher',
        section: 'Bathroom',
        blurb:
          'The ten dollar ShowerShroom from my drain video. It hides inside a standard shower stall drain and catches every hair before it reaches the pipe. Lift it out once a week, wipe it, drop it back in.',
        url: 'https://link.amazon/B0cxCfu6p',
        image: '/products/showershroom.png',
      },
    ],
  },
  {
    title: 'Whole House',
    products: [
      {
        name: 'Water Leak Alarm',
        section: 'Whole House',
        blurb:
          "Small battery alarms that scream when water touches them. I put them under sinks, by the water heater, and next to the sump pit. A forty dollar five pack that catches the leak you can't see.",
        url: 'https://link.amazon/B0j5f2M96',
        image: '/products/leak-alarm-5pack.png',
      },
    ],
  },
];
