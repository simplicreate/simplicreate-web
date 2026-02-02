/**
 * Interface defining the structure of a service item.
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon?: string;
}

/**
 * Array of services offered, used in the home page.
 */
export const SERVICES: Service[] = [
  { id: 'design', title: 'Design', description: 'UI/UX and visual design', bullets: ['Custom design', 'Responsive layouts', 'Modern aesthetics'], icon: 'palette' },
  { id: 'development', title: 'Development', description: 'Frontend & backend development', bullets: ['Fast performance', 'Clean code', 'Scalable solutions'], icon: 'code' },
  { id: 'qa', title: 'QA', description: 'Testing and quality assurance', bullets: ['Thorough testing', 'Bug detection', 'Quality checks'], icon: 'check_circle' },
];