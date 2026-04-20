// src/components/layout/ReportingView.tsx
'use client';

import { Client } from '@/src/lib/redux/slices/clientsSlice';

interface ReportingViewProps {
  clients: Client[];
  initialClient: Client;
  initialSocialReport: any;
}

export default function ReportingView({ clients, initialClient, initialSocialReport }: ReportingViewProps) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Reporting</h1>
      <p>This is a placeholder for the reporting view.</p>
      <pre>{JSON.stringify(initialSocialReport, null, 2)}</pre>
    </div>
  );
}
