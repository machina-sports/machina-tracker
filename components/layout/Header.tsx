import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wordmark } from '@/components/logo';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wordmark />
            <span className="hidden font-bold sm:inline-block">
              Machina Tracker
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center space-x-2">
          <span className="font-semibold">CLIENT PULSE</span>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-red-500">LIVE</span>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/reporting">Reporting</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/chat">Chat</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
