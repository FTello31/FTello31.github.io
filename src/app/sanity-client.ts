import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'o9vp89lc',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2025-05-08', // use current date (YYYY-MM-DD) to target the latest API
  token:
    'skqVxXEueIY0qq5HwOXBhNaJyMwn5cP77URb4claTBTRpbZZYct7lLfrAMN5d9KRcGROTPR31BA9Ve7Jpky2tbsGMEx1r3rEhN0Twqvp4R1OVQxkVQpJ90ZYiU1mhdRapolO1ego438n5zzGJdhWn0cfv2hgsi5NN9dUXG7yt2zs26MyKoRW',
});
