'use client';

import { Client, ClientPulse } from '@/src/lib/redux/slices/clientsSlice';
import { Flame, Star, Globe } from 'lucide-react';
import { getCountryName, getFlagEmoji } from '@/src/lib/utils';

interface StatCardsProps {
    pulse: ClientPulse;
    client: Client;
}

const StatCard = ({ icon: Icon, label, value, valueColor }: { icon: React.ElementType, label: string, value: string, valueColor?: string }) => (
    <div className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center">
        <div className="p-3 bg-gray-200 rounded-full mr-4">
            <Icon className="w-6 h-6 text-gray-600" />
        </div>
        <div>
            <div className="text-sm text-gray-500 font-semibold uppercase tracking-wider">{label}</div>
            <div className={`text-2xl font-bold ${valueColor || 'text-gray-800'}`}>{value}</div>
        </div>
    </div>
);

export function StatCards({ pulse, client }: StatCardsProps) {
    const countryName = getCountryName(client.country);
    const flagEmoji = getFlagEmoji(client.country);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
                icon={Flame} 
                label="Heat Score" 
                value={pulse.heatScore.toString()}
                valueColor="text-orange-500"
            />
            <StatCard 
                icon={Star} 
                label="Brand Tier" 
                value={pulse.brandTier}
            />
            <StatCard 
                icon={Globe} 
                label="Market" 
                value={`${flagEmoji} ${countryName}`}
            />
        </div>
    );
}
