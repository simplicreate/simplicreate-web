export type Project = {
  name: string;
  outcome: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  { name: 'SimpliCreate Launch', outcome: 'New brand + site rebuild in Angular', tags: ['Brand', 'Web'] },
  { name: 'Modernisation Sprint Offer', outcome: '7-day upgrade sprint offer built for quick sales', tags: ['UX', 'Conversion'] }
];
