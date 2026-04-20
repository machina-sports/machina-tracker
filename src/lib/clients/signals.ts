
import { ClientPulse } from '@/src/lib/redux/slices/clientsSlice';

// Simple hash function to generate deterministic-ish values
const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export async function getClientPulse(clientId: string): Promise<ClientPulse> {
  // This is a stubbed implementation as per the instructions.
  // It returns deterministic placeholders derived from the clientId.
  // In a future step, this will be replaced with a real call to a Machina workflow.

  const hash = simpleHash(clientId);

  const heatScore = 40 + (hash % 51); // Range: 40-90
  const heatDelta = -10 + (hash % 21); // Range: -10 to 10
  
  const now = new Date();
  const daysAgo = hash % 5; // 0-4 days ago
  now.setDate(now.getDate() - daysAgo);
  const lastAnalyzedAt = now.toISOString();

  const signals = [
    'Player performance on the rise',
    'Increased social media engagement',
    'Positive transfer rumors',
    'Strong financial report released',
    'Youth academy prospect promoted',
  ];
  const latestSignal = signals[hash % signals.length];

  return Promise.resolve({
    heatScore,
    heatDelta,
    lastAnalyzedAt,
    latestSignal,
  });
}
