import { RecommendSection } from '../types';

// Amazon Associates disclosure, shown near the top of /recommends.
export const AFFILIATE_DISCLOSURE =
  'As an Amazon Associate I earn from qualifying purchases.';

// Product recommendations, grouped by section. Adding a future product is a
// data-only edit: append to the relevant section's `products` array (or add a
// new section). Each product: name, section, blurb, affiliate url, optional
// image path (a card renders cleanly with or without an image).
export const RECOMMEND_SECTIONS: RecommendSection[] = [
  {
    title: 'Bathroom Ventilation',
    products: [
      {
        name: 'Panasonic FV-0511VFC1 WhisperFit Retrofit Bath Fan',
        section: 'Bathroom Ventilation',
        blurb:
          'The quiet fan I install when a bathroom fan is too weak or too loud. This model has a built-in moisture sensor, so it runs itself when the air gets humid. Fits the existing ceiling opening in most retrofits, so the job stays small.',
        url: 'https://link.amazon/B025O6XIp',
      },
    ],
  },
  {
    title: 'Drains',
    products: [
      {
        name: 'ShowerShroom Shower Drain Hair Catcher',
        section: 'Drains',
        blurb:
          'The ten dollar strainer from my drain video. It hides inside a standard shower stall drain and catches every hair before it reaches the pipe. Lift it out once a week, wipe it, drop it back in.',
        url: 'https://link.amazon/B0cxCfu6p',
      },
    ],
  },
  {
    title: 'Leak Protection',
    products: [
      {
        name: 'Water Leak Alarm 5 Pack',
        section: 'Leak Protection',
        blurb:
          "Small battery alarms that scream when water touches them. I put them under sinks, by the water heater, and next to the sump pit. A forty dollar pack that catches the leak you can't see.",
        url: 'https://link.amazon/B0j5f2M96',
      },
    ],
  },
  {
    title: 'Caulk & Sealing',
    comingSoon: true,
    products: [],
  },
];
