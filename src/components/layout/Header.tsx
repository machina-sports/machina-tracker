import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-neutral-100 border-b border-neutral-200">
      <div className="flex items-center gap-4">
        {/* Placeholder for Logo */}
        <div className="w-10 h-10 bg-neutral-300 rounded-full"></div>
        <h1 className="text-xl font-bold">MACHINA TRACKER</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">CLIENT PULSE</span>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
            <Link href="/reporting">Reporting</Link>
        </Button>
        <Button variant="outline" asChild>
            <Link href="/chat">Chat</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
