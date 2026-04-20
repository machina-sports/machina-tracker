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

export async function getSocialReport(clientId: string): Promise<SocialReport> {
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
      document_name: 'classify-branded-posts',
      filters: { 'data.client_id': clientId },
      page: 1,
      page_size: 1000, // Fetch all posts for aggregation
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch social report data: ${response.statusText}`);
  }

  const result = await response.json();
  const posts = result.data.map((doc: any) => doc.data);

  if (posts.length === 0) {
    return {
      totalPosts: 0,
      brandedPosts: 0,
      personalPosts: 0,
      brandedPct: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      topPosts: [],
    };
  }

  const totalPosts = posts.length;
  const brandedPosts = posts.filter(p => p.is_branded).length;
  const personalPosts = totalPosts - brandedPosts;
  const brandedPct = totalPosts > 0 ? Math.round((brandedPosts / totalPosts) * 100) : 0;

  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const totalComments = posts.reduce((sum, p) => sum + (p.comments || 0), 0);

  const sortedPosts = [...posts].sort((a, b) => (b.engagement_count || 0) - (a.engagement_count || 0));
  const topPosts = sortedPosts.slice(0, 3).map(p => ({
    id: p.id,
    caption: p.caption,
    thumbnailUrl: p.thumbnail_url,
    engagementCount: p.engagement_count,
    postUrl: p.post_url,
    isBranded: p.is_branded,
  }));

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
