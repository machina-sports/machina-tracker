// src/lib/clients/reporting.ts

export type SocialReport = {
  totalPosts: number;
  brandedPosts: number;
  personalPosts: number;
  brandedPct: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  topPosts: {
    id: string;
    caption: string;
    thumbnailUrl: string;
    engagementCount: number;
    postUrl: string;
    isBranded: boolean;
  }[];
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Deterministic stub until a real "social-report" workflow exists in a
 * Machina tracker project. Values are derived from the clientId so each
 * club has stable numbers across refreshes.
 */
export async function getSocialReport(clientId: string): Promise<SocialReport> {
  const seed = hash(clientId);
  const pick = (min: number, max: number, offset = 0) =>
    min + ((seed + offset) % (max - min + 1));

  const totalPosts = pick(8, 24, 1);
  const brandedPosts = Math.min(totalPosts, pick(2, 9, 2));
  const personalPosts = totalPosts - brandedPosts;
  const brandedPct = Math.round((brandedPosts / totalPosts) * 100);

  const totalLikes = pick(18_000, 180_000, 3);
  const totalComments = pick(400, 6_000, 4);
  const totalViews = pick(0, 1, 5) === 0 ? 0 : pick(200_000, 3_000_000, 6);

  const captions = [
    'Grateful to be a ✨Champion✨',
    'Another one in the books 🏆',
    'Back to work 💪',
    'Never stop. Never settle.',
    'Proud of the squad tonight',
    'Full focus on the next one.',
  ];

  const topPosts = Array.from({ length: 3 }, (_, i) => {
    const engagementCount = pick(2_000, 12_000, 10 + i);
    return {
      id: `${clientId}-post-${i + 1}`,
      caption: captions[(seed + i) % captions.length],
      thumbnailUrl: `https://picsum.photos/seed/${clientId}-${i + 1}/400/500`,
      engagementCount,
      postUrl: `https://instagram.com/${clientId}`,
      isBranded: ((seed + i) & 1) === 0,
    };
  });

  return {
    totalPosts,
    brandedPosts,
    personalPosts,
    brandedPct,
    totalViews,
    totalLikes,
    totalComments,
    topPosts,
  };
}
