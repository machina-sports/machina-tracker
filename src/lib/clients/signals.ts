
import { ClientPulse, Signal } from '@/src/lib/redux/slices/clientsSlice';
import { CLIENTS } from './roster';

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

const deterministicValue = (seed: number, min: number, max: number) => {
    return min + (seed % (max - min + 1));
}

const selectRandom = <T>(seed: number, arr: T[]): T => {
    return arr[seed % arr.length];
}

const generateMockSignals = (clientId: string, clientName: string): Signal[] => {
    const seed = simpleHash(clientId);
    const numSignals = deterministicValue(seed, 3, 8);
    const signals: Signal[] = [];

    const categories: Signal['category'][] = ['partner-activation', 'comms-marketing', 'viral', 'milestone', 'performance'];
    const headlines = [
        `Record-breaking performance by ${clientName}`,
        'New partnership announced with a major brand',
        `${clientName} hits 10M followers on Instagram`,
        'Viral moment from the last match',
        `Community outreach program launched by ${clientName}`,
        'Key player signs a new contract',
        'Featured in a global marketing campaign',
    ];
    const bodies = [
        `An in-depth look at the latest achievements of ${clientName}, showcasing their dedication and skill.`,
        'This new collaboration is set to bring exciting new opportunities and products to the fans.',
        `A huge milestone for ${clientName}, reflecting their growing influence and popularity online.`,
        'A clip from the recent game has been shared thousands of times, generating massive buzz.',
        `The new initiative aims to give back to the community and inspire the next generation of athletes.`,
        `The star player has committed their future to the club, delighting fans and ensuring stability.`,
        `The latest campaign highlights ${clientName}'s role as a global ambassador for the sport.`
    ];

    for (let i = 0; i < numSignals; i++) {
        const signalSeed = simpleHash(`${clientId}-${i}`);
        const now = new Date();
        now.setDate(now.getDate() - deterministicValue(signalSeed, 0, 30));

        signals.push({
            id: `sig_${clientId}_${i}`,
            category: selectRandom(signalSeed, categories),
            headline: selectRandom(signalSeed, headlines),
            body: selectRandom(signalSeed, bodies),
            publishedAt: now.toISOString(),
            sourceUrl: 'https://example.com',
        });
    }

    return signals.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}


export async function getClientPulse(clientId: string): Promise<ClientPulse> {
  // This is a stubbed implementation as per the instructions.
  // It returns deterministic placeholders derived from the clientId.
  // In a future step, this will be replaced with a real call to a Machina workflow.
  const client = CLIENTS.find(c => c.id === clientId);
  if (!client) {
    throw new Error(`Client with id ${clientId} not found`);
  }

  const hash = simpleHash(clientId);

  const heatScore = deterministicValue(hash, 40, 90); // Range: 40-90
  const heatDelta = deterministicValue(hash, -10, 10); // Range: -10 to 10
  const heatTrend7d = deterministicValue(hash, -5, 5); // Range: -5 to 5

  const now = new Date();
  const daysAgo = hash % 5; // 0-4 days ago
  now.setDate(now.getDate() - daysAgo);
  const lastAnalyzedAt = now.toISOString();

  const signals = generateMockSignals(clientId, client.name);
  const latestSignal = signals.length > 0 ? signals[0].headline : 'No recent signals';

  const instagramFollowers = deterministicValue(hash, 500_000, 20_000_000);
  const engagementRate = deterministicValue(hash, 10, 80) / 10; // 1.0 to 8.0

  let brandTier: 'Emerging' | 'Growing' | 'Marquee';
    if (instagramFollowers >= 10_000_000) {
        brandTier = 'Marquee';
    } else if (instagramFollowers >= 1_000_000) {
        brandTier = 'Growing';
    } else {
        brandTier = 'Emerging';
    }
  
  // Adjust tier based on engagement
  if (engagementRate > 6 && brandTier === 'Growing') {
    brandTier = 'Marquee';
  }
  if (engagementRate < 2 && brandTier === 'Growing') {
    brandTier = 'Emerging';
  }


  return Promise.resolve({
    heatScore,
    heatDelta,
    lastAnalyzedAt,
    signals,
    instagramHandle: client.externalIds.instagram || client.slug.replace(/-/g, ''),
    instagramFollowers,
    engagementRate,
    heatTrend7d,
    brandTier,
    heroImageUrl: `https://picsum.photos/seed/${hash}/1200/400`,
    latestSignal,
  });
}
