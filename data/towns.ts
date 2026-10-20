// Town landing pages, served at /remodeling-<slug>-nj (see routes.ts).
// `testimonialFrom` and `photos` point at projects in constants.tsx, so the
// quotes and pictures are real site content with their real locations.
// A town-specific job photo that isn't a portfolio project gives its own
// `alt` and `caption` instead of a `projectId`.

export interface TownPhoto {
  src: string;
  projectId?: string;
  alt?: string;
  caption?: { title: string; location: string };
}

export interface Town {
  slug: string;
  name: string;
  label?: string; // footer link text, when it should differ from `name`
  areaServed: string[]; // place names for this page's JSON-LD
  metaDescription: string;
  intro: string[];
  testimonialFrom: string;
  photos: TownPhoto[];
}

export const TOWNS: Town[] = [
  {
    slug: 'long-hill',
    name: 'Long Hill',
    label: 'Long Hill (Gillette, Stirling, Millington)',
    areaServed: ['Long Hill', 'Gillette', 'Stirling', 'Millington'],
    metaDescription:
      'Home remodeling in Long Hill Township, NJ: Gillette, Stirling, and Millington. Bathrooms, kitchens, and basements. Local, licensed, insured, and bonded.',
    intro: [
      "Long Hill Township is home for us. Stuhl Services is based in Gillette, so a job in Stirling or Millington is a few minutes away, not a trip across the county. That makes it easy to stop by for a walkthrough, pick up a fixture the same afternoon, or come back quickly if something needs another look.",
      'Many houses in Gillette, Stirling, and Millington still have their original bathrooms and kitchens, and those are the rooms our neighbors ask about most. Two of our favorite projects are right here: a 1985 Gillette kitchen we turned into a modern IKEA kitchen with all new appliances, and a Millington bathroom we rebuilt into a spa-style retreat.',
      `Stuhl Services LLC is licensed, insured, and bonded, with New Jersey Home Improvement Contractor license 13VH11735700. The owner is on site for every project, from the first measurement to the final cleanup.`,
    ],
    testimonialFrom: 'bath-millington',
    photos: [
      { projectId: 'kitchen-gillette', src: '/images/kitchen-gillette-after4.png' },
      { projectId: 'bath-millington', src: '/images/bath-millington-after3.png' },
      { projectId: 'bath-millington', src: '/images/bath-millington-after2.png' },
    ],
  },
  {
    slug: 'berkeley-heights',
    name: 'Berkeley Heights',
    areaServed: ['Berkeley Heights'],
    metaDescription:
      'Home remodeling in Berkeley Heights, NJ: basement finishing, bathrooms, and kitchens. About ten minutes from Gillette. Licensed, insured, and bonded.',
    intro: [
      'Berkeley Heights sits just across the Passaic River from our base in Gillette, about ten minutes away. Being that close means site visits fit easily into the week and we can be there quickly when a question comes up mid-project.',
      'Basements are the biggest request we get from Berkeley Heights. A lot of homes in town have a full basement that has been storage for years, and homeowners want that space back. One of our largest projects was here: more than 620 square feet of unused basement turned into a living area, a home office, and a full bathroom. Bathroom updates and kitchen refreshes are the next most common calls.',
      'We are a licensed, insured, and bonded New Jersey contractor (HIC #13VH11735700), and the owner works on every job personally.',
    ],
    testimonialFrom: 'bsmt-berkeley',
    photos: [
      {
        src: '/images/sunroom-berkeley-heights-hero.jpg',
        alt: 'Sunroom by Stuhl Services in Berkeley Heights, NJ',
        caption: { title: 'Sunroom', location: 'Berkeley Heights, NJ' },
      },
      { projectId: 'bsmt-berkeley', src: '/images/bsmt-berkeley-thumb.png' },
      { projectId: 'bsmt-newprov', src: '/images/bsmt-newprov-after3.png' },
    ],
  },
  {
    slug: 'new-providence',
    name: 'New Providence',
    areaServed: ['New Providence'],
    metaDescription:
      'Home remodeling in New Providence, NJ: bathrooms and basement finishing from a contractor 15 minutes away in Gillette. Licensed, insured, and bonded.',
    intro: [
      'New Providence is about fifteen minutes from our base in Gillette, and it is a town we know well. Two of the projects in our portfolio are here: an unused bathroom that became a curb-less walk-in shower with a bigger vanity, and a storage basement that became an entertainment room with its own dance studio.',
      'Homeowners in New Providence mostly call us about bathrooms and basements. Many houses here have one dated bathroom upstairs and a lower level that is not pulling its weight, so both projects often end up on the same wish list. When that happens we plan them together, so you deal with one schedule and one crew instead of two.',
      'Stuhl Services LLC holds New Jersey Home Improvement Contractor license 13VH11735700 and is fully licensed, insured, and bonded.',
    ],
    testimonialFrom: 'bsmt-newprov',
    photos: [
      { projectId: 'bath-newprov', src: '/images/bath-newprov-after1-web.jpg' },
      { projectId: 'bsmt-newprov', src: '/images/bsmt-newprov-after3.png' },
      { projectId: 'bath-newprov', src: '/images/bath-newprov-after4.png' },
    ],
  },
  {
    slug: 'summit',
    name: 'Summit',
    areaServed: ['Summit'],
    metaDescription:
      'Home remodeling in Summit, NJ: primary bathrooms, kitchens, and basements. Owner-operated, licensed, insured, and bonded. About 20 minutes from Gillette.',
    intro: [
      'Summit is about a twenty-minute drive from our shop in Gillette, and we take on projects all over town, from older homes near downtown to newer construction.',
      'Summit has a lot of older colonials and Tudors, and the request we hear most is a primary bathroom that finally matches the rest of the house: a larger shower, a double vanity, better lighting, and tile that will last. Kitchen remodels and finishing a basement for a home office or playroom come right after.',
      'We are licensed, insured, and bonded under NJ Home Improvement Contractor license 13VH11735700. You get a clear written estimate and timeline before work starts, and a properly cleaned house when we finish.',
    ],
    testimonialFrom: 'bath-newprov',
    photos: [
      { projectId: 'bath-watchung', src: '/images/bath-watchung-thumb.jpg' },
      { projectId: 'kitchen-gillette', src: '/images/kitchen-gillette-after3.png' },
      { projectId: 'bath-newprov', src: '/images/bath-newprov-after4.png' },
    ],
  },
  {
    slug: 'warren',
    name: 'Warren',
    areaServed: ['Warren'],
    metaDescription:
      'Home remodeling in Warren, NJ: kitchens, basements and water-damage repair, bathrooms, and flooring. About 10 minutes from Gillette. Licensed and insured.',
    intro: [
      'Warren is next door to Long Hill, so most Warren homes are about ten minutes from our base in Gillette. We have two Warren projects in our portfolio: a basement that flooded and grew mold, which we treated, painted, and refloored with vinyl, and a full kitchen update with new cabinetry and countertops.',
      'Kitchens and basements are what Warren homeowners ask us about most, followed by bathroom remodels and new flooring. When a basement has had water in it before, we talk through moisture and flooring choices up front so the finished space holds up.',
      'Stuhl Services LLC is a licensed, insured, and bonded home improvement contractor, NJ license 13VH11735700.',
    ],
    testimonialFrom: 'bsmt-warren',
    photos: [
      { projectId: 'kitchen-warren', src: '/images/kitchen-warren-thumb.png' },
      { projectId: 'bsmt-warren', src: '/images/bsmt-warren-after2.png' },
      { projectId: 'kitchen-warren', src: '/images/kitchen-warren-after1.png' },
    ],
  },
  {
    slug: 'watchung',
    name: 'Watchung',
    areaServed: ['Watchung'],
    metaDescription:
      'Home remodeling in Watchung, NJ: primary bathrooms, basements, and kitchens from a licensed, insured, and bonded contractor 20 minutes away in Gillette.',
    intro: [
      'Watchung is about twenty minutes from our base in Gillette. One of the bathrooms in our portfolio is a Watchung primary suite: we enlarged the shower, added a floating bench and a niche, and swapped the built-in tub for a free-standing one. The room went from gloomy to bright.',
      'Bathrooms are the most common request we get from Watchung, especially primary baths that still have the dark tile and closed-in shower they were built with. We also finish basements, remodel kitchens, and handle the carpentry that ties a room together, like custom vanities, shelving, and trim.',
      'Every Watchung job is covered by our New Jersey Home Improvement Contractor license, 13VH11735700, and we are fully insured and bonded.',
    ],
    testimonialFrom: 'bath-watchung',
    photos: [
      { projectId: 'bath-watchung', src: '/images/bath-watchung-after3.png' },
      { projectId: 'bath-watchung', src: '/images/bath-watchung-after4.png' },
    ],
  },
  {
    slug: 'basking-ridge',
    name: 'Basking Ridge',
    areaServed: ['Basking Ridge'],
    metaDescription:
      'Home remodeling in Basking Ridge, NJ: kitchen updates, basement finishing, flooring, and bathrooms. About 15 minutes from Gillette. Licensed and insured.',
    intro: [
      "Basking Ridge, in Bernards Township, is about fifteen minutes west of our base in Gillette. It borders Long Hill, so we're in the area often.",
      'A lot of Basking Ridge homes are colonials and townhomes from the last few decades, and the requests we hear most are kitchen updates and basement finishing: new cabinets and an island to open up the kitchen, or an unfinished basement turned into a family room, gym, or guest suite. We also put down new flooring through the house and take care of the smaller carpentry and handyman jobs that tend to pile up.',
      'Stuhl Services LLC is licensed, insured, and bonded, NJ HIC #13VH11735700, and the owner is hands-on for the whole project.',
    ],
    testimonialFrom: 'kitchen-warren',
    photos: [
      { projectId: 'bsmt-newprov', src: '/images/bsmt-newprov-thumb.png' },
      { projectId: 'kitchen-warren', src: '/images/kitchen-warren-after1.png' },
      { projectId: 'bsmt-berkeley', src: '/images/bsmt-berkeley-thumb.png' },
    ],
  },
  {
    slug: 'bernardsville',
    name: 'Bernardsville',
    areaServed: ['Bernardsville'],
    metaDescription:
      'Home remodeling in Bernardsville, NJ: bathrooms and custom carpentry, plus kitchens and basements. Licensed, insured, and bonded. 20 minutes from Gillette.',
    intro: [
      'Bernardsville is about twenty minutes west of our base in Gillette. The town has many older and larger homes, and remodeling them takes careful carpentry: matching existing trim, building in storage, and fitting a modern bathroom into a floor plan that was never designed for one. Bathroom remodels and custom carpentry are what we are asked for most here, followed by kitchens and basement finishing.',
      'We hold New Jersey Home Improvement Contractor license 13VH11735700 and carry full insurance and bonding, so you are covered from demolition through the final walkthrough.',
    ],
    testimonialFrom: 'bath-millington',
    photos: [
      { projectId: 'bath-millington', src: '/images/bath-millington-after2.png' },
      { projectId: 'kitchen-gillette', src: '/images/kitchen-gillette-after3.png' },
    ],
  },
  {
    slug: 'chatham',
    name: 'Chatham',
    areaServed: ['Chatham'],
    metaDescription:
      'Home remodeling in Chatham Borough and Chatham Township, NJ: bathrooms and kitchens, including IKEA kitchens. Licensed, insured, and bonded.',
    intro: [
      'We work in both Chatham Borough and Chatham Township, about fifteen minutes from our base in Gillette. Chatham has a lot of older homes with small original bathrooms, and that is the call we get most from here: making a cramped bathroom feel bigger with a walk-in shower, smarter storage, and good lighting. Kitchen remodels are a close second. We have a lot of experience with IKEA kitchen systems, which can stretch a kitchen budget a long way. Our own Gillette kitchen started as a basic 1985 kitchen and is now one of our favorite projects.',
      'Stuhl Services LLC is licensed, insured, and bonded (NJ HIC license 13VH11735700), and you work directly with the owner, not a salesperson.',
    ],
    testimonialFrom: 'kitchen-gillette',
    photos: [
      { projectId: 'kitchen-gillette', src: '/images/kitchen-gillette-thumb.png' },
      { projectId: 'bath-newprov', src: '/images/bath-newprov-after3.png' },
      { projectId: 'kitchen-gillette', src: '/images/kitchen-gillette-after3.png' },
    ],
  },
  {
    slug: 'madison',
    name: 'Madison',
    areaServed: ['Madison'],
    metaDescription:
      'Home remodeling in Madison, NJ: bathrooms, basement finishing, kitchens, flooring, and built-ins. Owner-operated and licensed. 20 minutes from Gillette.',
    intro: [
      'Madison is about twenty minutes from our shop in Gillette. Homes in Madison range from older houses near downtown to postwar neighborhoods, and the projects vary with them. The most common requests are bathroom remodels and finishing a basement into a home office or extra living space. We also do kitchens, new flooring, and carpentry such as built-in shelves and mudroom storage.',
      'Our New Jersey Home Improvement Contractor license is 13VH11735700, and we are fully insured and bonded. The owner runs every Madison job personally, so the person who quotes your project is the person who builds it.',
    ],
    testimonialFrom: 'bsmt-berkeley',
    photos: [
      { projectId: 'bsmt-warren', src: '/images/bsmt-warren-thumb.png' },
      { projectId: 'bsmt-newprov', src: '/images/bsmt-newprov-after3.png' },
      { projectId: 'bath-watchung', src: '/images/bath-watchung-after4.png' },
    ],
  },
  {
    slug: 'morristown',
    name: 'Morristown',
    areaServed: ['Morristown'],
    metaDescription:
      'Home remodeling in Morristown, NJ: bathrooms, kitchens, and flooring from an owner-operated contractor based in Gillette. Licensed, insured, and bonded.',
    intro: [
      'Morristown is about twenty-five minutes north of our base in Gillette, and we serve homeowners across town. Morristown has a mix of older single-family homes, townhouses, and condos, so projects here tend to be about making the most of the space you have: a bathroom taken down to the studs and rebuilt, a kitchen with smarter storage, or new flooring through the main level. Bathroom remodeling is the most common request, with kitchens and flooring next.',
      'Stuhl Services LLC is licensed, insured, and bonded. Our NJ Home Improvement Contractor license number is 13VH11735700.',
    ],
    testimonialFrom: 'bsmt-warren',
    photos: [
      { projectId: 'bath-watchung', src: '/images/bath-watchung-after2-web.jpg' },
      { projectId: 'kitchen-warren', src: '/images/kitchen-warren-thumb.png' },
      { projectId: 'bsmt-warren', src: '/images/bsmt-warren-after3.png' },
    ],
  },
  {
    slug: 'millburn',
    name: 'Millburn',
    label: 'Millburn & Short Hills',
    areaServed: ['Millburn', 'Short Hills'],
    metaDescription:
      'Home remodeling in Millburn and Short Hills, NJ: custom tile showers, kitchens with new cabinetry, and basement finishing. Licensed, insured, and bonded.',
    intro: [
      'We work throughout Millburn Township, including Short Hills, about twenty-five minutes east of our base in Gillette. In Millburn and Short Hills the requests we hear most are high-end bathroom remodels and kitchen updates: custom tile showers, double vanities, and kitchens with new cabinetry and lighting. We also finish basements into media rooms, gyms, and guest suites. On every project we bring the same attention to detail, from the layout down to the grout lines.',
      'We are licensed, insured, and bonded, with New Jersey Home Improvement Contractor license 13VH11735700.',
    ],
    testimonialFrom: 'bath-watchung',
    photos: [
      {
        src: '/images/kitchen-millburn-hero.jpg',
        alt: 'Kitchen remodel by Stuhl Services in Millburn, NJ',
        caption: { title: 'Kitchen Remodel', location: 'Millburn, NJ' },
      },
      { projectId: 'bath-millington', src: '/images/bath-millington-thumb.jpg' },
      { projectId: 'bath-watchung', src: '/images/bath-watchung-after4.png' },
    ],
  },
  {
    slug: 'westfield',
    name: 'Westfield',
    areaServed: ['Westfield'],
    metaDescription:
      'Home remodeling in Westfield, NJ: bathrooms for older homes, plus kitchens and basement finishing. Owner-operated, licensed, insured, and bonded.',
    intro: [
      'Westfield is about twenty-five minutes from our base in Gillette. The town is full of older colonials and Victorians, and many still have their original bathrooms and kitchens. The most common request we get from Westfield is a bathroom remodel that keeps the character of the house while adding a modern shower and better storage. Kitchen remodels and finishing a basement for a playroom or home office come next.',
      'Stuhl Services LLC is fully licensed, insured, and bonded in New Jersey (Home Improvement Contractor license 13VH11735700). The owner is on every job, and we give you a written estimate and timeline up front.',
    ],
    testimonialFrom: 'kitchen-warren',
    photos: [
      {
        src: '/images/bath-westfield-hero.jpg',
        alt: 'Bathroom remodel by Stuhl Services in Westfield, NJ',
        caption: { title: 'Bathroom Remodel', location: 'Westfield, NJ' },
      },
      { projectId: 'bsmt-berkeley', src: '/images/bsmt-berkeley-after3-web.jpg' },
      { projectId: 'kitchen-gillette', src: '/images/kitchen-gillette-after4.png' },
    ],
  },
  {
    slug: 'mountainside',
    name: 'Mountainside',
    areaServed: ['Mountainside'],
    metaDescription:
      'Home remodeling in Mountainside, NJ: bathrooms and basement finishing, plus kitchens, flooring, and carpentry. Licensed, insured, and bonded.',
    intro: [
      'Mountainside is about twenty minutes from our base in Gillette, on the far side of the Watchung Reservation. Many Mountainside homes are mid-century ranches, split-levels, and colonials, and the projects we hear about most are bathroom remodels and basement finishing. A lot of these houses have one or two original bathrooms and a lower level that could easily become a family room or home office. We also do kitchens, flooring, carpentry, and handyman work.',
      'Every Mountainside project is done under our New Jersey Home Improvement Contractor license, 13VH11735700, and we are licensed, insured, and bonded.',
    ],
    testimonialFrom: 'bsmt-newprov',
    photos: [
      { projectId: 'bath-newprov', src: '/images/bath-newprov-after2-web.jpg' },
      { projectId: 'bsmt-berkeley', src: '/images/bsmt-berkeley-thumb.png' },
    ],
  },
];

export const townBySlug = (slug?: string): Town | undefined => TOWNS.find((t) => t.slug === slug);
