'use client';
import React from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks';
import { setSearchQuery, setSportFilter, selectSportFilter, selectSearchQuery } from '@/src/lib/redux/slices/clientsSlice';

const SubToolbar = () => {
    const dispatch = useAppDispatch();
    const sportFilter = useAppSelector(selectSportFilter);
    const searchQuery = useAppSelector(selectSearchQuery);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    const handleSportFilterChange = (sport: string) => {
        dispatch(setSportFilter(sport));
    };

  return (
    <div className="flex items-center justify-between p-4 bg-neutral-50 border-b border-neutral-200">
      <div className="flex items-center gap-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input 
                placeholder="Search clients..." 
                className="w-64 pl-9"
                value={searchQuery}
                onChange={handleSearchChange} 
            />
        </div>
        <div className="flex items-center gap-2">
            <Button 
                variant={sportFilter === 'all' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => handleSportFilterChange('all')}
            >
                All Sports
            </Button>
            <Button 
                variant={sportFilter === 'football' ? 'secondary' : 'ghost'} 
                size="sm"
                onClick={() => handleSportFilterChange('football')}
            >
                Football
            </Button>
            {/* Add other sports as needed */}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 bg-neutral-200 p-1 rounded-md">
            <Button variant="secondary" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm">Broadcast</Button>
        </div>
      </div>
    </div>
  );
};

export default SubToolbar;
