
import { Client } from '@/src/lib/redux/slices/clientsSlice';

export async function getClientRoster(): Promise<Client[]> {
  const { MACHINA_API_URL, MACHINA_API_KEY } = process.env;

  if (!MACHINA_API_URL || !MACHINA_API_KEY) {
    throw new Error('Machina API URL or Key is not configured.');
  }

  const response = await fetch(`${MACHINA_API_URL}/document/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Token': MACHINA_API_KEY,
    },
    body: JSON.stringify({
      document_name: 'client-card',
      filters: {},
      page: 1,
      page_size: 100, // Assuming we won't have more than 100 clients for now
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch client roster: ${response.statusText}`);
  }

  const result = await response.json();
  // The document is the data, we need to map it to the Client type.
  // This mapping will depend on the actual structure of the 'client-card' document.
  // Based on my template, the document itself is the client data.
  return result.data.map((doc: any) => doc.data);
}

