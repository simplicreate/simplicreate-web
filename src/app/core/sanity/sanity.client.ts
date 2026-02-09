import { createClient } from '@sanity/client';
import { environment } from '../../../environments/environment';

export const sanityEnabled = !!environment?.sanity?.projectId;

export const sanityClient = createClient({
  projectId: environment.sanity.projectId || 'zr082jb6',
  dataset: environment.sanity.dataset || 'production',
  apiVersion: environment.sanity.apiVersion || '2024-01-01',
  useCdn: environment.sanity.useCdn ?? true,
});
