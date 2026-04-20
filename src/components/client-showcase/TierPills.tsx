'use client';

import { ClientPulse } from '@/src/lib/redux/slices/clientsSlice';

interface TierPillsProps {
    pulse: ClientPulse;
}

const Pill = ({ text }: { text: string }) => (
    <div className="bg-gray-100 text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded-full">
        {text}
    </div>
);

export function TierPills({ pulse }: TierPillsProps) {
    const showHotRightNow = pulse.heatDelta > 5;
    const showViralMoments = pulse.signals.some(s => s.category === 'viral');
    const showMilestoneAlerts = pulse.signals.some(s => s.category === 'milestone');

    const tierThresholds = {
        Emerging: 60,
        Growing: 80,
        Marquee: Infinity,
    };
    const showOutperformingTier = pulse.heatScore > tierThresholds[pulse.brandTier];

    return (
        <div className="flex items-center space-x-2 mt-4">
            {showHotRightNow && <Pill text="🔥 Hot Right Now" />}
            {showViralMoments && <Pill text="🚀 Viral Moments" />}
            {showMilestoneAlerts && <Pill text="🏆 Milestone Alerts" />}
            {showOutperformingTier && <Pill text="⭐ Outperforming Tier" />}
        </div>
    );
}
