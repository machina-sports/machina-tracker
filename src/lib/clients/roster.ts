import { Client } from '@/src/lib/redux/slices/clientsSlice';

/**
 * Static seed of Machina Sports' client clubs (Brasileirão Série A).
 * Crests come from the public football-data.org CDN (stable URLs).
 * Instagram handles are the clubs' official accounts.
 *
 * TODO: replace with a real call to the Machina tracker project once it
 * exists. The previous implementation pointed at /document/search on the
 * podcasts project, which has no client-card documents.
 */
const CLIENTS: Client[] = [
  {
    id: 'gremio',
    name: 'Grêmio',
    slug: 'gremio',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1766.png',
    venue: 'Arena do Grêmio',
    externalIds: { footballData: 1766, instagram: 'gremio' },
  },
  {
    id: 'flamengo',
    name: 'Flamengo',
    slug: 'flamengo',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1783.png',
    venue: 'Maracanã',
    externalIds: { footballData: 1783, instagram: 'flamengo' },
  },
  {
    id: 'corinthians',
    name: 'Corinthians',
    slug: 'corinthians',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1776.png',
    venue: 'Neo Química Arena',
    externalIds: { footballData: 1776, instagram: 'corinthians' },
  },
  {
    id: 'palmeiras',
    name: 'Palmeiras',
    slug: 'palmeiras',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1769.png',
    venue: 'Allianz Parque',
    externalIds: { footballData: 1769, instagram: 'palmeiras' },
  },
  {
    id: 'sao-paulo',
    name: 'São Paulo',
    slug: 'sao-paulo',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1770.png',
    venue: 'Morumbi',
    externalIds: { footballData: 1770, instagram: 'saopaulofc' },
  },
  {
    id: 'internacional',
    name: 'Internacional',
    slug: 'internacional',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1780.png',
    venue: 'Beira-Rio',
    externalIds: { footballData: 1780, instagram: 'scinternacional' },
  },
  {
    id: 'cruzeiro',
    name: 'Cruzeiro',
    slug: 'cruzeiro',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1771.png',
    venue: 'Mineirão',
    externalIds: { footballData: 1771, instagram: 'cruzeiro' },
  },
  {
    id: 'atletico-mg',
    name: 'Atlético-MG',
    slug: 'atletico-mg',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1772.png',
    venue: 'Arena MRV',
    externalIds: { footballData: 1772, instagram: 'atletico' },
  },
  {
    id: 'botafogo',
    name: 'Botafogo',
    slug: 'botafogo',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1773.png',
    venue: 'Nilton Santos',
    externalIds: { footballData: 1773, instagram: 'botafogo' },
  },
  {
    id: 'fluminense',
    name: 'Fluminense',
    slug: 'fluminense',
    sport: 'football',
    league: 'Brasileirão Série A',
    country: 'BRA',
    crestUrl: 'https://crests.football-data.org/1765.png',
    venue: 'Maracanã',
    externalIds: { footballData: 1765, instagram: 'fluminensefc' },
  },
];

export async function getClientRoster(): Promise<Client[]> {
  return CLIENTS;
}
