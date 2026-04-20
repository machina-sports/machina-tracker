
import { Client } from '@/src/lib/redux/slices/clientsSlice';
import clientsData from '@/src/data/clients.generated.json';

export async function getClientRoster(): Promise<Client[]> {
  // In a real app, this would fetch from an API.
  // For this step, we're reading from a generated JSON file.
  // NOTE: This file was manually generated due to issues with the
  // machina-cli and running skills to fetch the data dynamically.
  return Promise.resolve(clientsData as Client[]);
}
