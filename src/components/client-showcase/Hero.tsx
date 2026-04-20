'use client';

import Image from 'next/image';
import { Client, ClientPulse } from '@/src/lib/redux/slices/clientsSlice';

interface HeroProps {
    client: Client;
    pulse: ClientPulse;
}

export function Hero({ client, pulse }: HeroProps) {
    const hasHeroImage = !!pulse.heroImageUrl;
    const hasCrest = !!client.crestUrl;

    return (
        <div className="relative h-48 w-full">
            {hasHeroImage ? (
                <Image
                    src={pulse.heroImageUrl!}
                    alt={`${client.name} hero image`}
                    layout="fill"
                    objectFit="cover"
                />
            ) : (
                <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    {hasCrest && (
                        <Image
                            src={client.crestUrl}
                            alt={`${client.name} crest`}
                            width={96}
                            height={96}
                            objectFit="contain"
                        />
                    )}
                </div>
            )}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 text-xs font-bold uppercase px-3 py-1 rounded-full shadow-md">
                {client.sport} &middot; {client.league}
            </div>
        </div>
    );
}
