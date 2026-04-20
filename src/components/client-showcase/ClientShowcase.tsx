'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks';
import { fetchClientPulse, selectClientPulse, selectSelectedClientId } from '@/src/lib/redux/slices/clientsSlice';
import { selectAllClients } from '@/src/lib/redux/slices/clientsSlice';
import { Hero } from './Hero';
import { TierPills } from './TierPills';
import { StatCards } from './StatCards';
import { ClientTabs } from './ClientTabs';
import { Instagram as InstagramIcon, RefreshCw } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

export function ClientShowcase() {
    const dispatch = useAppDispatch();
    const selectedClientId = useAppSelector(selectSelectedClientId);
    const client = useAppSelector(selectAllClients).find(c => c.id === selectedClientId);
    const pulse = useAppSelector(selectedClientId ? selectClientPulse(selectedClientId) : () => null);

    useEffect(() => {
        if (selectedClientId) {
            dispatch(fetchClientPulse(selectedClientId));
        }
    }, [dispatch, selectedClientId]);

    if (!selectedClientId || !client) {
        return <div className="flex-1 p-8 bg-gray-50/50">Select a client to see details.</div>;
    }

    if (!pulse) {
        return <div className="flex-1 p-8 bg-gray-50/50">Loading client data...</div>;
    }

    const handleRefresh = () => {
        dispatch(fetchClientPulse(selectedClientId));
    };

    const getHeatTrendText = () => {
        if (pulse.heatTrend7d > 2) return 'UP';
        if (pulse.heatTrend7d < -2) return 'DOWN';
        return 'STABLE';
    };

    return (
        <div className="flex-1 flex flex-col bg-white overflow-y-auto">
            <Hero client={client} pulse={pulse} />
            
            <div className="p-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-800">{client.name}</h1>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    <span>Last analyzed today</span>
                    <Button variant="ghost" size="sm" onClick={handleRefresh} className="flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh</span>
                    </Button>
                </div>

                <TierPills pulse={pulse} />

                <div className="mt-6 border-t pt-6">
                    <StatCards pulse={pulse} client={client} />
                </div>

                <div className="mt-4 text-center text-sm font-semibold text-gray-600 tracking-wider">
                    — HEAT: <span className={
                        getHeatTrendText() === 'UP' ? 'text-green-500' :
                        getHeatTrendText() === 'DOWN' ? 'text-red-500' : 'text-gray-500'
                    }>{getHeatTrendText()}</span> —
                </div>

                <div className="mt-6 flex items-center justify-center text-sm text-gray-700">
                    <InstagramIcon className="w-4 h-4 mr-2" />
                    <a 
                        href={`https://instagram.com/${pulse.instagramHandle}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {pulse.instagramHandle}
                    </a>
                </div>
            </div>

            <div className="flex-grow px-6 pb-6">
                <ClientTabs pulse={pulse} />
            </div>
        </div>
    );
}
