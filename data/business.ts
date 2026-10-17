// Business facts shared by the page content and the JSON-LD that
// scripts/prerender.mjs writes into every page's <head>.

export const SITE_URL = 'https://stuhlservices.com';
export const PHONE_DISPLAY = '908-723-5922';
export const PHONE_HREF = 'tel:9087235922';
export const LICENSE_NUMBER = '13VH11735700';

export const SERVICE_AREA_COUNTIES = ['Morris', 'Somerset', 'Union'];

export const SERVICE_AREA_TOWNS = [
  'Long Hill',
  'Gillette',
  'Stirling',
  'Millington',
  'Berkeley Heights',
  'New Providence',
  'Summit',
  'Warren',
  'Watchung',
  'Basking Ridge',
  'Bernardsville',
  'Chatham',
  'Madison',
  'Morristown',
  'Mountainside',
];

export type ServiceIcon = 'bath' | 'basement' | 'kitchen' | 'flooring' | 'carpentry' | 'handyman';

export const SERVICES_OFFERED: { title: string; description: string; icon: ServiceIcon }[] = [
  {
    title: 'Bathroom Remodeling',
    description: 'Full remodels, walk-in and curb-less showers, custom tile, and vanity upgrades.',
    icon: 'bath',
  },
  {
    title: 'Basement Finishing',
    description: 'Family rooms, home offices, guest suites, and full bathrooms in space you already have.',
    icon: 'basement',
  },
  {
    title: 'Kitchen Remodeling',
    description: 'Complete redesigns, IKEA kitchen installs, cabinetry, islands, and lighting.',
    icon: 'kitchen',
  },
  {
    title: 'Flooring',
    description: 'Tile, luxury vinyl, and laminate for kitchens, baths, basements, and living areas.',
    icon: 'flooring',
  },
  {
    title: 'Carpentry',
    description: 'Built-ins, trim, shelving, and custom storage made to fit your home.',
    icon: 'carpentry',
  },
  {
    title: 'Handyman Work',
    description: 'Repairs and smaller jobs around the house, done properly the first time.',
    icon: 'handyman',
  },
];

// LocalBusiness schema. With no argument it covers the whole service area;
// town pages pass just the places that page is about.
export const businessJsonLd = (areaServed?: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: 'Stuhl Services LLC',
  description:
    'Licensed, insured, and bonded premium home remodeling company based in Gillette, NJ, serving Morris, Somerset, and Union Counties. ' +
    `NJ Home Improvement Contractor license ${LICENSE_NUMBER}.`,
  url: SITE_URL,
  telephone: '+1-908-723-5922',
  email: 'stuhlservices@gmail.com',
  image: `${SITE_URL}/images/og-image.png`,
  logo: `${SITE_URL}/images/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gillette',
    addressRegion: 'NJ',
    addressCountry: 'US',
  },
  areaServed: areaServed
    ? areaServed.map((name) => ({ '@type': 'City', name: `${name}, NJ` }))
    : [
        ...SERVICE_AREA_COUNTIES.map((c) => ({ '@type': 'AdministrativeArea', name: `${c} County, NJ` })),
        ...SERVICE_AREA_TOWNS.map((t) => ({ '@type': 'City', name: `${t}, NJ` })),
      ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Home Remodeling Services',
    itemListElement: SERVICES_OFFERED.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title },
    })),
  },
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'license',
    name: 'New Jersey Home Improvement Contractor (HIC) License',
    identifier: LICENSE_NUMBER,
    recognizedBy: { '@type': 'GovernmentOrganization', name: 'New Jersey Division of Consumer Affairs' },
  },
  sameAs: [
    'https://www.youtube.com/@StuhlServices',
    'https://www.facebook.com/StuhlServicesLLC',
    'https://www.instagram.com/stuhl_services',
  ],
});
