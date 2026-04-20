
import { ClientList } from '@/src/components/clients/ClientList';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-[350px_1fr] gap-8 h-full">
      <div className="bg-neutral-50 rounded-lg">
        <ClientList />
      </div>
      <div className="bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold">Client Details</h1>
        <p className="text-neutral-500">Select a client from the list to see more details.</p>
      </div>
    </div>
  );
}
