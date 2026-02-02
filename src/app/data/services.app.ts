export type Service = {
  title: string;
  description: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    title: 'Website Fix & Modernisation Sprint',
    description: 'A focused 7-day upgrade sprint: design polish, mobile, speed, and conversion flow.',
    bullets: ['Mobile-first polish', 'Cleaner layout', 'Speed improvements', 'CTA + enquiry flow']
  },
  {
    title: 'Business Websites',
    description: 'A modern, credible website that explains what you do and drives enquiries.',
    bullets: ['High-converting structure', 'Fast loading', 'SEO basics', 'Easy updates']
  },
  {
    title: 'Automation & AI',
    description: 'Practical automation to reduce admin and improve lead follow-up.',
    bullets: ['Lead capture', 'Email sequences', 'Ops workflows', 'Smart integrations']
  }
];
