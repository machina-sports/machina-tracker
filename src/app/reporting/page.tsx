// src/app/reporting/page.tsx
import { getClientRoster } from '@/src/lib/clients/roster';
import { getSocialReport } from '@/src/lib/clients/reporting';
import ReportingView from '@/src/components/layout/ReportingView';
import { Client } from '@/src/lib/redux/slices/clientsSlice';

// Make sure the page is revalidated frequently
export const revalidate = 60; // Revalidate every 60 seconds

export default async function ReportingPage() {
  try {
    const clients = await getClientRoster();
    
    if (!clients || clients.length === 0) {
      return <div className="p-8">No clients found. Please add clients to see the report.</div>;
    }
    
    const initialClient = clients[0];
    const initialSocialReport = await getSocialReport(initialClient.id);

    return (
      <ReportingView
        clients={clients}
        initialClient={initialClient}
        initialSocialReport={initialSocialReport}
      />
    );
  } catch (error) {
    console.error('Failed to load reporting page:', error);
    return <div className="p-8 text-red-500">Failed to load reporting data. Please try again later.</div>;
  }
}
