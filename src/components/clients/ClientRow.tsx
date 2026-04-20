
'use client';

import { Client, ClientPulse } from '@/src/lib/redux/slices/clientsSlice';
import { cn } from '@/src/lib/utils';
import { Flame, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';

interface ClientRowProps {
  client: Client;
  pulse: ClientPulse | null;
  isSelected: boolean;
  onClick: () => void;
}

// A simple relative time formatter
const formatRelativeTime = (isoDate: string) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return '1d ago';
    return `${diffInDays}d ago`;
}

export function ClientRow({ client, pulse, isSelected, onClick }: ClientRowProps) {
  return (
    <div
      className={cn(
        'flex items-center p-3 cursor-pointer hover:bg-neutral-100 rounded-lg transition-colors',
        isSelected && 'bg-neutral-900 text-white hover:bg-neutral-800'
      )}
      onClick={onClick}
    >
      <Image
        src={client.crestUrl}
        alt={`${client.name} crest`}
        width={40}
        height={40}
        className="mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
            <span className="font-bold text-sm uppercase">{client.name}</span>
            <span className="text-xs bg-neutral-200 text-neutral-600 px-1.5 py-0.5 rounded">
                {client.sport.toUpperCase()}
            </span>
        </div>
        <div className={cn('text-xs text-neutral-500', isSelected && 'text-neutral-300')}>
          {client.league} &middot; {client.country}
        </div>
        <div className={cn('text-xs mt-1 text-neutral-700', isSelected && 'text-neutral-200')}>
            <span className="font-semibold">{formatRelativeTime(pulse?.lastAnalyzedAt ?? new Date().toISOString())}</span>
            <span className="mx-1">&middot;</span>
            <span>{pulse?.latestSignal ?? 'No recent activity'}</span>
        </div>
      </div>
      {pulse && (
        <div className="flex items-center gap-2 bg-neutral-100 text-neutral-800 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="font-bold">{pulse.heatScore}</span>
            <div className="flex items-center">
                {pulse.heatDelta >= 0 ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                )}
            </div>
        </div>
      )}
    </div>
  );
}
