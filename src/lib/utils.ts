import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const countryCodeToName: Record<string, string> = {
    'DEU': 'Germany',
    'ESP': 'Spain',
    'FRA': 'France',
    'GBR': 'United Kingdom',
    'ITA': 'Italy',
    'USA': 'USA',
    'ARG': 'Argentina',
    'BRA': 'Brazil',
    'NLD': 'Netherlands',
    'PRT': 'Portugal',
};

export function getCountryName(code: string): string {
    return countryCodeToName[code] || code;
}

// Basic function to convert country code to flag emoji
export function getFlagEmoji(countryCode: string): string {
    // This is a simplified mapping. A real app might need a more robust solution.
    // This assumes the 2-letter ISO code can be derived or is available.
    // For now, we'll map from the 3-letter codes we have.
    const iso3ToIso2: Record<string, string> = {
        'DEU': 'DE',
        'ESP': 'ES',
        'FRA': 'FR',
        'GBR': 'GB',
        'ITA': 'IT',
        'USA': 'US',
        'ARG': 'AR',
        'BRA': 'BR',
        'NLD': 'NL',
        'PRT': 'PT',
    };
    const iso2 = iso3ToIso2[countryCode];
    if (!iso2) return '🏳️';
    
    const codePoints = iso2
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}
