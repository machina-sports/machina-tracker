'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const sports = ['All Sports', 'Football', 'Basketball', 'Volleyball', 'Tennis', 'Hockey'];

export const SubToolbar = () => {
  const clientCount = useSelector((state: RootState) => state.clients.clients.length);

  return (
    <div className="border-b bg-background">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search clients..."
            className="md:w-[100px] lg:w-[300px]"
          />
          <div className="flex items-center gap-2">
            {sports.map((sport) => (
              <Button key={sport} variant={sport === 'All Sports' ? 'secondary' : 'ghost'} size="sm">
                {sport}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
            <span>{clientCount}</span>
            <span>CLIENTS</span>
          </div>
          <ToggleGroup type="single" defaultValue="dashboard" aria-label="View mode">
            <ToggleGroupItem value="dashboard" aria-label="Dashboard view">
              Dashboard
            </ToggleGroupItem>
            <ToggleGroupItem value="broadcast" aria-label="Broadcast view">
              Broadcast
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};
