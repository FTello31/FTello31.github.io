import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'o9vp89lc',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-05-08', // use current date (YYYY-MM-DD) to target the latest API
});
