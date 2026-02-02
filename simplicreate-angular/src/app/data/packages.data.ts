/**
 * Type definition for a package tier.
 */
export type PackageTier = {
  name: string;
  setupPrice: string;
  retainerPrice: string;
  bestFor: string;
  includes: string[];
  highlight?: boolean;
};

/**
 * Array of service packages offered, shown on the home page.
 */
export const PACKAGES: PackageTier[] = [
  {
    name: 'Starter',
    setupPrice: 'R6,000 - R9,000',
    retainerPrice: 'R750 / month',
    bestFor: 'For small sites that need stability, updates, and basic protection.',
    includes: [
      'Security baseline + hardening',
      'Performance + reliability checks',
      'Essential updates + monitoring',
      'Monthly maintenance & reporting',
    ],
  },
  {
    name: 'Professional',
    setupPrice: 'R12,000 - R18,000',
    retainerPrice: 'R1,200 / month',
    bestFor: 'For growing businesses that want faster fixes, better SEO, and ongoing improvement.',
    includes: [
      'Everything in Starter',
      'SEO + conversion improvements',
      'Enhanced monitoring + alerts',
      'Priority fixes + optimisation',
    ],
    highlight: true,
  },
  {
    name: 'Premium',
    setupPrice: 'R25,000+',
    retainerPrice: 'R1,800 / month',
    bestFor: 'For businesses that want fully managed digital systems (security-first).',
    includes: [
      'Everything in Professional',
      'Deeper security + risk reduction',
      'Ongoing performance work',
      'Proactive improvements + planning',
    ],
  },
];