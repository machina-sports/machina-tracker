import React from 'react';
import { Button } from '@/components/ui/button';

const SubToolbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-neutral-50 border-b border-neutral-200">
      <div className="flex items-center gap-4">
        {/* Placeholder for Search Input */}
        <div className="w-64 h-9 bg-neutral-200 rounded-md"></div>
        <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">All Sports</Button>
            <Button variant="ghost" size="sm">Football</Button>
            <Button variant="ghost" size="sm">Basketball</Button>
            <Button variant="ghost" size="sm">Volleyball</Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="bg-neutral-200 text-neutral-800 text-sm font-semibold px-3 py-1.5 rounded-full">
          0 CLIENTS
        </div>
        <div className="flex items-center gap-1 bg-neutral-200 p-1 rounded-md">
            <Button variant="secondary" size="sm">Dashboard</Button>
            <Button variant="ghost" size="sm">Broadcast</Button>
        </div>
      </div>
    </div>
  );
};

export default SubToolbar;
