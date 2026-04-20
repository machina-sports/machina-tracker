'use client';

import { useState } from 'react';
import { ClientPulse, Signal } from '@/src/lib/redux/slices/clientsSlice';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';

interface ClientTabsProps {
    pulse: ClientPulse;
}

const TABS = ['Brief', 'Metrics', 'Performance', 'Social & PR', 'Moments', 'Calendar', 'Activation', 'News', 'Citations'];

type SignalCategory = Signal['category'] | 'all';

const categoryDisplay: Record<SignalCategory, { label: string, color: string }> = {
    'all': { label: 'All', color: 'border-gray-500' },
    'partner-activation': { label: 'Partner Activation', color: 'border-blue-500' },
    'comms-marketing': { label: 'Comms & Marketing', color: 'border-green-500' },
    'viral': { label: 'Viral', color: 'border-purple-500' },
    'milestone': { label: 'Milestone', color: 'border-yellow-500' },
    'performance': { label: 'Performance', color: 'border-red-500' },
};

export function ClientTabs({ pulse }: ClientTabsProps) {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [activeFilter, setActiveFilter] = useState<SignalCategory>('all');

    const filteredSignals = pulse.signals.filter(signal =>
        activeFilter === 'all' || signal.category === activeFilter
    );

    const renderBrief = () => (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Signals</h2>
            <div className="flex items-center space-x-2 mb-4">
                {Object.entries(categoryDisplay).map(([key, { label }]) => (
                    <Button
                        key={key}
                        variant={activeFilter === key ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveFilter(key as SignalCategory)}
                    >
                        {label}
                    </Button>
                ))}
            </div>
            <div className="space-y-4">
                {filteredSignals.map(signal => (
                    <div key={signal.id} className={`p-4 rounded-lg border-l-4 ${categoryDisplay[signal.category].color} bg-gray-50`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-bold text-gray-800">{signal.headline}</p>
                                <p className="text-sm text-gray-600 mt-1">{signal.body}</p>
                            </div>
                            <Badge variant="secondary">{new Date(signal.publishedAt).toLocaleDateString()}</Badge>
                        </div>
                        {signal.sourceUrl && (
                            <a href={signal.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline mt-2 inline-block">
                                View Source
                            </a>
                        )}
                    </div>
                ))}
            </div>
             <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">State of the Brand</h2>
                <p className="text-gray-600">
                    A summary of the brand's current state will be displayed here. This will include analysis of recent performance, social media trends, and upcoming opportunities.
                </p>
            </div>
        </div>
    );

    const renderComingSoon = () => (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Coming soon</p>
        </div>
    );

    return (
        <div>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="py-6">
                {activeTab === 'Brief' ? renderBrief() : renderComingSoon()}
            </div>
        </div>
    );
}
